/**
 * pdf.js
 * Geração de PDF de uma correição.
 * Depende de: db.js, ui.js, html2pdf (CDN)
 *
 * Lógica: só renderiza seções e subtópicos que têm
 * ao menos um campo respondido (sem blocos vazios no PDF).
 */

async function baixarPDF(reg) {
  mostrarLoading('Gerando PDF…');
  try {
    const { data, error } = await sb.from('correicoes').select('*').eq('id', reg.id).single();
    if (error) throw error;
    const dados = data.dados || {};

    // Container temporário anexado ao DOM para renderização correta
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;left:-9999px;top:0;width:190mm;background:#fff;font-family:Arial,sans-serif;color:#263238;font-size:12px;line-height:1.5;box-sizing:border-box;padding:0;margin:0;';
    document.body.appendChild(wrapper);

    wrapper.innerHTML = `
<style>
  * { box-sizing: border-box; }
  .pdf-page     { width:190mm; padding:10mm; font-family:Arial,sans-serif; font-size:12px; color:#263238; }
  h1, h2        { page-break-after: avoid; }
  .pdf-secao    { page-break-before: auto; page-break-after: avoid; }
  .pdf-campo    { margin-bottom:12px; page-break-inside:avoid; break-inside:avoid; }
  .pdf-pergunta { font-weight:bold; margin-bottom:4px; word-break:break-word; }
  .pdf-valor    { background:#f5f7f9; padding:8px; border-radius:4px; white-space:pre-wrap; word-break:break-word; overflow-wrap:break-word; max-width:100%; }
</style>
<div class="pdf-page" id="pdf-conteudo">
  <div class="pdf-banner"><img src="assets/logo.png" style="width:100%;height:auto;display:block;" /></div>
  <div class="pdf-header">
    <div class="pdf-cabecalho" style="margin-top:10px;font-size:13px;">
      <div><b>Usuário:</b> ${escapeHtml(data.nome    || '')}</div>
      <div><b>Email:</b>   ${escapeHtml(data.user_id || '')}</div>
      <div><b>Data:</b>    ${new Date(data.criado_em).toLocaleString('pt-BR')}</div>
    </div>
  </div>
</div>`;

    const pdfPage = wrapper.querySelector('#pdf-conteudo');

    // Renderiza um campo e o anexa ao container.
    // Retorna true se havia valor, false se estava vazio.
    const renderCampo = (campo, container) => {
      const valor = dados[campo.id];
      if (!valor) return false;

      const div  = document.createElement('div');
      div.className = 'pdf-campo';

      const perg = document.createElement('div');
      perg.className   = 'pdf-pergunta';
      perg.textContent = campo.pergunta;

      const val = document.createElement('div');
      val.className   = 'pdf-valor';
      val.textContent = valor;

      div.appendChild(perg);
      div.appendChild(val);
      container.appendChild(div);
      return true;
    };

    form.secoes.forEach(sec => {
      // Monta o conteúdo da seção num fragmento temporário
      const frag = document.createDocumentFragment();
      let secTemConteudo = false;

      if (sec.subtopicos) {
        sec.subtopicos.forEach(sub => {
          const camposDaSub = sec.campos.filter(c => c.id.startsWith(sub.prefixo + '.'));
          const fragSub = document.createDocumentFragment();
          let subTemConteudo = false;

          camposDaSub.forEach(campo => {
            if (renderCampo(campo, fragSub)) subTemConteudo = true;
          });

          // Só adiciona o título do subtópico se ele tiver campos respondidos
          if (subTemConteudo) {
            const subTitle = document.createElement('h3');
            subTitle.textContent  = sub.nome;
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

      // Só adiciona o título da seção se houver ao menos um campo respondido
      if (secTemConteudo) {
        const h2 = document.createElement('h2');
        h2.className   = 'pdf-secao';
        h2.textContent = sec.nome;
        pdfPage.appendChild(h2);
        pdfPage.appendChild(frag);
      }
    });

    const opt = {
      margin:      10,
      filename:    `correicao-${data.id}.pdf`,
      image:       { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:   { mode: ['css'], avoid: ['.pdf-campo', 'h2'] },
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
