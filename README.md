# DNA para IA — Landing Page

Landing page estática (HTML + CSS + JavaScript vanilla, sem build) para o produto digital **DNA para IA**.

Tagline: _"Ensine sua IA a pensar como um especialista na sua área."_

## Estrutura

```
dna-para-ia/
├── index.html        # todas as seções (markup + SVGs inline)
├── css/styles.css    # design system (CSS custom properties) + estilos
├── js/products.js    # DADOS: produtos, nichos, combos e LINKS de checkout  ← edite aqui
├── js/main.js        # interações: filtro de nichos, oferta, FAQ, menu, animações
└── docs/superpowers/ # especificação e plano de implementação
```

## ▶️ Como rodar localmente

É só abrir o `index.html` no navegador. Para evitar restrições de `file://`, sirva por um servidor simples:

```bash
# Python
python -m http.server 8000
# ou Node
npx serve .
```

Acesse `http://localhost:8000`.

## 🔗 Plugando os links da Yampi (IMPORTANTE)

Todos os links de checkout estão centralizados em **`js/products.js`**. Hoje estão como `"#"` (placeholder). Quando os produtos estiverem cadastrados na Yampi, substitua os `link:` pelos URLs reais:

- **Produtos individuais** → array `PRODUTOS`, campo `link` de cada item (23 links).
- **Combos por nicho** → array `COMBOS`, campo `link` (6 links).
- **Combo completo** → objeto `COMBO_COMPLETO`, campo `link` (1 link).

Exemplo:

```js
{ id:"conversao-vendas", nome:"DNA Conversão e Vendas", /* ... */ link:"https://seu-checkout.yampi.com.br/..." },
```

Nada mais precisa ser tocado — a página lê esses valores e atualiza todos os botões automaticamente.

### Preços

Os preços também ficam em `js/products.js` (`precoDe` / `preco`). O padrão é o "de/por" com **-70%** nos combos. Os combos de **Empreendedorismo, Design e TI** estão com valores estimados no mesmo padrão — confirme/ajuste quando tiver os oficiais.

## 🎨 Identidade visual

Paleta tech escura com destaque roxo/gradiente. Tudo via CSS custom properties no topo de `css/styles.css` (`:root`) — para reskin, basta trocar os tokens:

- `--bg:#06070d` · `--accent:#8b5cff` → `--accent-2:#c44bff`
- Fontes: Space Grotesk (títulos) + Inter (corpo)

O logo atual é um wordmark `DNA.IA` + hélice SVG (provisório, pronto pra substituir).

## 🚀 Deploy (domínio dnai.shop / GoDaddy)

Por ser site estático, pode ser publicado de várias formas:

1. **Cloudflare Pages / Netlify / Vercel** (recomendado): suba a pasta, configure o domínio `dnai.shop` apontando os registros DNS na GoDaddy. HTTPS automático.
2. **Hospedagem GoDaddy (cPanel)**: envie `index.html`, `css/`, `js/` para `public_html` via Gerenciador de Arquivos/FTP.

> O domínio hoje aponta para um site no Canva — ao migrar, atualize o destino (DNS ou arquivos) para esta página.

## ✅ Status

Página completa e responsiva: 10 seções, 23 produtos filtráveis por nicho, oferta com 3 planos, FAQ, garantia de 7 dias e animações de scroll. Falta apenas plugar os links reais da Yampi e (opcional) trocar os depoimentos placeholder por reais.
