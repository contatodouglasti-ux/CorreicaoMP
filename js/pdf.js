/**
 * pdf.js
 * Geração de PDF de uma correição.
 * Depende de: db.js, ui.js, html2pdf (CDN)
 *
 * Lógica: só renderiza seções e subtópicos que têm
 * ao menos um campo respondido (sem blocos vazios no PDF).
 */

async function baixarPDF(reg, clienteOverride) {
  mostrarLoading('Gerando PDF…');
  try {
    let data, error;

    // Prioridade: cliente passado explicitamente → sbAdmin (painel) → sb (usuário normal)
    if (clienteOverride) {
      const res = await clienteOverride.rpc('buscar_registro_por_id', { registro_id: reg.id });
      error = res.error;
      data  = res.data && res.data[0];
    } else if (typeof sbAdmin !== 'undefined') {
      const res = await sbAdmin.rpc('buscar_registro_por_id', { registro_id: reg.id });
      error = res.error;
      data  = res.data && res.data[0];
    } else {
      const res = await sb.from('correicoes').select('*').eq('id', reg.id).single();
      error = res.error;
      data  = res.data;
    }

    if (error) throw error;
    if (!data)  throw new Error('Registro não encontrado.');

    const dados = data.dados || {};

    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'position:fixed;left:-9999px;top:0;width:190mm;background:#fff;font-family:Arial,sans-serif;color:#263238;font-size:12px;line-height:1.5;box-sizing:border-box;padding:0;margin:0;';
    document.body.appendChild(wrapper);

    wrapper.innerHTML = `
<style>
  * { box-sizing: border-box; }
  .pdf-page     { width:190mm; padding:10mm; font-family:Arial,sans-serif; font-size:12px; color:#263238; }
  h1, h2, h3    { page-break-after: avoid; break-after: avoid; }
  .pdf-secao    { page-break-before: auto; break-before: auto; }
  .pdf-campo    {
    margin-bottom: 12px;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    display: table;
    width: 100%;
  }
  .pdf-pergunta { font-weight:bold; margin-bottom:4px; word-break:break-word; }
  .pdf-valor    {
    background:#f5f7f9;
    padding:8px;
    border-radius:4px;
    white-space:pre-wrap;
    word-break:break-word;
    overflow-wrap:break-word;
    max-width:100%;
  }
  .assinatura {
    page-break-before: always;
    break-before: page;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    margin-top: 0;
    padding-top: 16px;
    border-top: 2px solid #1C799B;
    font-size: 12px;
    color: #263238;
  }
</style>

<div class="pdf-page" id="pdf-conteudo">
  <div class="pdf-banner">
    <img src="assets/logo.png" style="width:100%;height:auto;display:block;" />
  </div>
</div>`;

    const pdfPage = wrapper.querySelector('#pdf-conteudo');

    const renderCampo = (campo, container) => {
      const valor = dados[campo.id];
      if (!valor) return false;

      const div = document.createElement('div');
      div.className = 'pdf-campo';

      const perg = document.createElement('div');
      perg.className = 'pdf-pergunta';
      perg.textContent = campo.pergunta;

      const val = document.createElement('div');
      val.className = 'pdf-valor';
      val.textContent = valor;

      div.appendChild(perg);
      div.appendChild(val);
      container.appendChild(div);
      return true;
    };

    form.secoes.forEach(sec => {
      const frag = document.createDocumentFragment();
      let secTemConteudo = false;

      if (sec.subtopicos) {
        sec.subtopicos.forEach(sub => {
          const prefixos = Array.isArray(sub.prefixo) ? sub.prefixo : [sub.prefixo];
          const camposDaSub = sec.campos.filter(c =>
            prefixos.some(p => c.id === p || c.id.startsWith(p + '.'))
          );

          const fragSub = document.createDocumentFragment();
          let subTemConteudo = false;

          camposDaSub.forEach(campo => {
            if (renderCampo(campo, fragSub)) subTemConteudo = true;
          });

          if (subTemConteudo) {
            const subTitle = document.createElement('h3');
            subTitle.textContent = sub.nome;
            subTitle.style.cssText = 'font-size:13px;color:#37474F;margin-top:10px;';
            frag.appendChild(subTitle);
            frag.appendChild(fragSub);
            secTemConteudo = true;
          }
        });
      } else {
        sec.campos.forEach(campo => {
          if (renderCampo(campo, frag)) secTemConteudo = true;
        });
      }

      if (secTemConteudo) {
        const h2 = document.createElement('h2');
        h2.className = 'pdf-secao';
        h2.textContent = sec.nome;
        pdfPage.appendChild(h2);
        pdfPage.appendChild(frag);
      }
    });

    // Assinatura em página própria para não sumir no PDF
    const divAss = document.createElement('div');
    divAss.id = 'assinatura';
    divAss.className = 'assinatura';
    divAss.innerHTML =
      '<div style="font-weight:700;color:#1C799B;margin-bottom:8px;">&#x2705; Assinatura de Envio</div>' +
      '<table style="width:100%;border-collapse:collapse;">' +
        '<tr>' +
          '<td style="padding:4px 16px 4px 0;"><b>Usu&aacute;rio:</b> ' + escapeHtml(data.nome || '') + '</td>' +
          '<td style="padding:4px 16px 4px 0;"><b>Email:</b> ' + escapeHtml(data.user_id || '') + '</td>' +
          '<td style="padding:4px 16px 4px 0;"><b>Data de cria&ccedil;&atilde;o:</b> ' + new Date(data.criado_em).toLocaleString('pt-BR') + '</td>' +
          '<td style="padding:4px 0;"><b>Data de finaliza&ccedil;&atilde;o:</b> ' + (data.finalizado_em ? new Date(data.finalizado_em).toLocaleString('pt-BR') : 'N&atilde;o finalizado') + '</td>' +
        '</tr>' +
      '</table>';

    pdfPage.appendChild(divAss);

    const opt = {
      margin: [10, 10, 15, 10],
      filename: `correicao-${data.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['css', 'legacy'],
        avoid: ['.pdf-campo', 'h2', 'h3', '.assinatura']
      },
    };

    await html2pdf().set(opt).from(pdfPage).save();
    showToast('PDF gerado com sucesso ✅', 'ok');

  } catch (err) {
    console.error(err);
    showToast('Erro ao gerar PDF.', 'erro');
  } finally {
    const tmp = document.querySelector('div[style*="-9999px"]');
    if (tmp) tmp.remove();
    esconderLoading();
  }
}
