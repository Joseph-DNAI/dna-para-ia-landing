# DNA para IA — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma landing page estática, responsiva e de alta conversão para o produto digital "DNA para IA", com 10 seções, 23 produtos filtráveis por nicho e oferta com ancoragem -70%.

**Architecture:** Site estático sem build. `index.html` (markup semântico), `css/styles.css` (design system em CSS custom properties), `js/products.js` (dados + config central de links Yampi), `js/main.js` (render de cards, filtro, FAQ, animações). Sem dependências além de Google Fonts.

**Tech Stack:** HTML5 semântico, CSS3 (custom properties, grid/flex, clamp), JavaScript vanilla (ES6, IntersectionObserver), Google Fonts (Space Grotesk + Inter), SVG inline.

> **Nota sobre testes:** site estático sem framework de testes. "Verificação" = abrir `index.html` no navegador e confirmar o comportamento descrito. A lógica de filtro/render tem checagens explícitas no console.

---

## Estrutura de Arquivos

```
dna-para-ia/
├── index.html          # todas as seções + SVGs inline
├── css/styles.css       # design system + layout de todas as seções
├── js/products.js       # CONFIG, NICHOS, PRODUTOS, COMBOS, COMBO_COMPLETO
└── js/main.js           # render, filtro, FAQ, animações, menu mobile
```

Ordem de construção: dados → estrutura/design system → seções (topo→base) → interações → polish/responsivo.

---

### Task 1: Dados dos produtos (`js/products.js`)

**Files:**
- Create: `js/products.js`

- [ ] **Step 1: Criar CONFIG e NICHOS**

```js
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
```

- [ ] **Step 2: Criar os 23 PRODUTOS**

```js
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
```

- [ ] **Step 3: Criar COMBOS e COMBO_COMPLETO**

```js
// Combos por nicho — padrão -70%. Valores confirmados via dnai.shop;
// nichos sem valor oficial seguem o mesmo padrão (revisar quando confirmado).
const COMBOS = [
  { id:"c-marketing",   nome:"Combo Marketing Completo",   nicho:"marketing",   precoDe:56.00, preco:16.80, desconto:70, link:"#" },
  { id:"c-vendas",      nome:"Combo Vendas Completo",      nicho:"vendas",      precoDe:48.90, preco:14.67, desconto:70, link:"#" },
  { id:"c-educacao",    nome:"Combo Educação Completo",    nicho:"educacao",    precoDe:49.20, preco:14.76, desconto:70, link:"#" },
  { id:"c-atendimento", nome:"Combo Atendimento Completo", nicho:"atendimento", precoDe:36.90, preco:11.07, desconto:70, link:"#" },
  { id:"c-design",      nome:"Combo Design Completo",      nicho:"design",      precoDe:49.20, preco:14.76, desconto:70, link:"#" },
  { id:"c-tech",        nome:"Combo Tech Completo",        nicho:"tech",        precoDe:49.20, preco:14.76, desconto:70, link:"#" },
];

const COMBO_COMPLETO = { nome:"Combo Completo", subtitulo:"Todos os 23 DNAs", precoDe:89.00, preco:26.70, desconto:70, link:"#" };

// Exposto globalmente (sem módulos/bundler)
window.DNA_DATA = { CONFIG, NICHOS, PRODUTOS, COMBOS, COMBO_COMPLETO };
```

- [ ] **Step 4: Verificar no console**

Criar `index.html` mínimo temporário que carrega o script, abrir no navegador, no console rodar:
```js
console.log(DNA_DATA.PRODUTOS.length); // 23
console.log(DNA_DATA.NICHOS.length);   // 7
console.log(DNA_DATA.COMBOS.length);   // 6
```
Esperado: `23`, `7`, `6`.

- [ ] **Step 5: Commit**

```bash
git add js/products.js
git commit -m "feat: dados dos 23 produtos, nichos e combos"
```

---

### Task 2: Design system + esqueleto HTML

**Files:**
- Create: `index.html`
- Create: `css/styles.css`

- [ ] **Step 1: `css/styles.css` — tokens e reset**

