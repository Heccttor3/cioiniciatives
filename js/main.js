(function () {
  // Correu on arriben els missatges del formulari. Deixa'l buit fins que el CIO en tingui un.
  var CONTACT_EMAIL = "";

  // Vídeo de presentació en llengua de signes (LSC). Posa aquí l'enllaç quan n'hi hagi un.
  var VIDEO_LSC = "";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function cadaUn(sel, fn, dins) { Array.prototype.forEach.call((dins || document).querySelectorAll(sel), fn); }

  // ---------- Idiomes ----------
  // La web sempre s'obre en català (el text de l'HTML). El selector CA / ES / EN canvia els textos
  // marcats amb data-i18n (contingut) i data-i18n-attr (atributs com alt o aria-label).
  // Les traduccions són a js/idiomes.js.
  var IDIOMES = window.CIO_IDIOMES || {};
  var idioma = "ca";
  var originals = {};
  // Textos en català que no són a l'HTML perquè els escriu el JavaScript
  var CA = {
    "verbs": ["cuinem.", "creem.", "fem ràdio.", "sortim al carrer.", "fem barri."],
    "newtab": " (s'obre en una pestanya nova)",
    "menu.open": "Obre el menú",
    "menu.close": "Tanca el menú",
    "lector.llegint": "Llegint la pàgina",
    "lector.pausa": "Pausa",
    "lector.continua": "Continua",
    "lector.enpausa": "En pausa",
    "lector.error": "No s'ha pogut llegir en veu alta",
    "form.invalid": "Omple el nom, el correu, el missatge i accepta l'ús de les dades per poder enviar-lo.",
    "form.noconnectat": "Aquest formulari encara no està connectat. Mentrestant, escriu-nos per Instagram a @cio.iniciatives.",
    "form.preparat": "Hem preparat el missatge al teu programa de correu. Si no s'obre, escriu-nos a ",
    "form.assumpte": "Consulta des de cioiniciatives.cat"
  };
  function parells(el) {
    return el.getAttribute("data-i18n-attr").split(";").map(function (s) { return s.split(":"); });
  }
  cadaUn("[data-i18n]", function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in originals)) originals[k] = el.innerHTML;
  });
  cadaUn("[data-i18n-attr]", function (el) {
    parells(el).forEach(function (p) { if (!(p[1] in originals)) originals[p[1]] = el.getAttribute(p[0]); });
  });
  function T(k) {
    var d = IDIOMES[idioma];
    if (d && k in d) return d[k];
    if (k in originals) return originals[k];
    return CA[k];
  }

  // Avisa els lectors de pantalla dels enllaços que s'obren en una pestanya nova
  function marcaPestanyes() {
    var avis = T("newtab");
    cadaUn('a[target="_blank"]', function (a) {
      if (a.getAttribute("aria-hidden") === "true") return;
      var lab = a.getAttribute("aria-label");
      if (lab !== null) {
        var abans = a.getAttribute("data-avis");
        if (abans && lab.slice(-abans.length) === abans) lab = lab.slice(0, -abans.length);
        a.setAttribute("aria-label", lab + avis);
        a.setAttribute("data-avis", avis);
        return;
      }
      var s = a.querySelector(".nova-pestanya");
      if (!s) {
        s = document.createElement("span");
        s.className = "sr-only nova-pestanya";
        a.appendChild(s);
      }
      s.textContent = avis;
    });
  }

  function posaIdioma(nou) {
    idioma = (nou === "es" || nou === "en") && IDIOMES[nou] ? nou : "ca";
    root.setAttribute("lang", idioma);
    cadaUn("[data-i18n]", function (el) { el.innerHTML = T(el.getAttribute("data-i18n")); });
    cadaUn("[data-i18n-attr]", function (el) {
      parells(el).forEach(function (p) { el.setAttribute(p[0], T(p[1])); });
    });
    cadaUn("[data-lang]", function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === idioma)); });
    marcaPestanyes();
    verb.textContent = T("verbs")[iVerb];
    menuBtn.setAttribute("aria-label", T(menu.classList.contains("open") ? "menu.close" : "menu.open"));
    status.hidden = true;
    if (!lector.hidden) atura();
  }
  cadaUn("[data-lang]", function (b) {
    b.addEventListener("click", function () { posaIdioma(b.getAttribute("data-lang")); });
  });
  marcaPestanyes();

  // ---------- Menú mòbil ----------
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menu-btn");
  menuBtn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", T(open ? "menu.close" : "menu.open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", T("menu.open"));
    }
  });

  // ---------- Accessibilitat ----------
  var MODES = ["contrast", "links", "espai", "quiet", "sord"];
  function perDefecte() { return { text: 0, contrast: false, links: false, espai: false, quiet: false, sord: false }; }
  var opcions = perDefecte();
  try {
    var desat = JSON.parse(localStorage.getItem("cio-a11y") || "null");
    if (desat) Object.keys(opcions).forEach(function (k) { if (k in desat) opcions[k] = desat[k]; });
    else opcions.text = parseInt(localStorage.getItem("cio-mida") || "0", 10) || 0;
  } catch (e) {}

  var dialeg = document.getElementById("a11y");
  function marcaBotons(sel, actiu) {
    cadaUn(sel, function (b) { b.setAttribute("aria-pressed", String(actiu(b))); }, dialeg);
  }
  function aplica() {
    if (opcions.text) root.setAttribute("data-text", String(opcions.text)); else root.removeAttribute("data-text");
    MODES.forEach(function (k) { if (opcions[k]) root.setAttribute("data-" + k, ""); else root.removeAttribute("data-" + k); });
    marcaBotons("[data-mida]", function (b) { return +b.getAttribute("data-mida") === opcions.text; });
    marcaBotons("[data-opcio]", function (b) { return !!opcions[b.getAttribute("data-opcio")]; });
    marcaBotons('[data-perfil="visio"]', function () { return opcions.contrast && opcions.links && opcions.quiet && opcions.text === 2; });
    marcaBotons('[data-perfil="sord"]', function () { return opcions.sord; });
    try { localStorage.setItem("cio-a11y", JSON.stringify(opcions)); } catch (e) {}
  }
  aplica();

  function obreA11y() { if (dialeg.showModal) dialeg.showModal(); else dialeg.setAttribute("open", ""); }
  function tancaA11y() { if (dialeg.close) dialeg.close(); else dialeg.removeAttribute("open"); }
  document.getElementById("a11y-btn").addEventListener("click", obreA11y);
  cadaUn("[data-obre-a11y]", function (b) { b.addEventListener("click", obreA11y); });

  dialeg.addEventListener("click", function (e) {
    if (e.target === dialeg) { tancaA11y(); return; } // clic fora del panell
    var b = e.target.closest("button");
    if (!b) return;
    var perfil = b.getAttribute("data-perfil");
    if (b.id === "a11y-tanca") { tancaA11y(); return; }
    if (b.hasAttribute("data-mida")) opcions.text = +b.getAttribute("data-mida");
    else if (b.hasAttribute("data-opcio")) { var k = b.getAttribute("data-opcio"); opcions[k] = !opcions[k]; }
    else if (perfil === "visio") {
      var on = b.getAttribute("aria-pressed") !== "true";
      opcions.contrast = opcions.links = opcions.quiet = on;
      opcions.text = on ? 2 : 0;
    }
    else if (perfil === "sord") opcions.sord = !opcions.sord;
    else if (b.id === "a11y-reset") opcions = perDefecte();
    else return;
    aplica();
  });

  if (VIDEO_LSC) {
    var lsc = document.getElementById("lsc");
    lsc.href = VIDEO_LSC;
    lsc.hidden = false;
  }

  // Escolta la pàgina: llegeix en veu alta paràgraf a paràgraf i marca el que sona
  var synth = window.speechSynthesis;
  var lector = document.getElementById("lector");
  var lectorEstat = document.getElementById("lector-estat");
  var pausaBtn = document.getElementById("lector-pausa");
  var escoltaBtn = document.getElementById("escolta");
  var blocs = [], actual = 0, torn = 0, enPausa = false, veus = [];
  var VEUS = { ca: [/^ca/i, /^es/i], es: [/^es/i], en: [/^en/i] };
  var LANG_VEU = { ca: "ca-ES", es: "es-ES", en: "en-GB" };

  function triaVeu() { veus = synth.getVoices(); }
  // Veu per a l'idioma del paràgraf (els noms propis en català es llegeixen amb veu catalana)
  function veuPer(llengua) {
    var trobada = null;
    (VEUS[llengua] || VEUS.ca).some(function (re) {
      trobada = veus.filter(function (v) { return re.test(v.lang); })[0] || null;
      return !!trobada;
    });
    return trobada;
  }
  function textDe(el) {
    if (el.tagName === "H1") return (el.querySelector(".sr-only") || el).textContent.replace(/\s+/g, " ").trim();
    var c = el.cloneNode(true);
    cadaUn(".sr-only, [aria-hidden='true']", function (n) { n.remove(); }, c);
    cadaUn("br", function (n) { n.replaceWith(", "); }, c);
    return c.textContent.replace(/\s+/g, " ").trim();
  }
  function llegibles() {
    return Array.prototype.filter.call(document.querySelectorAll("main h1, main h2, main h3, main p, main dt, main dd"), function (el) {
      if (el.tagName !== "H1" && el.closest("[aria-hidden='true']")) return false;
      if (!el.getClientRects().length) return false; // amagat
      return textDe(el).length > 0;
    });
  }
  function marca(el) {
    var abans = document.querySelector(".llegint");
    if (abans) abans.classList.remove("llegint");
    if (!el) return;
    el.classList.add("llegint");
    el.scrollIntoView({ block: "center", behavior: (reduceMotion || opcions.quiet) ? "auto" : "smooth" });
  }
  function parla(i) {
    if (i >= blocs.length) { atura(); return; }
    actual = i;
    marca(blocs[i]);
    var u = new SpeechSynthesisUtterance(textDe(blocs[i]));
    var llengua = ((blocs[i].closest("[lang]") || root).getAttribute("lang") || idioma).slice(0, 2);
    var veu = veuPer(llengua);
    u.lang = veu ? veu.lang : (LANG_VEU[llengua] || LANG_VEU[idioma]);
    if (veu) u.voice = veu;
    u.rate = 0.95;
    var meu = torn;
    u.onend = function () { if (meu === torn && !enPausa) parla(actual + 1); };
    u.onerror = function (ev) {
      if (meu !== torn || ev.error === "interrupted" || ev.error === "canceled") return;
      atura();
      lectorEstat.textContent = T("lector.error");
    };
    synth.speak(u);
  }
  function comenca() {
    triaVeu();
    blocs = llegibles();
    var limit = document.querySelector(".top").getBoundingClientRect().bottom;
    var inici = 0;
    for (var j = 0; j < blocs.length; j++) {
      if (blocs[j].getBoundingClientRect().bottom > limit) { inici = j; break; }
    }
    torn++; enPausa = false; synth.cancel();
    lector.hidden = false;
    pausaBtn.textContent = T("lector.pausa");
    lectorEstat.textContent = T("lector.llegint");
    parla(inici);
  }
  function pausa() {
    torn++;
    if (enPausa) {
      enPausa = false;
      pausaBtn.textContent = T("lector.pausa");
      lectorEstat.textContent = T("lector.llegint");
      parla(actual);
    } else {
      enPausa = true;
      synth.cancel();
      pausaBtn.textContent = T("lector.continua");
      lectorEstat.textContent = T("lector.enpausa");
    }
  }
  function atura() {
    torn++; enPausa = false;
    if (synth) synth.cancel();
    marca(null);
    lector.hidden = true;
  }
  if (!synth || !window.SpeechSynthesisUtterance) {
    escoltaBtn.hidden = true;
    document.getElementById("escolta-no").hidden = false;
  } else {
    triaVeu();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", triaVeu);
    escoltaBtn.addEventListener("click", function () { tancaA11y(); comenca(); });
    pausaBtn.addEventListener("click", pausa);
    document.getElementById("lector-atura").addEventListener("click", atura);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lector.hidden && !dialeg.open) atura(); });
    window.addEventListener("pagehide", function () { synth.cancel(); });
  }

  // Verb que canvia a la portada (s'atura amb "Atura les animacions" o si el sistema ho demana)
  var verb = document.getElementById("verb");
  var iVerb = 0;
  setInterval(function () {
    if (reduceMotion || opcions.quiet) return;
    verb.classList.add("out");
    setTimeout(function () {
      var verbs = T("verbs");
      iVerb = (iVerb + 1) % verbs.length;
      verb.textContent = verbs[iVerb];
      verb.classList.remove("out");
    }, 350);
  }, 2800);

  // Marca la secció activa al menú
  var links = Array.prototype.slice.call(menu.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["inici", "cio", "activitats", "projectes", "noticies", "contacte"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Formulari de contacte
  var form = document.getElementById("form");
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = T("form.invalid");
      status.hidden = false;
      var first = form.querySelector(":invalid");
      if (first) first.focus();
      return;
    }
    if (!CONTACT_EMAIL) {
      status.textContent = T("form.noconnectat");
      status.hidden = false;
      return;
    }
    var d = new FormData(form);
    var body = d.get("missatge") + "\n\n" + d.get("nom") + "\n" + d.get("correu") + (d.get("telefon") ? "\n" + d.get("telefon") : "");
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(T("form.assumpte")) + "&body=" + encodeURIComponent(body);
    status.textContent = T("form.preparat") + CONTACT_EMAIL + ".";
    status.hidden = false;
  });

  document.getElementById("any").textContent = String(new Date().getFullYear());
})();
