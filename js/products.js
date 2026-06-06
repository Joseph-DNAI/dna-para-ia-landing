const CONFIG = { checkoutBase: "#", guaranteeDays: 7, comboCompletoLink: "#" };

const NICHOS = [
  { id: "empreendedorismo", label: "Empreendedorismo", short: "Empreender" },
  { id: "marketing",        label: "Marketing e Publicidade", short: "Marketing" },
  { id: "vendas",           label: "Vendas", short: "Vendas" },
  { id: "atendimento",      label: "Atendimento ao Cliente", short: "Atendimento" },
  { id: "educacao",         label: "Educação", short: "Educação" },
  { id: "design",           label: "Design e Criativo", short: "Design" },
  { id: "tech",             label: "Programação e TI", short: "Tech" },
];

const PRODUTOS = [
  { id:"empreendedor-digital", nome:"DNA Empreendedor Digital", nicho:"empreendedorismo", profissoes:["Empreendedor","Infoprodutor"], precoDe:12.30, preco:9.80, link:"#" },

  { id:"criacao-conteudo", nome:"DNA Criação de Conteúdo", nicho:"marketing", profissoes:["Social Media","Produtor de Conteúdo","Branding"], precoDe:14.00, preco:9.80, link:"#" },
  { id:"conversao-vendas", nome:"DNA Conversão e Vendas", nicho:"marketing", profissoes:["Copywriter","Email Marketing","Growth Hacker"], precoDe:14.00, preco:9.80, link:"#" },
  { id:"trafego-performance", nome:"DNA Tráfego e Performance", nicho:"marketing", profissoes:["Gestor de Tráfego","Analista de Marketing","Estrategista Digital"], precoDe:14.00, preco:9.80, link:"#" },
  { id:"seo", nome:"DNA SEO", nicho:"marketing", profissoes:["Redator SEO"], precoDe:14.00, preco:9.80, link:"#" },

  { id:"prospeccao", nome:"DNA Prospecção e Qualificação", nicho:"vendas", profissoes:["SDR","Inside Sales","Representante Comercial"], precoDe:16.30, preco:9.80, link:"#" },
  { id:"fechamento", nome:"DNA Fechamento e Negociação", nicho:"vendas", profissoes:["Closer","Executivo de Contas","Consultor Comercial"], precoDe:16.30, preco:9.80, link:"#" },
  { id:"gestao-comercial", nome:"DNA Gestão Comercial", nicho:"vendas", profissoes:["Gerente de Vendas"], precoDe:16.30, preco:9.80, link:"#" },

  { id:"suporte", nome:"DNA Suporte e Resolução de Problemas", nicho:"atendimento", profissoes:["Suporte Técnico","SAC","Help Desk"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"conversacional", nome:"DNA Atendimento Conversacional", nicho:"atendimento", profissoes:["Atendimento WhatsApp","Pós-venda"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"customer-success", nome:"DNA Customer Success", nicho:"atendimento", profissoes:["Customer Success Manager"], precoDe:12.30, preco:9.80, link:"#" },

  { id:"ensino", nome:"DNA Ensino e Tutoria", nicho:"educacao", profissoes:["Professor","Tutor","Instrutor"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"criacao-cursos", nome:"DNA Criação de Cursos", nicho:"educacao", profissoes:["Criador de Cursos Digitais"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"mentoria", nome:"DNA Mentoria e Desenvolvimento", nicho:"educacao", profissoes:["Mentor"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"gestao-pedagogica", nome:"DNA Gestão Pedagógica", nicho:"educacao", profissoes:["Coordenador Pedagógico"], precoDe:12.30, preco:9.80, link:"#" },

  { id:"design-visual", nome:"DNA Design Visual e Identidade", nicho:"design", profissoes:["Designer Gráfico","Diretor de Arte"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"ux-ui", nome:"DNA Experiência e Interface", nicho:"design", profissoes:["UX/UI Designer"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"ilustracao", nome:"DNA Ilustração e Arte Digital", nicho:"design", profissoes:["Ilustrador"], precoDe:12.30, preco:9.80, link:"#" },
  { id:"video-motion", nome:"DNA Vídeo e Motion", nicho:"design", profissoes:["Editor de Vídeo","Motion Designer"], precoDe:12.30, preco:9.80, link:"#" },

  { id:"frontend", nome:"DNA Desenvolvimento Front-end", nicho:"tech", profissoes:["Desenvolvedor Front-end"], precoDe:16.30, preco:9.80, link:"#" },
  { id:"backend", nome:"DNA Back-end e Full Stack", nicho:"tech", profissoes:["Desenvolvedor Back-end","Full Stack"], precoDe:16.30, preco:9.80, link:"#" },
  { id:"qa", nome:"DNA Qualidade e Testes", nicho:"tech", profissoes:["QA","Analista de Testes"], precoDe:16.30, preco:9.80, link:"#" },
  { id:"infra", nome:"DNA Infraestrutura e Operações", nicho:"tech", profissoes:["DevOps","SysAdmin","SRE"], precoDe:16.30, preco:9.80, link:"#" },
];

const COMBOS = [
  { id:"c-marketing",   nome:"Combo Marketing Completo",   nicho:"marketing",   precoDe:56.00, preco:16.80, desconto:70, link:"#" },
  { id:"c-vendas",      nome:"Combo Vendas Completo",      nicho:"vendas",      precoDe:48.90, preco:14.67, desconto:70, link:"#" },
  { id:"c-educacao",    nome:"Combo Educação Completo",    nicho:"educacao",    precoDe:49.20, preco:14.76, desconto:70, link:"#" },
  { id:"c-atendimento", nome:"Combo Atendimento Completo", nicho:"atendimento", precoDe:36.90, preco:11.07, desconto:70, link:"#" },
  { id:"c-design",      nome:"Combo Design Completo",      nicho:"design",      precoDe:49.20, preco:14.76, desconto:70, link:"#" },
  { id:"c-tech",        nome:"Combo Tech Completo",        nicho:"tech",        precoDe:49.20, preco:14.76, desconto:70, link:"#" },
];

const COMBO_COMPLETO = { nome:"Combo Completo", subtitulo:"Todos os 23 DNAs", precoDe:89.00, preco:35.60, desconto:60, link:"#" };

window.DNA_DATA = { CONFIG, NICHOS, PRODUTOS, COMBOS, COMBO_COMPLETO };
