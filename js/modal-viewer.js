/**
 * modal-viewer.js
 * Módulo compartilhado: modal de detalhes + impressão/PDF.
 * Usado por admin.html e pela aba de histórico (historico.js).
 *
 * API pública:
 *   ModalViewer.abrir(config)   — abre o modal com os dados de um registro
 *   ModalViewer.fechar()        — fecha o modal
 *   ModalViewer.imprimir()      — aciona window.print() com a área correta preenchida
 *
 * config: {
 *   titulo   : string   — nome/identificação exibida no cabeçalho
 *   sub      : string   — subtítulo (email · data)
 *   dados    : object   — mapa campo.id → valor
 *   secoes   : array    — form.secoes (array de seções do formulário)
 * }
 */

const ModalViewer = (() => {
  /* ─── Estado do registro atualmente aberto (fonte única para tela e impressão) ─── */
  let _estadoAtual = null; // { titulo, sub, dados, secoes }

  /* ─── IDs dos elementos ─── */
  const IDS = {
    overlay    : 'mvOverlay',
    modal      : 'mvModal',
    titulo     : 'mvTitulo',
    sub        : 'mvSub',
    body       : 'mvBody',
    btnPrint   : 'mvBtnPrint',
    btnFechar  : 'mvBtnFechar',
    btnFechar2 : 'mvBtnFechar2',
    printArea  : 'mvPrintArea',
    styles     : 'mvStyles',
  };

  /* ─── Cria os estilos uma única vez ─── */
  function _ensureStyles() {
    if (document.getElementById(IDS.styles)) return;

    const style = document.createElement('style');
    style.id = IDS.styles;
    style.textContent = `
      /* ── Overlay ── */
      #mvOverlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2000;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding: 32px 16px;
        overflow-y: auto;
      }
      #mvOverlay.open { display: flex; }

      /* ── Modal ── */
      #mvModal {
        background: #fff;
        border-radius: 14px;
        width: 100%;
        max-width: 780px;
        box-shadow: 0 24px 60px rgba(0,0,0,0.18);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      }

      /* ── Cabeçalho ── */
      .mv-header {
        background: #124b5f;
        color: #fff;
        padding: 18px 24px;
        border-radius: 14px 14px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-shrink: 0;
      }
      .mv-header h2  { font-size: 16px; margin-bottom: 2px; }
      .mv-header .mv-sub { font-size: 12px; opacity: 0.7; }

      .mv-close {
        background: rgba(255,255,255,0.15);
        border: none;
        color: #fff;
        width: 28px; height: 28px;
        border-radius: 50%;
        font-size: 16px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        transition: background 0.15s;
      }
      .mv-close:hover { background: rgba(255,255,255,0.25); }

      /* ── Corpo ── */
      .mv-body {
        overflow-y: auto;
        padding: 24px;
        flex: 1;
      }

      /* ── Rodapé ── */
      .mv-footer {
        padding: 16px 24px;
        border-top: 1px solid #d7e3eb;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-shrink: 0;
      }

      /* ── Seções dentro do modal ── */
      .mv-secao { margin-bottom: 24px; }
      .mv-secao h3 {
        font-size: 13px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.06em;
        color: #1C799B;
        padding-bottom: 8px;
        border-bottom: 2px solid #1C799B;
        margin-bottom: 14px;
      }
      .mv-subtitulo {
        font-size: 12px; font-weight: 700;
        color: #546E7A;
        text-transform: uppercase; letter-spacing: 0.04em;
        margin: 14px 0 8px;
      }
      .mv-campo {
        margin-bottom: 12px;
        padding: 10px 12px;
        background: #f7f9fa;
        border-radius: 8px;
        border-left: 3px solid #1C799B;
      }
      .mv-pergunta {
        font-size: 12px; font-weight: 600;
        color: #546E7A; margin-bottom: 4px;
      }
      .mv-valor {
        font-size: 14px; color: #263238;
        word-break: break-word; white-space: pre-wrap;
      }
      .mv-sem-dados {
        font-size: 13px; color: #546E7A;
        font-style: italic; padding: 8px 0;
      }

      /* ── Área de impressão (oculta na tela) ── */
      #mvPrintArea { display: none; }

      /* ── Estilos de impressão ── */
      @media print {
        body.modal-printing > * { display: none !important; }
        body.modal-printing #mvPrintArea { display: block !important; margin: 0; padding: 0; }

        body.modal-printing .topbar,
        body.modal-printing .sidebar,
        body.modal-printing .menu,
        body.modal-printing .hamburger,
        body.modal-printing .menu-toggle,
        body.modal-printing .floating-menu,
        body.modal-printing #loadingOverlay,
        body.modal-printing .toast,
        body.modal-printing .btn-sair {
          display: none !important;
        }

        #mvPrintArea .print-header {
          display: block !important;
          width: 100%;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 2px solid #1C799B;
        }
        #mvPrintArea .print-header img {
          width: 100% !important; max-width: 100% !important;
          height: auto; display: block;
        }
        #mvPrintArea .print-meta {
          font-size: 11px; color: #546E7A;
          margin-bottom: 20px; line-height: 1.7;
        }
        #mvPrintArea .print-secao {
          margin-bottom: 20px; page-break-inside: avoid;
        }
        #mvPrintArea .print-secao h3 {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: #1C799B;
          border-bottom: 1.5px solid #1C799B;
          padding-bottom: 5px; margin-bottom: 10px;
          page-break-after: avoid;
        }
        #mvPrintArea .print-subtitulo {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; color: #546E7A;
          margin: 10px 0 6px; page-break-after: avoid;
        }
        #mvPrintArea .print-campo {
          margin-bottom: 8px;
          page-break-inside: avoid; break-inside: avoid;
        }
        #mvPrintArea .print-pergunta {
          font-size: 10px; font-weight: 700;
          color: #546E7A; margin-bottom: 2px;
        }
        #mvPrintArea .print-valor {
          font-size: 11px; color: #263238;
          background: #f5f7f9;
          padding: 5px 8px;
          border-left: 2px solid #1C799B;
          word-break: break-word; white-space: pre-wrap;
        }
        #mvPrintArea .print-assinatura {
          page-break-before: always;
          border-top: 2px solid #1C799B;
          padding-top: 14px;
          font-size: 11px; color: #263238;
        }
        #mvPrintArea .print-assinatura .label {
          font-weight: 700; color: #1C799B; margin-bottom: 8px;
        }
        #mvPrintArea .print-assinatura table {
          width: 100%; border-collapse: collapse;
        }
        #mvPrintArea .print-assinatura td {
          padding: 3px 12px 3px 0; vertical-align: top;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ─── Cria o DOM do modal uma única vez ─── */
  function _ensureDOM() {
    if (document.getElementById(IDS.overlay)) return;

    _ensureStyles();

    const overlay = document.createElement('div');
    overlay.id = IDS.overlay;
    overlay.innerHTML = `
      <div id="${IDS.modal}">
        <div class="mv-header">
          <div>
            <h2 id="${IDS.titulo}"style="color: #ffffff;">Detalhes do Registro</h2>
            <div class="mv-sub" id="${IDS.sub}"></div>
          </div>
          <button class="mv-close" id="${IDS.btnFechar2}">✕</button>
        </div>
        <div class="mv-body" id="${IDS.body}"></div>
        <div class="mv-footer">
          <button class="btn btn-green" id="${IDS.btnPrint}">🖨️ Imprimir / PDF</button>
          <button class="btn btn-gray"  id="${IDS.btnFechar}">Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Área de impressão global
    if (!document.getElementById(IDS.printArea)) {
      const pa = document.createElement('div');
      pa.id = IDS.printArea;
      document.body.appendChild(pa);
    }

    // Eventos
    document.getElementById(IDS.btnFechar).onclick  = fechar;
    document.getElementById(IDS.btnFechar2).onclick = fechar;
    document.getElementById(IDS.btnPrint).onclick   = imprimir;
    overlay.addEventListener('click', e => { if (e.target === overlay) fechar(); });
  }

  /* ─── Utilitários ─── */
  function _esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ─── Renderiza as seções no corpo do modal ─── */
  function _renderBody(dados, secoes) {
    const body = document.getElementById(IDS.body);
    body.innerHTML = '';

    let temConteudo = false;

    secoes.forEach(sec => {
      const secDiv = document.createElement('div');
      secDiv.className = 'mv-secao';

      const h3 = document.createElement('h3');
      h3.textContent = sec.nome;
      secDiv.appendChild(h3);

      let secTemConteudo = false;

      if (sec.subtopicos) {
        sec.subtopicos.forEach(sub => {
          const camposDaSub = sec.campos.filter(c => c.id.startsWith(sub.prefixo + '.'));
          const frag = [];

          camposDaSub.forEach(campo => {
            const valor = dados[campo.id];
            if (valor === undefined || valor === null || valor === '') return;
            frag.push({ pergunta: campo.pergunta, valor });
          });

          if (frag.length === 0) return;

          const subDiv = document.createElement('div');
          subDiv.className = 'mv-subtitulo';
          subDiv.textContent = sub.nome;
          secDiv.appendChild(subDiv);

          frag.forEach(({ pergunta, valor }) => {
            secDiv.appendChild(_criarCampo(pergunta, valor));
          });

          secTemConteudo = true;
        });
      } else {
        sec.campos.forEach(campo => {
          const valor = dados[campo.id];
          if (valor === undefined || valor === null || valor === '') return;
          secDiv.appendChild(_criarCampo(campo.pergunta, valor));
          secTemConteudo = true;
        });
      }

      if (secTemConteudo) {
        body.appendChild(secDiv);
        temConteudo = true;
      }
    });

    if (!temConteudo) {
      body.innerHTML = '<p class="mv-sem-dados">Este registro não possui campos preenchidos.</p>';
    }
  }

  function _criarCampo(pergunta, valor) {
    const div = document.createElement('div');
    div.className = 'mv-campo';
    div.innerHTML = `
      <div class="mv-pergunta">${_esc(pergunta)}</div>
      <div class="mv-valor">${_esc(valor)}</div>`;
    return div;
  }

  /* ─── Preenche a área de impressão ───
   * IMPORTANTE: monta o HTML direto a partir de `_estadoAtual.dados`
   * (os dados vindos do banco, os mesmos passados para abrir()), e não
   * a partir do que está renderizado na tela (mv-body). Isso garante que
   * a impressão sempre reflita fielmente as respostas salvas, mesmo que
   * algum campo não tenha sido exibido corretamente no modal.
   */
  function _buildPrintArea() {
    const estado = _estadoAtual || {};
    const titulo = estado.titulo || document.getElementById(IDS.titulo)?.textContent || 'Registro';
    const sub    = estado.sub    || document.getElementById(IDS.sub)?.textContent    || '';
    const dados  = estado.dados  || {};
    const secoes = estado.secoes || [];
    const pa     = document.getElementById(IDS.printArea);

    let html = `
      <div class="print-header">
        <img src="assets/logo.png" alt="MPAM CGMP" />
      </div>
      <div class="print-meta">
        <strong>${_esc(titulo)}</strong><br>
        ${_esc(sub)}
      </div>`;

    secoes.forEach(sec => {
      let secHtml = `<div class="print-secao"><h3>${_esc(sec.nome)}</h3>`;
      let secTemConteudo = false;

      if (sec.subtopicos) {
        sec.subtopicos.forEach(sub => {
          const camposDaSub = sec.campos.filter(c => c.id.startsWith(sub.prefixo + '.'));
          const frag = [];

          camposDaSub.forEach(campo => {
            const valor = dados[campo.id];
            if (valor === undefined || valor === null || valor === '') return;
            frag.push({ pergunta: campo.pergunta, valor });
          });

          if (frag.length === 0) return;

          secHtml += `<div class="print-subtitulo">${_esc(sub.nome)}</div>`;
          frag.forEach(({ pergunta, valor }) => {
            secHtml += `
              <div class="print-campo">
                <div class="print-pergunta">${_esc(pergunta)}</div>
                <div class="print-valor">${_esc(valor)}</div>
              </div>`;
          });

          secTemConteudo = true;
        });
      } else {
        sec.campos.forEach(campo => {
          const valor = dados[campo.id];
          if (valor === undefined || valor === null || valor === '') return;
          secHtml += `
            <div class="print-campo">
              <div class="print-pergunta">${_esc(campo.pergunta)}</div>
              <div class="print-valor">${_esc(valor)}</div>
            </div>`;
          secTemConteudo = true;
        });
      }

      secHtml += '</div>';
      if (secTemConteudo) html += secHtml;
    });

    html += `
      <div class="print-assinatura">
        <div class="label">✅ Assinatura de Envio</div>
        <table>
          <tr>
            <td><b>Usuário:</b> ${_esc(titulo)}</td>
            <td><b>Gerado em:</b> ${new Date().toLocaleString('pt-BR')}</td>
          </tr>
        </table>
      </div>`;

    pa.innerHTML = html;
  }

  /* ─── API pública ─── */

  /**
   * Abre o modal preenchido com os dados do registro.
   * @param {{ titulo: string, sub: string, dados: object, secoes: array }} config
   */
  function abrir({ titulo, sub, dados, secoes }) {
    _ensureDOM();

    // Guarda a fonte de dados original (vinda do banco) — é ela que será
    // usada tanto para renderizar a tela quanto para montar a impressão.
    _estadoAtual = { titulo, sub, dados, secoes };

    document.getElementById(IDS.titulo).textContent = titulo;
    document.getElementById(IDS.sub).textContent    = sub;

    _renderBody(dados, secoes);

    document.getElementById(IDS.overlay).classList.add('open');
  }

  /** Fecha o modal. */
  function fechar() {
    const overlay = document.getElementById(IDS.overlay);
    if (overlay) overlay.classList.remove('open');
  }

  /** Monta a área de impressão e aciona window.print(). */
  
  function imprimir() {
    document.body.classList.add('modal-printing');
    _buildPrintArea();

    const pa = document.getElementById(IDS.printArea);
    const cleanup = () => {
      pa.innerHTML = '';
      document.body.classList.remove('modal-printing');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => window.print(), 50);
  }

  return { abrir, fechar, imprimir };
})();
window.ModalViewer = ModalViewer;