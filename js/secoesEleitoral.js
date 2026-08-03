const form = {
  secoes: [
    {
      nome: "Cabeçalho",
      campos: [
        { id: "c1", pergunta: "RELATÓRIO FINAL DE CORREIÇÃO", tipo: "titulo" },
        { id: "c2", pergunta: "PROMOTORIA ELEITORAL", tipo: "subtitulo" },
        { id: "c3", pergunta: "JUNTO À XXª ZONA ELEITORAL DO AMAZONAS (XXXX)", tipo: "texto" },
        { id: "c4", pergunta: "Corregedora-Auxiliar", tipo: "text" },
        { id: "c5", pergunta: "Equipe de Apoio", tipo: "text" },
        { id: "c6", pergunta: "Data da Realização", tipo: "date" }
      ]
    },
    {
      nome: "I – Dados gerais",
      campos: [
        { id: "1.1", pergunta: "Promotor(a) Eleitoral", tipo: "text" },
        { id: "1.2", pergunta: "Zona Eleitoral e área de abrangência", tipo: "textarea" },
        { id: "1.3", pergunta: "Período da designação", tipo: "date_range", inicioLabel: "INÍCIO", fimLabel: "FIM" }
      ]
    },
    {
      nome: "II – Em relação ao órgão do Ministério Público",
      campos: [
        { id: "2.1", pergunta: "Horário de atendimento ao público", tipo: "textarea" },
        { id: "2.2", pergunta: "Sistemas de arquivos", tipo: "textarea" },
        { id: "2.3", pergunta: "Sistema de registro e tramitação de processos e procedimentos", tipo: "textarea" },
        { id: "2.4", pergunta: "Cumprimento da PORTARIA CONJUNTA/Nº 002/2018/PRE-AM que regulamenta o PPE? Arquivamento dos PPEs está sendo submetido ao PRE?", tipo: "radio", opcoes: ["Sim", "Não", "Parcialmente", "Não se aplica"] },
        { id: "2.5", pergunta: "Os atos, procedimentos, processos e medidas eleitorais (resguardados os casos de sigilo amparados na CF e Lei) são publicizados? De que forma se opera a ampla publicidade?", tipo: "textarea" },
        { id: "2.6", pergunta: "Existem práticas interativas entre o Ministério Público Eleitoral, a sociedade civil, as organizações não governamentais e os próprios partidos políticos, com vistas à pedagogia dos direitos e das garantias eleitorais, bem como da fiscalização e da repressão aos ilícitos eleitorais? De que forma são desenvolvidas essas práticas?", tipo: "textarea" },
        { id: "2.7", pergunta: "De que forma prioriza a atuação preventiva (recomendações, reuniões, audiências públicas, participação em programas de entrevistas) contra os ilícitos eleitorais, com a adoção de medidas judiciais e/ou extrajudiciais adequadas para impedir a prática, a continuidade ou a repetição do ilícito, assim como a sua remoção, independentemente da existência de dolo, culpa ou da comprovação de dano ou da identificação da autoria, nos termos das diretrizes do parágrafo único do art. 497 do CPC/2015?", tipo: "textarea" },
        { id: "2.8", pergunta: "Exerce, de forma efetiva, o acompanhamento da tramitação dos processos eleitorais, com a fiscalização do cumprimento das decisões judiciais?", tipo: "radio", opcoes: ["Sim", "Não", "Parcialmente"] },
        { id: "2.9", pergunta: "De que forma é operacionalizada a cooperação entre membros e unidades do Ministério Público na identificação de ilícitos e danos eleitorais em repetição de âmbito local, regional e nacional, visando a atuação coordenada?", tipo: "textarea" },
        { id: "2.10", pergunta: "Comparece de forma regular na Zona Eleitoral?", tipo: "radio", opcoes: ["Sim", "Não", "Parcialmente"] },
        { id: "2.11", pergunta: "Fiscaliza a regularidade do alistamento eleitoral e da transferência dos títulos eleitorais?", tipo: "radio", opcoes: ["Sim", "Não", "Parcialmente"] },
        { id: "2.12", pergunta: "De que forma se opera a atuação integrada com o Procurador Regional Eleitoral?", tipo: "textarea" },
        { id: "2.13", pergunta: "De que forma se opera a atuação integrada entre membros do MPF e dos Estados com atribuição eleitoral?", tipo: "textarea" },
        { id: "2.14", pergunta: "Quais sistemas informatizados de bancos de dados acessa para dar maior efetividade à atuação eleitoral?", tipo: "textarea" },
        { id: "2.15", pergunta: "Adota todas as medidas necessárias à garantia da liberdade de voto dos eleitores? Fiscaliza, de forma efetiva, a apuração e totalização dos resultados? Adota providências para acessibilidade aos locais de votação? Adota fiscalização sobre o transporte de eleitores até a data limite de alistamento eleitoral e transferência de domicílio eleitoral? Atua de forma a estimular a participação feminina nas disputas eleitorais, antes das convenções partidárias? Atua de forma preventiva com orientações sobre as garantias eleitorais e com orientações para o dia das eleições?", tipo: "textarea" },
        { id: "2.16", pergunta: "Adota todas as medidas preventivas e repressivas contra o abuso do poder econômico, o abuso do poder político, a captação ilícita de votos, a corrupção, assim como contra qualquer fraude eleitoral?", tipo: "textarea" },
        { id: "2.17", pergunta: "Fiscaliza o registro da candidatura, com a propositura da respectiva ação de impugnação de registro, ou a efetiva atuação como fiscal da ordem jurídica?", tipo: "textarea" },
        { id: "2.18", pergunta: "Utiliza projetos sociais e/ou institucionais, de forma a garantir uma atuação resolutiva?", tipo: "textarea" },
        { id: "2.19", pergunta: "Fiscaliza o cumprimento das cotas de gênero no registro de candidatura, propaganda eleitoral e no uso do fundo partidário?", tipo: "textarea" },
        { id: "2.20", pergunta: "O sistema informatizado de registro de dados sobre toda a atuação judicial e extrajudicial do Ministério Público na área eleitoral foi implantado e/ou aperfeiçoado de modo a permitir a transparência e o efetivo acompanhamento estatístico?", tipo: "radio", opcoes: ["Sim", "Não", "Parcialmente"] }
      ]
    },
    {
      nome: "III – Atuação judicial quantitativa",
      campos: [
        { id: "3.1", pergunta: "Processos com vista ao MPE no dia da correição (parte e custos legis – cível e criminal)", tipo: "number" },
        { id: "3.2", pergunta: "Ações penais propostas", tipo: "number" },
        { id: "3.3", pergunta: "Ações de Impugnação de Mandato Eletivo", tipo: "number" },
        { id: "3.4", pergunta: "Ações de Investigação Judicial Eleitoral", tipo: "number" },
        { id: "3.5", pergunta: "Impugnações de Registro de Candidaturas", tipo: "number" },
        { id: "3.6", pergunta: "Audiências judiciais", tipo: "number" },
        { id: "3.7", pergunta: "Recursos interpostos", tipo: "number" },
        { id: "3.8", pergunta: "Pareceres", tipo: "number" },
        { id: "3.9", pergunta: "Promoções", tipo: "number" },
        { id: "3.10", pergunta: "Outras ciências", tipo: "number" }
      ]
    },
    {
      nome: "IV – Atuação extrajudicial quantitativa",
      campos: [
        { id: "4.1", pergunta: "Notícias de Fato", tipo: "number" },
        { id: "4.2", pergunta: "Procedimentos Preparatórios Eleitorais", tipo: "number" },
        { id: "4.3", pergunta: "Procedimentos Investigatórios Criminais", tipo: "number" },
        { id: "4.4", pergunta: "Reuniões/Visitas", tipo: "number" },
        { id: "4.5", pergunta: "Audiências públicas", tipo: "number" },
        { id: "4.6", pergunta: "Termos de Ajustamento de Conduta", tipo: "number" },
        { id: "4.7", pergunta: "Recomendações", tipo: "number" }
      ]
    },
    {
      nome: "Fechamento do relatório final",
      campos: [
        { id: "f1", pergunta: "XXXXX", tipo: "text" },
        { id: "f2", pergunta: "Promotor Eleitoral Correicionado", tipo: "text" },
        { id: "f3", pergunta: "Ministério Público do Estado do Amazonas", tipo: "text" }
      ]
    },
    {
      nome: "Relatório analítico da corregedoria",
      campos: [
        { id: "ra1", pergunta: "RELATÓRIO ANALÍTICO DA CORREGEDORIA", tipo: "titulo" }
      ]
    },
    {
      nome: "1 – Processos judiciais correcionados",
      campos: [
        { id: "5.1", pergunta: "Prov.", tipo: "text" },
        { id: "5.2", pergunta: "Nº do Processo", tipo: "text" },
        { id: "5.3", pergunta: "Conclusão / Recomendação", tipo: "textarea" }
      ]
    },
    {
      nome: "2 – Procedimentos extrajudiciais correcionados",
      campos: [
        { id: "6.1", pergunta: "Prov.", tipo: "text" },
        { id: "6.2", pergunta: "Nº do Processo", tipo: "text" },
        { id: "6.3", pergunta: "Conclusão / Recomendação", tipo: "textarea" }
      ]
    },
    {
      nome: "3 – Conclusões",
      campos: [
        { id: "7.1", pergunta: "Estrutura de Trabalho", tipo: "textarea" },
        { id: "7.2", pergunta: "Organização Administrativa", tipo: "textarea" },
        { id: "7.3", pergunta: "Atividade Judicial", tipo: "textarea" },
        { id: "7.4", pergunta: "Atividade Extrajudicial", tipo: "textarea" },
        { id: "7.5", pergunta: "Entrevista", tipo: "textarea" },
        { id: "7.6", pergunta: "Recomendações e Orientações ao(à) Promotor(a) de Justiça", tipo: "textarea" },
        {
          id: "7.7",
          pergunta: "Sugestões à Corregedora-Geral",
          tipo: "textarea"
        },
        {
          id: "7.7.a",
          pergunta: "Encaminhar cópia do presente Relatório de Correição ao Centro de Apoio Operacional das Promotorias de Justiça Eleitorais para conhecimento.",
          tipo: "checkbox"
        },
        { id: "7.8", pergunta: "CONCEITO GERAL", tipo: "radio", opcoes: ["Insuficiente", "Regular", "Bom", "Muito Bom", "Ótimo"] },
        { id: "7.9", pergunta: "Manaus, data da assinatura eletrônica.", tipo: "text" },
        { id: "7.10", pergunta: "Corregedora-Auxiliar para Assuntos", tipo: "text" }
      ]
    }
  ]
};