console.log('PROPOSICOES_JSON:', window.PROPOSICOES_JSON);
/* ─── Tabela 3.1 — Dados estatísticos gerais do órgão ─────────── */
const ROTULOS_26 = {
  "26.a": "Inquéritos Policiais recebidos",
  "26.b": "Termos Circunstanciados de Ocorrência recebidos",
  "26.c": "Procedimentos Investigatórios Criminais instaurados",
  "26.d": "Processos criminais recebidos",
  "26.e": "Processos cíveis recebidos",
  "26.f": "Notícias de Fato (NF) autuadas",
  "26.g": "Inquéritos Civis (IC) instaurados",
  "26.h": "Procedimentos Preparatórios (PP) instaurados",
  "26.i": "Procedimentos Administrativos (PA) instaurados",
  "26.j": "Recomendações",
  "26.k": "Termos de Ajustamento de Conduta (TAC)",
  "26.l": "Acordos de Não Persecução Cível (ANPC)",
  "26.m": "Acordos de Não Persecução Penal (ANPP)",
  "26.n": "Reuniões",
  "26.o": "Audiências públicas",
  "26.p": "Audiências judiciais",
  "26.r": "Audiências extrajudiciais",
  "26.s": "Ações Civis Públicas",
  "26.t": "Ações de Improbidade",
  "26.q": "Visitas em instituições de longa permanência e serviços de proteção a idosos",
  "26.u": "Visitas em instituições de medidas socioeducativas em meio aberto",
  "26.v": "Visitas em instituições de medidas socioeducativas de internação e semiliberdade",
  "26.w": "Visitas em estabelecimentos de acolhimento institucional de crianças e adolescentes",
  "26.x": "Visitas em estabelecimentos prisionais",
  "26.y": "Visitas em delegacias estaduais, unidades de medicina legal e unidades de perícia criminal",
  "26.z": "Visitas em estabelecimentos militares",
  "26.aa": "Outras visitas/inspeções"
};

function calcularTotais26(dados) {
  const get = (id) => Number(extrairTexto(dados[id]) || 0);

  return {
    "26.a": get("28.a") + get("32.a") + get("33.a") + get("35.a") + get("36.a") + get("37.a"),
    "26.b": get("28.b") + get("32.b") + get("33.b") + get("35.b") + get("36.b") + get("37.b"),
    "26.c": get("28.d") + get("32.c") + get("33.c") + get("35.c") + get("36.c") + get("37.c"),
    "26.d": get("28.e") + get("32.d") + get("33.d") + get("35.d") + get("36.d") + get("37.d"),
    "26.e": get("27.a") + get("29.a") + get("30.e") + get("31.a") + get("32.e") + get("33.e") + get("34.e") + get("35.e") + get("36.e") + get("37.e"),
    "26.f": get("27.b") + get("28.c") + get("29.b") + get("30.f") + get("31.b") + get("32.f") + get("33.f") + get("34.f") + get("35.f") + get("36.f") + get("37.f"),
    "26.g": get("27.c") + get("29.c") + get("30.g") + get("31.c") + get("33.g") + get("34.g") + get("35.g") + get("36.g") + get("37.g"),
    "26.h": get("27.d") + get("29.d") + get("30.h") + get("31.d") + get("32.h") + get("33.h") + get("34.h") + get("35.h") + get("36.h") + get("37.h"),
    "26.i": get("27.e") + get("29.e") + get("30.i") + get("31.e") + get("32.i") + get("33.i") + get("34.i") + get("35.i") + get("36.i") + get("37.i"),
    "26.j": get("27.f") + get("29.f") + get("30.j") + get("31.f") + get("32.j") + get("33.j") + get("34.j") + get("35.j") + get("36.j") + get("37.j"),
    "26.k": get("27.g") + get("29.g") + get("30.k") + get("31.g") + get("32.k") + get("33.k") + get("34.k") + get("35.k") + get("36.k") + get("37.k"),
    "26.l": get("27.h") + get("29.h") + get("30.l") + get("31.h") + get("34.l") + get("35.l") + get("36.l") + get("37.l"),
    "26.m": get("28.f") + get("33.m"),
    "26.n": get("27.i") + get("29.i") + get("30.n") + get("32.m") + get("33.n") + get("34.n") + get("35.m") + get("36.m") + get("37.m"),
    "26.o": get("27.j") + get("29.j") + get("30.o") + get("32.n") + get("33.o") + get("34.o") + get("35.n") + get("36.n") + get("37.n"),
    "26.p": get("27.k") + get("28.g") + get("29.k") + get("30.p") + get("31.i") + get("32.o") + get("33.p") + get("34.p") + get("35.o") + get("36.o") + get("37.o"),
    "26.r": get("27.l") + get("28.h") + get("29.l") + get("30.q") + get("31.j") + get("32.p") + get("33.q") + get("34.q") + get("35.r") + get("36.p") + get("37.p"),
    "26.s": get("27.m") + get("28.i") + get("29.m") + get("30.r") + get("32.q") + get("33.r") + get("34.r") + get("35.s") + get("36.q") + get("37.q"),
    "26.t": get("27.n") + get("28.j") + get("29.n") + get("30.s") + get("32.r") + get("33.s") + get("34.s") + get("35.t") + get("36.r") + get("37.r"),
    "26.q": get("34.t"),
    "26.u": get("27.p"),
    "26.v": get("27.q"),
    "26.w": get("27.o"),
    "26.x": get("35.u"),
    "26.y": get("35.v"),
    "26.z": get("35.w"),
    "26.aa": get("27.r") + get("28.k") + get("29.o") + get("30.t") + get("31.k") + get("32.s") + get("33.t") + get("34.u") + get("35.x") + get("36.s") + get("37.s")
  };
}

function renderizarQuantitativosOrgao(dados) {
  const tbody = document.getElementById('tabela-quantitativos-orgao-body');
  if (!tbody) return;

  const totais = calcularTotais26(dados);
  tbody.innerHTML = '';

  Object.keys(ROTULOS_26).forEach(id => {
    const tr = document.createElement('tr');
    const tdLabel = document.createElement('td');
    tdLabel.textContent = ROTULOS_26[id];
    const tdValor = document.createElement('td');
    // usa valor salvo (se existir) ou recalcula pela somatória
    tdValor.textContent = extrairTexto(dados[id]) || totais[id] || 0;
    tr.appendChild(tdLabel);
    tr.appendChild(tdValor);
    tbody.appendChild(tr);
  });
}

/* ─── Utilitários ─────────────────────────────────────────────── */
function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    const texto = value == null ? '' : String(value);

    if (el.matches('input, textarea, select')) {
        el.value = texto;
        return;
    }

    el.textContent = texto;
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value ?? '';
}

