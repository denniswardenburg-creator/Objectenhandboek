(function () {
  const objects = {
    kunstobject: {
      title: "Kunstobject",
      prefix: "Straatmeubilair type",
      objectClass: "Straatmeubilair",
      objectPart: "Straatmeubilair",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "straatmeubilair",
      packages: [2, 3],
      sourcePath: "straatmeubilair",
      anchor: "kunstobject",
      iframe: {
        windowHeight: "720px",
        contentHeight: "900px",
      },
      definition:
        "Een object dat als kunst gezien wordt en een bepaalde schoonheid heeft, niet door de natuur gemaakt.",
    },
    speelvoorziening: {
      title: "Speelvoorziening",
      prefix: "Straatmeubilair type",
      objectClass: "Straatmeubilair",
      objectPart: "Straatmeubilair",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "straatmeubilair",
      packages: [2, 3],
      sourcePath: "straatmeubilair",
      anchor: "speelvoorziening",
      iframe: {
        windowHeight: "700px",
        contentHeight: "730px",
      },
      definition:
        "Aard en nagelvast met de grond verbonden constructie in de openbare ruimte, bedoeld als speelmateriaal voor kinderen.",
    },
    bank: {
      title: "Bank",
      prefix: "Straatmeubilair type",
      objectClass: "Straatmeubilair",
      objectPart: "Straatmeubilair",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "straatmeubilair",
      packages: [2, 3],
      sourcePath: "straatmeubilair",
      anchor: "bank",
      iframe: {
        windowHeight: "720px",
        contentHeight: "850px",
      },
      definition:
        "Aaneengesloten zitplaats voor verscheidene personen, bedoeld voor openbaar gebruik en geplaatst in de openbare ruimte, zoals in parken, plantsoenen, bossen en langs wegen.",
    },
    picknicktafel: {
      title: "Picknicktafel",
      prefix: "Straatmeubilair type",
      objectClass: "Straatmeubilair",
      objectPart: "Straatmeubilair",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "straatmeubilair",
      packages: [2, 3],
      sourcePath: "straatmeubilair",
      anchor: "picknicktafel",
      iframe: {
        windowHeight: "720px",
        contentHeight: "920px",
      },
      definition:
        "Een picknicktafel is een tafel met vaak daaraan gemonteerde zitbanken of stoelen die kan worden gebruikt om te picknicken.",
    },
    boom: {
      title: "Boom",
      prefix: "Vegetatie-object type",
      objectClass: "Vegetatie-object",
      objectPart: "Vegetatie-object",
      typeLabel: "IMGEO type",
      geometry: "Punt, lijn of vlak",
      packageObject: "vegetatieobject",
      packages: [2, 3],
      sourcePath: "vegetatieobject",
      anchor: "boom",
      iframe: {
        windowHeight: "720px",
        contentHeight: "840px",
      },
      definition:
        "Een markante boom die geen onderdeel uitmaakt van een andere boom- of struikbeplanting.",
    },
    haag: {
      title: "Haag",
      prefix: "Vegetatie-object type",
      objectClass: "Vegetatie-object",
      objectPart: "Vegetatie-object",
      typeLabel: "IMGEO type",
      geometry: "Punt, lijn of vlak",
      packageObject: "vegetatieobject",
      packages: [2, 3],
      sourcePath: "vegetatieobject",
      anchor: "haag",
      iframe: {
        windowHeight: "760px",
        contentHeight: "1360px",
      },
      definition:
        "Een rijvormige afscheiding van zeer beperkte breedte bestaande uit aangeplante aaneengesloten struiken.",
      publicGuidance:
        "Begroeide terreindelen worden als basis geregistreerd als Begroeid terreindeel met het fysiek voorkomen groenvoorziening. Haag is de nadere IMGeo-duiding voor een rijvormige afscheiding van aaneengesloten aangeplante struiken. De afbakening volgt de waarneembare omvang en overgang naar aangrenzende objecten.",
    },
    wildrooster: {
      title: "Wildrooster",
      prefix: "Weginrichtingselement type",
      objectClass: "Weginrichtingselement",
      objectPart: "Weginrichtingselement",
      typeLabel: "IMGEO type",
      geometry: "Punt, lijn of vlak",
      packageObject: "weginrichtingselement",
      packages: [2, 3],
      sourcePath: "weginrichtingselement",
      anchor: "wildrooster",
      iframe: {
        windowHeight: "720px",
        contentHeight: "890px",
      },
      definition:
        "Horizontaal raamwerk dat dient om wild de doorgang te beletten.",
    },
    boomspiegel: {
      title: "Boomspiegel",
      prefix: "Weginrichtingselement type",
      objectClass: "Weginrichtingselement",
      objectPart: "Weginrichtingselement",
      typeLabel: "IMGEO type",
      geometry: "Vlak",
      packageObject: "weginrichtingselement",
      packages: [3],
      sourcePath: "weginrichtingselement",
      anchor: "boomspiegel",
      iframe: {
        windowHeight: "720px",
        contentHeight: "900px",
      },
      definition:
        "Het stuk grond rondom de stam van een boom dat van boven toegankelijk is voor lucht en water.",
    },
    beek: {
      title: "Beek",
      prefix: "Waterdeel type",
      objectClass: "Waterdeel",
      objectPart: "Waterdeel",
      typeLabel: "IMGEO type",
      geometry: "Vlak",
      packageObject: "waterdeel",
      packages: [2, 3],
      sourcePath: "waterdeel",
      anchor: "beek",
      spatialRole: "Opdelend",
      otherOwner: true,
      bgtBase: "Waterdeel type waterloop",
      iframe: {
        windowHeight: "720px",
        contentHeight: "860px",
      },
      definition: "Een natuurlijke smalle waterloop zonder getij.",
    },
    gracht: {
      title: "Gracht",
      prefix: "Waterdeel type",
      objectClass: "Waterdeel",
      objectPart: "Waterdeel",
      typeLabel: "IMGEO type",
      geometry: "Vlak",
      packageObject: "waterdeel",
      packages: [2, 3],
      sourcePath: "waterdeel",
      anchor: "gracht",
      spatialRole: "Opdelend",
      otherOwner: true,
      bgtBase: "Waterdeel type waterloop",
      iframe: {
        windowHeight: "720px",
        contentHeight: "940px",
      },
      definition:
        "Een gracht is een gegraven greppel met water, die hoofdzakelijk voorkomt in oude steden.",
    },
    rivier: {
      title: "Rivier",
      prefix: "Waterdeel type",
      objectClass: "Waterdeel",
      objectPart: "Waterdeel",
      typeLabel: "IMGEO type",
      geometry: "Vlak",
      packageObject: "waterdeel",
      packages: [2, 3],
      sourcePath: "waterdeel",
      anchor: "rivier",
      spatialRole: "Opdelend",
      otherOwner: true,
      bgtBase: "Waterdeel type waterloop",
      iframe: {
        windowHeight: "720px",
        contentHeight: "880px",
      },
      definition:
        "Een natuurlijke afvloeiing waarbij water uit neerslag samenkomt tot een waterloop en naar lager gelegen streken stroomt.",
    },
    haven: {
      title: "Haven",
      prefix: "Waterdeel type",
      objectClass: "Waterdeel",
      objectPart: "Waterdeel",
      typeLabel: "IMGEO type",
      geometry: "Vlak",
      packageObject: "waterdeel",
      packages: [2, 3],
      sourcePath: "waterdeel",
      anchor: "haven",
      spatialRole: "Opdelend",
      bgtBase: "Waterdeel type watervlakte",
      iframe: {
        windowHeight: "720px",
        contentHeight: "850px",
      },
      definition:
        "Een tot ligplaats van schepen geschikt natuurlijk of gegraven waterbekken dat beschutting biedt tegen wind en golven.",
    },
    rioolkast: {
      title: "Rioolkast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "rioolkast",
      iframe: {
        windowHeight: "1256px",
        contentHeight: "1256px",
      },
      definition:
        "Kast ten behoeve van de regeling van het transport van rioolwater.",
    },
    cai_kast: {
      title: "CAI-kast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "cai-kast",
      iframe: {
        windowHeight: "895px",
        contentHeight: "895px",
      },
      definition:
        "Kast ten behoeve van de regeling van radio- en televisiesignalen.",
    },
    elektrakast: {
      title: "Elektrakast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "elektrakast",
      iframe: {
        windowHeight: "1599px",
        contentHeight: "1599px",
      },
      definition:
        "Kast ten behoeve van de regeling van het transport van elektriciteit.",
    },
    gaskast: {
      title: "Gaskast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "gaskast",
      iframe: {
        windowHeight: "391px",
        contentHeight: "391px",
      },
      definition: "Kast ten behoeve van de regeling van het transport van gas.",
    },
    telecomkast: {
      title: "Telecomkast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "telecom-kast",
      iframe: {
        windowHeight: "560px",
        contentHeight: "560px",
      },
      definition:
        "Kast ten behoeve van de regeling van telecommunicatie.",
    },
    openbare_verlichtingkast: {
      title: "Openbare verlichtingkast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "openbare-verlichtingkast",
      iframe: {
        windowHeight: "887px",
        contentHeight: "887px",
      },
      definition:
        "Kast ten behoeve van de regeling van de openbare verlichting.",
    },
    verkeersregelinstallatiekast: {
      title: "Verkeersregelinstallatiekast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "verkeersregelinstallatiekast",
      iframe: {
        windowHeight: "893px",
        contentHeight: "893px",
      },
      definition: "Kast ten behoeve van de regeling van het verkeer.",
    },
    telkast: {
      title: "Telkast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "telkast",
      iframe: {
        windowHeight: "740px",
        contentHeight: "740px",
      },
      definition:
        "Kast ten behoeve van het meten van permanente verkeertellingen.",
    },
    gms_kast: {
      title: "GMS-kast",
      prefix: "Kast type",
      objectClass: "Kast",
      objectPart: "Kast",
      typeLabel: "IMGEO type",
      geometry: "Punt",
      packageObject: "kast",
      packages: [2, 3],
      sourcePath: "kast",
      anchor: "gms-kast",
      iframe: {
        windowHeight: "725px",
        contentHeight: "725px",
      },
      definition:
        "Kast ten behoeve van het meten van weers- en wegdekomstandigheden.",
    },  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pill(packageObject, pakket) {
    return `<a href="pakketten.html?open=${packageObject}&amp;pakket=${pakket}" class="pill">Pakket ${pakket}</a>`;
  }

  function packageList(item) {
    return item.packages.map((pakket) => pill(item.packageObject, pakket)).join(", ");
  }

  function classification(item, title) {
    if (item.bgtBase) {
      return `
      <ul>
        <li>
          <strong>BGT-basisobject</strong>:
          ${escapeHtml(item.bgtBase)} is BGT-verplicht
          (${pill(item.packageObject, 1)}).
        </li>

        <li>
          <strong>Optionele IMGeo-inhoud</strong>:
          ${packageList(item)}
        </li>

        <li><strong>IMGEO-classificatie</strong>: ${title}</li>
      </ul>`;
    }

    return `
      <ul>
        <li>
          <strong>Wettelijke BGT-inhoud</strong>:
          <span class="pill">N.v.t.</span>
        </li>

        <li>
          <strong>Optionele IMGeo-inhoud</strong>:
          ${packageList(item)}
        </li>

        <li><strong>IMGEO-classificatie</strong>: ${title}</li>
      </ul>`;
  }

  function iframeSettings(item) {
    return {
      windowHeight: "560px",
      contentHeight: "640px",
      extraWidth: "600px",
      shiftX: "320px",
      shiftY: "0px",
      ...(item.iframe || {}),
    };
  }

  function render() {
    const key = window.objectDetailKey;
    const item = objects[key];
    const target = document.getElementById("object-page");
    if (!target || !item) return;

    const title = escapeHtml(item.title);
    const fullTitle = `${escapeHtml(item.prefix)}: ${title}`;
    const sourceUrl = `https://geonovum.github.io/IMGeo-objectenhandboek/${item.sourcePath}#${item.anchor}`;
    const iframe = iframeSettings(item);
    const requiredLabel = item.bgtRequired ? "Ja" : "Nee";
    const spatialRole = escapeHtml(item.spatialRole || "Inrichtend");
    const publicGuidance = item.publicGuidance
      ? `<h3>Registratie en afbakening</h3><p class="intro">${escapeHtml(item.publicGuidance)}</p>`
      : "";

    target.outerHTML = `
<header>
  <div class="header-inner">
    <div class="site-title">
      <a href="index.html">
        <img src="ECGeo.jpg" alt="ECGeo logo" class="logo" />
      </a>
      <div>
        <h1>BGT Objectenhandboek</h1>
        <span>ECGeo &ndash; richtlijnen voor inwinning en beheer</span>
      </div>
    </div>

    <a href="index.html" class="back-home-btn">
      Terug naar startpagina
    </a>
  </div>
</header>

<div class="layout">
  <aside>
    <div class="side-card">
      <h2>${fullTitle}</h2>
      <p>
        Detailpagina voor ${title} binnen de objectklasse
        ${escapeHtml(item.objectClass)}.
      </p>
    </div>

    <div class="side-card">
      <h2>Navigatie</h2>
      <ul class="side-nav">
        <li><a href="handboek.html">Over dit handboek</a></li>
        <li><a href="leeswijzer.html">Leeswijzer &amp; definities</a></li>
        <li><a href="kwaliteit.html">Kwaliteit</a></li>
        <li><a href="rc.html">Ruimtelijke Component (RC)</a></li>
        <li><a href="fg.html">Functionele Gebieden (FG)</a></li>
        <li><a href="pakketten.html">BGT-pakketten</a></li>
        <li><a href="versie.html">Versies &amp; wijzigingen</a></li>
      </ul>
    </div>
  </aside>

  <main id="top">
    <section class="card object-header">
      <div class="object-title">
        <h1>${fullTitle}</h1>
        <span>IMGeo &middot; Objectklasse: ${escapeHtml(item.objectClass)}</span>
      </div>

      <div style="margin-top: 0.6rem; display: flex; gap: 0.4rem">
        <button id="playBtn" class="tab-btn">&#9654; Voorlezen</button>
        <button id="stopBtn" class="tab-btn">&#9632; Stop</button>
      </div>

      <div class="object-meta">
        <div class="meta-grid">
          <div class="meta-item">
            <div class="meta-item-label">Objectdeel</div>
            <div class="meta-item-value">${escapeHtml(item.objectPart)}</div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">${escapeHtml(item.typeLabel)}</div>
            <div class="meta-item-value">
              <span class="badge">${title}</span>
            </div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">Geometrie</div>
            <div class="meta-item-value">${escapeHtml(item.geometry)}</div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">Naamgeving</div>
            <div class="meta-item-value">n.v.t.</div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">BGT verplicht?</div>
            <div class="meta-item-value">${requiredLabel}</div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">Ruimtelijke rol</div>
            <div class="meta-item-value">${spatialRole}</div>
          </div>
        </div>
      </div>

      <div class="tabs">
        <button class="tab-btn active" data-target="definitie">
          Definitie
        </button>
        <button class="tab-btn" data-target="afbakening">Afbakening</button>
      </div>
    </section>

    <section id="definitie" class="card section-block active">
      <h2>Definitie</h2>
      <p class="intro">
        ${escapeHtml(item.definition)}
      </p>

      <h3>BGT- en IMGeo-classificatie</h3>
      ${classification(item, title)}
    </section>

    <section id="afbakening" class="card section-block">
      <h2>Afbakening</h2>
      <p class="intro">
        De afbakening van ${fullTitle} volgt de landelijke IMGeo-regels.
      </p>

      ${publicGuidance}

      <h3>Landelijke IMGeo-afbakening (Geonovum)</h3>
      <p class="intro" style="margin-bottom: 0.4rem">
        Hieronder is het relevante deel uit het landelijke
        IMGeo-objectenhandboek opgenomen.
      </p>

      <div class="external-source-frame">
        <div class="external-source-label">
          Externe bron: Geonovum &ndash; IMGeo-objectenhandboek
        </div>

        <div
          class="iframe-scroll-wrapper"
          style="
            --iframe-window-height: ${iframe.windowHeight};
            --iframe-content-height: ${iframe.contentHeight};
            --iframe-extra-width: ${iframe.extraWidth};
            --iframe-shift-x: ${iframe.shiftX};
            --iframe-shift-y: ${iframe.shiftY};
          "
        >
          <iframe
            src="${sourceUrl}"
            title="IMGeo objectenhandboek &ndash; ${fullTitle}"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <p class="intro" style="margin-top: 0.5rem">
        Wil je een grotere weergave?
        <a
          href="${sourceUrl}"
          target="_blank"
          rel="noopener"
        >
          Open &lsquo;${title}&rsquo; in een nieuw tabblad</a
        >.
      </p>
    </section>
  </main>
</div>

<footer>
  &copy; <span id="year"></span> ECGeo &ndash; BGT Objectenhandboek.
</footer>`;
  }

  render();
})();
