/**
 * form.js
 * Renderização do formulário por seções, validação de campos
 * e navegação entre seções.
 * Depende de: ui.js, app.js (estado global)
 */

/* ── Renderização ──── */

function criarForm() {
  const c = document.getElementById('formContainer');

  form.secoes.forEach((sec, i) => {
    const d = document.createElement('div');
    d.className = 'section';
    if (i === 0) d.classList.add('active');

    const h = document.createElement('h2');
    h.innerText = sec.nome;
    d.appendChild(h);

    if (sec.subtopicos) {
      const chipBar   = document.createElement('div');
      chipBar.className = 'chip-bar';
      const camposWrap  = document.createElement('div');
      camposWrap.id   = 'campos-especificos';
      const ativos    = new Set();

      function atualizarCampos() {
        camposWrap.innerHTML = '';
        if (ativos.size === 0) {
          const aviso = document.createElement('p');
          aviso.className = 'chip-aviso';
          aviso.innerText = 'Selecione um ou mais tópicos acima para exibir os campos.';
          camposWrap.appendChild(aviso);
          return;
        }
        sec.subtopicos.forEach(sub => {
          const chave = Array.isArray(sub.prefixo) ? sub.prefixo.join(',') : sub.prefixo;
          if (!ativos.has(chave)) return;
          const gt = document.createElement('h3');
          gt.className = 'subtopico-title';
          gt.innerText = sub.nome;
          camposWrap.appendChild(gt);
          const prefixos = Array.isArray(sub.prefixo) ? sub.prefixo : [sub.prefixo];
          sec.campos
            .filter(c => prefixos.some(p => c.id === p || c.id.startsWith(p + '.')))
            .forEach(campo => renderCampo(camposWrap, campo));
        });
        carregar();
      }

      sec.subtopicos.forEach(sub => {
        const chip = document.createElement('button');
        chip.type      = 'button';
        chip.className = 'chip';
        chip.innerText = sub.nome;
        const chaveAtivo = Array.isArray(sub.prefixo) ? sub.prefixo.join(',') : sub.prefixo;
        chip.dataset.prefixo = chaveAtivo;
        chip.onclick   = () => {
          if (ativos.has(chaveAtivo)) {
            ativos.delete(chaveAtivo);
            chip.classList.remove('chip-ativo');
          } else {
            ativos.add(chaveAtivo);
            chip.classList.add('chip-ativo');
          }
          atualizarCampos();
        };
        chipBar.appendChild(chip);
      });
      d.appendChild(chipBar);
      atualizarCampos();
      d.appendChild(camposWrap);
    } else {
      sec.campos.forEach(campo => renderCampo(d, campo));
    }

    const nav = document.createElement('div');
    nav.className = 'nav';
    if (i > 0) nav.appendChild(btn('Voltar', 'btn-gray', () => mostrar(i - 1)));
    nav.appendChild(btn('Próximo', 'btn-primary', () => mostrar(i + 1)));
    nav.appendChild(btn('Salvar seção', 'btn-green', () => salvarSecao(i)));
    d.appendChild(nav);
    c.appendChild(d);
  });

  atualizarBarra();
}

function renderCampo(parent, campo) {
  const wrapper = document.createElement('div');
  wrapper.dataset.campoId = campo.id;
  if (campo.dependeDe) {
    wrapper.dataset.dependeDeId    = campo.dependeDe.id;
    wrapper.dataset.dependeDeValor = campo.dependeDe.valor;
  }
  parent.appendChild(wrapper);

  if (campo.tipo === 'number') {
    // Layout horizontal: label à esquerda, input pequeno à direita
    wrapper.className = 'campo-numero-row';

    const l = document.createElement('label');
    l.className = 'required campo-numero-label';
    l.innerText = campo.pergunta;
    l.htmlFor   = campo.id;
    wrapper.appendChild(l);

    const inp     = document.createElement('input');
    inp.type      = 'number';
    inp.id        = campo.id;
    inp.required  = campo.obrigatorio !== false;
    inp.className = 'campo-numero-input';
    inp.min       = '0';
   inp.onkeydown  = function (e) { if (e.key === '-' || e.key === '+') e.preventDefault(); };
inp.oninput    = function () {
  const v = parseInt(this.value, 10);
  if (isNaN(v) || v < 0) this.value = '';
  autoSalvar();
};
    wrapper.appendChild(inp);
    return;
  }

  const obrigatorio = campo.obrigatorio !== false;

  const l = document.createElement('label');
  l.className = obrigatorio ? 'required' : '';
  l.innerText = campo.pergunta;
  wrapper.appendChild(l);

  if (campo.tipo === 'textarea') {
    const t = document.createElement('textarea');
    t.id = campo.id; t.required = obrigatorio;
    t.style.overflow = 'hidden';
    t.style.resize   = 'none';
    t.oninput = function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      autoSalvar();
    };
    wrapper.appendChild(t);
  } else if (['text', 'date', 'time'].includes(campo.tipo)) {
    const inp    = document.createElement('input');
    inp.type     = campo.tipo;
    inp.id       = campo.id;
    inp.required = obrigatorio;
    inp[campo.tipo === 'text' ? 'oninput' : 'onchange'] = autoSalvar;
    wrapper.appendChild(inp);
  } else if (campo.tipo === 'radio') {
    const dv = document.createElement('div');
    dv.className = 'radio-group';
    campo.opcoes.forEach(op => {
      const lbl = document.createElement('label');
      const r   = document.createElement('input');
      r.type    = 'radio'; r.name = campo.id; r.value = op; r.required = obrigatorio;
      r.onchange = () => { avaliarCondicionais(); autoSalvar(); };
      lbl.appendChild(r);
      lbl.append(' ' + op);
      dv.appendChild(lbl);
    });
    wrapper.appendChild(dv);
  }
}

