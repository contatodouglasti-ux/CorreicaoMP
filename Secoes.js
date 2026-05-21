const form = {
  secoes:[
  {
    "nome": "DADOS GERAIS",
    "campos": [
      {"id": "1", "pergunta": "Ato(s) normativo(s) que fixa(m) as atribuições do órgão correicionado (com indicação dos artigos).", "tipo": "textarea"},
      {"id": "2", "pergunta": "Descrição detalhada das atribuições.", "tipo": "textarea"},
      {"id": "3", "pergunta": "Órgão(s) jurisdicional(is) perante o(s) qual(is) atua.", "tipo": "textarea"},
      {"id": "4", "pergunta": "Municípios que compõem a área de atuação e população abrangida.", "tipo": "textarea"}
    ]
  },
  {
    "nome": "DADOS DO MEMBRO",
    "campos": [
      {"id": "5", "pergunta": "Data em que assumiu o órgão/unidade atual de lotação.", "tipo": "date"},
      {"id": "6", "pergunta": "Reside na comarca de lotação?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "6.a", "pergunta": "Em caso negativo, informar o ato autorizativo.", "tipo": "textarea"},
      {"id": "7", "pergunta": "Com que regularidade comparece à Promotoria de Justiça?", "tipo": "textarea"},
      {"id": "8", "pergunta": "Tem autorização para trabalho remoto?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "8.a", "pergunta": "Em caso positivo, informar o ato autorizativo.", "tipo": "textarea"},
      {"id": "9", "pergunta": "Participa das audiências judiciais de forma presencial?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "9.a", "pergunta": "Em caso negativo, justificar com base legal.", "tipo": "textarea"},
      {"id": "10", "pergunta": "Nos últimos 12 meses participou de cursos de aperfeiçoamento?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "10.a", "pergunta": "Informar cursos e datas.", "tipo": "textarea"},
      {"id": "11", "pergunta": "Já recebeu prêmio, homenagem ou elogio?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "11.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "12", "pergunta": "Exerce magistério?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "13", "pergunta": "Exerce atividades de mentoria?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "14", "pergunta": "Participa de sociedade comercial ou ONG?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "15", "pergunta": "Participa de comissão ou grupo de trabalho?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "16", "pergunta": "Está respondendo cumulativamente por outro órgão?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "16.a", "pergunta": "A cumulação é voluntária ou involuntária?", "tipo": "radio", "opcoes": ["Voluntária", "Involuntária"]},
      {"id": "17", "pergunta": "Nos últimos 12 meses afastou-se das atividades?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "17.a", "pergunta": "Especificar motivo e período.", "tipo": "textarea"}
    ]
  },
  {
    "nome": "DADOS DA UNIDADE",
    "campos": [
      {"id": "18", "pergunta": "Realiza atendimento ao público?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "18.a", "pergunta": "Como realiza e registra o atendimento?", "tipo": "textarea"},
      {"id": "18.b", "pergunta": "Horário de início do atendimento.", "tipo": "time"},
      {"id": "18.c", "pergunta": "Horário de fim do atendimento.", "tipo": "time"},
      {"id": "19", "pergunta": "Quantidade de membros.", "tipo": "number"},
      {"id": "20", "pergunta": "Quantidade de servidores.", "tipo": "number"},
      {"id": "21", "pergunta": "Quantidade de terceirizados.", "tipo": "number"},
      {"id": "22", "pergunta": "Quantidade de estagiários.", "tipo": "number"},
      {"id": "23", "pergunta": "Os recursos humanos são adequados?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "24", "pergunta": "As instalações físicas são adequadas?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "24.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "25", "pergunta": "Utiliza rede e equipamentos institucionais?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "25.a", "pergunta": "Em caso negativo, justificar.", "tipo": "textarea"}
    ]
  },
{
  "nome": "ESTATÍSTICAS GERAIS",
  "campos": [
    
    { "id": "26.a", "pergunta": "Inquéritos Policiais recebidos", "tipo": "number" },
    { "id": "26.b", "pergunta": "Termos Circunstanciados de Ocorrência recebidos", "tipo": "number" },
    { "id": "26.c", "pergunta": "Procedimentos Investigatórios Criminais instaurados", "tipo": "number" },
    { "id": "26.d", "pergunta": "Processos criminais recebidos", "tipo": "number" },
    { "id": "26.e", "pergunta": "Processos cíveis recebidos", "tipo": "number" },
    { "id": "26.f", "pergunta": "Notícias de Fato (NF) autuadas", "tipo": "number" },
    { "id": "26.g", "pergunta": "Inquéritos Civis (IC) instaurados", "tipo": "number" },
    { "id": "26.h", "pergunta": "Procedimentos Preparatórios (PP) instaurados", "tipo": "number" },
    { "id": "26.i", "pergunta": "Procedimentos Administrativos (PA) instaurados", "tipo": "number" },
    { "id": "26.j", "pergunta": "Recomendações", "tipo": "number" },
    { "id": "26.k", "pergunta": "Termos de Ajustamento de Conduta (TAC)", "tipo": "number" },
    { "id": "26.l", "pergunta": "Acordos de Não Persecução Cível (ANPC)", "tipo": "number" },
    { "id": "26.m", "pergunta": "Acordos de Não Persecução Penal (ANPP)", "tipo": "number" },
    { "id": "26.n", "pergunta": "Reuniões", "tipo": "number" },
    { "id": "26.o", "pergunta": "Audiências públicas", "tipo": "number" },
    { "id": "26.p", "pergunta": "Audiências judiciais", "tipo": "number" },
    { "id": "26.q", "pergunta": "Inspeções/Visitas", "tipo": "number" },

    { "id": "27.a", "pergunta": "Processos cíveis recebidos (infância e juventude)", "tipo": "number" },
    { "id": "27.b", "pergunta": "Notícias de Fato autuadas (infância e juventude)", "tipo": "number" },
    { "id": "27.c", "pergunta": "Inquéritos Civis instaurados (infância e juventude)", "tipo": "number" },
    { "id": "27.d", "pergunta": "Procedimentos Preparatórios instaurados (infância e juventude)", "tipo": "number" },
    { "id": "27.e", "pergunta": "Procedimentos Administrativos instaurados (infância e juventude)", "tipo": "number" },
    { "id": "27.f", "pergunta": "Recomendações (infância e juventude)", "tipo": "number" },
    { "id": "27.g", "pergunta": "Termos de Ajustamento de Conduta (infância e juventude)", "tipo": "number" },
    { "id": "27.h", "pergunta": "Acordos de Não Persecução Cível (infância e juventude)", "tipo": "number" },
    { "id": "27.i", "pergunta": "Reuniões (infância e juventude)", "tipo": "number" },
    { "id": "27.j", "pergunta": "Audiências públicas (infância e juventude)", "tipo": "number" },
    { "id": "27.k", "pergunta": "Audiências judiciais (infância e juventude)", "tipo": "number" },
    { "id": "27.l", "pergunta": "Inspeções/Visitas (infância e juventude)", "tipo": "number" },

    { "id": "28.a", "pergunta": "Inquéritos Policiais recebidos (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.b", "pergunta": "TCO recebidos (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.c", "pergunta": "Notícias de Fato autuadas (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.d", "pergunta": "Procedimentos Investigatórios instaurados (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.e", "pergunta": "Processos criminais recebidos (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.f", "pergunta": "ANPP (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.g", "pergunta": "Audiências judiciais (crimes contra crianças e adolescentes)", "tipo": "number" },
    { "id": "28.h", "pergunta": "Inspeções/Visitas (crimes contra crianças e adolescentes)", "tipo": "number" },

    { "id": "29.a", "pergunta": "Processos cíveis recebidos (educação)", "tipo": "number" },
    { "id": "29.b", "pergunta": "Notícias de Fato (educação)", "tipo": "number" },
    { "id": "29.c", "pergunta": "Inquéritos Civis (educação)", "tipo": "number" },
    { "id": "29.d", "pergunta": "Procedimentos Preparatórios (educação)", "tipo": "number" },
    { "id": "29.e", "pergunta": "Procedimentos Administrativos (educação)", "tipo": "number" },
    { "id": "29.f", "pergunta": "Recomendações (educação)", "tipo": "number" },
    { "id": "29.g", "pergunta": "TAC (educação)", "tipo": "number" },
    { "id": "29.h", "pergunta": "ANPC (educação)", "tipo": "number" },
    { "id": "29.i", "pergunta": "Reuniões (educação)", "tipo": "number" },
    { "id": "29.j", "pergunta": "Audiências públicas (educação)", "tipo": "number" },
    { "id": "29.k", "pergunta": "Audiências judiciais (educação)", "tipo": "number" },
    { "id": "29.l", "pergunta": "Inspeções/Visitas (educação)", "tipo": "number" },

    { "id": "30.a", "pergunta": "Inquéritos Policiais recebidos (saúde)", "tipo": "number" },
    { "id": "30.b", "pergunta": "TCO (saúde)", "tipo": "number" },
    { "id": "30.c", "pergunta": "PIC instaurados (saúde)", "tipo": "number" },
    { "id": "30.d", "pergunta": "Processos criminais (saúde)", "tipo": "number" },
    { "id": "30.e", "pergunta": "Processos cíveis (saúde)", "tipo": "number" },
    { "id": "30.f", "pergunta": "NF autuadas (saúde)", "tipo": "number" },
    { "id": "30.g", "pergunta": "IC instaurados (saúde)", "tipo": "number" },
    { "id": "30.h", "pergunta": "PP instaurados (saúde)", "tipo": "number" },
    { "id": "30.i", "pergunta": "PA instaurados (saúde)", "tipo": "number" },
    { "id": "30.j", "pergunta": "Recomendações (saúde)", "tipo": "number" },
    { "id": "30.k", "pergunta": "TAC (saúde)", "tipo": "number" },
    { "id": "30.l", "pergunta": "ANPC (saúde)", "tipo": "number" },
    { "id": "30.m", "pergunta": "ANPP (saúde)", "tipo": "number" },
    { "id": "30.n", "pergunta": "Reuniões (saúde)", "tipo": "number" },
    { "id": "30.o", "pergunta": "Audiências públicas (saúde)", "tipo": "number" },
    { "id": "30.p", "pergunta": "Audiências judiciais (saúde)", "tipo": "number" },
    { "id": "30.q", "pergunta": "Inspeções/Visitas (saúde)", "tipo": "number" }

  ]
},{
  "nome": "DADOS ESPECÍFICOS",
  "subtopicos": [
    { "id":"sub31", "nome":"FAMÍLIA",              "prefixo":"31" },
    { "id":"sub32", "nome":"VIO. DOMÉSTICA",        "prefixo":"32" },
    { "id":"sub33", "nome":"DISCRIMINAÇÃO",          "prefixo":"33" },
    { "id":"sub34", "nome":"PES. C/ DEFICIÊNCIA",   "prefixo":"34" },
    { "id":"sub35", "nome":"SEGURANÇA PÚBLICA",      "prefixo":"35" },
    { "id":"sub36", "nome":"PATRIMÔNIO PÚBLICO",     "prefixo":"36" },
    { "id":"sub37", "nome":"MEIO AMBIENTE",          "prefixo":"37" }
  ],
  "campos": [

    /* ===== 31 — FAMÍLIA ===== */
    {"id":"31.a","pergunta":"Processos cíveis recebidos (família)","tipo":"number"},
    {"id":"31.b","pergunta":"Notícias de Fato (NF) autuadas (família)","tipo":"number"},
    {"id":"31.c","pergunta":"Inquéritos Civis (IC) instaurados (família)","tipo":"number"},
    {"id":"31.d","pergunta":"Procedimentos Preparatórios (PP) instaurados (família)","tipo":"number"},
    {"id":"31.e","pergunta":"Procedimentos Administrativos (PA) instaurados (família)","tipo":"number"},
    {"id":"31.f","pergunta":"Recomendações (família)","tipo":"number"},
    {"id":"31.g","pergunta":"Termos de Ajustamento de Conduta (TAC) (família)","tipo":"number"},
    {"id":"31.h","pergunta":"Acordos de Não Persecução Cível (ANPC) (família)","tipo":"number"},
    {"id":"31.i","pergunta":"Audiências judiciais (família)","tipo":"number"},
    {"id":"31.j","pergunta":"Inspeções/Visitas (família)","tipo":"number"},

    /* ===== 32 — VIOLÊNCIA DOMÉSTICA ===== */
    {"id":"32.a","pergunta":"Inquéritos Policiais recebidos (violência doméstica)","tipo":"number"},
    {"id":"32.b","pergunta":"Termos Circunstanciados de Ocorrência recebidos (violência doméstica)","tipo":"number"},
    {"id":"32.c","pergunta":"Procedimentos Investigatórios Criminais instaurados (violência doméstica)","tipo":"number"},
    {"id":"32.d","pergunta":"Processos criminais recebidos (violência doméstica)","tipo":"number"},
    {"id":"32.e","pergunta":"Processos cíveis recebidos (violência doméstica)","tipo":"number"},
    {"id":"32.f","pergunta":"Notícias de Fato (NF) autuadas (violência doméstica)","tipo":"number"},
    {"id":"32.g","pergunta":"Inquéritos Civis (IC) instaurados (violência doméstica)","tipo":"number"},
    {"id":"32.h","pergunta":"Procedimentos Preparatórios (PP) instaurados (violência doméstica)","tipo":"number"},
    {"id":"32.i","pergunta":"Procedimentos Administrativos (PA) instaurados (violência doméstica)","tipo":"number"},
    {"id":"32.j","pergunta":"Recomendações (violência doméstica)","tipo":"number"},
    {"id":"32.k","pergunta":"Termos de Ajustamento de Conduta (TAC) (violência doméstica)","tipo":"number"},
    {"id":"32.l","pergunta":"Acordos de Não Persecução Cível (ANPC) (violência doméstica)","tipo":"number"},
    {"id":"32.m","pergunta":"Reuniões (violência doméstica)","tipo":"number"},
    {"id":"32.n","pergunta":"Audiências públicas (violência doméstica)","tipo":"number"},
    {"id":"32.o","pergunta":"Audiências judiciais (violência doméstica)","tipo":"number"},
    {"id":"32.p","pergunta":"Inspeções/Visitas (violência doméstica)","tipo":"number"},

    /* ===== 33 — DISCRIMINAÇÃO ===== */
    {"id":"33.a","pergunta":"Inquéritos Policiais recebidos (discriminação)","tipo":"number"},
    {"id":"33.b","pergunta":"Termos Circunstanciados de Ocorrência recebidos (discriminação)","tipo":"number"},
    {"id":"33.c","pergunta":"Procedimentos Investigatórios Criminais instaurados (discriminação)","tipo":"number"},
    {"id":"33.d","pergunta":"Processos criminais recebidos (discriminação)","tipo":"number"},
    {"id":"33.e","pergunta":"Processos cíveis recebidos (discriminação)","tipo":"number"},
    {"id":"33.f","pergunta":"Notícias de Fato (NF) autuadas (discriminação)","tipo":"number"},
    {"id":"33.g","pergunta":"Inquéritos Civis (IC) instaurados (discriminação)","tipo":"number"},
    {"id":"33.h","pergunta":"Procedimentos Preparatórios (PP) instaurados (discriminação)","tipo":"number"},
    {"id":"33.i","pergunta":"Procedimentos Administrativos (PA) instaurados (discriminação)","tipo":"number"},
    {"id":"33.j","pergunta":"Recomendações (discriminação)","tipo":"number"},
    {"id":"33.k","pergunta":"Termos de Ajustamento de Conduta (TAC) (discriminação)","tipo":"number"},
    {"id":"33.l","pergunta":"Acordos de Não Persecução Cível (ANPC) (discriminação)","tipo":"number"},
    {"id":"33.m","pergunta":"Acordos de Não Persecução Penal (ANPP) (discriminação)","tipo":"number"},
    {"id":"33.n","pergunta":"Reuniões (discriminação)","tipo":"number"},
    {"id":"33.o","pergunta":"Audiências públicas (discriminação)","tipo":"number"},
    {"id":"33.p","pergunta":"Audiências judiciais (discriminação)","tipo":"number"},
    {"id":"33.q","pergunta":"Inspeções/Visitas (discriminação)","tipo":"number"},

    /* ===== 34 — PESSOA COM DEFICIÊNCIA ===== */
    {"id":"34.a","pergunta":"Inquéritos Policiais recebidos (pessoas com deficiência)","tipo":"number"},
    {"id":"34.b","pergunta":"Termos Circunstanciados de Ocorrência recebidos (pessoas com deficiência)","tipo":"number"},
    {"id":"34.c","pergunta":"Procedimentos Investigatórios Criminais instaurados (pessoas com deficiência)","tipo":"number"},
    {"id":"34.d","pergunta":"Processos criminais recebidos (pessoas com deficiência)","tipo":"number"},
    {"id":"34.e","pergunta":"Processos cíveis recebidos (pessoas com deficiência)","tipo":"number"},
    {"id":"34.f","pergunta":"Notícias de Fato (NF) autuadas (pessoas com deficiência)","tipo":"number"},
    {"id":"34.g","pergunta":"Inquéritos Civis (IC) instaurados (pessoas com deficiência)","tipo":"number"},
    {"id":"34.h","pergunta":"Procedimentos Preparatórios (PP) instaurados (pessoas com deficiência)","tipo":"number"},
    {"id":"34.i","pergunta":"Procedimentos Administrativos (PA) instaurados (pessoas com deficiência)","tipo":"number"},
    {"id":"34.j","pergunta":"Recomendações (pessoas com deficiência)","tipo":"number"},
    {"id":"34.k","pergunta":"Termos de Ajustamento de Conduta (TAC) (pessoas com deficiência)","tipo":"number"},
    {"id":"34.l","pergunta":"Acordos de Não Persecução Cível (ANPC) (pessoas com deficiência)","tipo":"number"},
    {"id":"34.m","pergunta":"Acordos de Não Persecução Penal (ANPP) (pessoas com deficiência)","tipo":"number"},
    {"id":"34.n","pergunta":"Reuniões (pessoas com deficiência)","tipo":"number"},
    {"id":"34.o","pergunta":"Audiências públicas (pessoas com deficiência)","tipo":"number"},
    {"id":"34.p","pergunta":"Audiências judiciais (pessoas com deficiência)","tipo":"number"},
    {"id":"34.q","pergunta":"Inspeções/Visitas (pessoas com deficiência)","tipo":"number"},

    /* ===== 35 — SEGURANÇA PÚBLICA ===== */
    {"id":"35.a","pergunta":"Inquéritos Policiais recebidos (segurança pública)","tipo":"number"},
    {"id":"35.b","pergunta":"Termos Circunstanciados de Ocorrência recebidos (segurança pública)","tipo":"number"},
    {"id":"35.c","pergunta":"Procedimentos Investigatórios Criminais instaurados (segurança pública)","tipo":"number"},
    {"id":"35.d","pergunta":"Processos criminais recebidos (segurança pública)","tipo":"number"},
    {"id":"35.e","pergunta":"Processos cíveis recebidos (segurança pública)","tipo":"number"},
    {"id":"35.f","pergunta":"Notícias de Fato (NF) autuadas (segurança pública)","tipo":"number"},
    {"id":"35.g","pergunta":"Inquéritos Civis (IC) instaurados (segurança pública)","tipo":"number"},
    {"id":"35.h","pergunta":"Procedimentos Preparatórios (PP) instaurados (segurança pública)","tipo":"number"},
    {"id":"35.i","pergunta":"Procedimentos Administrativos (PA) instaurados (segurança pública)","tipo":"number"},
    {"id":"35.j","pergunta":"Recomendações (segurança pública)","tipo":"number"},
    {"id":"35.k","pergunta":"Termos de Ajustamento de Conduta (TAC) (segurança pública)","tipo":"number"},
    {"id":"35.l","pergunta":"Acordos de Não Persecução Cível (ANPC) (segurança pública)","tipo":"number"},
    {"id":"35.m","pergunta":"Reuniões (segurança pública)","tipo":"number"},
    {"id":"35.n","pergunta":"Audiências públicas (segurança pública)","tipo":"number"},
    {"id":"35.o","pergunta":"Audiências judiciais (segurança pública)","tipo":"number"},
    {"id":"35.p","pergunta":"Inspeções/Visitas (segurança pública)","tipo":"number"},

    /* ===== 36 — PATRIMÔNIO PÚBLICO ===== */
    {"id":"36.a","pergunta":"Inquéritos Policiais recebidos (patrimônio público)","tipo":"number"},
    {"id":"36.b","pergunta":"Termos Circunstanciados recebidos (patrimônio público)","tipo":"number"},
    {"id":"36.c","pergunta":"Procedimentos Investigatórios instaurados (patrimônio público)","tipo":"number"},
    {"id":"36.d","pergunta":"Processos criminais recebidos (patrimônio público)","tipo":"number"},
    {"id":"36.e","pergunta":"Processos cíveis recebidos (patrimônio público)","tipo":"number"},
    {"id":"36.f","pergunta":"Notícias de Fato autuadas (patrimônio público)","tipo":"number"},
    {"id":"36.g","pergunta":"Inquéritos Civis instaurados (patrimônio público)","tipo":"number"},
    {"id":"36.h","pergunta":"Procedimentos Preparatórios instaurados (patrimônio público)","tipo":"number"},
    {"id":"36.i","pergunta":"Procedimentos Administrativos instaurados (patrimônio público)","tipo":"number"},
    {"id":"36.j","pergunta":"Recomendações (patrimônio público)","tipo":"number"},
    {"id":"36.k","pergunta":"TAC (patrimônio público)","tipo":"number"},
    {"id":"36.l","pergunta":"ANPC (patrimônio público)","tipo":"number"},
    {"id":"36.m","pergunta":"Reuniões (patrimônio público)","tipo":"number"},
    {"id":"36.n","pergunta":"Audiências públicas (patrimônio público)","tipo":"number"},
    {"id":"36.o","pergunta":"Audiências judiciais (patrimônio público)","tipo":"number"},
    {"id":"36.p","pergunta":"Inspeções/Visitas (patrimônio público)","tipo":"number"},

    /* ===== 37 — MEIO AMBIENTE ===== */
    {"id":"37.a","pergunta":"Inquéritos Policiais recebidos (meio ambiente)","tipo":"number"},
    {"id":"37.b","pergunta":"Termos Circunstanciados recebidos (meio ambiente)","tipo":"number"},
    {"id":"37.c","pergunta":"Procedimentos Investigatórios instaurados (meio ambiente)","tipo":"number"},
    {"id":"37.d","pergunta":"Processos criminais recebidos (meio ambiente)","tipo":"number"},
    {"id":"37.e","pergunta":"Processos cíveis recebidos (meio ambiente)","tipo":"number"},
    {"id":"37.f","pergunta":"Notícias de Fato autuadas (meio ambiente)","tipo":"number"},
    {"id":"37.g","pergunta":"Inquéritos Civis instaurados (meio ambiente)","tipo":"number"},
    {"id":"37.h","pergunta":"Procedimentos Preparatórios instaurados (meio ambiente)","tipo":"number"},
    {"id":"37.i","pergunta":"Procedimentos Administrativos instaurados (meio ambiente)","tipo":"number"},
    {"id":"37.j","pergunta":"Recomendações (meio ambiente)","tipo":"number"},
    {"id":"37.k","pergunta":"TAC (meio ambiente)","tipo":"number"},
    {"id":"37.l","pergunta":"ANPC (meio ambiente)","tipo":"number"},
    {"id":"37.m","pergunta":"Reuniões (meio ambiente)","tipo":"number"},
    {"id":"37.n","pergunta":"Audiências públicas (meio ambiente)","tipo":"number"},
    {"id":"37.o","pergunta":"Audiências judiciais (meio ambiente)","tipo":"number"},
    {"id":"37.p","pergunta":"Inspeções/Visitas (meio ambiente)","tipo":"number"}
  ]
},

  {
    "nome": "ATUAÇÃO GERAL",
    "campos": [
      {"id": "38", "pergunta": "Executa projetos com objetivos estratégicos?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "38.a", "pergunta": "Os projetos são institucionais?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "38.b", "pergunta": "Indicar os projetos e números dos procedimentos.", "tipo": "textarea"},
      {"id": "38.c", "pergunta": "Quais resultados concretos obtidos?", "tipo": "textarea"},
      {"id": "39", "pergunta": "Utiliza indicadores sociais?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "39.a", "pergunta": "Especificar indicadores.", "tipo": "textarea"},
      {"id": "40", "pergunta": "Utiliza mecanismos de resolução consensual?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "40.a", "pergunta": "Quais mecanismos?", "tipo": "textarea"},
      {"id": "41", "pergunta": "Possui Plano de Atuação?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "41.a", "pergunta": "Houve diagnóstico prévio?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "42", "pergunta": "Medidas para garantir celeridade dos feitos.", "tipo": "textarea"},
      {"id": "43", "pergunta": "Prioriza tutela coletiva?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "43.a", "pergunta": "Exemplificar.", "tipo": "textarea"}
    ]
  },

  {
    "nome": "ATUAÇÕES E POLÍTICAS",
    "campos": [
      {"id": "48", "pergunta": "Realiza palestras e reuniões com agentes externos?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "48.a", "pergunta": "Temática e procedimento.", "tipo": "textarea"},
      {"id": "49", "pergunta": "Realiza atividades sociais relevantes?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "49.a", "pergunta": "Especificar atividades.", "tipo": "textarea"},
      {"id": "50", "pergunta": "Utiliza resolução consensual?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "50.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "51", "pergunta": "Prioriza resolução consensual nas ACPs?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "51.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "52", "pergunta": "Utiliza métodos eficientes de investigação?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "52.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "53", "pergunta": "Citar atuações em problemas estruturais.", "tipo": "textarea"}
    ]
  },

  {
    "nome": "INFÂNCIA E JUVENTUDE",
    "campos": [
      {"id": "54", "pergunta": "Participa de reuniões da rede?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "54.a", "pergunta": "Periodicidade.", "tipo": "textarea"},
      {"id": "55", "pergunta": "Há acolhimento institucional?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "55.a", "pergunta": "Como fiscaliza?", "tipo": "textarea"},
      {"id": "56", "pergunta": "Há acolhimento familiar?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "56.a", "pergunta": "Medidas adotadas.", "tipo": "textarea"},
      {"id": "56.b", "pergunta": "Número do processo.", "tipo": "text"},
      {"id": "57", "pergunta": "Verifica o SNA regularmente?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "57.a", "pergunta": "Como verifica?", "tipo": "textarea"},
      {"id": "58", "pergunta": "Garante convivência familiar?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "58.a", "pergunta": "Especificar.", "tipo": "textarea"}
    ]
  },

  {
    "nome": "EDUCAÇÃO",
    "campos": [
      {"id": "73", "pergunta": "Atua para ampliar vagas em creches?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "73.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "74", "pergunta": "Atua na universalização da pré-escola?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "74.a", "pergunta": "Especificar.", "tipo": "textarea"},
      {"id": "75", "pergunta": "Atua na inclusão educacional?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "75.a", "pergunta": "Especificar.", "tipo": "textarea"}
    ]
  },

  {
    "nome": "SAÚDE",
    "campos": [
      {"id": "saude.1", "pergunta": "Realiza vistorias em hospitais?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "saude.2", "pergunta": "Fiscaliza aplicação de recursos da saúde?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "saude.3", "pergunta": "Atua para reduzir filas?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "saude.4", "pergunta": "Existe CAPS no município?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "saude.5", "pergunta": "Município possui usina de oxigênio?", "tipo": "radio", "opcoes": ["Sim", "Não"]}
    ]
  },

  {
    "nome": "MEIO AMBIENTE",
    "campos": [
      {"id": "amb.1", "pergunta": "Observa reparação integral de danos ambientais?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "amb.2", "pergunta": "Utiliza ferramentas de cálculo ambiental?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "amb.3", "pergunta": "Fiscaliza resíduos sólidos?", "tipo": "radio", "opcoes": ["Sim", "Não"]},
      {"id": "amb.4", "pergunta": "Município possui Plano Diretor?", "tipo": "radio", "opcoes": ["Sim", "Não"]}
    ]
  },

  {
    "nome": "FINAL",
    "campos": [
      {"id": "final.1", "pergunta": "Principais entraves encontrados.", "tipo": "textarea"},
      {"id": "final.2", "pergunta": "Sugestões de melhoria.", "tipo": "textarea"},
      {"id": "final.3", "pergunta": "Experiências inovadoras.", "tipo": "textarea"},
      {"id": "final.4", "pergunta": "Observações gerais.", "tipo": "textarea"}
    ]
  }
]
};
