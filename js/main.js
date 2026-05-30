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

  document.addEventListener("DOMContentLoaded", function () {
    renderChips();
    renderProdutos();
    setupFiltro();
    renderCombos();
    applyComboCompletoLink();
    setupFaq();
  });
})();
