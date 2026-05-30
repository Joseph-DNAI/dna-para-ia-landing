# DNA para IA — Landing Page de Alta Conversão

**Data:** 2026-05-29
**Status:** Aprovado para implementação
**Plataforma de checkout:** Yampi (links ainda não cadastrados — usar config central com placeholders)

---

## 1. Objetivo

Landing page profissional e persuasiva para o produto digital **DNA para IA**: um PDF com prompt especializado que, anexado a qualquer IA (ChatGPT, Claude, Gemini), a transforma em consultor especialista da área profissional do comprador.

**Meta de conversão:** levar o visitante a comprar um DNA individual, um combo por nicho, ou o combo completo (23 DNAs) via checkout Yampi.

**Tagline:** "Ensine sua IA a pensar como um especialista na sua área."

**Conceito central:** assim como o DNA define quem você é, o "DNA para IA" define como a sua IA pensa, raciocina e responde — especializada para a sua profissão.

---

## 2. Público & Dores

**Público:** profissionais brasileiros (iniciante → avançado) que usam ou querem usar IA no trabalho mas não extraem resultado real dela.

**Dores a atacar na copy:**
- Usa IA mas só recebe respostas genéricas.
- Perde tempo tentando criar prompts eficientes.
- Sente que a IA não entende seu contexto profissional.
- Não sabe por onde começar.

**Tom:** direto, prático, tecnológico mas acessível, confiante e orientado a resultado. Português BR informal-profissional.

---

## 3. Sistema Visual

- **Fundo:** `#06070d` (preto-azulado), com camadas/glows roxos posicionados.
- **Destaque (accent):** gradiente `#8b5cff → #c44bff`. Lilás `#a78bff` para realces de texto.
- **Texto:** branco `#f5f6fa` (títulos), cinza `#9aa0ae` (corpo/secundário).
- **Superfícies/cards:** `#0d0e16` / `#111119` com borda sutil `rgba(255,255,255,.06)`.
- **Tipografia:** *Space Grotesk* (títulos), *Inter* (corpo) — Google Fonts.
- **Marca provisória:** wordmark `DNA` + `.IA` (`.IA` em gradiente) + ícone SVG de hélice de DNA estilizada. Substituível por logo futuro.
- **Tokens em CSS custom properties** (`:root`) para troca fácil de cor.

**Animações:** reveal no scroll via `IntersectionObserver` (fade + translateY); glow pulsante no hero; hover lift nos cards; scroll suave. Respeitar `prefers-reduced-motion`.

---

## 4. Estrutura de Arquivos

```
dna-para-ia/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── products.js   # dados dos 23 DNAs + combos + CONFIG de links Yampi
│   └── main.js       # filtro de nichos, render de cards, animações, FAQ
└── assets/           # (SVGs inline; pasta reservada para imagens futuras)
```

Sem build, sem dependências externas além de Google Fonts. Mobile-first, responsivo.

---

## 5. Modelo de Dados (`js/products.js`)

Config central única — quando os links da Yampi existirem, editar só aqui.

```js
const CONFIG = {
  checkoutBase: "#", // trocar por base/URLs Yampi
  guaranteeDays: 7,
};

const NICHOS = [
  { id: "empreendedorismo", label: "Empreendedorismo", icon: "<svg…>" },
  { id: "marketing", label: "Marketing e Publicidade", icon: "…" },
  { id: "vendas", label: "Vendas", icon: "…" },
  { id: "atendimento", label: "Atendimento ao Cliente", icon: "…" },
  { id: "educacao", label: "Educação", icon: "…" },
  { id: "design", label: "Design e Criativo", icon: "…" },
  { id: "tech", label: "Programação e TI", icon: "…" },
];

// 23 produtos individuais
const PRODUTOS = [
  { id, nome, nicho, profissoes: [...], precoDe: 12.30, preco: 9.80, link: "#" },
  …
];

// Combos por nicho + combo completo
const COMBOS = [
  { id:"marketing", nome:"Combo Marketing Completo", nicho:"marketing", precoDe:56.00, preco:16.80, desconto:70, link:"#" },
  { id:"vendas",     …, precoDe:48.90, preco:14.67 },
  { id:"educacao",   …, precoDe:49.20, preco:14.76 },
  { id:"atendimento",…, precoDe:36.90, preco:11.07 },
  // demais nichos: precoDe/por a definir no mesmo padrão -70%
];

const COMBO_COMPLETO = { nome:"Combo Completo — 23 DNAs", precoDe:89.00, preco:26.70, desconto:70, link:"#" };
```

### 5.1 Os 23 produtos (7 nichos)

- **Empreendedorismo (1):** DNA Empreendedor Digital
- **Marketing (4):** Criação de Conteúdo · Conversão e Vendas · Tráfego e Performance · SEO
- **Vendas (3):** Prospecção e Qualificação · Fechamento e Negociação · Gestão Comercial
- **Atendimento (3):** Suporte e Resolução · Atendimento Conversacional · Customer Success
- **Educação (4):** Ensino e Tutoria · Criação de Cursos · Mentoria e Desenvolvimento · Gestão Pedagógica
- **Design (4):** Design Visual e Identidade · Experiência e Interface · Ilustração e Arte Digital · Vídeo e Motion
- **Programação e TI (4):** Front-end · Back-end e Full Stack · Qualidade e Testes · Infraestrutura e Operações