function showLoading(msg) {
    const overlay = document.getElementById('loadingOverlay');
    const loadingMsg = document.getElementById('loadingMsg');
    if (loadingMsg) loadingMsg.textContent = msg || 'Carregando relatório…';
    if (overlay) overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

function showError(msg) {
    const box = document.getElementById('errorBox');
    if (!box) return;
    box.style.display = 'block';
    box.textContent = msg;
}

function voltarAoAdmin() {
    window.location.href = 'admin.html';
}

function normalizarDataISO(valor) {
    if (!valor) return '';
    const s = String(valor).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function extrairTexto(valor) {
    if (valor === null || valor === undefined) return '';
    if (Array.isArray(valor)) return valor.join('\n');
    if (typeof valor === 'object') return JSON.stringify(valor, null, 2);
    return String(valor);
}

function lerDadosRegistro(registro) {
    let dados = registro?.dados || {};
    if (typeof dados === 'string') {
        try { dados = JSON.parse(dados); } catch (e) { dados = {}; }
    }
    return dados && typeof dados === 'object' ? dados : {};
}

/* ─── Tabela de processos ──────────────────────────────────────── */
function adicionarLinha() {
    const tbody = document.querySelector('#tabela-processos tbody');

    const trDados = document.createElement('tr');
    trDados.className = 'linha-dados';
    trDados.innerHTML = `
        <td><input class="table-input" placeholder="Ex.: " /></td>
        <td><input class="table-input" placeholder="Número" /></td>
        <td><input class="table-input" type="date" /></td>
        <td><input class="table-input" placeholder="dias" /></td>
        <td><input class="table-input" type="date" /></td>
        <td><button type="button" class="btn btn-danger" onclick="removerLinha(this)">X</button></td>
    `;

    const trConclusao = document.createElement('tr');
    trConclusao.className = 'linha-conclusao';
    trConclusao.innerHTML = `
        <td colspan="6">
            <label class="conclusao-label">Conclusão</label>
            <textarea class="table-textarea conclusao-textarea" placeholder="Digite a conclusão..."></textarea>
        </td>
    `;

    tbody.appendChild(trDados);
    tbody.appendChild(trConclusao);
}

function removerLinha(btn) {
    const tbody = document.querySelector('#tabela-processos tbody');
    const trDados = btn.closest('tr');
    if (!trDados) return;

    const trConclusao = trDados.nextElementSibling?.classList.contains('linha-conclusao')
        ? trDados.nextElementSibling : null;

    // se for o único par, apenas limpa os campos
    if (tbody.querySelectorAll('tr.linha-dados').length <= 1) {
        trDados.querySelectorAll('input, textarea').forEach(el => el.value = '');
        if (trConclusao) trConclusao.querySelector('textarea').value = '';
        return;
    }

    if (trConclusao) trConclusao.remove();
    trDados.remove();
}
function adicionarLinhaExtra() {
    const tbody = document.querySelector('#tabela-procedimentos-extra tbody');
    const selSimNao = `<select class="table-input"><option value=""></option><option>Sim</option><option>Não</option></select>`;
    const bloco = `
        <tr class="secao-titulo bloco-inicio">
            <td colspan="4">DADOS GERAIS DO PROCESSO</td>
            <td class="col-acao"><button type="button" class="btn btn-danger" onclick="removerLinhaExtra(this)">X</button></td>
        </tr>
        <tr>
            <td><label class="conclusao-label">Classe:</label><input class="table-input" /></td>
            <td><label class="conclusao-label">Processo Nº:</label><input class="table-input" /></td>
            <td colspan="3"><label class="conclusao-label">Objeto:</label><input class="table-input" /></td>
        </tr>
        <tr class="secao-titulo"><td colspan="5">AVALIAÇÃO FORMAL</td></tr>
        <tr>
            <td><label class="conclusao-label">Instauração:</label><input class="table-input" type="date" /></td>
            <td><label class="conclusao-label">Prorrogação:</label><input class="table-input" type="date" /></td>
            <td><label class="conclusao-label">Mais de 90 dias sem movimentação?</label>${selSimNao}</td>
            <td><label class="conclusao-label">Mais de 3 anos de instauração?</label>${selSimNao}</td>
            <td><label class="conclusao-label">Taxonomia correta?</label>${selSimNao}</td>
        </tr>
        <tr class="secao-titulo"><td colspan="5">AVALIAÇÃO MATERIAL</td></tr>
        <tr><td colspan="5"><textarea class="table-textarea conclusao-textarea"></textarea></td></tr>
        <tr class="secao-titulo"><td colspan="5">CONCLUSÕES/PROVIMENTOS</td></tr>
        <tr><td colspan="5"><textarea class="table-textarea conclusao-textarea"></textarea></td></tr>
    `;
    tbody.insertAdjacentHTML('beforeend', bloco);
}

function removerLinhaExtra(btn) {
    const tbody = document.querySelector('#tabela-procedimentos-extra tbody');
    const inicio = btn.closest('tr');
    if (!inicio) return;

    // coleta as 8 linhas do bloco (do bloco-inicio até antes do próximo bloco-inicio)
    const linhas = [inicio];
    let prox = inicio.nextElementSibling;
    while (prox && !prox.classList.contains('bloco-inicio')) {
        linhas.push(prox);
        prox = prox.nextElementSibling;
    }

    // se for o único bloco, apenas limpa
    if (tbody.querySelectorAll('tr.bloco-inicio').length <= 1) {
        linhas.forEach(tr => tr.querySelectorAll('input, textarea, select').forEach(el => el.value = ''));
        return;
    }

    linhas.forEach(tr => tr.remove());
}

/* ─── Auto-expand textareas ────────────────────────────────────── */
function autoExpand(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

document.addEventListener('input', function (e) {
    if (e.target.matches('textarea.auto-expand, textarea.table-textarea')) {
        autoExpand(e.target);
    }
});

/* ─── Preencher todos os spans de NOME e LOTAÇÃO ──────────────── */
function preencherNomeLotacao(nome, lotacao) {
    // preenche TODOS os spans de nome e lotação no documento
    document.querySelectorAll('[id^="auto_resposta_nome"], [id^="auto_nome_"]').forEach(el => {
        el.textContent = nome || '';
    });
}

/* ─── Preencher relatório ──────────────────────────────────────── */
function preencherRelatorio(registro) {
    const dados = lerDadosRegistro(registro);
renderizarQuantitativosOrgao(dados);
    // Título / identificação
    const nomeRegistro = registro?.nome || registro?.user_id || 'Registro';
    const criadoEm = registro?.criado_em ? new Date(registro.criado_em).toLocaleString('pt-BR') : '';
    document.title = `Relatório de Correição — ${nomeRegistro}`;
    setText('topbarSubtitle', `${nomeRegistro}${criadoEm ? ` · ${criadoEm}` : ''}`);

    // Campos automáticos
    setText('auto_motivacao', extrairTexto(dados.motivacao) || 'Dar cumprimento ao calendário anual de inspeções e correições, elaborado pela Corregedoria-Geral do Ministério Público para o ano de 20232, atendendo ao que determina a Resolução CNMP nº 149/2016.');
    setText('auto_excesso_prazo', extrairTexto(dados.excesso_prazo) || '(Neste campo devem ser relacionados os procedimentos e processos em atraso. Caso seja extraído algum relatório do sistema, deve ser ele indicado com precisão e juntado como anexo a este relatório)');

    setText('DM_1.1', extrairTexto(dados['1.1'])); // unidade correicionada
    setText('DM_1.4', extrairTexto(dados['1.4'])); // designação
    setText('DM_3', extrairTexto(dados['3'])); // órgãos jurisdicionais

    // Nome titular / substituto:
    // - se vier preenchido, o campo fica travado
    // - se vier vazio, o campo fica livre para digitação manual
    const resposta1 = extrairTexto(dados['1.4']).trim().toLowerCase();
    const nomeTitular = extrairTexto(dados.nome_titular ?? registro?.nome ?? '').trim();
    const nomeSubstituto = extrairTexto(dados.nome_substituto ?? '').trim();

    setText('DM_1.4', extrairTexto(dados['1.4']));

    const campoTitular = document.getElementById('DM_nome');
    const campoSubstituto = document.getElementById('DM_nome_substituto');

if (campoTitular) {
        const titularMarcado = resposta1 === 'titular';
        campoTitular.value = titularMarcado ? nomeTitular : '';
        campoTitular.readOnly = titularMarcado;
        campoTitular.disabled = false;
    }

    if (campoSubstituto) {
        const valorSubstituto = nomeSubstituto || (resposta1 === 'ampliado' ? nomeTitular : '');
        const substitutoPreenchido = Boolean(valorSubstituto);
        campoSubstituto.value = substitutoPreenchido ? valorSubstituto : '';
        campoSubstituto.readOnly = substitutoPreenchido;
        campoSubstituto.disabled = false;
    }

setText('DM_5', extrairTexto(dados['5']));
setText('DM_1.3', extrairTexto(dados['1.3']));


       const resposta6 = String(extrairTexto(dados['6'])).trim().toUpperCase();
setText(
  'DM_6',
  resposta6 === 'SIM'
    ? ' O membro reside na comarca'
    : resposta6 === 'NÃO'
      ? 'O membro não reside na comarca'
      : extrairTexto(dados['6'])
);
setText(
  'DM_6.a',
  resposta6 === 'NÃO'
    ? extrairTexto(dados['6.a'])
    : ''
);



setText('DM_7', extrairTexto(dados['7']));


        const resposta8 = String(extrairTexto(dados['8'])).trim().toUpperCase();
setText(
  'DM_8',
  resposta8 === 'SIM'
    ? 'O membro tem autorização para realização de trabalho remoto.'
    : resposta8 === 'NÃO'
      ? 'O membro não tem autorização para realizar trabalho remoto.'
      : extrairTexto(dados['8'])
);
setText(
  'DM_8.a',
  resposta8 === 'SIM'
    ? extrairTexto(dados['8.a'])
    : ''
);


        const resposta9 = String(extrairTexto(dados['9'])).trim().toUpperCase();
setText(
  'DM_9',
  resposta9 === 'SIM'
    ? 'O membro informou utilizar o computador da promotoria nas audiências judiciais'
    : resposta9 === 'NÃO'
      ? 'O membro informou não utilizar o computador da promotoria nas audiências judiciais em virtude de: '
      : extrairTexto(dados['9'])
);
setText(
  'DM_9.a',
  resposta9 === 'NÃO'
    ? extrairTexto(dados['9.a'])
    : ''
);

 const resposta9_b = String(extrairTexto(dados['9.b'])).trim().toUpperCase();
setText(
  'DM_9.b',
  resposta9_b === 'SIM'
    ? 'O membro informou participar das audiências extrajudiciais de forma presencial'
    : resposta9_b === 'NÃO'
      ? 'O membro informou não participar das audiências extrajudiciais de forma presencial em virtude de: '
      : extrairTexto(dados['9.b'])
);
setText(
  'DM_9.c',
  resposta9_b === 'NÃO'
    ? extrairTexto(dados['9.c'])
    : ''
);


 const resposta10 = String(extrairTexto(dados['10'])).trim().toUpperCase();
setText(
  'DM_10',
  resposta10 === 'SIM'
    ? 'O membro informou ter participado do(s) seguinte(s) curso(s) de aperfeiçoamento nos últimos 12 meses.'
    : resposta10 === 'NÃO'
      ? 'O membro informou não ter participado de curso de aperfeiçoamento nos últimos 12 meses. '
      : extrairTexto(dados['10'])
);
setText(
  'DM_10.a',
  resposta10 === 'SIM'
    ? extrairTexto(dados['10.a'])
    : ''
);


const resposta10_B = String(extrairTexto(dados['10.b'])).trim().toUpperCase();
setText(
  'DM_10.b',
  resposta10_B === 'SIM'
    ? 'O membro afirmou ter averbado os cursos dos quais participou.'
    : resposta10_B === 'NÃO'
      ? 'O membro afirmou não ter averbado os cursos dos quais participou.'
      : extrairTexto(dados['10.b'])
);

const resposta11 = String(extrairTexto(dados['11'])).trim().toUpperCase();

setText(
  'DM_11',
  resposta11 === 'SIM'
    ? 'O membro informou que recebeu prêmio, homenagem, anotação ou elogio no prontuário em decorrência de sua atuação nos últimos 12 meses.'
    : 'O membro informou que não recebeu prêmio, homenagem, anotação ou elogio no prontuário em decorrência de sua atuação nos últimos 12 meses.'
);

 const resposta12 = String(extrairTexto(dados['12'])).trim().toUpperCase();
setText(
  'DM_12',
  resposta12 === 'SIM'
    ? 'membro afirmou exercer magistério na seguinte modalidade.'
    : resposta12 === 'NÃO'
      ? 'O membro afirmou não exercer magistério.'
      : extrairTexto(dados['12'])
);
setText(
  'DM_12.a',
  resposta12 === 'SIM'
    ? extrairTexto(dados['12.a'])
    : ''
);


 const resposta13 = String(extrairTexto(dados['13'])).trim().toUpperCase();
setText(
  'DM_13',
  resposta13 === 'SIM'
    ? 'membro afirmou exercer magistério na seguinte modalidade.'
    : resposta13 === 'NÃO'
      ? 'O membro afirmou não realizar atividade de mentoria/coaching, similares e congêneres.'
      : extrairTexto(dados['13'])
);
setText(
  'DM_13.a',
  resposta13 === 'SIM'
    ? extrairTexto(dados['13.a'])
    : ''
);
    
     const resposta14 = String(extrairTexto(dados['14'])).trim().toUpperCase();
setText(
  'DM_14',
  resposta14 === 'SIM'
    ? 'O membro afirmou participar de sociedade comercial ou organização não governamental'
    : resposta14 === 'NÃO'
      ? 'O membro afirmou não participar de sociedade comercial ou organização não governamental'
      : extrairTexto(dados['14'])
);


 const resposta15 = String(extrairTexto(dados['15'])).trim().toUpperCase();
setText(
  'DM_15',
  resposta15 === 'SIM'
    ? 'O membro afirmou participar comissão ou grupo de trabalho na Instituição ou em órgão externo.'
    : resposta15 === 'NÃO'
      ? 'O membro afirmou não participar comissão ou grupo de trabalho na Instituição ou em órgão externo.'
      : extrairTexto(dados['15'])
);


const resposta16 = String(extrairTexto(dados['16'])).trim().toUpperCase();
setText(
  'DM_16',
  resposta16 === 'SIM'
    ? 'O membro afirmou estar respondendo cumulativamente pelo(s) seguinte(s) órgão(s):”'
    : resposta16 === 'NÃO'
      ? 'O membro afirmou não estar respondendo cumulativamente por outro órgão.'
      : extrairTexto(dados['16'])
);
setText(
  'DM_16.b',
  resposta16 === 'SIM'
    ? extrairTexto(dados['16.b'])
    : ''
);
  
const resposta16_a = String(extrairTexto(dados['16.a'])).trim().toUpperCase();
setText(
  'DM_16.a',
  resposta16_a === 'VOLUNTÁRIA'
    ? 'O membro afirmou afirmou que o acúmulo se deu de forma voluntária”'
    : resposta16_a === 'INVOLUNTÁRIA'
      ? 'O membro afirmou que o acúmulo se deu de forma involuntária.'
      : extrairTexto(dados['16.a'])
);

const resposta17 = String(extrairTexto(dados['17'])).trim().toUpperCase();

setText(
  'DM_17',
  resposta17 === 'NÃO'
    ? 'O(a) membro(a) informou não ter se afastado no período.'
    : resposta17 === 'SIM'
      ? `O(a) membro(a) informou ter os seguintes afastamentos no período: ${extrairTexto(dados['17.a'])}`
      : extrairTexto(dados['17'])
);


const resposta18 = String(extrairTexto(dados['18'])).trim().toUpperCase();

setText(
  'DM_18',
  resposta18 === 'NÃO'
    ? 'O membro afirmou não realizar atendimento ao público.'
    : resposta18 === 'SIM'
      ? `O membro afirmou realizar atendimento ao público na modalidade ${String(extrairTexto(dados['18.a'])).trim().toUpperCase() === 'AMBOS'
          ? 'Presencial e Virtual'
          : extrairTexto(dados['18.a'])}, ${extrairTexto(dados['18.b'])}\nO membro afirmou registrar o atendimento ao público da seguinte forma: ${extrairTexto(dados['18.c'])}${String(extrairTexto(dados['18.c'])).trim().toUpperCase() === 'OUTRAS FORMAS'
          ? `, ${extrairTexto(dados['18.d'])}`
          : ''
        }`
      : extrairTexto(dados['18'])
);

const resposta18_e = String(extrairTexto(dados['18.e'])).trim().toUpperCase();

setText(
  'DM_18.e',
  resposta18_e === 'NÃO'
    ? 'O membro afirmou que a equipe do órgão não realiza atendimento ao público.'
    : resposta18_e === 'SIM'
      ? `O membro afirmou que a equipe do órgão realiza atendimento ao público na modalidade ${String(extrairTexto(dados['18.f'])).trim().toUpperCase() === 'AMBOS'
          ? 'Presencial e Virtual'
          : extrairTexto(dados['18.f'])}, ${extrairTexto(dados['18.g'])}\nO membro afirmou que registra o atendimento ao público realizado pela equipe da seguinte forma: ${extrairTexto(dados['18.h'])}${String(extrairTexto(dados['18.h'])).trim().toUpperCase() === 'OUTRAS FORMAS'
          ? `, ${extrairTexto(dados['18.i'])}`
          : ''
        }`
      : extrairTexto(dados['18.e'])
);

const resposta19 = extrairTexto(dados['19']);
setText(
  'DM_19',
  resposta19 ? `Quantidade de membros lotados no órgão correicionado: ${resposta19}.` : ''
);

const resposta20 = extrairTexto(dados['20']);
setText(
  'DM_20',
  resposta20 ? `Quantidade de servidores lotados no órgão correicionado: ${resposta20}.` : ''
);

const resposta21 = extrairTexto(dados['21']);
setText(
  'DM_21',
  resposta21 ? `Quantidade de terceirizados lotados no órgão correicionado: ${resposta21}.` : ''
);

const resposta22 = extrairTexto(dados['22']);
setText(
  'DM_22',
  resposta22 ? `Quantidade de estagiários lotados no órgão correicionado: ${resposta22}.` : ''
);

const resposta23 = String(extrairTexto(dados['23'])).trim().toUpperCase();
setText(
  'DM_23',
  resposta23 === 'SIM'
    ? 'Os recursos humanos são adequados de acordo com o padrão de força de trabalho disponibilizada.'
    : resposta23 === 'NÃO'
      ? `Os recursos humanos não são adequados de acordo com o padrão de força de trabalho disponibilizada.${extrairTexto(dados['23.a']) ? ` Especificação: ${extrairTexto(dados['23.a'])}.` : ''}`
      : extrairTexto(dados['23'])
);

setText(
  'DM_23.a',
  resposta23 === 'NÃO'
    ? extrairTexto(dados['23.a'])
    : ''
);

const resposta24 = String(extrairTexto(dados['24'])).trim().toUpperCase();

setText(
  'DM_24',
  resposta24 === 'SIM'
    ? 'O membro afirmou que as instalações físicas são adequadas.'
    : resposta24 === 'NÃO'
      ? `O membro afirmou que as instalações físicas não são adequadas.${extrairTexto(dados['24.a']) ? ` ${extrairTexto(dados['24.a'])}` : ''}`
      : extrairTexto(dados['24'])
);

setText(
  'DM_24.a',
  resposta24 === 'NÃO'
    ? extrairTexto(dados['24.a'])
    : ''
);
const resposta24b = String(extrairTexto(dados['24.b'])).trim().toUpperCase();

setText(
  'DM_24.b',
  resposta24b === 'PRÓPRIO'
    ? 'O(a) membro(a) informou que o órgão funciona em prédio próprio.'
    : resposta24b === 'ALUGADO'
      ? 'O(a) membro(a) informou que o órgão funciona em prédio alugado.'
      : resposta24b === 'FÓRUM DA COMARCA'
        ? 'O(a) membro(a) informou que o órgão funciona em prédio do Fórum da Comarca.'
        : resposta24b === 'OUTROS'
          ? `O(a) membro(a) informou que o órgão funciona em outro prédio, da seguinte forma: ${extrairTexto(dados['24.c'])}`
          : extrairTexto(dados['24.b'])
);


const resposta25 = String(extrairTexto(dados['25'])).trim().toUpperCase();

setText(
  'DM_25',
  resposta25 === 'SIM'
    ? 'O membro afirmou que utiliza a rede institucional.'
    : resposta25 === 'NÃO'
      ? `O membro afirmou que não utiliza a rede institucional.${extrairTexto(dados['25.a']) ? ` ${extrairTexto(dados['25.a'])}` : ''}`
      : extrairTexto(dados['25'])
);

setText(
  'DM_25.a',
  resposta25 === 'NÃO'
    ? extrairTexto(dados['25.a'])
    : ''
);

const resposta25_b = String(extrairTexto(dados['25.b'])).trim().toUpperCase();

setText(
  'DM_25.b',
  resposta25_b === 'SIM'
    ? 'O membro afirmou que utiliza o computador institucional.'
    : resposta25_b === 'NÃO'
      ? `O membro afirmou que não utiliza o computador institucional.${extrairTexto(dados['25.c']) ? ` ${extrairTexto(dados['25.c'])}` : ''}`
      : extrairTexto(dados['25.b'])
);

setText(
  'DM_25.c',
  resposta25_b === 'NÃO'
    ? extrairTexto(dados['25.c'])
    : ''
);


const resposta42 = extrairTexto(dados['42']);

setText(
  'DM_42',
  resposta42
    ? `O membro afirmou que adota as seguintes medidas para garantir a celeridade dos feitos (judiciais e extrajudiciais) sob sua responsabilidade:\n ${resposta42}.`
    : ''
);

const resposta38 = String(extrairTexto(dados['38'])).trim().toUpperCase();

setText(
  'DM_38',
  resposta38 === 'SIM'
    ? 'O(a) membro(a) afirmou que executa projetos pautados por objetivos estratégicos.'
    : resposta38 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não executa projetos pautados por objetivos estratégicos.'
      : extrairTexto(dados['38'])
);

const resposta38_a = String(extrairTexto(dados['38.a'])).trim().toUpperCase();

setText(
  'DM_38.a',
  resposta38_a === 'SIM'
    ? 'O(a) membro(a) afirmou que possui projetos de iniciativa própria institucionalizados.'
    : resposta38_a === 'NÃO'
      ? 'O(a) membro(a) afirmou que não possui projetos de iniciativa própria institucionalizados.'
      : extrairTexto(dados['38.a'])
);

setText(
  'DM_38.b',
  resposta38_a === 'SIM'
    ? extrairTexto(dados['38.b'])
    : ''
);

setText(
  'DM_38.c',
  resposta38_a === 'SIM'
    ? extrairTexto(dados['38.c'])
    : ''
);

const resposta38_d = String(extrairTexto(dados['38.d'])).trim().toUpperCase();

setText(
  'DM_38.d',
  resposta38_d === 'SIM'
    ? 'O(a) membro(a) afirmou que aderiu a algum projeto institucional.'
    : resposta38_d === 'NÃO'
      ? 'O(a) membro(a) afirmou que não aderiu a algum projeto institucional.'
      : extrairTexto(dados['38.d'])
);

setText(
  'DM_38.e',
  resposta38_d === 'SIM'
    ? extrairTexto(dados['38.e'])
    : ''
);

setText(
  'DM_38.f',
  resposta38_d === 'SIM'
    ? extrairTexto(dados['38.f'])
    : ''
);

const resposta39 = String(extrairTexto(dados['39'])).trim().toUpperCase();

setText(
  'DM_39',
  resposta39 === 'SIM'
    ? `O(a) membro(a) afirmou que utiliza indicadores sociais da sua área de atuação para tomada de decisão.${extrairTexto(dados['39.a']) ? ` ${extrairTexto(dados['39.a'])}` : ''}`
    : resposta39 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não utiliza indicadores sociais da sua área de atuação para tomada de decisão.'
      : extrairTexto(dados['39'])
);

setText(
  'DM_39.a',
  resposta39 === 'SIM'
    ? extrairTexto(dados['39.a'])
    : ''
);

const resposta40 = String(extrairTexto(dados['40'])).trim().toUpperCase();

setText(
  'DM_40',
  resposta40 === 'SIM'
    ? `O(a) membro(a) afirmou que utiliza, em suas atividades, mecanismos de resolução consensual bem como outros métodos e mecanismos eficazes na resolução de conflitos, controvérsias e problemas.\n${extrairTexto(dados['39.a']) ? ` ${extrairTexto(dados['40.a'])}` : ''}`
    : resposta40 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não utiliza, em suas atividades, mecanismos de resolução consensual bem como outros métodos e mecanismos eficazes na resolução de conflitos, controvérsias e problemas.'
      : extrairTexto(dados['40'])
);

const resposta41 = String(extrairTexto(dados['41'])).trim().toUpperCase();

setText(
  'DM_41',
  resposta41 === 'SIM'
    ? 'O(a) membro(a) afirmou que possui Plano de Atuação.'
    : resposta41 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não possui Plano de Atuação.'
      : extrairTexto(dados['41'])
);

const resposta41_a = String(extrairTexto(dados['41.a'])).trim().toUpperCase();

setText(
  'DM_41.a',
  resposta41 === 'SIM'
    ? (
        resposta41_a === 'SIM'
          ? 'O(a) membro(a) afirmou que foi realizado diagnóstico prévio das carências e necessidades sociais para a construção do Plano de Atuação.'
          : resposta41_a === 'NÃO'
            ? 'O(a) membro(a) afirmou que não foi realizado diagnóstico prévio das carências e necessidades sociais para a construção do Plano de Atuação.'
            : extrairTexto(dados['41.a'])
      )
    : ''
);
const resposta422 = extrairTexto(dados['42']);

setText(
  'DM_422',
  resposta42
    ? `${resposta422}.`
    : ''
);

const resposta43 = String(extrairTexto(dados['43'])).trim().toUpperCase();

setText(
  'DM_43',
  resposta43 === 'SIM'
    ? 'O membro afirmou que prioriza a tutela coletiva, propondo ações individuais apenas quando absolutamente necessário.'
    : resposta43 === 'NÃO'
      ? 'O membro afirmou que não prioriza a tutela coletiva, propondo ações individuais apenas quando absolutamente necessário.'
      : extrairTexto(dados['43'])
);

setText(
  'DM_43.a',
  resposta43 === 'SIM'
    ? extrairTexto(dados['43.a'])
    : ''
);

const resposta44 = String(extrairTexto(dados['44'])).trim().toUpperCase();

setText(
  'DM_44',
  resposta44 === 'SIM'
    ? 'O membro afirmou que consegue identificar resultados objetivos decorrentes de sua atuação institucional.'
    : resposta44 === 'NÃO'
      ? 'O membro afirmou que não consegue identificar resultados objetivos decorrentes de sua atuação institucional.'
      : extrairTexto(dados['44'])
);

setText(
  'DM_44.a',
  resposta44 === 'SIM'
    ? extrairTexto(dados['44.a'])
    : ''
);


const resposta45 = String(extrairTexto(dados['45'])).trim().toUpperCase();

setText(
  'DM_45',
  resposta45 === 'SIM'
    ? 'O membro afirmou que, no exercício de sua atividade, há atuação com perspectiva de gênero.'
    : resposta45 === 'NÃO'
      ? 'O membro afirmou que, no exercício de sua atividade, não há atuação com perspectiva de gênero.'
      : extrairTexto(dados['45'])
);

setText(
  'DM_45.a',
  resposta45 === 'SIM'
    ? extrairTexto(dados['45.a'])
    : ''
);


const resposta47 = String(extrairTexto(dados['47'])).trim().toUpperCase();

setText(
  'DM_47',
  resposta47 === 'SIM'
    ? `O(a) membro(a) afirmou que realizou audiência pública como proponente nos últimos 12 meses. ${extrairTexto(dados['47.a']) ? ` ${extrairTexto(dados['47.a'])}` : ''}`
    : resposta47 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não realizou audiência pública como proponente nos últimos 12 meses.'
      : extrairTexto(dados['47'])
);


const resposta47_b = String(extrairTexto(dados['47.b'])).trim().toUpperCase();

setText(
  'DM_47.b',
  resposta47_b === 'SIM'
    ? `O(a) membro(a) afirmou que participou de audiência pública como convidado nos últimos 12 meses.${extrairTexto(dados['47.c'])}`
    : resposta47_b === 'NÃO'
      ? 'O(a) membro(a) afirmou que não participou de audiência pública como convidado nos últimos 12 meses.'
      : extrairTexto(dados['47.b'])
);


const resposta48 = String(extrairTexto(dados['48'])).trim().toUpperCase();

setText(
  'DM_48',
  resposta48 === 'SIM'
    ? `O(a) membro(a) afirmou que realizou palestras vinculadas às políticas públicas de sua respectiva área de atuação ministerial. ${extrairTexto(dados['48.a'])}`
    : resposta48 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não realizou palestras vinculadas às políticas públicas de sua respectiva área de atuação ministerial.'
      : extrairTexto(dados['48'])
);



const resposta48_b = String(extrairTexto(dados['48.b'])).trim().toUpperCase();

setText(
  'DM_48.b',
  resposta48_b === 'SIM'
    ?`O(a) membro(a) afirmou que realizou ou participou de reuniões, com agentes externos(as), vinculadas às políticas públicas das respectivas áreas de atuação ministerial.${extrairTexto(dados['48.c'])}`
    : resposta48_b === 'NÃO'
      ? 'O(a) membro(a) afirmou que não realizou ou participou de reuniões, com agentes externos(as), vinculadas às políticas públicas das respectivas áreas de atuação ministerial.'
      : extrairTexto(dados['48.b'])
);



const resposta49 = String(extrairTexto(dados['49'])).trim().toUpperCase();

setText(
  'DM_49',
  resposta49 === 'SIM'
    ? `O(a) membro(a) afirmou que realizou atividades não procedimentais de relevância social, tais como palestras, participação em reuniões e outras atividades que resultem em medidas de inserção social, especialmente por meio de projetos sociais.${extrairTexto(dados['49.a'])}`
    : resposta49 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não realizou atividades não procedimentais de relevância social, tais como palestras, participação em reuniões e outras atividades que resultem em medidas de inserção social, especialmente por meio de projetos sociais.'
      : extrairTexto(dados['49'])
);



const resposta50 = String(extrairTexto(dados['50'])).trim().toUpperCase();

setText(
  'DM_50',
  resposta50 === 'SIM'
    ? `O(a) membro(a) afirmou que fez utilização eficiente e/ou viabilizou a priorização de mecanismos de resolução consensual e extrajurisdicional de conflitos, controvérsias e problemas. ${extrairTexto(dados['50.a'])}`
    : resposta50 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não fez utilização eficiente e/ou viabilizou a priorização de mecanismos de resolução consensual e extrajurisdicional de conflitos, controvérsias e problemas.'
      : extrairTexto(dados['50'])
);



const resposta51 = String(extrairTexto(dados['51'])).trim().toUpperCase();

setText(
  'DM_51',
  resposta51 === 'SIM'
    ? `O(a) membro(a) afirmou que, nas ACPs propostas nos últimos 12 meses, foi priorizada a utilização eficiente e/ou viabilidade de priorização de mecanismos de resolução consensual e extrajurisdicional de conflitos, controvérsias e problemas.${extrairTexto(dados['51.a'])}`
    : resposta51 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, nas ACPs propostas nos últimos 12 meses, não foi priorizada a utilização eficiente e/ou viabilidade de priorização de mecanismos de resolução consensual e extrajurisdicional de conflitos, controvérsias e problemas.'
      : extrairTexto(dados['51'])
);

const resposta52 = String(extrairTexto(dados['52'])).trim().toUpperCase();

setText(
  'DM_52',
  resposta52 === 'SIM'
    ? `O(a) membro(a) afirmou que foi feita utilização eficiente e objetiva de instrumentos e métodos de investigação na determinação de diligências, bem como dos recursos extrajudiciais e judiciais visando à prevenção e à tempestiva correção de ilícitos. ${extrairTexto(dados['52.a'])}`
    : resposta52 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foi feita utilização eficiente e objetiva de instrumentos e métodos de investigação na determinação de diligências, bem como dos recursos extrajudiciais e judiciais visando à prevenção e à tempestiva correção de ilícitos.'
      : extrairTexto(dados['52'])
);
setText(
  'DM_53',
  extrairTexto(dados['53'])
);

const resposta54 = String(extrairTexto(dados['54'])).trim().toUpperCase();

setText(
  'DM_54',
  resposta54 === 'SIM'
    ? `O(a) membro(a) afirmou que realiza ou participa de reuniões periódicas com a rede para discussão de casos ou para implementação de políticas públicas na área da infância e juventude, com construção de fluxos e protocolos, atuando extrajudicialmente para garantir o pleno funcionamento da rede de proteção à criança e ao adolescente, conforme o artigo 4º da Recomendação nº 33/2016.${extrairTexto(dados['54.a']) ? ` ${extrairTexto(dados['54.a'])}` : ''}`
    : resposta54 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não realiza ou participa de reuniões periódicas com a rede para discussão de casos ou para implementação de políticas públicas na área da infância e juventude, com construção de fluxos e protocolos, atuando extrajudicialmente para garantir o pleno funcionamento da rede de proteção à criança e ao adolescente, conforme o artigo 4º da Recomendação nº 33/2016.'
      : extrairTexto(dados['54'])
);


const resposta55 = String(extrairTexto(dados['55'])).trim().toUpperCase();

setText(
  'DM_55',
  resposta55 === 'SIM'
    ? `O(a) membro(a) afirmou que há serviço de acolhimento institucional na comarca.${extrairTexto(dados['55.a']) ? ` ${extrairTexto(dados['55.a'])}` : ''}`
    : resposta55 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há serviço de acolhimento institucional na comarca.'
      : extrairTexto(dados['55'])
);

const resposta56 = String(extrairTexto(dados['56'])).trim().toUpperCase();

setText(
  'DM_56',
  resposta56 === 'SIM'
    ? 'O(a) membro(a) afirmou que há serviço de acolhimento familiar no(s) município(s) em que atua.'
    : resposta56 === 'NÃO'
      ? `O(a) membro(a) afirmou que não há serviço de acolhimento familiar no(s) município(s) em que atua.${extrairTexto(dados['56.a']) ? ` ${extrairTexto(dados['56.a'])}` : ''}${extrairTexto(dados['56.b']) ? ` Número do processo judicial ou extrajudicial: ${extrairTexto(dados['56.b'])}.` : ''}`
      : extrairTexto(dados['56'])
);

const resposta57 = String(extrairTexto(dados['57'])).trim().toUpperCase();

setText(
  'DM_57',
  resposta57 === 'SIM'
    ? `O(a) membro(a) afirmou que efetua, em caráter permanente, nos termos do artigo 13 da Resolução CNMP nº 293/2024, a verificação do Sistema Nacional de Adoção e Acolhimento (SNA), com login e senha próprios, garantindo que o sistema retrate com exatidão a situação das crianças e adolescentes acolhidos e observando a ordem de convocação dos habilitados à adoção.${extrairTexto(dados['57.a']) ? ` ${extrairTexto(dados['57.a'])}` : ''}`
    : resposta57 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não efetua, em caráter permanente, nos termos do artigo 13 da Resolução CNMP nº 293/2024, a verificação do Sistema Nacional de Adoção e Acolhimento (SNA), com login e senha próprios, garantindo que o sistema retrate com exatidão a situação das crianças e adolescentes acolhidos e observando a ordem de convocação dos habilitados à adoção.'
      : extrairTexto(dados['57'])
);

const resposta58 = String(extrairTexto(dados['58'])).trim().toUpperCase();

setText(
  'DM_58',
  resposta58 === 'NÃO'
    ? 'O membro informou que não adota as medidas cabíveis para garantir o direito à convivência familiar das crianças e adolescentes acolhidos, zelando prioritariamente pela reintegração familiar, quando cabível, ou pela colocação em família substituta.'
    : resposta58 === 'SIM'
      ? `O membro informou que adota as medidas cabíveis para garantir o direito à convivência familiar das crianças e adolescentes acolhidos, zelando prioritariamente pela reintegração familiar, quando cabível, ou pela colocação em família substituta. ${extrairTexto(dados['58.a'])}`
      : extrairTexto(dados['58'])
);
const resposta59 = String(extrairTexto(dados['59'])).trim().toUpperCase();

setText(
  'DM_59',
  resposta59 === 'SIM'
    ? `O(a) membro(a) afirmou que, havendo criança ou adolescente acolhido há mais de 18 (dezoito) meses, tem zelado para que o serviço de acolhimento adote as medidas necessárias à garantia da convivência familiar e comunitária, conforme o artigo 10 da Resolução CNMP nº 293/2024.${extrairTexto(dados['59.a']) ? ` ${extrairTexto(dados['59.a'])}` : ''}`
    : resposta59 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, havendo criança ou adolescente acolhido há mais de 18 (dezoito) meses, não tem zelado para que o serviço de acolhimento adote as medidas necessárias à garantia da convivência familiar e comunitária, conforme o artigo 10 da Resolução CNMP nº 293/2024.'
      : extrairTexto(dados['59'])
);
const resposta60 = String(extrairTexto(dados['60'])).trim().toUpperCase();

setText(
  'DM_60',
  resposta60 === 'SIM'
    ? 'O(a) membro(a) afirmou que há crianças ou adolescentes acolhidos provenientes de outra comarca ou município.'
    : resposta60 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há crianças ou adolescentes acolhidos provenientes de outra comarca ou município.'
      : extrairTexto(dados['60'])
);

const resposta60_a = String(extrairTexto(dados['60.a'])).trim().toUpperCase();

setText(
  'DM_60.a',
  resposta60 === 'SIM'
    ? (
        resposta60_a === 'SIM'
          ? 'O(a) membro(a) afirmou que tem adotado as medidas previstas no art. 7º, § 2º, da Resolução CNMP nº 293/2024.'
          : resposta60_a === 'NÃO'
            ? 'O(a) membro(a) afirmou que não tem adotado as medidas previstas no art. 7º, § 2º, da Resolução CNMP nº 293/2024.'
            : extrairTexto(dados['60.a'])
      )
    : ''
);

setText(
  'DM_60.b',
  resposta60 === 'SIM' && resposta60_a === 'SIM'
    ? extrairTexto(dados['60.b'])
    : ''
);


setText(
  'DM_61',
   extrairTexto(dados['61'])
    
);

const resposta62 = String(extrairTexto(dados['62'])).trim().toUpperCase();

setText(
  'DM_62',
  resposta62 === 'NÃO'
    ? 'O membro informou que não existe fluxo estabelecido com a Delegacia de Polícia, Poder Judiciário, Defensoria Pública e Assistência Social para agilizar o atendimento inicial ao adolescente a quem se atribua autoria de ato infracional, nos termos do artigo 88, V, do ECA.'
    : resposta62 === 'SIM'
      ? `O membro informou que existe fluxo estabelecido com a Delegacia de Polícia, Poder Judiciário, Defensoria Pública e Assistência Social para agilizar o atendimento inicial ao adolescente a quem se atribua autoria de ato infracional, nos termos do artigo 88, V, do ECA. ${extrairTexto(dados['62.a'])}`
      : extrairTexto(dados['62'])
);


const resposta63 = String(extrairTexto(dados['63'])).trim().toUpperCase();

setText(
  'DM_63',
  resposta63 === 'SIM'
    ? `O(a) membro(a) afirmou que há unidade de internação ou de semiliberdade na comarca.${extrairTexto(dados['63.a']) ? ` ${extrairTexto(dados['63.a'])}` : ''}`
    : resposta63 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há unidade de internação ou de semiliberdade na comarca.'
      : extrairTexto(dados['63'])
);

const resposta63_b = String(extrairTexto(dados['63.b'])).trim().toUpperCase();

setText(
  'DM_63.b',
  resposta63 === 'NÃO'
    ? (
        resposta63_b === 'SIM'
          ? `O(a) membro(a) afirmou que há procedimento instaurado.${extrairTexto(dados['63.c']) ? ` ${extrairTexto(dados['63.c'])}` : ''}`
          : resposta63_b === 'NÃO'
            ? 'O(a) membro(a) afirmou que não há procedimento instaurado.'
            : extrairTexto(dados['63.b'])
      )
    : ''
);

setText(
  'DM_63.c',
  resposta63 === 'NÃO' && resposta63_b === 'SIM'
    ? extrairTexto(dados['63.c'])
    : ''
);

const resposta64 = String(extrairTexto(dados['64'])).trim().toUpperCase();

setText(
  'DM_64',
  resposta64 === 'SIM'
    ? `O(a) membro(a) afirmou que, quanto ao meio aberto, foram adotadas medidas administrativas ou judiciais voltadas à criação e manutenção dos programas de atendimento socioeducativo dos municípios que integram a comarca, conforme o artigo 4º da Resolução CNMP nº 204/2019.${extrairTexto(dados['64.a']) ? ` ${extrairTexto(dados['64.a'])}` : ''}`
    : resposta64 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, quanto ao meio aberto, não foram adotadas medidas administrativas ou judiciais voltadas à criação e manutenção dos programas de atendimento socioeducativo dos municípios que integram a comarca, conforme o artigo 4º da Resolução CNMP nº 204/2019.'
      : extrairTexto(dados['64'])
);


const resposta65 = String(extrairTexto(dados['65'])).trim().toUpperCase();

setText(
  'DM_65',
  resposta65 === 'SIM'
    ? `O(a) membro(a) afirmou que, no município onde atua, foram adotadas medidas administrativas ou judiciais voltadas à implementação do Plano Municipal da Primeira Infância, com ampla discussão com a sociedade e com o Conselho Municipal dos Direitos da Criança e do Adolescente, conforme o artigo 7º da Lei nº 13.257/2016.${extrairTexto(dados['65.a']) ? ` ${extrairTexto(dados['65.a'])}` : ''}`
    : resposta65 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, no município onde atua, não foram adotadas medidas administrativas ou judiciais voltadas à implementação do Plano Municipal da Primeira Infância, com ampla discussão com a sociedade e com o Conselho Municipal dos Direitos da Criança e do Adolescente, conforme o artigo 7º da Lei nº 13.257/2016.'
      : extrairTexto(dados['65'])
);




const resposta66 = String(extrairTexto(dados['66'])).trim().toUpperCase();

setText(
  'DM_66',
  resposta66 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas à permanente fiscalização do Fundo Municipal (ou Estadual, havendo atribuição) para Infância e Adolescência (FIA), conforme disposto no artigo 260, § 4º, do ECA, zelando para que os recursos por estes captados sejam utilizados de acordo com as prioridades estabelecidas pelo Conselho Municipal (ou Estadual, havendo atribuição) de Direitos da Criança e do Adolescente local, conforme o artigo 4º, VI, da Recomendação CNMP nº 33/2016.${extrairTexto(dados['66.a']) ? ` ${extrairTexto(dados['66.a'])}` : ''}`
    : resposta66 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas à permanente fiscalização do Fundo Municipal (ou Estadual, havendo atribuição) para Infância e Adolescência (FIA), conforme disposto no artigo 260, § 4º, do ECA, zelando para que os recursos por estes captados sejam utilizados de acordo com as prioridades estabelecidas pelo Conselho Municipal (ou Estadual, havendo atribuição) de Direitos da Criança e do Adolescente local, conforme o artigo 4º, VI, da Recomendação CNMP nº 33/2016.'
      : extrairTexto(dados['66'])
);

const resposta67 = String(extrairTexto(dados['67'])).trim().toUpperCase();

setText(
  'DM_67',
  resposta67 === 'SIM'
    ? 'O(a) membro(a) afirmou que foram adotadas medidas para implementação, no(s) município(s) em que atua, do sistema de garantia de direitos da criança e do adolescente vítima ou testemunha de violência e do fluxo/protocolo da escuta especializada, conforme a Lei nº 13.431/2017, o Decreto nº 9.603/2018, e o artigo 3º da Resolução CNMP nº 287/2024.'
    : resposta67 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas para implementação, no(s) município(s) em que atua, do sistema de garantia de direitos da criança e do adolescente vítima ou testemunha de violência e do fluxo/protocolo da escuta especializada, conforme a Lei nº 13.431/2017, o Decreto nº 9.603/2018, e o artigo 3º da Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['67'])
);

const resposta68 = String(extrairTexto(dados['68'])).trim().toUpperCase();

setText(
  'DM_68',
  resposta68 === 'SIM'
    ? `O membro informou que há articulação ou atuação integrada entre as Promotorias de Justiça criminais, de violência doméstica e familiar, de família e da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024. ${extrairTexto(dados['68.a'])}`
    : resposta68 === 'NÃO'
      ? `O membro informou que não há articulação ou atuação integrada entre as Promotorias de Justiça criminais, de violência doméstica e familiar, de família e da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024. ${extrairTexto(dados['68.a'])}`
      : extrairTexto(dados['68'])
);

const resposta69 = String(extrairTexto(dados['69'])).trim().toUpperCase();

setText(
  'DM_69',
  resposta69 === 'SIM'
    ? 'O membro informou que, no caso de realização de depoimento especial, ele é emprestado aos demais juízos quando necessário.'
    : resposta69 === 'NÃO'
      ? 'O membro informou que, no caso de realização de depoimento especial, ele não é emprestado aos demais juízos quando necessário.'
      : extrairTexto(dados['69'])
);

const resposta70 = String(extrairTexto(dados['70'])).trim().toUpperCase();

setText(
  'DM_70',
  resposta70 === 'SIM'
    ? `O(a) membro(a) afirmou que há atuação para garantir a implementação local da política pública de enfrentamento à violência contra crianças e adolescentes vítima ou testemunha de violência, nos termos do artigo 3º da Resolução CNMP nº 287/2024.${extrairTexto(dados['70.a']) ? ` ${extrairTexto(dados['70.a'])}` : ''}`
    : resposta70 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há atuação para garantir a implementação local da política pública de enfrentamento à violência contra crianças e adolescentes vítima ou testemunha de violência, nos termos do artigo 3º da Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['70'])
);

setText(
  'DM_71',
  `O membro informou que o fluxo para o depoimento especial na comarca tem sido o seguinte: ${extrairTexto(dados['71'])}`
);

const resposta71a = String(extrairTexto(dados['71.a'])).trim().toUpperCase();

setText(
  'DM_71.a',
  resposta71a === 'SIM'
    ? 'O membro informou que há utilização desta prova como prova emprestada nos outros juízos.'
    : resposta71a === 'NÃO'
      ? 'O membro informou que não há utilização desta prova como prova emprestada nos outros juízos.'
      : extrairTexto(dados['71.a'])
);

const resposta72 = String(extrairTexto(dados['72'])).trim().toUpperCase();

setText(
  'DM_72',
  resposta72 === 'SIM'
    ? `O(a) membro(a) afirmou que há alguma articulação ou atuação integrada entre as Promotorias de Justiça criminais, as Promotorias de Justiça de violência doméstica e familiar, as Promotorias de Justiça de família e as Promotorias de Justiça da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024.${extrairTexto(dados['72.a']) ? ` ${extrairTexto(dados['72.a'])}` : ''}`
    : resposta72 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há alguma articulação ou atuação integrada entre as Promotorias de Justiça criminais, as Promotorias de Justiça de violência doméstica e familiar, as Promotorias de Justiça de família e as Promotorias de Justiça da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['72'])
);



const resposta73 = String(extrairTexto(dados['73'])).trim().toUpperCase();

setText(
  'DM_73',
  resposta73 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas ao aumento da oferta de vagas em creches públicas, com vistas a ampliar o atendimento da demanda manifesta e por meio da realização de busca ativa, visando ao atendimento em creches, das Metas do Plano Nacional de Educação.${extrairTexto(dados['73.a']) ? ` ${extrairTexto(dados['73.a'])}` : ''}`
    : resposta73 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas ao aumento da oferta de vagas em creches públicas, com vistas a ampliar o atendimento da demanda manifesta e por meio da realização de busca ativa, visando ao atendimento em creches, das Metas do Plano Nacional de Educação.'
      : extrairTexto(dados['73'])
);

const resposta74 = String(extrairTexto(dados['74'])).trim().toUpperCase();
const resposta74a = extrairTexto(dados['74.a']);

setText(
  'DM_74',
  resposta74 === 'SIM'
    ? `O membro afirmou que adotou medidas administrativas ou judiciais voltadas à garantia da universalização da pré-escola, obrigatória para crianças de 4 a 5 anos, conforme a Meta do Plano Nacional de Educação${resposta74a ? `: ${resposta74a}` : '.'}`
    : 'O membro afirmou que não adotou medidas administrativas ou judiciais voltadas à garantia da universalização da pré-escola, obrigatória para crianças de 4 a 5 anos, conforme a Meta do Plano Nacional de Educação.'
);

setText(
  'DM_74.a',
  resposta74 === 'SIM'
    ? resposta74a
    : ''
);

const resposta75 = String(extrairTexto(dados['75'])).trim().toUpperCase();

setText(
  'DM_75',
  resposta75 === 'SIM'
    ? `O(a) membro(a) afirmou que adotou medidas administrativas ou judiciais voltadas ao fomento da oferta do atendimento educacional especializado complementar, suplementar e integrado às crianças com deficiência, transtornos globais do desenvolvimento e altas habilidades ou superdotação, conforme as Metas do Plano Nacional de Educação.${extrairTexto(dados['75.a']) ? ` ${extrairTexto(dados['75.a'])}` : ''}`
    : resposta75 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não adotou medidas administrativas ou judiciais voltadas ao fomento da oferta do atendimento educacional especializado complementar, suplementar e integrado às crianças com deficiência, transtornos globais do desenvolvimento e altas habilidades ou superdotação, conforme as Metas do Plano Nacional de Educação.'
      : extrairTexto(dados['75'])
);

const resposta76 = String(extrairTexto(dados['76'])).trim().toUpperCase();

setText(
  'DM_76',
  resposta76 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas ao acompanhamento do processo de elaboração das propostas de leis orçamentárias do município, bem como da subsequente execução do orçamento público municipal, a fim de assegurar a consignação de dotações orçamentárias compatíveis com as diretrizes, metas e estratégias do Plano Nacional de Educação.${extrairTexto(dados['76.a']) ? ` ${extrairTexto(dados['76.a'])}` : ''}`
    : resposta76 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas ao acompanhamento do processo de elaboração das propostas de leis orçamentárias do município, bem como da subsequente execução do orçamento público municipal, a fim de assegurar a consignação de dotações orçamentárias compatíveis com as diretrizes, metas e estratégias do Plano Nacional de Educação.'
      : extrairTexto(dados['76'])
);

const resposta77 = String(extrairTexto(dados['77'])).trim().toUpperCase();

setText(
  'DM_77',
  resposta77 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas à garantia da infraestrutura mínima adequada — incluindo acessibilidade e água potável — em escolas ou centros de educação infantil situados no(s) município(s) em que atua.${extrairTexto(dados['77.a']) ? ` ${extrairTexto(dados['77.a'])}` : ''}`
    : resposta77 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas à garantia da infraestrutura mínima adequada — incluindo acessibilidade e água potável — em escolas ou centros de educação infantil situados no(s) município(s) em que atua.'
      : extrairTexto(dados['77'])
);

const resposta78 = String(extrairTexto(dados['78'])).trim().toUpperCase();

setText(
  'DM_78',
  resposta78 === 'SIM'
    ? `O(a) membro(a) afirmou que há atuação específica sobre eventual retomada de obras paralisadas da educação, nos termos da Lei nº 14.719/2023.${extrairTexto(dados['78.a']) ? ` ${extrairTexto(dados['78.a'])}` : ''}`
    : resposta78 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há atuação específica sobre eventual retomada de obras paralisadas da educação, nos termos da Lei nº 14.719/2023.'
      : extrairTexto(dados['78'])
);

const resposta79 = String(extrairTexto(dados['79'])).trim().toUpperCase();

setText(
  'DM_79',
  resposta79 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas à expansão do tempo integral conforme a Meta do Plano Nacional de Educação.${extrairTexto(dados['79.a']) ? ` ${extrairTexto(dados['79.a'])}` : ''}`
    : resposta79 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas à expansão do tempo integral conforme a Meta do Plano Nacional de Educação.'
      : extrairTexto(dados['79'])
);

const resposta80 = String(extrairTexto(dados['80'])).trim().toUpperCase();

setText(
  'DM_80',
  resposta80 === 'SIM'
    ? `O(a) membro(a) afirmou que foram adotadas medidas administrativas ou judiciais voltadas à defesa da gestão democrática do ensino, conforme Meta do Plano Nacional de Educação.${extrairTexto(dados['80.a']) ? ` ${extrairTexto(dados['80.a'])}` : ''}`
    : resposta80 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não foram adotadas medidas administrativas ou judiciais voltadas à defesa da gestão democrática do ensino, conforme Meta do Plano Nacional de Educação.'
      : extrairTexto(dados['80'])
);


const resposta82 = String(extrairTexto(dados['82'])).trim().toUpperCase();
const resposta82a = extrairTexto(dados['82.a']);

setText(
  'DM_82',
  resposta82 === 'SIM'
    ? `O membro afirmou que acompanha as estratégias adotadas pela Secretaria Municipal de Educação e pelo Conselho Tutelar para combater a evasão e o abandono escolar${resposta82a ? `: ${resposta82a}` : '.'}`
    : 'O membro afirmou que não acompanha as estratégias adotadas pela Secretaria Municipal de Educação e pelo Conselho Tutelar para combater a evasão e o abandono escolar.'
);

const resposta83 = String(extrairTexto(dados['83'])).trim().toUpperCase();
const resposta83a = extrairTexto(dados['83.a']);

setText(
  'DM_83',
  resposta83 === 'SIM'
    ? `O membro afirmou que atua na Educação de Jovens e Adultos (EJA) com foco na defesa do direito constitucional à educação, garantindo oferta suficiente, busca ativa de alunos, qualidade na infraestrutura e combate à evasão escolar${resposta83a ? `: ${resposta83a}` : '.'}`
    : 'O membro afirmou que não atua na Educação de Jovens e Adultos (EJA) com foco na defesa do direito constitucional à educação, garantindo oferta suficiente, busca ativa de alunos, qualidade na infraestrutura e combate à evasão escolar.'
);

const resposta84 = String(extrairTexto(dados['84'])).trim().toUpperCase();
const resposta84a = extrairTexto(dados['84.a']);

setText(
  'DM_84',
  resposta84 === 'SIM'
    ? `O membro afirmou que tem atuação voltada ao enfrentamento ao analfabetismo${resposta84a ? `: ${resposta84a}` : '.'}`
    : 'O membro afirmou que não tem atuação voltada ao enfrentamento ao analfabetismo.'
);

const resposta85 = String(extrairTexto(dados['85'])).trim().toUpperCase();

setText(
  'DM_85',
  resposta85 === 'SIM'
    ? `O(a) membro(a) afirmou que, em procedimentos que envolvem guarda compartilhada, analisa, no caso concreto, se a mulher é vítima de violência doméstica, na forma do artigo 1.584, § 2º, do Código Civil (alterado pela Lei nº 14.713/2023).${extrairTexto(dados['85.a']) ? ` ${extrairTexto(dados['85.a'])}` : ''}`
    : resposta85 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, em procedimentos que envolvem guarda compartilhada, não analisa, no caso concreto, se a mulher é vítima de violência doméstica, na forma do artigo 1.584, § 2º, do Código Civil (alterado pela Lei nº 14.713/2023).'
      : extrairTexto(dados['85'])
);

const resposta86 = String(extrairTexto(dados['86'])).trim().toUpperCase();

setText(
  'DM_86',
  resposta86 === 'SIM'
    ? `O(a) membro(a) afirmou que atua em todos os processos judiciais de família em que a mulher é vítima de violência doméstica, conforme determina o artigo 698, parágrafo único, do CPC (incluído pela Lei nº 13.894/2019).${extrairTexto(dados['86.a']) ? ` ${extrairTexto(dados['86.a'])}` : ''}`
    : resposta86 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não atua em todos os processos judiciais de família em que a mulher é vítima de violência doméstica, conforme determina o artigo 698, parágrafo único, do CPC (incluído pela Lei nº 13.894/2019).'
      : extrairTexto(dados['86'])
);

const resposta87 = String(extrairTexto(dados['87'])).trim().toUpperCase();

setText(
  'DM_87',
  resposta87 === 'SIM'
    ? 'O(a) membro(a) afirmou que atua em todos os processos judiciais que envolvam direitos de crianças e adolescentes, de incapazes ou de idosos em situação de vulnerabilidade, nos termos do artigo 5º, VIII, da Recomendação CNMP nº 34/2016.'
    : resposta87 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não atua em todos os processos judiciais que envolvam direitos de crianças e adolescentes, de incapazes ou de idosos em situação de vulnerabilidade, nos termos do artigo 5º, VIII, da Recomendação CNMP nº 34/2016.'
      : extrairTexto(dados['87'])
);

const resposta88 = String(extrairTexto(dados['88'])).trim().toUpperCase();

setText(
  'DM_88',
  resposta88 === 'SIM'
    ? `O(a) membro(a) afirmou que, em situações de crianças e adolescentes vítimas de violência, há articulação ou atuação integrada entre as Promotorias de Justiça criminais, as Promotorias de Justiça de violência doméstica e familiar e as Promotorias de Justiça da infância e juventude, conforme estabelecido pela Resolução CNMP nº 287/2024.${extrairTexto(dados['88.a']) ? ` ${extrairTexto(dados['88.a'])}` : ''}`
    : resposta88 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, em situações de crianças e adolescentes vítimas de violência, não há articulação ou atuação integrada entre as Promotorias de Justiça criminais, as Promotorias de Justiça de violência doméstica e familiar e as Promotorias de Justiça da infância e juventude, conforme estabelecido pela Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['88'])
);

const resposta89 = String(extrairTexto(dados['89'])).trim().toUpperCase();

setText(
  'DM_89',
  resposta89 === 'SIM'
    ? 'O(a) membro(a) afirmou que, em situações de crianças e adolescentes vítimas de violência, zela para que o depoimento especial ocorra preferencialmente no âmbito criminal, com posterior compartilhamento de provas com a Promotoria de Justiça da área de família, nos termos do artigo 8º da Resolução CNMP nº 287/2024.'
    : resposta89 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, em situações de crianças e adolescentes vítimas de violência, não zela para que o depoimento especial ocorra preferencialmente no âmbito criminal, com posterior compartilhamento de provas com a Promotoria de Justiça da área de família, nos termos do artigo 8º da Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['89'])
);

const resposta90 = String(extrairTexto(dados['90'])).trim().toUpperCase();

setText(
  'DM_90',
  resposta90 === 'SIM'
    ? 'O(a) membro(a) afirmou que, nos casos de alienação parental que não tenham repercussão criminal, zela para que, havendo necessidade de oitiva da criança ou do adolescente, esta seja realizada obrigatoriamente por meio de depoimento especial, conforme o artigo 8-A da Lei nº 12.318/2010.'
    : resposta90 === 'NÃO'
      ? 'O(a) membro(a) afirmou que, nos casos de alienação parental que não tenham repercussão criminal, não zela para que, havendo necessidade de oitiva da criança ou do adolescente, esta seja realizada obrigatoriamente por meio de depoimento especial, conforme o artigo 8-A da Lei nº 12.318/2010.'
      : extrairTexto(dados['90'])
);
const resposta91 = String(extrairTexto(dados['91'])).trim().toUpperCase();

setText(
  'DM_91',
  resposta91 === 'SIM'
    ? `Fomenta o diálogo entre as polícias civil e militar e as redes de saúde e assistência social, da seguinte forma: ${extrairTexto(dados['91.a'])}`
    : resposta91 === 'NÃO'
      ? 'O membro informou que não fomenta o diálogo entre as polícias civil e militar e as redes de saúde e assistência social.'
      : extrairTexto(dados['91'])
);

const resposta92 = String(extrairTexto(dados['92'])).trim().toUpperCase();
setText(
  'DM_92',
  resposta92 === 'NÃO'
    ? 'O membro informou que não analisa o histórico de violência doméstica ou familiar sofrida pela vítima.'
    : resposta92 === 'SIM'
      ? 'O membro informou que analisa o histórico de violência doméstica ou familiar sofrida pela vítima.'
      : extrairTexto(dados['92'])
);

const resposta93 = String(extrairTexto(dados['93'])).trim().toUpperCase();
setText(
  'DM_93',
  resposta93 === 'NÃO'
    ? 'O membro informou que não tem preenchido regularmente o Cadastro Nacional de Violência Doméstica do CNMP.'
    : resposta93 === 'SIM'
      ? 'O membro informou que tem preenchido regularmente o Cadastro Nacional de Violência Doméstica do CNMP.'
      : extrairTexto(dados['93'])
);

const resposta94 = String(extrairTexto(dados['94'])).trim().toUpperCase();
setText(
  'DM_94',
  resposta94 === 'NÃO'
    ? 'O membro informou que não tem fiscalizado se a Polícia Civil — ou outros órgãos competentes — aplica o Formulário Nacional de Avaliação de Risco (FONAR) em todos os casos que envolvam violência doméstica no âmbito familiar.'
    : resposta94 === 'SIM'
      ? 'O membro informou que tem fiscalizado se a Polícia Civil — ou outros órgãos competentes — aplica o Formulário Nacional de Avaliação de Risco (FONAR) em todos os casos que envolvam violência doméstica no âmbito familiar.'
      : extrairTexto(dados['94'])
);
const resposta94a = extrairTexto(dados['94.a']);

setText(
  'DM_94.a',
  resposta94a
    ? `O membro afirmou que atua na fiscalização e no fomento do cumprimento das medidas protetivas de urgência com absoluta prioridade, nos termos da Recomendação CNMP nº 87/2021: ${resposta94a}`
    : 'O membro afirmou que atua na fiscalização e no fomento do cumprimento das medidas protetivas de urgência com absoluta prioridade, nos termos da Recomendação CNMP nº 87/2021.'
);

const resposta95 = String(extrairTexto(dados['95'])).trim().toUpperCase();
const resposta95a = extrairTexto(dados['95.a']);

setText(
  'DM_95',
  resposta95 === 'SIM'
    ? 'O membro afirmou que existe delegacia especializada.'
    : `O membro afirmou que não existe delegacia especializada${resposta95a ? `, informando que ${resposta95a}` : '.'}`
);


const resposta96 = String(extrairTexto(dados['96'])).trim().toUpperCase();
const resposta96a = String(extrairTexto(dados['96.a'])).trim();

setText(
  'DM_96',
  resposta96 === 'SIM'
    ? `O membro informou que há monitoramento dos indicadores locais relativos à violência doméstica e familiar contra a mulher, da seguinte forma: ${resposta96a}`
    : 'O membro informou que não há monitoramento dos indicadores locais relativos à violência doméstica e familiar contra a mulher.'
);

const resposta96b = String(extrairTexto(dados['96.b'])).trim().toUpperCase();
const resposta96c = String(extrairTexto(dados['96.c'])).trim();

setText(
  'DM_96.b',
  resposta96b === 'SIM'
    ? `O membro informou que desenvolve atuação integrada com a Promotoria de Justiça com atribuição em feminicídio a fim de desenvolverem ações preventivas, da seguinte forma: ${resposta96c}`
    : 'O membro informou que não desenvolve atuação integrada com a Promotoria de Justiça com atribuição em feminicídio a fim de desenvolverem ações preventivas.'
);

const resposta96d = String(extrairTexto(dados['96.d'])).trim().toUpperCase();
const resposta96e = String(extrairTexto(dados['96.e'])).trim();

setText(
  'DM_96.d',
  resposta96d === 'SIM'
    ? `O membro informou que realiza atuação integrada com as Promotorias de Justiça com atribuição nos crimes contra crianças e adolescentes a fim de desenvolverem ações preventivas, da seguinte forma: ${resposta96e}`
    : 'O membro informou que não realiza atuação integrada com as Promotorias de Justiça com atribuição nos crimes contra crianças e adolescentes a fim de desenvolverem ações preventivas.'
);

const resposta96f = String(extrairTexto(dados['96.f'])).trim().toUpperCase();
const resposta96g = String(extrairTexto(dados['96.g'])).trim();

setText(
  'DM_96.f',
  resposta96f === 'SIM'
    ? `O membro informou que realiza atuação integrada com as Promotorias de Justiça com atribuição em direito de família para que, nas causas cíveis relacionadas a um contexto de violência doméstica contra a mulher, ocorra a intervenção obrigatória do Ministério Público, em razão da vulnerabilidade presumida da mulher, da seguinte forma: ${resposta96g}`
    : 'O membro informou que não realiza atuação integrada com as Promotorias de Justiça com atribuição em direito de família para que, nas causas cíveis relacionadas a um contexto de violência doméstica contra a mulher, ocorra a intervenção obrigatória do Ministério Público, em razão da vulnerabilidade presumida da mulher.'
);


const resposta97 = String(extrairTexto(dados['97'])).trim().toUpperCase();
const resposta97a = String(extrairTexto(dados['97.a'])).trim();

setText(
  'DM_97',
  resposta97 === 'SIM'
    ? `O membro informou que a Promotoria de Justiça possui procedimento ou ação judicial com o objetivo de buscar a implementação ou o aprimoramento, pelo ente federativo competente, da capacitação de agentes de segurança pública e/ou guardas civis municipais sobre o enfrentamento à violência doméstica e familiar contra a mulher, da seguinte forma: ${resposta97a}`
    : 'O membro informou que a Promotoria de Justiça não possui procedimento ou ação judicial com o objetivo de buscar a implementação ou o aprimoramento, pelo ente federativo competente, da capacitação de agentes de segurança pública e/ou guardas civis municipais sobre o enfrentamento à violência doméstica e familiar contra a mulher.'
);

const resposta98a = String(extrairTexto(dados['98.a'])).trim().toUpperCase();

setText(
  'DM_98.a',
  resposta98a === 'SIM'
    ? 'O membro informou que zela pelo direito de informação da vítima, tais como sobre seus direitos básicos, serviços de apoio, processos e outros meios de obtenção de reparação dos danos causados.'
    : 'O membro informou que não zela pelo direito de informação da vítima, tais como sobre seus direitos básicos, serviços de apoio, processos e outros meios de obtenção de reparação dos danos causados.'
);
const resposta98b = String(extrairTexto(dados['98.b'])).trim().toUpperCase();

setText(
  'DM_98.b',
  resposta98b === 'SIM'
    ? 'O membro informou que fiscaliza a efetiva intimação da vítima em caso de liberdade provisória do autuado, nos termos do art. 21 da Lei nº 11.340/06.'
    : 'O membro informou que não fiscaliza a efetiva intimação da vítima em caso de liberdade provisória do autuado, nos termos do art. 21 da Lei nº 11.340/06.'
);

const resposta100b = String(extrairTexto(dados['100.b'])).trim().toUpperCase();
const resposta100c = String(extrairTexto(dados['100.c'])).trim();

setText(
  'DM_100.b',
  resposta100b === 'SIM'
    ? `O membro informou que realiza atuação com perspectiva de gênero, da seguinte forma: ${resposta100c}`
    : 'O membro informou que não realiza atuação com perspectiva de gênero.'
);














const resposta98 = String(extrairTexto(dados['98'])).trim().toUpperCase();
setText(
  'DM_98',
  resposta98 === 'SIM'
    ? 'O membro informou que, quando do ajuizamento da ação penal, formula pedido de indenização à vítima com a fixação de valor mínimo para reparação dos danos materiais, morais e psicológicos, causados pela infração penal, em prol das vítimas diretas, indiretas e coletivas, nos termos do art. 9º da Resolução CNMP nº 243/2021. (artigo 387, inciso IV, do CPP)'
    : resposta98 === 'NÃO'
      ? 'O membro informou que, quando do ajuizamento da ação penal, não formula pedido de indenização à vítima com a fixação de valor mínimo para reparação dos danos materiais, morais e psicológicos, causados pela infração penal, em prol das vítimas diretas, indiretas e coletivas.'
      : extrairTexto(dados['98'])
);

const resposta100 = String(extrairTexto(dados['100'])).trim().toUpperCase();
setText(
  'DM_100',
  resposta100 === 'NÃO'
    ? 'O membro informou que não possui atuação de recuperação e reeducação do agressor, nos termos da Recomendação CNMP nº 93/2022.'
    : resposta100 === 'SIM'
      ? `O membro informou que possui atuação de recuperação e reeducação do agressor, da seguinte forma: ${extrairTexto(dados['100.a'])}`
      : extrairTexto(dados['100'])
);

const resposta101 = String(extrairTexto(dados['101'])).trim().toUpperCase();
setText(
  'DM_101',
  resposta101 === 'NÃO'
    ? 'O membro informou que não possui atuação por meio de ações, estratégias ou atividades específicas para o enfrentamento à discriminação à raça, à população LGBTQIAPN+ e à diversidade.'
    : resposta101 === 'SIM'
      ? `O membro informou que possui atuação por meio de ações, estratégias ou atividades específicas para o enfrentamento à discriminação à raça, à população LGBTQIAPN+ e à diversidade, da seguinte forma: ${extrairTexto(dados['101.a'])}`
      : extrairTexto(dados['101'])
);

const resposta102 = String(extrairTexto(dados['102'])).trim().toUpperCase();
setText(
  'DM_102',
  resposta102 === 'SIM'
    ? 'O membro informou possuir atuação, procedimento ou ação judicial com o objetivo de buscar a implementação ou o aprimoramento — pelo ente federativo competente — da capacitação de agentes de segurança pública e/ou guardas civis municipais sobre o enfrentamento à discriminação à raça, à população LGBTQIAPN+ e à diversidade, prevenindo eventuais abordagens, revistas e outras condutas discriminatórias.'
    : resposta102 === 'NÃO'
      ? 'O membro informou não possuir atuação, procedimento ou ação judicial com o objetivo de buscar a implementação ou o aprimoramento — pelo ente federativo competente — da capacitação de agentes de segurança pública e/ou guardas civis municipais sobre o enfrentamento à discriminação à raça, à população LGBTQIAPN+ e à diversidade, prevenindo eventuais abordagens, revistas e outras condutas discriminatórias.'
      : extrairTexto(dados['102'])
);

const resposta103 = String(extrairTexto(dados['103'])).trim().toUpperCase();
setText(
  'DM_103',
  resposta103 === 'NÃO'
    ? 'O membro informou que não atua para fiscalizar ou fomentar a promoção de políticas públicas garantidoras do respeito à diversidade sexual, de gênero e de raça no âmbito de sua atuação.'
    : resposta103 === 'SIM'
      ? `O membro informou que atua para fiscalizar ou fomentar a promoção de políticas públicas garantidoras do respeito à diversidade sexual, de gênero e de raça no âmbito de sua atuação, da seguinte forma: ${extrairTexto(dados['103.a'])}`
      : extrairTexto(dados['103'])
);

const resposta104 = String(extrairTexto(dados['104'])).trim().toUpperCase();
setText(
  'DM_104',
  resposta104 === 'NÃO'
    ? 'O membro informou que não faz monitoramento dos indicadores locais relativos à violência decorrente de discriminação à raça, à população LGBTQIAPN+ e à diversidade.'
    : resposta104 === 'SIM'
      ? `O membro informou que faz monitoramento dos indicadores locais relativos à violência decorrente de discriminação à raça, à população LGBTQIAPN+ e à diversidade da seguinte forma: ${extrairTexto(dados['104.a'])}`
      : extrairTexto(dados['104'])
);

const resposta105 = String(extrairTexto(dados['105'])).trim().toUpperCase();
setText(
  'DM_105',
  resposta105 === 'SIM'
    ? 'O membro informou formular pedido de indenização à vítima.'
    : resposta105 === 'NÃO'
      ? 'O membro informou não formular pedido de indenização à vítima.'
      : extrairTexto(dados['105'])
);

const resposta106 = String(extrairTexto(dados['106'])).trim().toUpperCase();
setText(
  'DM_106',
  resposta106 === 'NÃO'
    ? 'O membro informou não recorrer nas hipóteses de omissão do juiz na fixação de indenização.'
    : resposta106 === 'SIM'
      ? `O membro informou interpor recurso nas hipóteses de omissão do juiz na fixação de indenização, conforme exemplificado no(s) seguinte(s) procedimento(s): ${extrairTexto(dados['106.a'])}`
      : extrairTexto(dados['106'])
);

const resposta107 = String(extrairTexto(dados['107'])).trim().toUpperCase();
setText(
  'DM_107',
  resposta107 === 'SIM'
    ? 'O membro informou fiscalizar os parâmetros de acolhimento das pessoas LGBTQIAPN+ privadas de liberdade, conforme Recomendação CNMP nº 85/2021.'
    : resposta107 === 'NÃO'
      ? 'O membro informou não fiscalizar os parâmetros de acolhimento das pessoas LGBTQIAPN+ privadas de liberdade.'
      : extrairTexto(dados['107'])
);

const resposta107a = String(extrairTexto(dados['107.a'])).trim().toUpperCase();
const resposta107b = String(extrairTexto(dados['107.b'])).trim();

setText(
  'DM_107.a',
  resposta107a === 'SIM'
    ? `O membro informou que realiza atuação integrada com Promotorias de Justiça com atribuição em homicídio na condução de ações preventivas, da seguinte forma: ${resposta107b}`
    : 'O membro informou que não realiza atuação integrada com Promotorias de Justiça com atribuição em homicídio na condução de ações preventivas.'
);


const resposta108 = String(extrairTexto(dados['108'])).trim().toUpperCase();
setText(
  'DM_108',
  resposta108 === 'NÃO'
    ? 'O membro informou não possuir estratégia institucional específica voltada à atuação da defesa de pessoas com deficiência.'
    : resposta108 === 'SIM'
      ? `O membro informou possuir estratégia institucional específica voltada à atuação da defesa de pessoas com deficiência ${extrairTexto(dados['108.a']) ? ` ${extrairTexto(dados['108.a'])}` : ''}`
      : extrairTexto(dados['108'])
);

const resposta109 = String(extrairTexto(dados['109'])).trim().toUpperCase();
setText(
  'DM_109',
  resposta109 === 'NÃO'
    ? 'O membro informou não realizar inspeção das Residências Inclusivas (RIs) e/ou outras instituições que prestem serviços de acolhimento de pessoas com deficiência.'
    : resposta109 === 'SIM'
      ? `O membro informou realizar inspeção das Residências Inclusivas (RIs) e/ou outras instituições que prestem serviços de acolhimento de pessoas com deficiência.${extrairTexto(dados['109.a']) ? ` ${extrairTexto(dados['109.a'])}` : ''}`
      : extrairTexto(dados['109'])
);

const resposta110 = String(extrairTexto(dados['110'])).trim().toUpperCase();
setText(
  'DM_110',
  resposta110 === 'SIM'
    ? 'O membro informou atuar na fiscalização das respectivas prestações de contas e/ou em processos de tomada de decisão apoiada.'
    : resposta110 === 'NÃO'
      ? 'O membro informou não atuar na fiscalização das respectivas prestações de contas e/ou em processos de tomada de decisão apoiada.'
      : extrairTexto(dados['110'])
);

const resposta110_a = String(extrairTexto(dados['110.a'])).trim().toUpperCase();
setText(
  'DM_110.a',
  resposta110_a === 'NÃO'
    ? 'O membro informou não atuar de forma integrada com Promotorias com atribuição na área cível e de família.'
    : resposta110_a === 'SIM'
      ? `O membro informou atuar de forma integrada com Promotorias com atribuição na área cível e de família ${extrairTexto(dados['110.b']) ? ` ${extrairTexto(dados['110.b'])}` : ''}`
      : extrairTexto(dados['110.a'])
);

const resposta111 = String(extrairTexto(dados['111'])).trim().toUpperCase();
setText(
  'DM_111',
  resposta111 === 'NÃO'
    ? 'O membro informou não haver articulação integrada com como RECOMEÇAR e NAVID.'
    : resposta111 === 'SIM'
      ? `O membro informou haver articulação integrada com como RECOMEÇAR e NAVID exemplificando o(s) procedimento(s): ${extrairTexto(dados['111.a'])}`
      : extrairTexto(dados['111'])
);



const resposta112 = String(extrairTexto(dados['112'])).trim().toUpperCase();

setText(
  'DM_112',
  resposta112 === 'SIM'
    ? 'O membro informou que, quando do ajuizamento da ação penal, formula pedido de indenização à vítima, nos termos do art. 387, inciso IV, do CPP.'
    : 'O membro informou que, quando do ajuizamento da ação penal, não formula pedido de indenização à vítima, nos termos do art. 387, inciso IV, do CPP.'
);

const resposta113 = String(extrairTexto(dados['113'])).trim().toUpperCase();

setText(
  'DM_113',
  resposta113 === 'SIM'
    ? 'O membro informou que, na hipótese de omissão do juiz na fixação de indenização, são interpostos recursos.'
    : 'O membro informou que, na hipótese de omissão do juiz na fixação de indenização, não são interpostos recursos.'
);

const resposta114 = String(extrairTexto(dados['114'])).trim().toUpperCase();
const resposta114a = String(extrairTexto(dados['114.a'])).trim();

setText(
  'DM_114',
  resposta114 === 'SIM'
    ? `O membro informou que há presos da comarca correicionada que estejam custodiados em outras jurisdições, informando o quantitativo de ${resposta114a}.`
    : 'O membro informou que não há presos da comarca correicionada que estejam custodiados em outras jurisdições.'
);

const resposta115 = String(extrairTexto(dados['115'])).trim();

setText(
  'DM_115',
  `O membro informou que o cumprimento de pena para os sentenciados em regime semiaberto e aberto ocorre da seguinte forma: ${resposta115}.`
);

const resposta116 = String(extrairTexto(dados['116'])).trim().toUpperCase();
const resposta116a = String(extrairTexto(dados['116.a'])).trim();

setText(
  'DM_116',
  resposta116 === 'SIM'
    ? `O membro informou que estimula, de alguma forma, o desenvolvimento de ações para a remissão de pena, da seguinte forma: ${resposta116a}.`
    : 'O membro informou que não estimula, de alguma forma, o desenvolvimento de ações para a remissão de pena.'
);

const resposta117 = String(extrairTexto(dados['117'])).trim().toUpperCase();
const resposta117a = String(extrairTexto(dados['117.a'])).trim();

setText(
  'DM_117',
  resposta117 === 'SIM'
    ? `O membro informou que tem fiscalizado, em sede de controle concentrado, se os órgãos de segurança pública dispõem de condições materiais, técnicas e operacionais necessárias e compatíveis para o exercício de suas atribuições, da seguinte forma: ${resposta117a}`
    : 'O membro informou que não tem fiscalizado, em sede de controle concentrado, se os órgãos de segurança pública dispõem de condições materiais, técnicas e operacionais necessárias e compatíveis para o exercício de suas atribuições.'
);

const resposta118 = String(extrairTexto(dados['118'])).trim().toUpperCase();
const resposta118a = String(extrairTexto(dados['118.a'])).trim();

setText(
  'DM_118',
  resposta118 === 'SIM'
    ? `O membro informou que, nas hipóteses de promoção de arquivamento das investigações criminais, a vítima e/ou seus familiares têm sido notificados sobre o pronunciamento do Ministério Público, conforme art. 11, § 2º, da Resolução CNMP nº 279/2023, da seguinte forma: ${resposta118a}`
    : 'O membro informou que, nas hipóteses de promoção de arquivamento das investigações criminais, a vítima e/ou seus familiares não têm sido notificados sobre o pronunciamento do Ministério Público, conforme art. 11, § 2º, da Resolução CNMP nº 279/2023.'
);

const resposta119 = String(extrairTexto(dados['119'])).trim().toUpperCase();
const resposta119a = String(extrairTexto(dados['119.a'])).trim();

setText(
  'DM_119',
  resposta119 === 'SIM'
    ? `O membro informou que acompanha as investigações dos crimes que envolvam letalidade e vitimização policiais a partir das primeiras 24 horas da ocorrência ou do conhecimento dos fatos, com pleno e irrestrito acesso aos autos e demais atos e fases da investigação, conforme art. 11, § 3º, da Resolução CNMP nº 279/2023, da seguinte forma: ${resposta119a}`
    : 'O membro informou que não acompanha as investigações dos crimes que envolvam letalidade e vitimização policiais a partir das primeiras 24 horas da ocorrência ou do conhecimento dos fatos, com pleno e irrestrito acesso aos autos e demais atos e fases da investigação, conforme art. 11, § 3º, da Resolução CNMP nº 279/2023.'
);

const resposta120 = String(extrairTexto(dados['120'])).trim().toUpperCase();
const resposta120a = String(extrairTexto(dados['120.a'])).trim();

setText(
  'DM_120',
  resposta120 === 'SIM'
    ? `O membro informou que instaurou procedimento administrativo para verificar a existência e o adequado funcionamento de Programa de Integridade na Administração Pública, conforme o art. 4º da Resolução nº 305/2025-CNMP, da seguinte forma: ${resposta120a}`
    : 'O membro informou que não instaurou procedimento administrativo para verificar a existência e o adequado funcionamento de Programa de Integridade na Administração Pública, conforme o art. 4º da Resolução nº 305/2025-CNMP.'
);

const resposta121 = String(extrairTexto(dados['121'])).trim().toUpperCase();
const resposta121a = String(extrairTexto(dados['121.a'])).trim();

setText(
  'DM_121',
  resposta121 === 'SIM'
    ? `O membro informou que tem celebrado acordo de não persecução cível quando este se mostra proporcional e suficiente para a proteção do patrimônio público e da moralidade administrativa, nos termos do art. 2º da Resolução nº 306/2025-CNMP, da seguinte forma: ${resposta121a}`
    : 'O membro informou que não tem celebrado acordo de não persecução cível quando este se mostra proporcional e suficiente para a proteção do patrimônio público e da moralidade administrativa, nos termos do art. 2º da Resolução nº 306/2025-CNMP.'
);

const resposta121b = String(extrairTexto(dados['121.b'])).trim().toUpperCase();
const resposta121c = String(extrairTexto(dados['121.c'])).trim();

setText(
  'DM_121.b',
  resposta121b === 'SIM'
    ? `O membro informou que, em caso afirmativo, o acordo de não persecução cível tem contemplado a aplicação de uma ou mais sanções previstas na Lei nº 8.429/1992, bem como as condições necessárias para assegurar sua efetividade, sem prejuízo do ressarcimento integral do dano patrimonial e da perda de bens ou valores acrescidos ilicitamente, quando houver, conforme o art. 3º da Resolução nº 306/2025-CNMP, da seguinte forma: ${resposta121c}`
    : 'O membro informou que, em caso afirmativo, o acordo de não persecução cível não tem contemplado a aplicação de uma ou mais sanções previstas na Lei nº 8.429/1992, bem como as condições necessárias para assegurar sua efetividade, sem prejuízo do ressarcimento integral do dano patrimonial e da perda de bens ou valores acrescidos ilicitamente, quando houver, conforme o art. 3º da Resolução nº 306/2025-CNMP.'
);

const resposta122 = String(extrairTexto(dados['122'])).trim().toUpperCase();
const resposta122a = String(extrairTexto(dados['122.a'])).trim();

setText(
  'DM_122',
  resposta122 === 'SIM'
    ? `O membro informou que tem fiscalizado se o ente público observa os parâmetros legais mínimos obrigatórios que devem constar nos Portais da Transparência, conforme a Nota Técnica CAO-PDC nº 5/2025, da seguinte forma: ${resposta122a}`
    : 'O membro informou que não tem fiscalizado se o ente público observa os parâmetros legais mínimos obrigatórios que devem constar nos Portais da Transparência, conforme a Nota Técnica CAO-PDC nº 5/2025.'
);

const resposta123 = String(extrairTexto(dados['123'])).trim().toUpperCase();
const resposta123a = String(extrairTexto(dados['123.a'])).trim();

setText(
  'DM_123',
  resposta123 === 'SIM'
    ? `O membro informou que realiza vistorias em hospitais, UPAs e postos de saúde para verificar condições de higiene, presença de médicos, estoque de medicamentos e funcionamento de equipamentos, da seguinte forma: ${resposta123a}`
    : 'O membro informou que não realiza vistorias em hospitais, UPAs e postos de saúde para verificar condições de higiene, presença de médicos, estoque de medicamentos e funcionamento de equipamentos.'
);

const resposta124 = String(extrairTexto(dados['124'])).trim().toUpperCase();
const resposta124a = String(extrairTexto(dados['124.a'])).trim();

setText(
  'DM_124',
  resposta124 === 'SIM'
    ? `O membro informou que fiscaliza a correta aplicação de verbas públicas destinadas à saúde e o cumprimento de metas de vacinação e saneamento, da seguinte forma: ${resposta124a}`
    : 'O membro informou que não fiscaliza a correta aplicação de verbas públicas destinadas à saúde e o cumprimento de metas de vacinação e saneamento.'
);

const resposta125 = String(extrairTexto(dados['125'])).trim().toUpperCase();
const resposta125a = String(extrairTexto(dados['125.a'])).trim();

setText(
  'DM_125',
  resposta125 === 'SIM'
    ? `O membro informou que tem atuado para reduzir o tempo de espera por cirurgias, exames e consultas especializadas, da seguinte forma: ${resposta125a}`
    : 'O membro informou que não tem atuado para reduzir o tempo de espera por cirurgias, exames e consultas especializadas.'
);

const resposta126 = String(extrairTexto(dados['126'])).trim().toUpperCase();
const resposta126a = String(extrairTexto(dados['126.a'])).trim();

setText(
  'DM_126',
  resposta126 === 'SIM'
    ? `O membro informou que tem atuado visando assegurar o atendimento prioritário e adequado a idosos, crianças, pessoas com deficiências e pacientes com doenças raras ou transtornos mentais, da seguinte forma: ${resposta126a}`
    : 'O membro informou que não tem atuado visando assegurar o atendimento prioritário e adequado a idosos, crianças, pessoas com deficiências e pacientes com doenças raras ou transtornos mentais.'
);

const resposta127 = String(extrairTexto(dados['127'])).trim().toUpperCase();
const resposta127a = String(extrairTexto(dados['127.a'])).trim();

setText(
  'DM_127',
  resposta127 === 'SIM'
    ? `O membro informou que tem investigado desvios de recursos, fraude em licitações na área da saúde ou omissão de gestores que coloquem a vida da população em risco, da seguinte forma: ${resposta127a}`
    : 'O membro informou que não tem investigado desvios de recursos, fraude em licitações na área da saúde ou omissão de gestores que coloquem a vida da população em risco.'
);

const resposta128 = String(extrairTexto(dados['128'])).trim().toUpperCase();
const resposta128a = String(extrairTexto(dados['128.a'])).trim();

setText(
  'DM_128',
  resposta128 === 'SIM'
    ? 'O membro informou que o Município possui TFD (Tratamento Fora do Domicílio).'
    : `O membro informou que o Município não possui TFD (Tratamento Fora do Domicílio), informando que ${resposta128a}.`
);

const resposta129 = String(extrairTexto(dados['129'])).trim().toUpperCase();
const resposta129a = String(extrairTexto(dados['129.a'])).trim();

setText(
  'DM_129',
  resposta129 === 'SIM'
    ? `O membro informou que existe CAPS no Município, especificando o tipo: ${resposta129a}.`
    : 'O membro informou que não existe CAPS no Município.'
);

const resposta130 = String(extrairTexto(dados['130'])).trim().toUpperCase();
const resposta130a = String(extrairTexto(dados['130.a'])).trim();

setText(
  'DM_130',
  resposta130 === 'SIM'
    ? `O membro informou que fiscaliza os repasses fundo a fundo, da seguinte forma: ${resposta130a}`
    : 'O membro informou que não fiscaliza os repasses fundo a fundo.'
);

const resposta131 = String(extrairTexto(dados['131'])).trim().toUpperCase();
const resposta131a = String(extrairTexto(dados['131.a'])).trim();

setText(
  'DM_131',
  resposta131 === 'SIM'
    ? 'O membro informou que o Município informou que possui usina própria de oxigênio.'
    : `O membro informou que o Município informou que não possui usina própria de oxigênio, informando que ${resposta131a}.`
);

const resposta132 = String(extrairTexto(dados['132'])).trim().toUpperCase();
const resposta132a = String(extrairTexto(dados['132.a'])).trim();
const resposta132b = String(extrairTexto(dados['132.b'])).trim();

setText(
  'DM_132',
  resposta132 === 'SIM'
    ? `O membro informou que o Município informou que possui sistema de tratamento de água distribuída para a população, da seguinte forma: ${resposta132a}`
    : `O membro informou que o Município informou que não possui sistema de tratamento de água distribuída para a população, informando que ${resposta132b}.`
);

const resposta133 = String(extrairTexto(dados['133'])).trim().toUpperCase();
const resposta133a = String(extrairTexto(dados['133.a'])).trim();

setText(
  'DM_133',
  resposta133 === 'SIM'
    ? `O membro informou que, quando atua na responsabilização por danos ambientais e climáticos, observa o princípio da reparação integral, levando em conta todas as dimensões socioambientais, incluindo os impactos sobre a flora, fauna, clima, solo, ar, água e bem-estar coletivo, da seguinte forma: ${resposta133a}`
    : 'O membro informou que, quando atua na responsabilização por danos ambientais e climáticos, não observa o princípio da reparação integral, levando em conta todas as dimensões socioambientais, incluindo os impactos sobre a flora, fauna, clima, solo, ar, água e bem-estar coletivo.'
);

const resposta134 = String(extrairTexto(dados['134'])).trim().toUpperCase();
const resposta134a = String(extrairTexto(dados['134.a'])).trim();

setText(
  'DM_134',
  resposta134 === 'SIM'
    ? `O membro informou que adota medidas preventivas e articuladas para o combate às queimadas e desmatamento, da seguinte forma: ${resposta134a}`
    : 'O membro informou que não adota medidas preventivas e articuladas para o combate às queimadas e desmatamento.'
);

const resposta135 = String(extrairTexto(dados['135'])).trim().toUpperCase();
const resposta135a = String(extrairTexto(dados['135.a'])).trim();

setText(
  'DM_135',
  resposta135 === 'SIM'
    ? `O membro informou que fiscaliza a política de descarte de resíduos sólidos e de lixo hospitalar, da seguinte forma: ${resposta135a}`
    : 'O membro informou que não fiscaliza a política de descarte de resíduos sólidos e de lixo hospitalar.'
);

const resposta136 = String(extrairTexto(dados['136'])).trim().toUpperCase();

setText(
  'DM_136',
  resposta136 === 'SIM'
    ? 'O membro informou que o Município possui Plano Diretor.'
    : 'O membro informou que o Município não possui Plano Diretor.'
);

const resposta136a = String(extrairTexto(dados['136.a'])).trim().toUpperCase();
const resposta136b = String(extrairTexto(dados['136.b'])).trim();

setText(
  'DM_136.a',
  resposta136a === 'SIM'
    ? `O membro informou que fiscaliza a ocupação do solo e o parcelamento urbano para evitar o crescimento desordenado que degrada o ecossistema local, da seguinte forma: ${resposta136b}`
    : 'O membro informou que não fiscaliza a ocupação do solo e o parcelamento urbano para evitar o crescimento desordenado que degrada o ecossistema local.'
);

const resposta137 = String(extrairTexto(dados['137'])).trim();

setText(
  'DM_137',
  `O membro informou que as principais áreas em que tem encontrado entraves nas demandas encaminhadas ao poder público são: ${resposta137}`
);

const resposta138 = String(extrairTexto(dados['138'])).trim();

setText(
  'DM_138',
  `O membro informou que tem as seguintes sugestões voltadas à melhoria da atuação: ${resposta138}`
);

const resposta139 = String(extrairTexto(dados['139'])).trim();

setText(
  'DM_139',
  `O membro informou que possui as seguintes experiências inovadoras e/ou boas práticas, independentemente de estarem registradas institucionalmente, que deseja indicar: ${resposta139}`
);

const resposta140 = String(extrairTexto(dados['140'])).trim();

setText(
  'DM_140',
  `O membro informou as seguintes observações adicionais: ${resposta140}`
);

    // NOME busca registro?.user_id; LOTAÇÃO busca dados['1.1']
    const nome = registro?.user_id || '';
    const lotacao = extrairTexto(dados['1.1']);
    preencherNomeLotacao(nome, lotacao);

    // Campos manuais
    setValue('promotor_auxiliar', dados.promotor_auxiliar || '');
    setValue('equipe_apoio', dados.equipe_apoio || '');
    setValue('data_realizacao', normalizarDataISO(dados.data_realizacao || dados.dataRealizacao || ''));
    setValue('orgao_correicionado', dados.orgao_correicionado || '');
    setValue('nome_titular', dados.nome_titular || '');
    setValue('nome_substituto', dados.nome_substituto || '');
    setValue('orgaos_jurisdicionais', dados.orgaos_jurisdicionais || '');

    const tipo = dados.tipo_correcao || dados.tipo_correição || dados.tipoCorrecao;
    if (tipo) {
        const radio = document.querySelector(`input[name="tipo_correcao"][value="${tipo}"]`);
        if (radio) radio.checked = true;
    }
}

/* ─── Inicialização ────────────────────────────────────────────── */
// Garante ids únicos para textareas de Proposição e nomes únicos para grupos de radio
function ensureProposalIds() {
  const proposals = Array.from(document.querySelectorAll('.proposal'));
  let fallbackCounter = 1;

  proposals.forEach((proposal, pIndex) => {
    // tenta extrair número da seção a partir do título (ex: "3.2 – Procedimentos")
    const titleText = proposal.querySelector('.proposal-title')?.textContent?.trim() || '';
    const m = titleText.match(/^(\d+(?:\.\d+)*)/);
    const sec = m ? m[1].replace(/\./g, '_') : `auto${fallbackCounter++}`;

    // encontra o campo de Proposição (label que começa com "Proposição")
    const field = Array.from(proposal.querySelectorAll('.field')).find(f => {
      const label = f.querySelector('label');
      return label && /^proposiç/i.test(label.textContent.trim());
    });

    if (field) {
      const textarea = field.querySelector('textarea');
      if (textarea) {
        // se não tiver id ou não for do padrão, atribui um id previsível
        if (!textarea.id || !/^proposicao_/.test(textarea.id)) {
          textarea.id = `proposicao_${sec}`;
        } else {
          // protege contra ids duplicados na página
          const existing = document.querySelectorAll(`#${CSS.escape(textarea.id)}`);
          if (existing && existing.length > 1) {
            textarea.id = `proposicao_${sec}_${pIndex + 1}`;
          }
        }
      }
    }

    // Normaliza nomes dos radio groups dentro desta proposta para evitar colisões globais
    const radios = Array.from(proposal.querySelectorAll('input[type="radio"]'));
    if (radios.length) {
      const nameMap = new Map();
      let groupIdx = 1;
      radios.forEach(radio => {
        const oldName = radio.name || `unnamed_${groupIdx}`;
        if (!nameMap.has(oldName)) {
          nameMap.set(oldName, `prop_${sec}_${nameMap.size + 1}`);
        }
        radio.name = nameMap.get(oldName);
      });
    }
  });
  // reaplica auto-expand para quaisquer textareas que recebam id/nova altura
  bindAutoExpand();
  console.debug('[Proposições] ensureProposalIds: concluído', proposals.length);
}

