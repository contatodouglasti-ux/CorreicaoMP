/**
 * form.js
 * Renderização do formulário por seções, validação de campos
 * e navegação entre seções.
 * Depende de: ui.js, app.js (estado global)
 */

/* ── Helpers de subtópicos ──── */

function normalizarPrefixo(prefixo) {
  return Array.isArray(prefixo) ? prefixo : [prefixo];
}

function temValorPreenchido(valor) {
  return valor !== undefined && valor !== null && String(valor).trim() !== '';
}

const UNIDADE_CORREICIONADA_CAMPO_ID = '1.1';
const UNIDADES_CORREICIONADAS_DATALIST_ID = 'unidades-correicionadas-lista';
let _unidadesCorreicionadasCache = null;
let _unidadesCorreicionadasPromise = null;

function normalizarTextoBusca(valor) {
  return String(valor ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function obterClienteSupabase() {
  return  window.sbClient || null;
}



function listarUnidadesCorreicionadas(termo = '') {
  const lista = _unidadesCorreicionadasCache || [];
  const normalizado = normalizarTextoBusca(termo);
  if (!normalizado) return lista.slice(0, 20);
  return lista
    .filter(nome => normalizarTextoBusca(nome).includes(normalizado))
    .slice(0, 20);
}

function esconderSugestoesUnidade(input) {
  const wrapper = input?.closest('[data-campo-id="1.1"]');
  const box = wrapper?.querySelector('.unidade-sugestoes');
  if (box) box.style.display = 'none';
}

function atualizarSugestoesUnidade(input) {
  if (!input) return;
  const wrapper = input.closest('[data-campo-id="1.1"]');
  if (!wrapper) return;
// NOVO
  if (input.disabled || input.readOnly) {
    esconderSugestoesUnidade(input);
    return;
  }
  wrapper.style.position = 'relative';
if (!input) return;
  if (input.disabled || input.readOnly) { // ← adicione
    esconderSugestoesUnidade(input);
    return;}
  if (!Array.isArray(_unidadesCorreicionadasCache)) {
    void carregarUnidadesCorreicionadas().then(() => atualizarSugestoesUnidade(input));
    return;
  }

  let box = wrapper.querySelector('.unidade-sugestoes');
  if (!box) {
    box = document.createElement('div');
    box.className = 'unidade-sugestoes';
    box.style.position = 'absolute';
    box.style.left = '0';
    box.style.right = '0';
    box.style.top = '100%';
    box.style.zIndex = '9999';
    box.style.background = '#fff';
    box.style.border = '1px solid #cfd8dc';
    box.style.borderRadius = '6px';
    box.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    box.style.maxHeight = '260px';
    box.style.overflowY = 'auto';
    box.style.display = 'none';
    wrapper.appendChild(box);
  }

  const matches = listarUnidadesCorreicionadas(input.value);
  box.innerHTML = '';

  if (!matches.length) {
    box.style.display = 'none';
    return;
  }

  matches.forEach(nome => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'unidade-sugestao-item';
    item.textContent = nome;
    item.style.display = 'block';
    item.style.width = '100%';
    item.style.textAlign = 'left';
    item.style.padding = '8px 10px';
    item.style.border = '0';
    item.style.background = 'transparent';
    item.style.cursor = 'pointer';
    item.onmouseenter = () => item.style.background = '#eef6fb';
    item.onmouseleave = () => item.style.background = 'transparent';
    item.onmousedown = e => {
      e.preventDefault();
      input.value = nome;
      input.setCustomValidity('');
      box.style.display = 'none';
      autoSalvar();
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    box.appendChild(item);
  });

  box.style.display = 'block';
}

function validarCampoUnidadeCorreicionada(input) {
  if (!input) return true;

  const valor = String(input.value || '').trim();
  if (!valor) {
    input.setCustomValidity(input.required ? 'Informe a unidade correicionada.' : '');
    input.classList.toggle('invalid', !!input.required);
    return !input.required;
  }

  const lista = _unidadesCorreicionadasCache || [];
  if (!lista.length) {
    input.setCustomValidity('');
    input.classList.remove('invalid');
    return true;
  }

  const valorNormalizado = normalizarTextoBusca(valor);
  const encontrado = lista.find(nome => normalizarTextoBusca(nome) === valorNormalizado);

  if (!encontrado) {
    input.setCustomValidity('Selecione uma unidade cadastrada na lista.');
    input.classList.add('invalid');
    input.reportValidity(); // ← mostra o balão de erro nativo
    return false;
  }

  if (input.value !== encontrado) input.value = encontrado;
  input.setCustomValidity('');
  input.classList.remove('invalid');
  return true;
}

async function carregarUnidadesCorreicionadas() {
  if (Array.isArray(_unidadesCorreicionadasCache)) return _unidadesCorreicionadasCache;
  if (_unidadesCorreicionadasPromise) return _unidadesCorreicionadasPromise;

  const client = obterClienteSupabase();
  if (!client || typeof client.from !== 'function') {
    _unidadesCorreicionadasCache = [];
   
    return _unidadesCorreicionadasCache;
  }

  _unidadesCorreicionadasPromise = (async () => {
    try {
      const { data, error } = await client
        .from('unidades_correicionadas')
        .select('nome')
        .eq('ativo', true)
        .order('nome', { ascending: true });

      if (error) throw error;
      return [...new Set((data || [])
        .map(item => String(item.nome || '').trim())
        .filter(Boolean))];
    } catch (err) {
      console.error('Erro ao carregar unidades correicionadas:', err);
      return [];
    }
  })();

  const lista = await _unidadesCorreicionadasPromise;
  _unidadesCorreicionadasCache = lista;
  _unidadesCorreicionadasPromise = null;

  validarCampoUnidadeCorreicionada(document.getElementById(UNIDADE_CORREICIONADA_CAMPO_ID));
  return lista;
}


function subtopicoTemDados(sec, sub, dados = window._dadosCarregados || {}) {
  const prefixos = normalizarPrefixo(sub.prefixo);

  return sec.campos.some(campo =>
    prefixos.some(p =>
      (campo.id === p || campo.id.startsWith(p + '.')) &&
      temValorPreenchido(dados[campo.id])
    )
  );
}

function atualizarEstadoSubtopicos() {
  const dados = window._dadosCarregados || {};

  document.querySelectorAll('.section').forEach((sectionEl, idx) => {
    const sec = form.secoes[idx];
    if (!sec || !sec.subtopicos) return;

    sec.subtopicos.forEach(sub => {
      const chave = Array.isArray(sub.prefixo) ? sub.prefixo.join(',') : sub.prefixo;

      const chip = Array.from(sectionEl.querySelectorAll('.chip'))
        .find(btn => btn.dataset.prefixo === chave);

      if (!chip) return;

      const enviado = subtopicoTemDados(sec, sub, dados);
      chip.classList.toggle('chip-enviado', enviado);
      chip.title = enviado
        ? 'Subtópico já possui dados salvos'
        : 'Subtópico sem dados salvos';
    });
  });
}

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
          atualizarEstadoSubtopicos();
          return;
        }

        sec.subtopicos.forEach(sub => {
          const chave = Array.isArray(sub.prefixo) ? sub.prefixo.join(',') : sub.prefixo;
          if (!ativos.has(chave)) return;

          const gt = document.createElement('h3');
          gt.className = 'subtopico-title';
          gt.innerText = sub.titulo || sub.nome;
          camposWrap.appendChild(gt);

          const prefixos = Array.isArray(sub.prefixo) ? sub.prefixo : [sub.prefixo];
          sec.campos
            .filter(c => prefixos.some(p => c.id === p || c.id.startsWith(p + '.')))
            .forEach(campo => renderCampo(camposWrap, campo));
        });

        carregar();
        atualizarEstadoSubtopicos();
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
          atualizarEstadoSubtopicos();
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
    wrapper.dataset.dependeDeId = campo.dependeDe.id;
    wrapper.dataset.dependeDeValor = campo.dependeDe.valor;
  }

  const ehDataCorrecao = campo.id === '1.2.inicio' || campo.id === '1.2.fim';

  if (ehDataCorrecao) {
    let grupo = parent.querySelector('.grupo-data-correcao');
    if (!grupo) {
      grupo = document.createElement('div');
      grupo.className = 'grupo-data-correcao';
      parent.appendChild(grupo);
    }
    wrapper.classList.add('data-correcao');
    grupo.appendChild(wrapper);
  } else {
    parent.appendChild(wrapper);
  }

  if (campo.tipo === 'number' || campo.tipo === 'date') {
    wrapper.className = 'campo-numero-row';

    const l = document.createElement('label');
    l.className = campo.obrigatorio !== false ? 'required campo-numero-label' : 'campo-numero-label';
    l.innerText = campo.pergunta;
    l.htmlFor = campo.id;
    wrapper.appendChild(l);

    const inp = document.createElement('input');
    inp.type = campo.tipo;
    inp.id = campo.id;
    inp.required = campo.obrigatorio !== false;
    inp.className = 'campo-numero-input';

    if (campo.id === '8.a') {
      inp.placeholder = 'Digite o valor';
    }

    if (campo.tipo === 'number') {
      inp.min = '0';
      inp.onkeydown = function (e) {
        if (e.key === '-' || e.key === '+') e.preventDefault();
      };
    }

    inp.oninput = function () {
      if (this.disabled || this.readOnly) return;
      autoSalvar();
    };

    if (campo.tipo === 'date') {
      inp.onchange = autoSalvar;
    }

    wrapper.appendChild(inp);
    return;
  }


  const obrigatorio = campo.obrigatorio !== false;

  if (campo.id === UNIDADE_CORREICIONADA_CAMPO_ID) {
    const l = document.createElement('label');
    l.className = obrigatorio ? 'required' : '';
    l.innerText = campo.pergunta;
    l.htmlFor = campo.id;
    wrapper.appendChild(l);

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.id = campo.id;
    inp.required = obrigatorio;
    inp.autocomplete = 'off';
   
    inp.setAttribute('aria-autocomplete', 'list');
    inp.placeholder = 'Digite para filtrar e selecione uma unidade';
    inp.oninput = function () {
      void carregarUnidadesCorreicionadas().then(() => atualizarSugestoesUnidade(this));
      autoSalvar();
    };
    inp.onfocus = function () {
  if (this.disabled || this.readOnly) return; // ← adicione
  void carregarUnidadesCorreicionadas().then(() => atualizarSugestoesUnidade(this));
};
    inp.onblur = function () {
  setTimeout(() => {
    validarCampoUnidadeCorreicionada(this);
    esconderSugestoesUnidade(this);
    // Feedback visual imediato
    if (this.validationMessage) {
      this.classList.add('invalid');
    } else {
      this.classList.remove('invalid');
    }
  }, 150);
};
    wrapper.appendChild(inp);

    const ajuda = document.createElement('small');
    ajuda.style.display = 'block';
    ajuda.style.marginTop = '4px';
    ajuda.style.fontSize = '12px';
    ajuda.style.color = '#546E7A';
    ajuda.textContent = 'Digite parte do nome e escolha uma opção da lista.';
    wrapper.appendChild(ajuda);

    void carregarUnidadesCorreicionadas();
    atualizarSugestoesUnidade(inp);
    return;
  }

  const l = document.createElement('label');
  l.className = obrigatorio ? 'required' : '';
  l.innerText = campo.pergunta;
  wrapper.appendChild(l);

  if (campo.tipo === 'textarea') {
    const t = document.createElement('textarea');
    t.id = campo.id;
    t.required = obrigatorio;
    t.style.overflow = 'hidden';
    t.style.resize = 'none';
    t.oninput = function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      autoSalvar();
    };
    wrapper.appendChild(t);
  } else if (['text', 'date', 'time'].includes(campo.tipo)) {
    //aqui coloca os campos lado a lado ( datas )
    if (campo.id === '1.2.inicio' || campo.id === '1.2.fim') {
  let grupo = parent.querySelector('.grupo-data-correcao');
  if (!grupo) {
    grupo = document.createElement('div');
    grupo.className = 'grupo-data-correcao';
    parent.appendChild(grupo);
  }
  wrapper.classList.add('data-correcao');
  grupo.appendChild(wrapper);
} else {
  parent.appendChild(wrapper);
}

    const inp = document.createElement('input');
    inp.type = campo.tipo;
    inp.id = campo.id;
    inp.required = obrigatorio;
    inp[campo.tipo === 'text' ? 'oninput' : 'onchange'] = autoSalvar;
    wrapper.appendChild(inp);
  } else if (campo.tipo === 'radio') {
    const dv = document.createElement('div');
    dv.className = 'radio-group';
    campo.opcoes.forEach(op => {
      const lbl = document.createElement('label');
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = campo.id;
      r.value = op;
      r.required = obrigatorio;
      r.onchange = () => {
        avaliarCondicionais();
        autoSalvar();
      };
      lbl.appendChild(r);
      lbl.append(' ' + op);
      dv.appendChild(lbl);
    });
    wrapper.appendChild(dv);
  } else if (campo.tipo === 'date_ranger') {
    // Renderiza dois inputs de data lado a lado com labels personalizadas
    const rangeWrap = document.createElement('div');
    rangeWrap.className = 'date-range-group';

    // Campo INÍCIO
    const wrapInicio = document.createElement('div');
    wrapInicio.className = 'date-range-item';

    const lblInicio = document.createElement('label');
    lblInicio.textContent = campo.inicioLabel || 'INÍCIO';
    lblInicio.htmlFor = campo.id + '.inicio';
    lblInicio.className = obrigatorio ? 'required' : '';

    const inpInicio = document.createElement('input');
    inpInicio.type = 'date';
    inpInicio.id = campo.id + '.inicio';
    inpInicio.required = obrigatorio;

    // Campo FIM
    const wrapFim = document.createElement('div');
    wrapFim.className = 'date-range-item';

    const lblFim = document.createElement('label');
    lblFim.textContent = campo.fimLabel || 'FIM';
    lblFim.htmlFor = campo.id + '.fim';
    lblFim.className = obrigatorio ? 'required' : '';

    const inpFim = document.createElement('input');
    inpFim.type = 'date';
    inpFim.id = campo.id + '.fim';
    inpFim.required = obrigatorio;

    // Validação cruzada: fim não pode ser antes do início
    inpInicio.onchange = function () {
      autoSalvar();
      if (inpFim.value && inpFim.value < this.value) {
        inpFim.setCustomValidity('A data fim não pode ser anterior à data início.');
      } else {
        inpFim.setCustomValidity('');
      }
    };

    inpFim.onchange = function () {
      if (inpInicio.value && this.value < inpInicio.value) {
        this.setCustomValidity('A data fim não pode ser anterior à data início.');
      } else {
        this.setCustomValidity('');
      }
      autoSalvar();
    };

    wrapInicio.appendChild(lblInicio);
    wrapInicio.appendChild(inpInicio);
    wrapFim.appendChild(lblFim);
    wrapFim.appendChild(inpFim);
    rangeWrap.appendChild(wrapInicio);
    rangeWrap.appendChild(wrapFim);
    wrapper.appendChild(rangeWrap);
  }
}