```css
:root{
  --bg:#06070d; --bg-soft:#0d0e16; --surface:#111119; --border:rgba(255,255,255,.07);
  --txt:#f5f6fa; --txt-dim:#9aa0ae; --accent:#8b5cff; --accent-2:#c44bff; --accent-soft:#a78bff;
  --grad:linear-gradient(100deg,var(--accent),var(--accent-2));
  --maxw:1140px; --radius:16px; --ease:cubic-bezier(.22,1,.36,1);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--txt);font-family:"Inter",system-ui,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3{font-family:"Space Grotesk",sans-serif;line-height:1.1;font-weight:700}
a{color:inherit;text-decoration:none}
.container{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.grad-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
```

- [ ] **Step 2: `index.html` — head + ordem das seções (placeholders vazios)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DNA para IA — Ensine sua IA a pensar como um especialista na sua área</title>
<meta name="description" content="Transforme qualquer IA (ChatGPT, Claude, Gemini) em um consultor especialista na sua profissão. A partir de R$ 9,80.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header id="header"><!-- Task 3 --></header>
<main>
  <section id="hero"><!-- Task 3 --></section>
  <section id="problema"><!-- Task 4 --></section>
  <section id="solucao"><!-- Task 4 --></section>
  <section id="como-funciona"><!-- Task 5 --></section>
  <section id="produtos"><!-- Task 6 --></section>
  <section id="beneficios"><!-- Task 7 --></section>
  <section id="oferta"><!-- Task 7 --></section>
  <section id="garantia"><!-- Task 8 --></section>
  <section id="prova-social"><!-- Task 8 --></section>
  <section id="faq"><!-- Task 8 --></section>
  <section id="cta-final"><!-- Task 8 --></section>
</main>
<footer id="footer"><!-- Task 8 --></footer>
<script src="js/products.js"></script>
<script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Verificar** — abrir `index.html`, confirmar fundo escuro `#06070d` e fontes carregando (sem erros no console).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: design system (tokens) e esqueleto das seções"
```

---

### Task 3: Header + Hero

**Files:**
- Modify: `index.html` (`#header`, `#hero`)
- Modify: `css/styles.css`

- [ ] **Step 1:** Header fixo: logo `DNA<span class="grad-text">.IA</span>` + ícone SVG de hélice de DNA, nav âncora (Como funciona · Produtos · Oferta · FAQ), botão CTA "Quero meu DNA", botão hambúrguer (mobile). Markup semântico `<nav>`.

- [ ] **Step 2:** Hero: `<h1>` com tagline "Ensine sua IA a pensar como um **especialista** na sua área" (palavra em `.grad-text`), subheadline do conceito, CTA primário (→ `#oferta`) + secundário "Ver minha área" (→ `#produtos`), faixa "Funciona em ChatGPT · Claude · Gemini · qualquer IA". Mockup de PDF flutuante (capa em CSS/SVG com glow roxo).

- [ ] **Step 3:** CSS do header (sticky, blur, borda) e hero (grid 2 colunas desktop, 1 coluna mobile; glows de fundo via `::before` radial-gradient). Botões `.btn` e `.btn-grad` (gradiente).

- [ ] **Step 4: Verificar** — abrir no navegador: header fixo no topo, hero com headline em gradiente, mockup visível, CTAs clicáveis rolam para as seções.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: header fixo e seção hero com mockup de PDF"
```

---

### Task 4: Problema + Solução

**Files:**
- Modify: `index.html` (`#problema`, `#solucao`)
- Modify: `css/styles.css`

- [ ] **Step 1:** Problema — título "Você usa IA, mas ela ainda não entende a sua profissão"; grid de 4 cards de dor (respostas genéricas / perde tempo com prompts / IA não capta seu contexto / não sabe por onde começar), cada um com ícone SVG e texto.

- [ ] **Step 2:** Solução — "O que é o DNA para IA": explicação do conceito + 3 diferenciais (sistema completo com identidade + base teórica + formulário; funciona em qualquer IA; adapta ao nível iniciante/intermediário/avançado). Bloco destacando "não é lista de prompts genéricos".

- [ ] **Step 3:** CSS: `.section` (padding vertical, título centralizado + `.label` uppercase gradiente), grid de cards responsivo (`repeat(auto-fit,minmax(240px,1fr))`), estilo de card (surface + borda + hover lift).

