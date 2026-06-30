console.log('PROPOSICOES_JSON:', window.PROPOSICOES_JSON);


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
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input class="table-input" placeholder="Ex.: Procedimento extrajudicial" /></td>
        <td><input class="table-input" placeholder="Número" /></td>
        <td><input class="table-input" type="date" /></td>
        <td><textarea class="table-textarea" placeholder="Situação detectada"></textarea></td>
        <td><button type="button" class="btn btn-danger" onclick="removerLinha(this)">Apagar</button></td>
    `;
    tbody.appendChild(tr);
}

function removerLinha(btn) {
    const tbody = document.querySelector('#tabela-processos tbody');
    const tr = btn.closest('tr');
    if (!tr) return;
    if (tbody.querySelectorAll('tr').length <= 1) {
        tr.querySelectorAll('input, textarea').forEach(el => el.value = '');
        return;
    }
    tr.remove();
}

/* ─── Auto-expand textareas ────────────────────────────────────── */
function autoExpand(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

document.addEventListener('input', function (e) {
    if (e.target.classList.contains('auto-expand') || e.target.classList.contains('manual-textarea')) {
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


       const resposta6 = String(extrairTexto(dados['6'])).trim().toUpperCase();
setText(
  'DM_6',
  resposta6 === 'SIM'
    ? 'O membro reside na comarca'
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
    ? 'O(a) membro(a) afirmou que há articulação ou atuação integrada entre as Promotorias de Justiça criminais, de violência doméstica e familiar, de família e da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024.'
    : resposta68 === 'NÃO'
      ? 'O(a) membro(a) afirmou que não há articulação ou atuação integrada entre as Promotorias de Justiça criminais, de violência doméstica e familiar, de família e da infância e juventude, nos termos do art. 2º da Resolução CNMP nº 287/2024.'
      : extrairTexto(dados['68'])
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

            // ── Fonte dos textos: window.PROPOSICOES_JSON ──────────────────────────
            // Os textos NÃO estão no DOM (.proposal-text não existe no HTML),
            // portanto lemos direto do JSON já carregado na página.
            const proposicoes = Array.isArray(window.PROPOSICOES_JSON)
                ? window.PROPOSICOES_JSON
                : [];

            if (!proposicoes.length) {
                status.textContent = 'Nenhuma proposição disponível.';
                return;
            }

            list.innerHTML = '';

            proposicoes.forEach((item) => {
                if (!item?.texto) return;

                const button = document.createElement('button');
                button.type      = 'button';
                button.className = 'sidebar-item';

                const titleEl = document.createElement('strong');
                // Usa id + título se disponíveis, ex: "4.1 – Residência na comarca"
                titleEl.textContent = item.id
                    ? `${item.id}${item.titulo ? ' – ' + item.titulo : ''}`
                    : (item.titulo || 'Proposição');

                const preview = document.createElement('div');
                preview.className   = 'sidebar-preview';
                preview.textContent = item.texto.length > 260
                    ? item.texto.slice(0, 260) + '…'
                    : item.texto;

                button.appendChild(titleEl);
                button.appendChild(preview);

                button.addEventListener('click', () => {
                    if (!activeTextarea) {
                        status.textContent = 'Clique primeiro em um campo de Proposição no relatório.';
                        button.classList.add('sidebar-item--warn');
                        setTimeout(() => button.classList.remove('sidebar-item--warn'), 1800);
                        return;
                    }

                    activeTextarea.value = item.texto;
                    activeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                    activeTextarea.focus();

                    const proposalTitle =
                        activeTextarea.closest('.proposal')
                            ?.querySelector('.proposal-title')
                            ?.textContent?.trim()
                        || 'campo selecionado';

                    status.textContent = `✅ Texto ${item.id || ''} aplicado em: ${proposalTitle}`;
                });

                list.appendChild(button);
            });

            // Instrução inicial
            status.textContent = `${proposicoes.length} proposições disponíveis. Clique em um campo de Proposição no relatório para ativar.`;

            // ── Renderiza seção de textos personalizados (localStorage) ──────────
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
                    labelWrap.innerHTML = `<span>⭐ Meus textos (${customizados.length})</span>`;
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


init();