Cada produto traz as profissões cobertas (ex.: Conversão e Vendas → Copywriter, Email Marketing, Growth Hacker) usadas como subtítulo/tooltip no card.

### 5.2 Preços (referência: dnai.shop, padrão -70%)

| Tipo | De | Por |
|---|---|---|
| DNA individual | R$ 12,30 (ref.) | **R$ 9,80** |
| Combo Marketing | R$ 56,00 | **R$ 16,80** |
| Combo Vendas | R$ 48,90 | **R$ 14,67** |
| Combo Educação | R$ 49,20 | **R$ 14,76** |
| Combo Atendimento | R$ 36,90 | **R$ 11,07** |
| Combo Completo (23) | R$ 89,00 | **R$ 26,70** |

> Combos de Empreendedorismo, Vendas-extras, Design e TI: aplicar mesmo padrão -70% quando os valores oficiais forem confirmados. Preços individuais variam de R$12,30–16,30 "de" → R$9,80 "por" conforme o site.

---

## 6. Seções da Página

1. **Header fixo** — logo + nav âncora (Como funciona · Produtos · Oferta · FAQ) + CTA "Quero meu DNA". Encolhe/escurece no scroll. Menu hambúrguer no mobile.

2. **Hero** — headline (tagline), subheadline explicando o conceito, CTA primário + secundário ("Ver áreas"), mockup de PDF flutuante (capa "DNA para IA" em SVG/CSS) com glow. Faixa de confiança: "Funciona em ChatGPT · Claude · Gemini · qualquer IA".

3. **Problema** — "Por que a IA genérica não resolve": 3–4 cards de dor (respostas genéricas, perda de tempo, falta de contexto, não sabe começar).

4. **Solução** — o que é o DNA para IA; diferencial (não é lista de prompts — é sistema com identidade, base teórica e formulário de personalização); adapta ao nível do usuário.

5. **Como Funciona** — passo a passo visual em 3 etapas: (1) Baixe o PDF, (2) Anexe na sua IA, (3) Responda o formulário e ganhe um especialista. Mini-exemplo de uso (antes/depois de resposta).

6. **Para Quem É** — chips de filtro por nicho (7 + "Todos"); grid de cards renderizado de `PRODUTOS`. Filtro client-side mostra/esconde por nicho com animação. Cada card: ícone do nicho, nome do DNA, profissões, preço, botão "Comprar".

7. **Benefícios** — antes/depois do uso (coluna "IA comum" vs "IA com DNA") + lista de ganhos (resultado real, economia de tempo, especialista 24/7, valor imediato).

8. **Oferta** — 3 planos: Individual (R$9,80) · Combo por Nicho (a partir de R$11) · **Combo Completo (R$26,70, card em destaque "MELHOR ESCOLHA")**. Ancoragem -70% com preço cortado + selo de desconto. CTAs por plano.

9. **Garantia** — selo de **7 dias** de garantia incondicional (direito de arrependimento / mínimo Yampi). Copy de risco reverso.

10. **FAQ** — acordeão com dúvidas: "Funciona em qualquer IA?", "Preciso saber prompt?", "É assinatura?", "Como recebo?", "Serve pro meu nível?", "E se não gostar?".

11. **CTA Final** — headline de fechamento + botão de compra + reforço de garantia.

12. **Footer** — marca, links âncora, aviso legal, e-mail de contato.

---

## 7. Interações (`js/main.js`)

- Render dos cards de produto a partir de `PRODUTOS`.
- Filtro por nicho (chips) com transição.
- Acordeão do FAQ (um aberto por vez).
- Reveal no scroll (`IntersectionObserver`).
- Header com estado "scrolled".
- Menu mobile (toggle).
- Todos os CTAs leem o link de `CONFIG`/produto (placeholder `#` até a Yampi).
- `prefers-reduced-motion`: desliga animações.

---

## 8. Prova Social (honesta)

Sem depoimentos inventados. Seção de depoimentos é montada com **placeholders explícitos** ("Seu depoimento aqui — em breve") prontos pra preencher, e a confiança é reforçada por elementos reais: compatibilidade com todas as IAs, 23 áreas, garantia de 7 dias, entrega imediata.

---

## 9. Performance & Qualidade

- HTML semântico, acessível (contraste AA, `alt`, foco visível, navegação por teclado no FAQ/menu).
- CSS com custom properties; sem framework.
- Fontes via `preconnect` + `display=swap`.
- SVGs inline (sem requests extras de imagem).
- Mobile-first; breakpoints ~640 / 900 / 1200px.
- Sem JS bloqueante; scripts no fim do `body`.

---

## 10. Fora de escopo (YAGNI)

- Integração real de pagamento (só links placeholder até a Yampi).
- Backend, formulários de captura, analytics (podem entrar depois).
- Depoimentos reais (estrutura pronta, conteúdo futuro).
- Logo final (wordmark provisório serve por ora).
