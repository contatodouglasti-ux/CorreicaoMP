/* ── Datas em formato brasileiro (dd/mm/aaaa) ─────────────────────────────
   Mantém os campos <input type="date"> nativos (com calendário e valor ISO),
   mas força a EXIBIÇÃO no formato brasileiro dd/mm/aaaa, independentemente
   do idioma/região configurados no navegador.

   Técnica: o texto interno do campo (::-webkit-datetime-edit) fica
   transparente e um pseudo-elemento ::before exibe o valor formatado,
   guardado no atributo data-br e atualizado a cada mudança de valor. */
(function () {
  'use strict';

  const RE_ISO = /^(\d{4})-(\d{2})-(\d{2})/;

  function paraBR(v) {
    const m = String(v || '').match(RE_ISO);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
  }

  /* ── Estilos ── */
  const css = `
    input[type="date"].campo-data-br {
      position: relative;
    }
    input[type="date"].campo-data-br::-webkit-datetime-edit {
      color: transparent;
    }
    input[type="date"].campo-data-br::before {
      content: attr(data-br);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      padding: inherit;
      padding-right: 0;
      pointer-events: none;
      color: inherit;
      font: inherit;
      white-space: nowrap;
      overflow: hidden;
    }
    input[type="date"].campo-data-br[data-br=""]::before {
      content: "dd/mm/aaaa";
      color: #9aa4af;
    }
    input[type="date"].campo-data-br:disabled::before,
    input[type="date"].campo-data-br:read-only::before {
      opacity: .7;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  /* ── Atualização do atributo de exibição ── */
  const descValor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

  function atualizar(inp) {
    inp.setAttribute('data-br', paraBR(descValor.get.call(inp)));
  }

  function converter(inp) {
    if (inp.dataset.dataBrOn) return;
    inp.dataset.dataBrOn = '1';
    inp.classList.add('campo-data-br');

    /* Intercepta atribuições programáticas de .value (carregar(), etc.),
       mantendo o comportamento nativo e sincronizando a exibição. */
    Object.defineProperty(inp, 'value', {
      configurable: true,
      get() { return descValor.get.call(inp); },
      set(v) { descValor.set.call(inp, v); atualizar(inp); }
    });

    inp.addEventListener('input', () => atualizar(inp));
    inp.addEventListener('change', () => atualizar(inp));
    atualizar(inp);
  }

  function varrer(raiz) {
    if (raiz.nodeType !== 1 && raiz.nodeType !== 9) return;
    if (raiz.matches && raiz.matches('input[type="date"]')) converter(raiz);
    if (raiz.querySelectorAll) raiz.querySelectorAll('input[type="date"]').forEach(converter);
  }

  const observer = new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => varrer(n)));
  });

  varrer(document);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => varrer(document));
  }

  window.DataBR = { paraBR };
})();