- [ ] **Step 4: Verificar** — seções Problema e Solução renderizam, cards em grid no desktop e empilhados no mobile (DevTools responsive).

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: seções de problema e solução"
```

---

### Task 5: Como Funciona

**Files:**
- Modify: `index.html` (`#como-funciona`)
- Modify: `css/styles.css`

- [ ] **Step 1:** 3 passos numerados horizontais (1 Baixe o PDF · 2 Anexe na sua IA · 3 Responda o formulário e ganhe um especialista), cada um com número em círculo gradiente, ícone, título e descrição. Conector visual entre passos no desktop.

- [ ] **Step 2:** Mini-exemplo "antes/depois": dois balões — "IA comum" (resposta genérica) vs "IA com DNA" (resposta especialista) — ilustrando o ganho.

- [ ] **Step 3:** CSS dos passos (grid 3 col desktop, coluna mobile; linha conectora via `::after`) e dos balões de chat.

- [ ] **Step 4: Verificar** — 3 passos visíveis e numerados; balões antes/depois legíveis; responsivo.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: seção como funciona com passo a passo e exemplo"
```

---

### Task 6: Produtos + filtro por nicho (`#produtos` + `js/main.js`)

**Files:**
- Modify: `index.html` (`#produtos`)
- Create: `js/main.js`
- Modify: `css/styles.css`

- [ ] **Step 1:** HTML: título "Para quem é o DNA para IA", contêiner de chips de filtro `#filtros` e grid vazio `#grid-produtos` (preenchido via JS).

- [ ] **Step 2:** `js/main.js` — render dos chips a partir de `DNA_DATA.NICHOS` (+ chip "Todos", ativo por default) e render dos cards a partir de `DNA_DATA.PRODUTOS`:

```js
const { NICHOS, PRODUTOS } = window.DNA_DATA;
const fmt = v => "R$ " + v.toFixed(2).replace(".", ",");

function renderChips(){
  const wrap = document.getElementById("filtros");
  const chips = [{id:"todos",short:"Todos"}, ...NICHOS];
  wrap.innerHTML = chips.map(c =>
    `<button class="chip${c.id==="todos"?" active":""}" data-nicho="${c.id}">${c.short||c.label}</button>`
  ).join("");
}

function cardHTML(p){
  return `<article class="card-prod" data-nicho="${p.nicho}">
    <h3>${p.nome}</h3>
    <p class="profs">${p.profissoes.join(" · ")}</p>
    <div class="preco"><span class="de">${fmt(p.precoDe)}</span> <strong>${fmt(p.preco)}</strong></div>
    <a class="btn btn-grad" href="${p.link}">Comprar</a>
  </article>`;
}

function renderProdutos(){
  document.getElementById("grid-produtos").innerHTML = PRODUTOS.map(cardHTML).join("");
}
```

- [ ] **Step 3:** Filtro — clique no chip filtra os cards:

```js
function setupFiltro(){
  const grid = document.getElementById("grid-produtos");
  document.getElementById("filtros").addEventListener("click", e => {
    const btn = e.target.closest(".chip"); if(!btn) return;
    document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");
    const nicho = btn.dataset.nicho;
    grid.querySelectorAll(".card-prod").forEach(card => {
      const show = nicho==="todos" || card.dataset.nicho===nicho;
      card.classList.toggle("hidden", !show);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChips(); renderProdutos(); setupFiltro();
});
```

- [ ] **Step 4:** CSS: `.chip` (pill, borda; `.active` com fundo gradiente), grid de cards, `.card-prod` (surface, hover), `.preco .de` (riscado, dim), `.hidden{display:none}`.

- [ ] **Step 5: Verificar comportamento do filtro:**
  - Abrir no navegador → 23 cards aparecem, chip "Todos" ativo.
  - Console: `document.querySelectorAll('.card-prod').length` → `23`.
  - Clicar chip "Marketing" → apenas 4 cards visíveis. Console: `document.querySelectorAll('.card-prod:not(.hidden)').length` → `4`.
  - Clicar "Vendas" → 3 visíveis. "Todos" → 23 de novo.

- [ ] **Step 6: Commit**

