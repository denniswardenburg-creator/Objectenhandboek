(function () {
  function setFooterYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function clearHighlight() {
    document.querySelectorAll(".highlight-reading").forEach((span) => {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    });
  }

  function cancelReading() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    clearHighlight();
  }

  function initSectionTabs() {
    const tabButtons = Array.from(
      document.querySelectorAll(".tab-btn[data-target]")
    );
    const sections = Array.from(document.querySelectorAll(".section-block"));
    const sectionLinks = Array.from(document.querySelectorAll(".js-section-link"));

    if (!sections.length || (!tabButtons.length && !sectionLinks.length)) return;

    function activateSection(targetId) {
      sections.forEach((section) => {
        section.classList.toggle("active", section.id === targetId);
      });

      tabButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.target === targetId);
      });

      cancelReading();
    }

    function scrollToTop() {
      const mainTop = document.getElementById("top");
      if (mainTop) mainTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activateSection(button.dataset.target);
      });
    });

    sectionLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        activateSection(link.dataset.target);
        scrollToTop();
      });
    });
  }

  function activatePackageTab(details, targetId) {
    const tabButtons = details.querySelectorAll(".tab-btn[data-tab]");
    const panels = details.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => button.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    const button = Array.from(tabButtons).find(
      (item) => item.dataset.tab === targetId
    );
    const target = details.querySelector("#" + targetId);

    if (button) button.classList.add("active");
    if (target) target.classList.add("active");
  }

  function initPackageTabs() {
    const detailsItems = Array.from(document.querySelectorAll(".object-details"));
    if (!detailsItems.length) return;

    detailsItems.forEach((details) => {
      details.querySelectorAll(".tab-btn[data-tab]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          activatePackageTab(details, button.dataset.tab);
        });
      });

      details.querySelectorAll("[data-toggle-target]").forEach((button) => {
        const targetId = button.getAttribute("data-toggle-target");
        const target = details.querySelector("#" + targetId);
        if (!target) return;

        button.addEventListener("click", () => {
          const isHidden = target.hasAttribute("hidden");
          if (isHidden) {
            target.removeAttribute("hidden");
            button.textContent = "Verberg de volledige tabel";
          } else {
            target.setAttribute("hidden", "");
            button.textContent = "Toon toch de volledige tabel";
          }
        });
      });
    });

    const params = new URLSearchParams(window.location.search);
    const objectToOpen = (params.get("open") || "").trim();
    const packageToOpen = (
      params.get("pakket") ||
      params.get("amp;pakket") ||
      ""
    )
      .trim()
      .replace(/\D/g, "")
      .charAt(0);

    if (!objectToOpen || !["1", "2", "3"].includes(packageToOpen)) return;

    const details = detailsItems.find(
      (item) => item.dataset.object === objectToOpen
    );
    if (!details) return;

    details.open = true;

    const tabButton = Array.from(details.querySelectorAll(".tab-btn[data-tab]")).find(
      (button) => button.dataset.tab.endsWith("-p" + packageToOpen)
    );

    if (tabButton) activatePackageTab(details, tabButton.dataset.tab);
    details.scrollIntoView({ block: "start" });
  }

  function initReadAloud() {
    const playBtn = document.getElementById("playBtn");
    const stopBtn = document.getElementById("stopBtn");
    if (
      !playBtn ||
      !stopBtn ||
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      return;
    }

    let nodes = [];
    let index = 0;

    function getNodes() {
      const container = document.querySelector("main");
      if (!container) return [];

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_REJECT;

          const tag = node.parentElement.tagName.toLowerCase();
          if (["button", "iframe", "script", "style"].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }

          const section = node.parentElement.closest(".section-block");
          if (section && !section.classList.contains("active")) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.parentElement.closest("[hidden], [aria-hidden='true']")) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.textContent.trim().length < 2) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const list = [];
      let node;
      while ((node = walker.nextNode())) list.push(node);
      return list;
    }

    function highlight(node) {
      clearHighlight();
      const span = document.createElement("span");
      span.className = "highlight-reading";
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
    }

    function speakNext() {
      if (index >= nodes.length) return;

      const text = nodes[index].textContent.trim();
      highlight(nodes[index]);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "nl-NL";
      utterance.onend = () => {
        index++;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    }

    playBtn.addEventListener("click", () => {
      cancelReading();
      nodes = getNodes();
      index = 0;
      speakNext();
    });

    stopBtn.addEventListener("click", cancelReading);
  }

  const HEADER_SEARCH_ITEMS = [     {         "title": "OV-baan",         "url": "ov-baan.html",         "category": "Wegdeel"     },     {         "title": "Overweg",         "url": "overweg.html",         "category": "Wegdeel"     },     {         "title": "Spoorbaan",         "url": "spoorbaan.html",         "category": "Wegdeel"     },     {         "title": "Rijbaan autosnelweg",         "url": "rijbaan_autosnelweg.html",         "category": "Wegdeel"     },     {         "title": "Rijbaan autoweg",         "url": "#",         "category": "Wegdeel"     },     {         "title": "Rijbaan regionale weg",         "url": "rijbaan_regionale_weg.html",         "category": "Wegdeel"     },     {         "title": "Rijbaan lokale weg",         "url": "rijbaan_lokale_weg.html",         "category": "Wegdeel"     },     {         "title": "Fietspad",         "url": "fietspad.html",         "category": "Wegdeel"     },     {         "title": "Voetpad",         "url": "voetpad.html",         "category": "Wegdeel"     },     {         "title": "Voetpad op trap",         "url": "voetpad_op_trap.html",         "category": "Wegdeel"     },     {         "title": "Ruiterpad",         "url": "ruiterpad.html",         "category": "Wegdeel"     },     {         "title": "Parkeervlak",         "url": "parkeervlak.html",         "category": "Wegdeel"     },     {         "title": "Voetgangersgebied",         "url": "voetgangersgebied.html",         "category": "Wegdeel"     },     {         "title": "Inrit",         "url": "inrit.html",         "category": "Wegdeel"     },     {         "title": "Woonerf",         "url": "woonerf.html",         "category": "Wegdeel"     },     {         "title": "Verbindingsweg",         "url": "#",         "category": "Wegdeel"     },     {         "title": "Calamiteitendoorsteek",         "url": "#",         "category": "Wegdeel"     },     {         "title": "Verkeersdrempel",         "url": "verkeersdrempel.html",         "category": "Wegdeel"     },     {         "title": "Begroeid terreindeel",         "url": "begroeid_terreindeel.html",         "category": "Begroeid terreindeel"     },     {         "title": "Pand",         "url": "pand.html",         "category": "Pand"     },     {         "title": "Brug",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Aquaduct",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Viaduct",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Ecoduct",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Landhoofd",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Pijler",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Sloof",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Pyloon",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Dek",         "url": "#",         "category": "Overbruggingsdeel"     },     {         "title": "Muur",         "url": "#",         "category": "Scheiding"     },     {         "title": "Kademuur",         "url": "#",         "category": "Scheiding"     },     {         "title": "Damwand",         "url": "#",         "category": "Scheiding"     },     {         "title": "Geluidsscherm",         "url": "#",         "category": "Scheiding"     },     {         "title": "Walbescherming",         "url": "#",         "category": "Scheiding"     },     {         "title": "Hek",         "url": "#",         "category": "Scheiding"     },     {         "title": "Draadraster",         "url": "#",         "category": "Scheiding"     },     {         "title": "Faunaraster",         "url": "#",         "category": "Scheiding"     },     {         "title": "Inrichtingselement",         "url": "#",         "category": "Inrichtingselement"     },     {         "title": "Installatie",         "url": "#",         "category": "Installatie"     },     {         "title": "Pomp",         "url": "#",         "category": "Installatie"     },     {         "title": "Zonnepaneel",         "url": "#",         "category": "Installatie"     },     {         "title": "Lichtmast",         "url": "#",         "category": "Paal"     },     {         "title": "Telpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Portaal",         "url": "#",         "category": "Paal"     },     {         "title": "Verkeersregelinstallatiepaal",         "url": "#",         "category": "Paal"     },     {         "title": "Verkeersbordpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Poller",         "url": "#",         "category": "Paal"     },     {         "title": "Haltepaal",         "url": "#",         "category": "Paal"     },     {         "title": "Vlaggenmast",         "url": "#",         "category": "Paal"     },     {         "title": "Afsluitpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Praatpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Hectometerpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Dijkpaal",         "url": "#",         "category": "Paal"     },     {         "title": "Drukknoppaal",         "url": "#",         "category": "Paal"     },     {         "title": "Grensmarkering",         "url": "#",         "category": "Paal"     },     {         "title": "Sirene",         "url": "#",         "category": "Paal"     },     {         "title": "Kunstobject",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Speelvoorziening",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Bank",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Picknicktafel",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Abri",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Bolder",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Brievenbus",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Fietsenrek",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Openbaar toilet",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Slagboom",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Telefooncel",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Fontein",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Lichtpunt",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Parkeerbeugel",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Betaalautomaat",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Reclamezuil",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Fietsenkluis",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Herdenkingsmonument",         "url": "#",         "category": "Straatmeubilair"     },     {         "title": "Boom",         "url": "#",         "category": "Vegetatie-object"     },     {         "title": "Haag",         "url": "haag.html",         "category": "Vegetatie-object"     },     {         "title": "Buurt",         "url": "#",         "category": "Buurt"     },     {         "title": "Ondersteunend wegdeel",         "url": "#",         "category": "Ondersteunend wegdeel"     },     {         "title": "Verkeerseiland",         "url": "verkeerseiland.html",         "category": "Ondersteunend wegdeel"     },     {         "title": "Berm",         "url": "berm.html",         "category": "Ondersteunend wegdeel"     },     {         "title": "Greppel/droge sloot",         "url": "greppel.html",         "category": "Waterdeel"     },     {         "title": "Waterloop",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Watervlakte",         "url": "watervlakte.html",         "category": "Waterdeel"     },     {         "title": "Beek",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Gracht",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Rivier",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Sloot",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Kanaal",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Bron",         "url": "waterloop.html",         "category": "Waterdeel"     },     {         "title": "Haven",         "url": "watervlakte.html",         "category": "Waterdeel"     },     {         "title": "Meer, plas, ven, vijver",         "url": "watervlakte.html",         "category": "Waterdeel"     },     {         "title": "Overige constructie",         "url": "#",         "category": "Overige constructie"     },     {         "title": "Tunneldeel",         "url": "tunneldeel.html",         "category": "Tunneldeel"     },     {         "title": "Kering",         "url": "functioneel_gebied_kering.html",         "category": "Functioneel gebied"     },     {         "title": "Bedrijvigheid",         "url": "functioneel_gebied_bedrijvigheid.html",         "category": "Functioneel gebied"     },     {         "title": "Natuur en landschap",         "url": "functioneel_gebied_natuur_en_landschap.html",         "category": "Functioneel gebied"     },     {         "title": "Landbouw",         "url": "functioneel_gebied_landbouw.html",         "category": "Functioneel gebied"     },     {         "title": "Bewoning",         "url": "functioneel_gebied_bewoning.html",         "category": "Functioneel gebied"     },     {         "title": "Infrastructuur verkeer en vervoer",         "url": "functioneel_gebied_infrastructuur_verkeer_en_vervoer.html",         "category": "Functioneel gebied"     },     {         "title": "Infrastructuur waterstaatswerken",         "url": "functioneel_gebied_infrastructuur_waterstaatswerken.html",         "category": "Functioneel gebied"     },     {         "title": "Waterbergingsgebied",         "url": "functioneel_gebied_waterbergingsgebied.html",         "category": "Functioneel gebied"     },     {         "title": "Maatschappelijke en/of publieksvoorziening",         "url": "functioneel_gebied_maatschappelijke_publieksvoorziening.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie",         "url": "functioneel_gebied_recreatie.html",         "category": "Functioneel gebied"     },     {         "title": "Begraafplaats",         "url": "functioneel_gebied_begraafplaats.html",         "category": "Functioneel gebied"     },     {         "title": "Functioneel beheer",         "url": "functioneel_gebied_functioneel_beheer.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: speeltuin",         "url": "functioneel_gebied_recreatie_speeltuin.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: park",         "url": "functioneel_gebied_recreatie_park.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: sportterrein",         "url": "functioneel_gebied_recreatie_sportterrein.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: camping",         "url": "functioneel_gebied_recreatie_camping.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: bungalowpark",         "url": "functioneel_gebied_recreatie_bungalowpark.html",         "category": "Functioneel gebied"     },     {         "title": "Bushalte",         "url": "functioneel_gebied_bushalte.html",         "category": "Functioneel gebied"     },     {         "title": "Carpoolplaats",         "url": "functioneel_gebied_carpoolplaats.html",         "category": "Functioneel gebied"     },     {         "title": "Benzinestation",         "url": "functioneel_gebied_benzinestation.html",         "category": "Functioneel gebied"     },     {         "title": "Verzorgingsplaats",         "url": "functioneel_gebied_verzorgingsplaats.html",         "category": "Functioneel gebied"     },     {         "title": "Functioneel beheer: hondenuitlaatplaats",         "url": "functioneel_gebied_functioneel_beheer_hondenuitlaatplaats.html",         "category": "Functioneel gebied"     },     {         "title": "Recreatie: volkstuin",         "url": "functioneel_gebied_recreatie_volkstuin.html",         "category": "Functioneel gebied"     },     {         "title": "Afval apart plaats",         "url": "afval_apart_plaats.html",         "category": "Bak"     },     {         "title": "Afvalbak",         "url": "afvalbak.html",         "category": "Bak"     },     {         "title": "Bloembak",         "url": "bloembak.html",         "category": "Bak"     },     {         "title": "Container",         "url": "container.html",         "category": "Bak"     },     {         "title": "Drinkbak",         "url": "drinkbak.html",         "category": "Bak"     },     {         "title": "Zand- / zoutbak",         "url": "zand_zoutbak.html",         "category": "Bak"     },     {         "title": "Rioolkast",         "url": "rioolkast.html",         "category": "Kast"     },     {         "title": "CAI-kast",         "url": "cai_kast.html",         "category": "Kast"     },     {         "title": "Elektrakast",         "url": "elektrakast.html",         "category": "Kast"     },     {         "title": "Gaskast",         "url": "gaskast.html",         "category": "Kast"     },     {         "title": "Telecomkast",         "url": "telecomkast.html",         "category": "Kast"     },     {         "title": "Openbare verlichtingkast",         "url": "openbare_verlichtingkast.html",         "category": "Kast"     },     {         "title": "Verkeersregelinstallatiekast",         "url": "verkeersregelinstallatiekast.html",         "category": "Kast"     },     {         "title": "Telkast",         "url": "telkast.html",         "category": "Kast"     },     {         "title": "GMS-kast",         "url": "gms_kast.html",         "category": "Kast"     },     {         "title": "Inspectie- / rioolput",         "url": "inspectie_rioolput.html",         "category": "Put"     },     {         "title": "Kolk",         "url": "kolk.html",         "category": "Put"     },     {         "title": "Benzine- / olieput",         "url": "benzine_olieput.html",         "category": "Put"     },     {         "title": "Brandkraan / -put",         "url": "brandkraan_put.html",         "category": "Put"     },     {         "title": "Drainageput",         "url": "drainageput.html",         "category": "Put"     },     {         "title": "Gasput",         "url": "gasput.html",         "category": "Put"     },     {         "title": "Waterleidingput",         "url": "waterleidingput.html",         "category": "Put"     },     {         "title": "Remmingswerk",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Betonning",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Geleidewerk",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Vuilvang",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Meerpaal",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Hoogtemerk",         "url": "#",         "category": "Waterinrichtingselement"     },     {         "title": "Openbare ruimtelabel",         "url": "openbare_ruimtelabel.html",         "category": "Openbare ruimtelabel"     },     {         "title": "Huisnummerlabel",         "url": "huisnummerlabel.html",         "category": "Openbare ruimtelabel"     },     {         "title": "Openbare ruimte",         "url": "#",         "category": "Openbare ruimte"     },     {         "title": "Onbegroeid terreindeel",         "url": "#",         "category": "Onbegroeid terreindeel"     },     {         "title": "Erf",         "url": "erf.html",         "category": "Onbegroeid terreindeel"     },     {         "title": "Oever, slootkant",         "url": "#",         "category": "Ondersteunend waterdeel"     },     {         "title": "Overkapping",         "url": "overkapping.html",         "category": "Overig bouwwerk"     },     {         "title": "Open loods",         "url": "open_loods.html",         "category": "Overig bouwwerk"     },     {         "title": "Opslagtank",         "url": "opslagtank.html",         "category": "Overig bouwwerk"     },     {         "title": "Bezinkbak",         "url": "bezinkbak.html",         "category": "Overig bouwwerk"     },     {         "title": "Windturbine",         "url": "#",         "category": "Overig bouwwerk"     },     {         "title": "Lage trafo",         "url": "lage_trafo.html",         "category": "Overig bouwwerk"     },     {         "title": "Bassin",         "url": "bassin.html",         "category": "Overig bouwwerk"     },     {         "title": "Bunker",         "url": "#",         "category": "Overig bouwwerk"     },     {         "title": "Voedersilo",         "url": "#",         "category": "Overig bouwwerk"     },     {         "title": "Schuur",         "url": "#",         "category": "Overig bouwwerk"     },     {         "title": "Hoogspanningsmast",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Gemaal",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Perron",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Sluis",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Strekdam",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Steiger",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Stuw",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Keermuur",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Overkluizing",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Duiker",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Faunavoorziening",         "url": "#",         "category": "Kunstwerkdeel"     },     {         "title": "Luifel",         "url": "#",         "category": "Gebouw-installatie"     },     {         "title": "Bordes",         "url": "#",         "category": "Gebouw-installatie"     },     {         "title": "Toegangstrap",         "url": "toegangstrap.html",         "category": "Gebouw-installatie"     },     {         "title": "Informatiebord",         "url": "#",         "category": "Bord"     },     {         "title": "Plaatsnaambord",         "url": "#",         "category": "Bord"     },     {         "title": "Straatnaambord",         "url": "#",         "category": "Bord"     },     {         "title": "Verkeersbord",         "url": "#",         "category": "Bord"     },     {         "title": "Scheepvaartbord",         "url": "#",         "category": "Bord"     },     {         "title": "Verklikker transportleiding",         "url": "#",         "category": "Bord"     },     {         "title": "Reclamebord",         "url": "#",         "category": "Bord"     },     {         "title": "Wegwijzer",         "url": "#",         "category": "Bord"     },     {         "title": "Waarschuwingshek",         "url": "#",         "category": "Bord"     },     {         "title": "Dynamische snelheidsindicator",         "url": "#",         "category": "Bord"     },     {         "title": "Bovenleidingmast",         "url": "#",         "category": "Mast"     },     {         "title": "Laagspanningsmast",         "url": "#",         "category": "Mast"     },     {         "title": "Straalzender",         "url": "#",         "category": "Mast"     },     {         "title": "Zendmast",         "url": "#",         "category": "Mast"     },     {         "title": "Radarmast",         "url": "#",         "category": "Mast"     },     {         "title": "Sensor",         "url": "#",         "category": "Sensor"     },     {         "title": "Wildrooster",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Molgoot",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Lijnafwatering",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Wegmarkering",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Rooster",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Geleideconstructie",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Balustrade",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Boomspiegel",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Verblindingswering",         "url": "#",         "category": "Weginrichtingselement"     },     {         "title": "Wijk",         "url": "#",         "category": "Registratief gebied"     },     {         "title": "Stadsdeel",         "url": "#",         "category": "Registratief gebied"     },     {         "title": "Waterschap",         "url": "#",         "category": "Registratief gebied"     } ];

  [
    { title: "Kunstobject", url: "kunstobject.html", category: "Straatmeubilair" },
    { title: "Speelvoorziening", url: "speelvoorziening.html", category: "Straatmeubilair" },
    { title: "Bank", url: "bank.html", category: "Straatmeubilair" },
    { title: "Picknicktafel", url: "picknicktafel.html", category: "Straatmeubilair" },
    { title: "Boom", url: "boom.html", category: "Vegetatie-object" },
    { title: "Haag", url: "haag.html", category: "Vegetatie-object" },
    { title: "Wildrooster", url: "wildrooster.html", category: "Weginrichtingselement" },
    { title: "Boomspiegel", url: "boomspiegel.html", category: "Weginrichtingselement" },
    { title: "Beek", url: "beek.html", category: "Waterdeel" },
    { title: "Gracht", url: "gracht.html", category: "Waterdeel" },
    { title: "Rivier", url: "rivier.html", category: "Waterdeel" },
    { title: "Haven", url: "haven.html", category: "Waterdeel" },
  ].forEach((replacement) => {
    const item = HEADER_SEARCH_ITEMS.find(
      (entry) =>
        entry.title === replacement.title && entry.category === replacement.category
    );

    if (item) {
      item.url = replacement.url;
    } else {
      HEADER_SEARCH_ITEMS.push(replacement);
    }
  });

  function initHeaderSearch() {
    if (document.getElementById("searchBox")) return;

    const headerInner = document.querySelector("header .header-inner");
    if (!headerInner || headerInner.querySelector(".header-search")) return;

    const backButton = headerInner.querySelector(".back-home-btn");
    const siteTitle = headerInner.querySelector(".site-title");

    function norm(value) {
      return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9 -]+/gi, " ")
        .split(" ")
        .filter(Boolean)
        .join(" ")
        .trim();
    }

    function isClickable(item) {
      const url = (item.url || "").trim();
      return url && url !== "#" && !url.startsWith("#");
    }

    function buildIndex() {
      const map = new Map();

      HEADER_SEARCH_ITEMS.forEach((item) => {
        const title = (item.title || "").trim();
        const url = (item.url || "#").trim() || "#";
        const clickable = isClickable(item);
        const key = clickable ? "url__" + url : "title__" + norm(title) + "__" + url;
        const existing = map.get(key);
        const keywords = [title, item.category || "", url].join(" ").trim();

        if (!existing) {
          map.set(key, {
            title,
            url,
            isClickable: clickable,
            aliases: [title],
            keywords,
          });
          return;
        }

        if (title && !existing.aliases.includes(title)) {
          existing.aliases.push(title);
        }
        existing.keywords = (existing.keywords + " " + keywords).trim();
        existing.isClickable = existing.isClickable || clickable;
        if (clickable) existing.url = url;
      });

      return Array.from(map.values());
    }

    function getResultTitle(item, terms) {
      const match = item.aliases.find((alias) => {
        const hay = norm(alias);
        return terms.every((term) => hay.includes(term));
      });
      return match || item.title;
    }

    function findMatches(query) {
      const terms = norm(query).split(" ").filter(Boolean);
      if (!terms.length) return [];

      return buildIndex()
        .map((item) => {
          const resultTitle = getResultTitle(item, terms);
          const titleNorm = norm(resultTitle);
          const hay = norm(
            [item.title, item.aliases.join(" "), item.keywords, item.url].join(" ")
          );

          if (!terms.every((term) => hay.includes(term))) return null;

          let score = 30;
          if (titleNorm === terms.join(" ")) score = 0;
          else if (terms.every((term) => titleNorm.startsWith(term))) score = 5;
          else if (terms.every((term) => titleNorm.includes(term))) score = 10;
          if (!item.isClickable) score += 20;

          return { ...item, resultTitle, score };
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score || a.resultTitle.localeCompare(b.resultTitle, "nl"))
        .slice(0, 8);
    }

    function ensureStyles() {
      if (document.getElementById("header-search-styles")) return;

      const style = document.createElement("style");
      style.id = "header-search-styles";
      style.textContent = `
        .header-search {
          position: relative;
          flex: 1 1 300px;
          max-width: 440px;
          min-width: 220px;
          margin: 0 0.5rem;
          z-index: 250;
        }

        .header-search-field {
          display: flex;
          align-items: center;
          min-height: 2.35rem;
          border: 1px solid var(--border, #d0d6e0);
          border-radius: 999px;
          background: #f1f4f8;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
        }

        .header-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text, #023672);
          font: inherit;
          font-size: 0.92rem;
          padding: 0.55rem 0.35rem 0.55rem 0.85rem;
        }

        .header-search input::placeholder {
          color: var(--text-muted, #666666);
        }

        .header-search-clear {
          border: 0;
          background: transparent;
          color: var(--accent, #0066aa);
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1;
          padding: 0.45rem 0.75rem 0.45rem 0.35rem;
        }

        .header-search-clear[hidden],
        .header-search-results[hidden] {
          display: none;
        }

        .header-search-results {
          position: absolute;
          top: calc(100% + 0.35rem);
          left: 0;
          right: 0;
          background: var(--bg-alt, #ffffff);
          border: 1px solid var(--border, #d0d6e0);
          border-radius: var(--radius-large, 10px);
          box-shadow: var(--shadow-soft, 0 2px 6px rgba(0, 0, 0, 0.08));
          overflow: hidden;
          max-height: 320px;
          overflow-y: auto;
        }

        .header-search-result,
        .header-search-empty {
          display: block;
          padding: 0.55rem 0.8rem;
          color: var(--text, #023672);
          font-size: 0.9rem;
          text-decoration: none;
          border-bottom: 1px solid #edf1f6;
        }

        .header-search-result:last-child,
        .header-search-empty:last-child {
          border-bottom: 0;
        }

        .header-search-result:hover,
        .header-search-result:focus {
          background: var(--accent-soft, #e5f2fb);
          text-decoration: none;
          outline: 0;
        }

        .header-search-result.is-disabled,
        .header-search-empty {
          color: var(--text-muted, #666666);
          cursor: default;
        }

        .header-search-result.is-disabled:hover {
          background: transparent;
        }

        .header-search-visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 900px) {
          header .header-inner {
            flex-wrap: wrap;
          }

          header .site-title {
            order: 1;
          }

          header .back-home-btn {
            order: 2;
          }

          .header-search {
            order: 3;
            flex-basis: 100%;
            width: 100%;
            max-width: none;
            min-width: 0;
            margin: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    ensureStyles();

    const form = document.createElement("form");
    form.className = "header-search";
    form.setAttribute("role", "search");
    form.innerHTML = `
      <label class="header-search-visually-hidden" for="headerSearchInput">Zoek object</label>
      <div class="header-search-field">
        <input id="headerSearchInput" type="search" placeholder="Zoek object..." autocomplete="off" />
        <button class="header-search-clear" type="button" aria-label="Zoekveld leegmaken" hidden>x</button>
      </div>
      <div class="header-search-results" role="listbox" hidden></div>
    `;

    if (backButton) {
      headerInner.insertBefore(form, backButton);
    } else if (siteTitle && siteTitle.nextSibling) {
      headerInner.insertBefore(form, siteTitle.nextSibling);
    } else {
      headerInner.appendChild(form);
    }

    const input = form.querySelector("input");
    const clearButton = form.querySelector(".header-search-clear");
    const results = form.querySelector(".header-search-results");

    function hideResults() {
      results.hidden = true;
      results.innerHTML = "";
    }

    function renderResults() {
      const query = input.value.trim();
      clearButton.hidden = !query;

      if (!query) {
        hideResults();
        return;
      }

      const matches = findMatches(query);
      results.innerHTML = "";

      if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "header-search-empty";
        empty.textContent = "Geen resultaten";
        results.appendChild(empty);
        results.hidden = false;
        return;
      }

      matches.forEach((match) => {
        const item = match.isClickable ? document.createElement("a") : document.createElement("div");
        item.className = "header-search-result" + (match.isClickable ? "" : " is-disabled");
        item.textContent = match.resultTitle;
        item.setAttribute("role", "option");

        if (match.isClickable) {
          item.href = match.url;
        } else {
          item.title = "Nog geen detailpagina beschikbaar";
        }

        results.appendChild(item);
      });

      results.hidden = false;
    }

    input.addEventListener("input", renderResults);
    input.addEventListener("focus", renderResults);

    clearButton.addEventListener("click", () => {
      input.value = "";
      input.focus();
      renderResults();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const firstLink = results.querySelector("a.header-search-result");
      if (firstLink) window.location.href = firstLink.href;
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        input.value = "";
        renderResults();
        input.blur();
      }
    });

    document.addEventListener("click", (event) => {
      if (!form.contains(event.target)) hideResults();
    });
  }

  setFooterYear();
  initHeaderSearch();
  initSectionTabs();
  initPackageTabs();
  initReadAloud();
})();