/* ── Condicionais ──── */

function avaliarCondicionais() {
  document.querySelectorAll('[data-depende-de-id]').forEach(wrapper => {
    const controlId = wrapper.dataset.dependeDeId;
    const valorEsperado = wrapper.dataset.dependeDeValor;
    const controlEl = document.querySelector(`input[name="${controlId}"]:checked`);
    const valorAtual = controlEl ? controlEl.value : null;
    const obrigatorio = valorAtual === valorEsperado;
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
  const base = sec !== null ? document.querySelectorAll('.section')[sec] : document;
  const inputs = base.querySelectorAll('input, textarea');
  const d = {};
  inputs.forEach(i => {
    if (i.type === 'radio') {
      if (i.checked) d[i.name] = String(i.value);
    } else {
      if (i.id) d[i.id] = String(i.value);
    }
  });
  return d;
}

function carregar() {
  const dadosSalvos = window._dadosCarregados || {};
  Object.keys(dadosSalvos).forEach(k => {
    const valor = dadosSalvos[k];

    // Tenta pelo id primeiro (inputs de texto, textarea, etc.)
    let el = document.getElementById(k);

    // Se não achou pelo id, pode ser um radio — busca sem usar o valor no seletor
    // para evitar SyntaxError com valores que contenham \n, aspas ou caracteres especiais
    if (!el) {
      el = document.querySelector(`input[name="${k}"]`);
    }

    if (!el) return;

    if (el.type === 'radio') {
      // Itera pelos radios do grupo e marca pelo valor, sem seletor CSS com o valor
      document.querySelectorAll(`input[name="${k}"]`).forEach(r => {
        if (r.value === valor) r.checked = true;
      });
    } else {
      el.value = valor;
      // Re-expande textareas ao carregar dados salvos
      if (el.tagName === 'TEXTAREA') {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }
    }
  });

  avaliarCondicionais();
  atualizarEstadoSubtopicos();
}

/* ── Validação ──── */

function limparInvalidos(base) {
  base.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function encontrarInvalidos(base) {
  limparInvalidos(base);
  const invalids = [];
  const radiosProc = new Set();

  base.querySelectorAll('input, textarea').forEach(el => {
    if (el.type === 'radio') {
      if (radiosProc.has(el.name)) return;
      radiosProc.add(el.name);
      const radios = Array.from(base.querySelectorAll(`input[name="${el.name}"]`));
      if (el.required && !radios.some(r => r.checked)) {
        const grupo = radios[0] && radios[0].closest('.radio-group');
        if (grupo) {
          grupo.classList.add('invalid');
          invalids.push(grupo);
        } else {
          radios[0].classList.add('invalid');
          invalids.push(radios[0]);
        }
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