```bash
git add index.html js/main.js css/styles.css
git commit -m "feat: grid de produtos com filtro por nicho"
```

---

### Task 7: Benefícios + Oferta

**Files:**
- Modify: `index.html` (`#beneficios`, `#oferta`)
- Modify: `js/main.js` (render dos combos)
- Modify: `css/styles.css`

- [ ] **Step 1:** Benefícios — comparativo "IA comum" × "IA com DNA" (duas colunas com ✗/✓) + lista de ganhos (resultado real, economia de tempo, especialista 24/7, valor imediato no 1º uso).

- [ ] **Step 2:** Oferta — 3 planos:
  - **Individual** — R$ 9,80 (1 DNA da sua área), CTA → `#produtos`.
  - **Combo por Nicho** — "a partir de R$ 11,07", lista combos via JS, selo -70%.
  - **Combo Completo** — card em destaque ("MELHOR ESCOLHA"), ~~R$ 89,00~~ **R$ 26,70**, selo -70%, CTA `COMBO_COMPLETO.link`.

- [ ] **Step 3:** `js/main.js` — render dos combos por nicho a partir de `DNA_DATA.COMBOS` dentro do card "Combo por Nicho":

```js
function renderCombos(){
  const { COMBOS } = window.DNA_DATA;
  const el = document.getElementById("lista-combos");
  if(!el) return;
  el.innerHTML = COMBOS.map(c =>
    `<li><span>${c.nome}</span>
       <span class="preco"><span class="de">${fmt(c.precoDe)}</span> <strong>${fmt(c.preco)}</strong>
       <a class="link-combo" href="${c.link}">Comprar</a></span></li>`
  ).join("");
}
```
Chamar `renderCombos()` dentro do `DOMContentLoaded`.

- [ ] **Step 4:** CSS dos planos (3 col desktop → 1 mobile), card em destaque (borda gradiente + badge), selo de desconto `.badge-off`, preço de/por consistente com `.preco`.

- [ ] **Step 5: Verificar** — Console: `document.querySelectorAll('#lista-combos li').length` → `6`. Card "Combo Completo" visualmente destacado; preços de/por corretos.

- [ ] **Step 6: Commit**

```bash
git add index.html js/main.js css/styles.css
git commit -m "feat: seções de benefícios e oferta com planos e combos"
```

---

### Task 8: Garantia + Prova Social + FAQ + CTA Final + Footer

**Files:**
- Modify: `index.html` (`#garantia`, `#prova-social`, `#faq`, `#cta-final`, `#footer`)
- Modify: `js/main.js` (acordeão FAQ)
- Modify: `css/styles.css`

- [ ] **Step 1:** Garantia — selo de 7 dias (SVG escudo) + copy de risco reverso ("teste sem risco; se não for pra você, devolvemos 100%").

- [ ] **Step 2:** Prova social honesta — faixa de elementos reais (compatível com todas as IAs · 23 áreas · entrega imediata · garantia) + 3 cards de depoimento com placeholder explícito "Seu depoimento aqui — em breve" (atributo `data-placeholder`).

- [ ] **Step 3:** FAQ — `<details>`/`<summary>` ou divs com acordeão JS. Perguntas: funciona em qualquer IA? · preciso saber prompt? · é assinatura? · como recebo? · serve pro meu nível? · e se eu não gostar? Cada uma com resposta real.

- [ ] **Step 4:** CTA Final — headline de fechamento ("Dê à sua IA o DNA da sua profissão") + botão de compra (→ `#oferta`) + reforço de garantia. Footer — marca, links âncora, e-mail de contato (jojopablorafa.jf@gmail.com), © 2026.

- [ ] **Step 5:** `js/main.js` — acordeão (um aberto por vez), se não usar `<details>` nativo:

```js
function setupFaq(){
  document.querySelectorAll(".faq-item").forEach(item => {
    item.querySelector(".faq-q").addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("open"));
      if(!open) item.classList.add("open");
    });
  });
}
```
Chamar no `DOMContentLoaded`.

- [ ] **Step 6:** CSS de garantia, faixa de prova, FAQ (transição de altura) e footer.

- [ ] **Step 7: Verificar** — todas as seções presentes; FAQ abre/fecha um item por vez; links do footer rolam às âncoras.