async function carregarRegistroDoBanco(id) {
    if (typeof carregarRegistroAdmin !== 'function') {
        throw new Error('A função carregarRegistroAdmin não foi encontrada.');
    }
    return await carregarRegistroAdmin(id);
}

async function init() {
    try {
        if (typeof verificarAdmin === 'function') {
            await verificarAdmin();
        }

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            showError('ID do relatório não informado na URL.');
            hideLoading();
            return;
        }

        showLoading('Buscando registro…');
        const registro = await carregarRegistroDoBanco(id);

        if (!registro) {
            showError('Registro não encontrado.');
            hideLoading();
            return;
        }

        preencherRelatorio(registro);
        // assegura ids únicos e nomes de radio para todos os campos de Proposição
        if (typeof ensureProposalIds === 'function') ensureProposalIds();

        // ─ Respostas manuais do relatório (observações, proposições, tabelas, "não se aplica") ─
        __idRelatorioAtual = id;
        prepararIndicesProposal();
        configurarNaoAplica();
        criarBotoesSalvarPorSecao();
        carregarRespostasSalvas(registro);
        bindAutoExpand();
    } catch (err) {
        console.error(err);
        showError(err?.message || 'Erro ao carregar o relatório.');
    } finally {
        hideLoading();
    }
}

function autoExpandField(el) {
    if (!el) return;

    if (el.tagName === 'TEXTAREA') {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        return;
    }

    if (el.tagName === 'INPUT' && el.type === 'text') {
        const value = el.value || el.placeholder || '';
        const mirror = document.createElement('span');
        mirror.style.position = 'absolute';
        mirror.style.visibility = 'hidden';
        mirror.style.whiteSpace = 'pre';
        mirror.style.font = getComputedStyle(el).font;
        mirror.style.letterSpacing = getComputedStyle(el).letterSpacing;
        mirror.style.padding = getComputedStyle(el).padding;
        mirror.textContent = value;
        document.body.appendChild(mirror);

        const width = mirror.getBoundingClientRect().width + 20;
        el.style.width = `${Math.min(Math.max(width, 120), 1000)}px`;

        document.body.removeChild(mirror);
    }
}