/* ── Condicionais ──── */

function avaliarCondicionais() {
  document.querySelectorAll('[data-depende-de-id]').forEach(wrapper => {
    const controlId     = wrapper.dataset.dependeDeId;
    const valorEsperado = wrapper.dataset.dependeDeValor;
    const controlEl     = document.querySelector(`input[name="${controlId}"]:checked`);
    const valorAtual    = controlEl ? controlEl.value : null;
    const obrigatorio   = valorAtual === valorEsperado;
    wrapper.querySelectorAll('input, textarea, select').forEach(el => el.required = obrigatorio);
    const lbl = wrapper.querySelector('label');
    if (lbl) lbl.className = obrigatorio ? 'required' : '';
  });
}

/* ── Navegação e progresso ──── */

function mostrar(i) {
  const secs = document.querySelectorAll('.section');
  if (i < 0 || i >= secs.length) return;
  secs.forEach(s => s.classList.remove('active'));
  secs[i].classList.add('active');
  atual = i;
  atualizarBarra();
  destacarItemAtivo(i);
  document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function atualizarBarra() {
  const perc = ((atual + 1) / form.secoes.length) * 100;
  document.getElementById('progressBar').style.width = perc + '%';
}

/* ── Coleta e carga de dados ──── */


function coletar(sec = null) {
  const base   = sec !== null ? document.querySelectorAll('.section')[sec] : document;
  const inputs = base.querySelectorAll('input, textarea');
  const d      = {};
  inputs.forEach(i => {
    if (i.type === 'radio') { if (i.checked) d[i.name] = String(i.value); }
    else { if (i.id) d[i.id] = String(i.value); }
  });
  return d;
}

function carregar() {
  const dadosSalvos = window._dadosCarregados || {};
  Object.keys(dadosSalvos).forEach(k => {
    const el = document.getElementById(k) || document.querySelector(`input[name="${k}"][value="${dadosSalvos[k]}"]`);
    if (!el) return;
    if (el.type === 'radio') {
      const r = document.querySelector(`input[name="${k}"][value="${dadosSalvos[k]}"]`);
      if (r) r.checked = true;
    } else {
      el.value = dadosSalvos[k];
      // Re-expande textareas ao carregar dados salvos
      if (el.tagName === 'TEXTAREA') {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    }
  });
  avaliarCondicionais();
}

/* ── Validação ──── */

function limparInvalidos(base) {
  base.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function encontrarInvalidos(base) {
  limparInvalidos(base);
  const invalids   = [];
  const radiosProc = new Set();

  base.querySelectorAll('input, textarea').forEach(el => {
    if (el.type === 'radio') {
      if (radiosProc.has(el.name)) return;
      radiosProc.add(el.name);
      const radios = Array.from(base.querySelectorAll(`input[name="${el.name}"]`));
      if (el.required && !radios.some(r => r.checked)) {
        const grupo = radios[0] && radios[0].closest('.radio-group');
        if (grupo) { grupo.classList.add('invalid'); invalids.push(grupo); }
        else        { radios[0].classList.add('invalid'); invalids.push(radios[0]); }
      }
      return;
    }
    if (el.required && (!el.value || !el.value.toString().trim())) {
      el.classList.add('invalid');
      invalids.push(el);
    }
  });
  return invalids;
}

function focusFirstInvalid(invalids) {
  if (!invalids.length) return;
  const first = invalids[0];
  if (first.classList.contains('radio-group')) {
    const r = first.querySelector('input[type="radio"]');
    if (r) r.focus();
  } else {
    first.focus();
  }
  first.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
