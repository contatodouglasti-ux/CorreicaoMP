
        /* ─── Utilitários ─────────────────────────────────────────────── */
        function setText(id, value) {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = value ?? '-';
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
            document.querySelectorAll('[id^="auto_resposta_lotacao"], [id^="auto_lotacao_"]').forEach(el => {
                el.textContent = lotacao || '';
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

            setText('auto_resposta_2', extrairTexto(dados['1']));
            setText('auto_resposta_3', extrairTexto(dados['2']));
            setText('auto_resposta_4', extrairTexto(dados['4']));

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
        init();