- [ ] **Step 8: Commit**

```bash
git add index.html js/main.js css/styles.css
git commit -m "feat: garantia, prova social, FAQ, CTA final e footer"
```

---

### Task 9: Animações de scroll + header scrolled + menu mobile

**Files:**
- Modify: `js/main.js`
- Modify: `css/styles.css`

- [ ] **Step 1:** Reveal no scroll via IntersectionObserver:

```js
function setupReveal(){
  const els = document.querySelectorAll("[data-reveal], .section, .card-prod, .plano");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} });
  }, { threshold:0.12 });
  els.forEach(el=>{ el.classList.add("reveal"); io.observe(el); });
}
```
CSS: `.reveal{opacity:0;transform:translateY(24px);transition:.7s var(--ease)} .reveal.in{opacity:1;transform:none}`.

- [ ] **Step 2:** Header "scrolled" (sombra/fundo mais opaco após 40px) + menu mobile toggle:

```js
function setupHeader(){
  const h = document.getElementById("header");
  addEventListener("scroll", () => h.classList.toggle("scrolled", scrollY>40), {passive:true});
  const burger = document.getElementById("burger");
  burger?.addEventListener("click", () => document.getElementById("header").classList.toggle("nav-open"));
}
```

- [ ] **Step 3:** Chamar `setupReveal()` e `setupHeader()` no `DOMContentLoaded`. CSS do menu mobile (nav vira overlay quando `.nav-open`).

- [ ] **Step 4: Verificar** — rolar a página: seções aparecem com fade; header muda de aparência; em viewport mobile, hambúrguer abre/fecha o menu. Conferir `prefers-reduced-motion` (DevTools → Rendering → emulate) desliga as animações.

- [ ] **Step 5: Commit**

```bash
git add js/main.js css/styles.css
git commit -m "feat: animações de reveal, header scrolled e menu mobile"
```

---

### Task 10: Polish responsivo + acessibilidade + verificação final

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html` (atributos a11y)

- [ ] **Step 1:** Revisar breakpoints (640 / 900 / 1200): tipografia fluida com `clamp()`, espaçamentos, grids empilhando corretamente. Testar em 360px (mobile), 768px (tablet), 1280px (desktop) no DevTools.

- [ ] **Step 2:** Acessibilidade — `aria-label` no hambúrguer e ícones, `aria-expanded` no FAQ, foco visível (`:focus-visible`), contraste do texto dim ≥ AA, `alt` em elementos gráficos significativos, ordem de tabulação lógica.

- [ ] **Step 3:** Verificação final (checklist manual):
  - Todas as 10 seções renderizam sem erro no console.
  - Filtro de nichos: cada nicho mostra a contagem certa de cards.
  - Todos os CTAs apontam para âncora ou para o link (placeholder `#`) — nenhum link quebrado de navegação.
  - Responsivo em 360 / 768 / 1280.
  - Lighthouse (DevTools) — sem erros críticos de acessibilidade/perf.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "polish: responsivo, acessibilidade e ajustes finais"
```

---

## Self-Review

**Cobertura da spec:**
- Sistema visual (§3) → Task 2. Header/Hero (§6.1-2) → Task 3. Problema/Solução (§6.3-4) → Task 4. Como Funciona (§6.5) → Task 5. Para Quem É + filtro (§6.6, §7) → Task 6. Benefícios/Oferta (§6.7-8) → Task 7. Garantia/Prova/FAQ/CTA/Footer (§6.9-12, §8) → Task 8. Animações (§3) → Task 9. Performance/a11y/responsivo (§9) → Task 10. Dados (§5) → Task 1. ✔ Sem lacunas.

**Placeholders:** links Yampi e depoimentos são placeholders *intencionais* (decisão da spec, §8 e §4), não lacunas do plano. Todo código de etapa está completo.

**Consistência de tipos:** `DNA_DATA` exposto em Task 1 e consumido em Tasks 6/7. `fmt()` definido em Task 6, reutilizado em Task 7. Funções de setup todas chamadas no `DOMContentLoaded`. Classes `.preco/.de`, `.chip`, `.card-prod`, `.hidden`, `.reveal` consistentes entre tasks.
