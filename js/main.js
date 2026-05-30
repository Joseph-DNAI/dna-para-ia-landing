/* =========================================================================
   DNA para IA — Interações
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.DNA_DATA || {};
  var NICHOS = DATA.NICHOS || [];
  var PRODUTOS = DATA.PRODUTOS || [];

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
    });
  }

  /* ---- Oferta: combos por nicho + link do combo completo ---- */
  function renderCombos() {
    var COMBOS = DATA.COMBOS || [];
    var el = document.getElementById("lista-combos");
    if (!el) return;
    el.innerHTML = COMBOS.map(function (c) {
      return '<li class="combo-row">' +
        '<span class="combo-nome">' + c.nome.replace(/^Combo\s+/, "") + "</span>" +
        '<span class="combo-preco">' +
        '<span class="de">' + fmt(c.precoDe) + "</span>" +
        "<strong>" + fmt(c.preco) + "</strong>" +
        "</span>" +
        '<a class="combo-link" href="' + c.link + '" aria-label="Comprar ' + c.nome + '">Comprar</a>' +
        "</li>";
    }).join("");
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
    renderCombos();
    applyComboCompletoLink();
    setupFaq();
    setupHeader();
    tagReveal();
    setupReveal();
  });
})();
