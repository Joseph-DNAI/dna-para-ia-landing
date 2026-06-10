/* =========================================================================
   DNA para IA — Interações
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.DNA_DATA || {};
  var NICHOS = DATA.NICHOS || [];
  var PRODUTOS = DATA.PRODUTOS || [];

  var LINHAS_INICIAIS = 2;     // quantas linhas mostrar antes do "Ver mais"
  var produtosExpanded = false;

  function fmt(v) {
    return "R$ " + v.toFixed(2).replace(".", ",");
  }

  /* ---- Produtos: filtro por nicho ---- */
  function renderChips() {
    var wrap = document.getElementById("filtros");
    if (!wrap) return;
    var chips = [{ id: "todos", short: "Todos" }].concat(NICHOS);
    wrap.innerHTML = chips.map(function (c) {
      return '<button class="chip' + (c.id === "todos" ? " active" : "") +
        '" data-nicho="' + c.id + '" type="button" aria-pressed="' +
        (c.id === "todos" ? "true" : "false") + '">' +
        (c.short || c.label) + "</button>";
    }).join("");
  }

  function cardHTML(p) {
    return '<article class="card-prod" data-nicho="' + p.nicho + '">' +
      '<span class="card-prod-tag">' + nichoLabel(p.nicho) + "</span>" +
      "<h3>" + p.nome + "</h3>" +
      '<p class="profs">' + p.profissoes.join(" · ") + "</p>" +
      '<div class="preco"><span class="de">' + fmt(p.precoDe) +
      "</span> <strong>" + fmt(p.preco) + "</strong></div>" +
      '<a class="btn btn-grad btn-sm" href="' + p.link + '">Comprar</a>' +
      "</article>";
  }

  function nichoLabel(id) {
    for (var i = 0; i < NICHOS.length; i++) {
      if (NICHOS[i].id === id) return NICHOS[i].short || NICHOS[i].label;
    }
    return "";
  }

  function renderProdutos() {
    var grid = document.getElementById("grid-produtos");
    if (!grid) return;
    grid.innerHTML = PRODUTOS.map(cardHTML).join("");
  }

  /* Quantas colunas a grade tem agora (responsivo) */
  function colCount(grid) {
    var tpl = window.getComputedStyle(grid).getPropertyValue("grid-template-columns");
    if (!tpl || tpl === "none") return 1;
    return tpl.split(" ").filter(Boolean).length;
  }

  /* Mostra só LINHAS_INICIAIS linhas dos produtos visíveis; resto fica "clamped" */
  function applyProdutosClamp() {
    var grid = document.getElementById("grid-produtos");
    var btn = document.getElementById("ver-mais");
    if (!grid || !btn) return;

    var limite = colCount(grid) * LINHAS_INICIAIS;
    var visiveis = Array.prototype.filter.call(
      grid.querySelectorAll(".card-prod"),
      function (c) { return !c.classList.contains("hidden"); }
    );

    visiveis.forEach(function (card, i) {
      card.classList.toggle("clamped", !produtosExpanded && i >= limite);
    });

    var ocultos = visiveis.length - limite;
    if (ocultos <= 0) {
      btn.hidden = true;                       // cabe tudo em 2 linhas
    } else {
      btn.hidden = false;
      btn.textContent = produtosExpanded ? "Ver menos" : "Ver mais (+" + ocultos + ")";
      btn.setAttribute("aria-expanded", produtosExpanded ? "true" : "false");
    }
  }

  /* Popup promocional: aparece 1x por acesso e reaparece 30min após o último acesso */
  function setupPromoModal() {
    var modal = document.getElementById("promo-modal");
    if (!modal) return;
    var KEY = "dnaPromoLastAccess";
    var THIRTY = 30 * 60 * 1000;
    var now = Date.now();
    var last = 0;
    try { last = parseInt(localStorage.getItem(KEY) || "0", 10) || 0; } catch (e) {}

    function onKey(e) { if (e.key === "Escape") close(); }
    function close() {
      modal.classList.remove("show");
      document.removeEventListener("keydown", onKey);
      setTimeout(function () { modal.setAttribute("hidden", ""); }, 340);
    }
    function open() {
      modal.removeAttribute("hidden");
      void modal.offsetWidth; // reflow para animar
      modal.classList.add("show");
      document.addEventListener("keydown", onKey);
    }
    modal.querySelectorAll("[data-promo-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    if (now - last > THIRTY) setTimeout(open, 900);
    try { localStorage.setItem(KEY, String(now)); } catch (e) {}
  }

  /* Seta flutuante: visível só quando o catálogo de produtos está na tela */
  function setupVoltarPlanos() {
    var fab = document.getElementById("voltar-planos");
    var prod = document.getElementById("produtos");
    if (!fab || !prod) return;
    if (!("IntersectionObserver" in window)) { return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        fab.classList.toggle("show", en.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "-30% 0px -30% 0px" });
    io.observe(prod);
  }

  function setupVerMais() {
    var btn = document.getElementById("ver-mais");
    if (!btn) return;
    btn.addEventListener("click", function () {
      produtosExpanded = !produtosExpanded;
      applyProdutosClamp();
      if (!produtosExpanded) {
        var sec = document.getElementById("produtos");
        if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (!produtosExpanded) applyProdutosClamp();
      }, 150);
    }, { passive: true });
  }

  function setupFiltro() {
    var filtros = document.getElementById("filtros");
    var grid = document.getElementById("grid-produtos");
    if (!filtros || !grid) return;
    filtros.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      filtros.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      var nicho = btn.dataset.nicho;
      grid.querySelectorAll(".card-prod").forEach(function (card) {
        var show = nicho === "todos" || card.dataset.nicho === nicho;
        card.classList.toggle("hidden", !show);
      });
      produtosExpanded = false;   // ao trocar de filtro, volta a 2 linhas
      applyProdutosClamp();
    });
  }

  /* ---- Oferta: combos por nicho + link do combo completo ---- */
  function renderCombos() {
    var COMBOS = DATA.COMBOS || [];
    var el = document.getElementById("lista-combos");
    if (!el) return;
    el.innerHTML = COMBOS.map(function (c) {
      var areas = PRODUTOS
        .filter(function (p) { return p.nicho === c.nicho; })
        .map(function (p) { return p.nome.replace(/^DNA\s+/, ""); })
        .join(" · ");
      return '<li class="combo-row">' +
        '<button class="combo-toggle" type="button" aria-expanded="false"' + (areas ? "" : " disabled") + '>' +
        '<span class="combo-nome">' + c.nome.replace(/^Combo\s+/, "") + "</span>" +
        (areas ? '<svg class="combo-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : "") +
        "</button>" +
        '<span class="combo-preco">' +
        '<span class="de">' + fmt(c.precoDe) + "</span>" +
        "<strong>" + fmt(c.preco) + "</strong>" +
        "</span>" +
        '<a class="combo-link" href="' + c.link + '" aria-label="Comprar ' + c.nome + '">Comprar</a>' +
        (areas ? '<div class="combo-areas-wrap"><span class="combo-areas">' + areas + "</span></div>" : "") +
        "</li>";
    }).join("");
  }

  /* Combos por nicho: expandir/recolher a lista de áreas */
  function setupCombosToggle() {
    var el = document.getElementById("lista-combos");
    if (!el) return;
    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".combo-toggle");
      if (!btn || btn.disabled) return;
      var row = btn.closest(".combo-row");
      if (!row) return;
      var open = row.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function applyComboCompletoLink() {
    var cfg = DATA.COMBO_COMPLETO || {};
    var link = cfg.link || (DATA.CONFIG && DATA.CONFIG.comboCompletoLink) || "#";
    document.querySelectorAll("[data-combo-completo]").forEach(function (a) {
      a.setAttribute("href", link);
    });
  }

  /* ---- FAQ: acordeão (um aberto por vez) ---- */
  function setupFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (i) {
          i.classList.remove("open");
          var btn = i.querySelector(".faq-q");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---- Header: estado "scrolled" + menu mobile ---- */
  function setupHeader() {
    var header = document.getElementById("header");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var burger = document.getElementById("burger");
    if (burger) {
      burger.addEventListener("click", function () {
        var open = header.classList.toggle("nav-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      });
      // Fecha o menu ao clicar em qualquer link da navegação
      header.querySelectorAll(".nav-links a, .header-cta").forEach(function (a) {
        a.addEventListener("click", function () {
          header.classList.remove("nav-open");
          burger.setAttribute("aria-expanded", "false");
          burger.setAttribute("aria-label", "Abrir menu");
        });
      });
    }
  }

  /* ---- Reveal no scroll ---- */
  function setupReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Marca elementos para reveal (mantém o HTML limpo) */
  function tagReveal() {
    var sel = ".section-head, .card, .step, .ba-col, .ganhos li, " +
      ".plano, .garantia-card, .trust-strip li, .depo, .faq-item, .cta-final-card";
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.setAttribute("data-reveal", "");
      el.style.setProperty("--reveal-delay", (i % 6) * 45 + "ms");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderChips();
    renderProdutos();
    setupFiltro();
    setupVerMais();
    setupVoltarPlanos();
    setupPromoModal();
    applyProdutosClamp();
    renderCombos();
    setupCombosToggle();
    applyComboCompletoLink();
    setupFaq();
    setupHeader();
    tagReveal();
    setupReveal();
  });
})();