function bindAutoExpand(root = document) {
    const fields = root.querySelectorAll('textarea.auto-expand, input[type="text"].auto-expand');

    fields.forEach((el) => {
        const handler = () => autoExpandField(el);

        if (el.__autoExpandHandler) {
            el.removeEventListener('input', el.__autoExpandHandler);
        }

        el.__autoExpandHandler = handler;
        el.addEventListener('input', handler);

        autoExpandField(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindAutoExpand();
});



    (function () {
        function initProposalSidebar() {
            const list   = document.getElementById('proposalSidebarList');
            const status = document.getElementById('proposalSidebarStatus');
            if (!list || !status) return;

            // ── Campos de proposição no relatório (textareas dentro de .proposal) ──
            // Seleciona apenas os que têm label começando com "Proposição"
            const proposalFields = Array.from(
                document.querySelectorAll('.proposal > .field')
            ).map(field => {
                const label    = field.querySelector('label');
                const textarea = field.querySelector('textarea');
                if (!label || !textarea) return null;
                if (!/^proposiç/i.test(label.textContent.trim())) return null;
                return textarea;
            }).filter(Boolean);

            let activeTextarea = null;

            function clearActive() {
                proposalFields.forEach(el => el.classList.remove('is-active-proposition'));
            }

            function setActiveTextarea(textarea) {
                clearActive();
                activeTextarea = textarea || null;

                if (!activeTextarea) {
                    status.textContent = 'Nenhum campo selecionado ainda.';
                    return;
                }

                activeTextarea.classList.add('is-active-proposition');
                const title =
                    activeTextarea.closest('.proposal')
                        ?.querySelector('.proposal-title')
                        ?.textContent?.trim()
                    || 'Campo de proposição';
                status.textContent = `Campo selecionado: ${title}`;
            }

            proposalFields.forEach(textarea => {
                textarea.addEventListener('focus', () => setActiveTextarea(textarea));
                textarea.addEventListener('click', () => setActiveTextarea(textarea));
            });

            // ── Fonte dos textos: banco de dados (Supabase) ─────────────────────
            // Os textos agora são carregados exclusivamente do banco, sem depender de Proposicao.js.
            status.textContent = 'Carregando textos salvos do banco…';
            renderizarCustomizados(list, () => setActiveTextarea, () => activeTextarea, status);

            // ── Filtro de busca (filtra predefinidos + customizados) ──────────────
            const filterInput = document.getElementById('proposalSidebarFilter');
            if (filterInput) {
                filterInput.addEventListener('input', () => {
                    const termo = filterInput.value.trim().toLowerCase();
                    let visiveis = 0;

                    const avisoAnterior = list.querySelector('.sidebar-no-results');
                    if (avisoAnterior) avisoAnterior.remove();

                    list.querySelectorAll('.sidebar-item').forEach(btn => {
                        const texto = btn.textContent.toLowerCase();
                        const visivel = !termo || texto.includes(termo);
                        btn.classList.toggle('sidebar-item--hidden', !visivel);
                        if (visivel) visiveis++;
                    });

                    if (termo && visiveis === 0) {
                        const aviso = document.createElement('div');
                        aviso.className = 'sidebar-no-results';
                        aviso.textContent = `Nenhuma proposição encontrada para "${filterInput.value.trim()}".`;
                        list.appendChild(aviso);
                    }
                });
            }

            // Expõe referência ao activeTextarea para funções globais
            window._sidebarGetActive   = () => activeTextarea;
            window._sidebarSetActive   = setActiveTextarea;
            window._sidebarList        = list;
            window._sidebarStatus      = status;
        }

        // ── Renderiza bloco de textos personalizados na sidebar ─────────────────
        // Agora usa dados vindos do Supabase (item.id = UUID do banco)
        function renderizarCustomizados(list, _unused1, _unused2, status) {
            const secaoAnterior = list.querySelector('.sidebar-custom-section');
            if (secaoAnterior) secaoAnterior.remove();

            // Carrega do Supabase de forma assíncrona e re-renderiza quando pronto
            listarProposicoesCustomizadas()
                .then(customizados => {
                    const secaoExistente = list.querySelector('.sidebar-custom-section');
                    if (secaoExistente) secaoExistente.remove();

                    if (!customizados.length) return;

                    const secao = document.createElement('div');
                    secao.className = 'sidebar-custom-section';

                    const labelWrap = document.createElement('div');
                    labelWrap.className = 'sidebar-custom-label';
                    labelWrap.innerHTML = `<span>🗂️ Textos salvos (${customizados.length})</span>`;
                    secao.appendChild(labelWrap);

                    customizados.forEach((item) => {
                        const wrap = document.createElement('div');
                        wrap.style.position = 'relative';

                        const button = document.createElement('button');
                        button.type      = 'button';
                        button.className = 'sidebar-item sidebar-item--custom';

                        const titleEl = document.createElement('strong');
                        titleEl.textContent = item.titulo || 'Texto personalizado';

                        const preview = document.createElement('div');
                        preview.className   = 'sidebar-preview';
                        preview.textContent = item.texto.length > 260
                            ? item.texto.slice(0, 260) + '…'
                            : item.texto;

                        button.appendChild(titleEl);
                        button.appendChild(preview);

                        button.addEventListener('click', () => {
                            const activeTextarea = window._sidebarGetActive();
                            if (!activeTextarea) {
                                if (window._sidebarStatus)
                                    window._sidebarStatus.textContent = 'Clique primeiro em um campo de Proposição no relatório.';
                                button.classList.add('sidebar-item--warn');
                                setTimeout(() => button.classList.remove('sidebar-item--warn'), 1800);
                                return;
                            }
                            activeTextarea.value = item.texto;
                            activeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                            activeTextarea.focus();
                            if (window._sidebarStatus)
                                window._sidebarStatus.textContent = '✅ Texto personalizado aplicado.';
                        });

                        // Botão excluir — usa item.id (UUID do Supabase)
                        const btnExcluir = document.createElement('button');
                        btnExcluir.type      = 'button';
                        btnExcluir.title     = 'Excluir este texto';
                        btnExcluir.style.cssText = 'position:absolute;top:6px;right:6px;background:none;border:none;color:#b42318;font-size:14px;cursor:pointer;line-height:1;padding:2px 4px;border-radius:4px;';
                        btnExcluir.textContent = '✕';
                        btnExcluir.addEventListener('click', async (e) => {
                            e.stopPropagation();
                            if (!confirm(`Excluir "${item.titulo || 'este texto'}" do histórico?`)) return;
                            try {
                                await excluirProposicaoCustomizada(item.id);
                                renderizarCustomizados(window._sidebarList, null, null, window._sidebarStatus);
                            } catch(err) {
                                alert('Erro ao excluir: ' + err.message);
                            }
                        });

                        wrap.appendChild(button);
                        wrap.appendChild(btnExcluir);
                        secao.appendChild(wrap);
                    });

                    list.appendChild(secao);
                })
                .catch(err => {
                    console.warn('[Proposições] Erro ao carregar do Supabase:', err.message);
                });
        }

        // ── Funções globais chamadas pelo HTML ───────────────────────────────────
        window.toggleSidebarAdd = function () {
            const toggle = document.getElementById('sidebarAddToggle');
            const panel  = document.getElementById('sidebarAddPanel');
            if (!toggle || !panel) return;
            const aberto = panel.classList.toggle('aberto');
            toggle.classList.toggle('aberto', aberto);
        };

        window.salvarTextoPersonalizado = async function () {
            const titulo = (document.getElementById('sidebarAddTitulo')?.value || '').trim();
            const texto  = (document.getElementById('sidebarAddTexto')?.value  || '').trim();

            if (!texto) {
                alert('Digite o texto da proposição antes de salvar.');
                return;
            }

            const btn = document.querySelector('.sidebar-add-btn');
            if (btn) { btn.disabled = true; btn.textContent = 'Salvando…'; }

            try {
                await salvarProposicaoCustomizada(titulo, texto);

                // Limpa campos e fecha painel
                document.getElementById('sidebarAddTitulo').value = '';
                document.getElementById('sidebarAddTexto').value  = '';
                window.toggleSidebarAdd();

                // Re-renderiza a seção customizada
                if (window._sidebarList && window._sidebarStatus) {
                    renderizarCustomizados(window._sidebarList, null, null, window._sidebarStatus);
                    window._sidebarStatus.textContent = '✅ Texto salvo no histórico!';
                }
            } catch(err) {
                alert('Erro ao salvar: ' + err.message);
            } finally {
                if (btn) { btn.disabled = false; btn.textContent = '💾 Salvar no histórico'; }
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProposalSidebar);
        } else {
            initProposalSidebar();
        }
    })();

const MODELOS_161 = {
    modelo1: `À vista do exame dos livros, registros, autos físicos, procedimentos eletrônicos e demais elementos que compõem os assentamentos da [Número]ª Promotoria de Justiça de [Nome da Comarca], constatou-se que os serviços jurídicos e administrativos desenvolvem-se em ritmo [Regular / Satisfatório / Excelente / Deficitário].`,

    modelo2: `A carga de trabalho encontra-se dentro da média regional, observando-se, em termos gerais, o cumprimento dos prazos legais e das metas institucionais fixadas pela Corregedoria-Geral e pelo Conselho Nacional do Ministério Público (CNMP).`,

    modelo3: `[Exemplo] Excelente índice de resolutividade extrajudicial nas demandas de tutela coletiva.`,
    modelo4: `[Exemplo] Organização e constante atualização do acervo digital no sistema de processos eletrônicos.`,
    modelo5: `[Exemplo] Cordialidade e presteza no atendimento direto ao público e às partes.`,
    modelo6: `[Exemplo] Acúmulo excessivo de procedimentos administrativos de acompanhamento sem movimentação há mais de 180 dias.`,
    modelo7: `[Exemplo] Ausência de alimentação periódica dos dados de produtividade no painel institucional. `,
    modelo8: `Promova o saneamento de todos os procedimentos paralisados há mais de 90 dias, conferindo-lhes o devido impulso oficial, no prazo improrrogável de [Ex: 30 ou 60] dias.`,
    modelo9: `Regularize o lançamento dos atos e manifestações no sistema eletrônico de forma concomitante à sua prática, no prazo de [Ex: 15] dias.`,
    modelo10: `Estabeleça um cronograma quinzenal de reuniões internas com os assessores e estagiários para revisão de metas. `,

    modelo11: `Adote o modelo de fluxograma sugerido pela Corregedoria para triagem de representações iniciais. `,

 modelo12: `Considerando que as falhas constatadas possuem natureza eminentemente formal e organizadora, deixa-se de propor, por ora, a instauração de procedimento administrativo disciplinar, sem prejuízo de nova avaliação.  `,
 modelo13: `Comunique-se o teor deste relatório ao(à) Promotor(a) de Justiça interessado(a), fixando o prazo de [Ex: 60] dias para que comprove a este Órgão Corregedor o cumprimento integral das determinações aqui exaradas. `,
 modelo14: `À consideração do(a) Excelentíssimo(a) Senhor(a) Corregedor(a)-Geral do Ministério Público.`,

};

function aplicarModelo161(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-161');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
function aplicarModelo162(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-162');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
function aplicarModelo163(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-163');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
function aplicarModelo164(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-164');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
function aplicarModelo165(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-165');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
function aplicarModelo166(sel) {
    if (!sel.value) return;
    const ta = document.getElementById('diagnostico-166');
    if (ta.value.trim() && !confirm('Substituir o texto atual pelo modelo selecionado?')) {
        sel.value = '';
        return;
    }
    ta.value = MODELOS_161[sel.value];
   if (typeof autoExpand === 'function') autoExpand(ta);
}
/* ════════════════════════════════════════════════════════════════
   RESPOSTAS DO RELATÓRIO
   Salva e recarrega, na tabela "correicoes" (campo "respostas"),
   tudo o que a equipe correicional preenche manualmente neste
   relatório: observações, proposições, campos livres, tabelas
   dinâmicas (3.2.1 e 3.2.2) e os checkboxes "Não se aplica".

   Não usa localStorage — tudo é persistido apenas no banco.
   ════════════════════════════════════════════════════════════════ */

let __idRelatorioAtual = null;

function obterIdRelatorioDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/* ── Índices estáveis por proposta (para gerar chaves determinísticas) ── */
function prepararIndicesProposal() {
    document.querySelectorAll('.proposal').forEach((proposal, idx) => {
        proposal.dataset.respIndex = String(idx);
    });
}

function ehCampoDeTabelaDinamica(el) {
    return !!el.closest('#tabela-processos') || !!el.closest('#tabela-procedimentos-extra');
}

/* Calcula uma chave estável para um campo:
   - usa o id, se existir
   - senão, se estiver dentro de uma .proposal, usa índice da proposta + tag + ordem
   - senão (campo avulso sem id), usa uma posição sequencial
   A MESMA lógica é usada para coletar e para reaplicar, garantindo consistência. */
function calcularChaveCampoResposta(el, contadores) {
    if (el.id) return `id:${el.id}`;

    const proposal = el.closest('.proposal');
    if (proposal) {
        const idx = proposal.dataset.respIndex ?? 'x';
        const tag = el.tagName.toLowerCase();
        const mapaKey = `prop:${idx}`;
        if (!contadores.proposal[mapaKey]) contadores.proposal[mapaKey] = {};
        const n = contadores.proposal[mapaKey][tag] || 0;
        contadores.proposal[mapaKey][tag] = n + 1;
        return `prop:${idx}:${tag}:${n}`;
    }

    const n = contadores.pos || 0;
    contadores.pos = n + 1;
    return `pos:${n}`;
}

/* ── Coleta o estado atual de todo o formulário do relatório ── */
function coletarEstadoFormulario() {
    const paper = document.querySelector('.paper');
    const estado = { campos: {}, radios: {}, naoAplica: {}, tabelas: {} };
    if (!paper) return estado;

    const contadores = { proposal: {}, pos: 0 };
    const radiosProcessados = new Set();

    paper.querySelectorAll('input, textarea, select').forEach((el) => {
        if (ehCampoDeTabelaDinamica(el)) return;
        if (el.tagName === 'BUTTON' || el.type === 'button' || el.type === 'submit') return;

        if (el.type === 'radio') {
            const nome = el.name;
            if (!nome || radiosProcessados.has(nome)) return;
            radiosProcessados.add(nome);
            const marcado = paper.querySelector(`input[type="radio"][name="${CSS.escape(nome)}"]:checked`);
            estado.radios[nome] = marcado ? marcado.value : null;
            return;
        }

        if (el.closest('.nao-aplica-row')) {
            if (el.id) estado.naoAplica[el.id] = !!el.checked;
            return;
        }

        const chave = calcularChaveCampoResposta(el, contadores);
        estado.campos[chave] = (el.type === 'checkbox') ? !!el.checked : el.value;
    });

    estado.tabelas.processos = coletarTabelaProcessos();
    estado.tabelas.procedimentosExtra = coletarBlocosTabelaExtra();

    return estado;
}

/* ── Reaplica um estado salvo aos campos do formulário ── */
function aplicarEstadoFormulario(estado) {
    if (!estado || typeof estado !== 'object') return;
    const paper = document.querySelector('.paper');
    if (!paper) return;

    // garante que as tabelas dinâmicas tenham linhas suficientes ANTES de
    // percorrer os campos, para não perder a numeração dos demais campos
    aplicarTabelaProcessos(estado.tabelas?.processos);
    aplicarBlocosTabelaExtra(estado.tabelas?.procedimentosExtra);

    const contadores = { proposal: {}, pos: 0 };
    const radiosAplicados = new Set();

    paper.querySelectorAll('input, textarea, select').forEach((el) => {
        if (ehCampoDeTabelaDinamica(el)) return;
        if (el.tagName === 'BUTTON' || el.type === 'button' || el.type === 'submit') return;

        if (el.type === 'radio') {
            const nome = el.name;
            if (!nome || radiosAplicados.has(nome)) return;
            radiosAplicados.add(nome);
            const valor = estado.radios ? estado.radios[nome] : undefined;
            if (valor) {
                const radio = paper.querySelector(`input[type="radio"][name="${CSS.escape(nome)}"][value="${CSS.escape(valor)}"]`);
                if (radio) radio.checked = true;
            }
            return;
        }

        if (el.closest('.nao-aplica-row')) {
            if (el.id && estado.naoAplica && Object.prototype.hasOwnProperty.call(estado.naoAplica, el.id)) {
                el.checked = !!estado.naoAplica[el.id];
                if (typeof el.__aplicarNaoAplica === 'function') el.__aplicarNaoAplica();
            }
            return;
        }

        const chave = calcularChaveCampoResposta(el, contadores);
        if (!estado.campos || !Object.prototype.hasOwnProperty.call(estado.campos, chave)) return;
        const valor = estado.campos[chave];
        if (el.type === 'checkbox') el.checked = !!valor;
        else el.value = valor ?? '';
    });

    bindAutoExpand();
}

/* ── Tabela 3.2.1 — Processos judiciais (pares linha-dados / linha-conclusao) ── */
function coletarTabelaProcessos() {
    const tbody = document.querySelector('#tabela-processos tbody');
    if (!tbody) return [];
    const linhasDados = Array.from(tbody.querySelectorAll('tr.linha-dados'));
    return linhasDados.map((trDados) => {
        const valores = Array.from(trDados.querySelectorAll('input')).map(i => i.value);
        const trConclusao = trDados.nextElementSibling?.classList.contains('linha-conclusao')
            ? trDados.nextElementSibling : null;
        const conclusao = trConclusao ? (trConclusao.querySelector('textarea')?.value || '') : '';
        return { valores, conclusao };
    });
}

function aplicarTabelaProcessos(linhasSalvas) {
    if (!Array.isArray(linhasSalvas) || linhasSalvas.length === 0) return;
    const tbody = document.querySelector('#tabela-processos tbody');
    if (!tbody || typeof adicionarLinha !== 'function') return;

    let atuais = tbody.querySelectorAll('tr.linha-dados').length;
    while (atuais < linhasSalvas.length) {
        adicionarLinha();
        atuais++;
    }

    const linhasDados = Array.from(tbody.querySelectorAll('tr.linha-dados'));
    linhasSalvas.forEach((linha, i) => {
        const trDados = linhasDados[i];
        if (!trDados) return;
        const inputs = Array.from(trDados.querySelectorAll('input'));
        (linha.valores || []).forEach((v, j) => { if (inputs[j]) inputs[j].value = v; });
        const trConclusao = trDados.nextElementSibling?.classList.contains('linha-conclusao')
            ? trDados.nextElementSibling : null;
        if (trConclusao) {
            const ta = trConclusao.querySelector('textarea');
            if (ta) ta.value = linha.conclusao || '';
        }
    });
}

/* ── Tabela 3.2.2 — Procedimentos extrajudiciais (blocos de várias linhas) ── */
function coletarBlocosTabelaExtra() {
    const tbody = document.querySelector('#tabela-procedimentos-extra tbody');
    if (!tbody) return [];
    const inicios = Array.from(tbody.querySelectorAll('tr.bloco-inicio'));
    return inicios.map((inicio) => {
        const linhas = [inicio];
        let prox = inicio.nextElementSibling;
        while (prox && !prox.classList.contains('bloco-inicio')) {
            linhas.push(prox);
            prox = prox.nextElementSibling;
        }
        const campos = [];
        linhas.forEach(tr => tr.querySelectorAll('input, select, textarea').forEach(el => campos.push(el.value)));
        return campos;
    });
}

function aplicarBlocosTabelaExtra(blocosSalvos) {
    if (!Array.isArray(blocosSalvos) || blocosSalvos.length === 0) return;
    const tbody = document.querySelector('#tabela-procedimentos-extra tbody');
    if (!tbody || typeof adicionarLinhaExtra !== 'function') return;

    let atuais = tbody.querySelectorAll('tr.bloco-inicio').length;
    while (atuais < blocosSalvos.length) {
        adicionarLinhaExtra();
        atuais++;
    }

    const inicios = Array.from(tbody.querySelectorAll('tr.bloco-inicio'));
    blocosSalvos.forEach((campos, i) => {
        const inicio = inicios[i];
        if (!inicio) return;
        const linhas = [inicio];
        let prox = inicio.nextElementSibling;
        while (prox && !prox.classList.contains('bloco-inicio')) {
            linhas.push(prox);
            prox = prox.nextElementSibling;
        }
        const elementos = [];
        linhas.forEach(tr => tr.querySelectorAll('input, select, textarea').forEach(el => elementos.push(el)));
        campos.forEach((v, j) => { if (elementos[j]) elementos[j].value = v; });
    });
}

/* ── "Não se aplica": esconde da impressão as proposições relacionadas ── */
function configurarNaoAplica() {
    const paper = document.querySelector('.paper');
    if (!paper) return;

    const checkboxes = paper.querySelectorAll('.nao-aplica-row input[type="checkbox"][id]');
    checkboxes.forEach((cb) => {
        const row = cb.closest('.nao-aplica-row');
        if (!row) return;

        const membros = [];
        let el = row.nextElementSibling;
        while (el && el.tagName !== 'H2') {
            membros.push(el);
            el = el.nextElementSibling;
        }

        const aplicar = () => {
            membros.forEach(m => m.classList.toggle('na-oculta', cb.checked));
        };

        cb.__aplicarNaoAplica = aplicar;
        cb.addEventListener('change', aplicar);
        aplicar();
    });
}

/* ── Botão "Salvar resposta" em cada tópico do relatório ── */
/* Cria um botão "Salvar resposta" (+ status) e o insere na posição indicada.
   alvo/posicao seguem o padrão de insertAdjacentElement, exceto quando
   comoFilho=true, caso em que o botão é anexado como último filho de alvo. */
function inserirBotaoSalvar(alvo, posicao, comoFilho) {
    const wrap = document.createElement('div');
    wrap.className = 'secao-salvar-row no-print';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary btn-salvar-secao';
    btn.textContent = '💾 Salvar resposta';

    const status = document.createElement('span');
    status.className = 'secao-salvar-status';

    wrap.appendChild(btn);
    wrap.appendChild(status);

    if (comoFilho) {
        alvo.appendChild(wrap);
    } else {
        alvo.insertAdjacentElement(posicao, wrap);
    }

    btn.addEventListener('click', () => salvarRespostasNoBanco(btn, status));
}

/* Retorna o último elemento pertencente à seção do h2 informado,
   ou seja, o irmão imediatamente anterior ao próximo <h2> (ou o
   último filho de .paper, se for a última seção). */
function encontrarFimDaSecao(h2) {
    let ultimo = h2;
    let prox = h2.nextElementSibling;
    while (prox && prox.tagName !== 'H2') {
        ultimo = prox;
        prox = prox.nextElementSibling;
    }
    return ultimo;
}

function criarBotoesSalvarPorSecao() {
    const paper = document.querySelector('.paper');
    if (!paper) return;

    // Um botão ao final de cada seção (do <h2> até o próximo <h2>)
    paper.querySelectorAll('h2').forEach((h2) => {
        const fimDaSecao = encontrarFimDaSecao(h2);
        inserirBotaoSalvar(fimDaSecao, 'afterend', false);
    });

    // Um botão ao final de cada subtópico/proposta (blocos .proposal,
    // identificados pela .proposal-title dentro deles)
    paper.querySelectorAll('.proposal').forEach((proposal) => {
        if (!proposal.querySelector('.proposal-title')) return;
        inserirBotaoSalvar(proposal, null, true);
    });
}

/* ── Salva o estado completo do relatório no banco (correicoes.respostas) ── */
async function salvarRespostasNoBanco(btn, status) {
    const id = __idRelatorioAtual || obterIdRelatorioDaURL();

    if (!id) {
        if (status) { status.textContent = 'Erro: ID do relatório não encontrado na URL.'; status.classList.add('erro'); }
        return;
    }
    if (typeof salvarRespostasRegistro !== 'function') {
        if (status) { status.textContent = 'Erro: função de salvamento indisponível.'; status.classList.add('erro'); }
        return;
    }

    const textoOriginal = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Salvando…'; }
    if (status) { status.textContent = ''; status.classList.remove('erro'); }

    try {
        const estado = coletarEstadoFormulario();
        await salvarRespostasRegistro(id, estado);
        if (status) status.textContent = `✔ Salvo às ${new Date().toLocaleTimeString('pt-BR')}`;
    } catch (err) {
        console.error('[respostas] erro ao salvar:', err);
        if (status) { status.textContent = 'Erro ao salvar. Tente novamente.'; status.classList.add('erro'); }
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = textoOriginal; }
    }
}

/* ── Carrega as respostas já salvas (se houver) e aplica aos campos ── */
function carregarRespostasSalvas(registro) {
    let respostas = registro?.respostas;
    if (typeof respostas === 'string') {
        try { respostas = JSON.parse(respostas); } catch (e) { respostas = null; }
    }
    if (respostas && typeof respostas === 'object') {
        aplicarEstadoFormulario(respostas);
    }
}

init();