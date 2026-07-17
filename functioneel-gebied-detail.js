(function () {
  const baseUrl = "https://geonovum.github.io/IMGeo-objectenhandboek/functioneelgebied";

  const gebieden = {
    kering: {
      title: "Kering",
      anchor: "kering",
      bgtRequired: true,
      definition:
        "Een waterkerende of scheidende hoogte, kunstmatig of natuurlijk, inclusief aanwezige waterkerende elementen.",
    },
    bedrijvigheid: {
      title: "Bedrijvigheid",
      anchor: "bedrijvigheid",
      definition:
        "Gebied dat voornamelijk wordt gebruikt voor economische activiteiten en non-profitactiviteiten.",
    },
    natuur_en_landschap: {
      title: "Natuur en landschap",
      anchor: "natuur-en-landschap",
      definition:
        "Gebied dat wegens natuurschoon en/of natuurlijke historie in stand wordt gehouden.",
    },
    landbouw: {
      title: "Landbouw",
      anchor: "landbouw",
      definition:
        "Gebied dat primair in gebruik is voor land- en tuinbouwproductie.",
    },
    bewoning: {
      title: "Bewoning",
      anchor: "bewoning",
      definition:
        "Gebied met panden of overige bouwwerken die voornamelijk voor bewoning worden gebruikt, inclusief bijbehorende erven en tuinen.",
    },
    infrastructuur_verkeer_en_vervoer: {
      title: "Infrastructuur verkeer en vervoer",
      anchor: "infrastructuur-verkeer-en-vervoer",
      definition:
        "Gebied dat primair in gebruik is voor verkeer en vervoer, zoals wegen, spoor, parkeerterreinen, bermen en ondersteunende objecten.",
    },
    infrastructuur_waterstaatswerken: {
      title: "Infrastructuur waterstaatswerken",
      anchor: "infrastructuur-waterstaatswerken",
      definition:
        "Gebied langs oppervlaktewater dat primair in gebruik is voor waterafvoer, wateraanvoer of waterconservering.",
    },
    waterbergingsgebied: {
      title: "Waterbergingsgebied",
      anchor: "waterbergingsgebied",
      iframe: {
        windowHeight: "900px",
        contentHeight: "1151px",
      },
      definition:
        "Terrein met als functie het tijdelijk of langdurig bergen van wateroverschotten uit de omgeving.",
    },
    maatschappelijke_publieksvoorziening: {
      title: "Maatschappelijke en/of publieksvoorziening",
      anchor: "maatschappelijke-enof-publieksvoorziening",
      iframe: {
        windowHeight: "341px",
        contentHeight: "341px",
      },
      definition:
        "Bebouwd of landelijk gebied dat wordt gebruikt voor maatschappelijke of publieke doeleinden.",
    },
    recreatie: {
      title: "Recreatie",
      anchor: "recreatie",
      iframe: {
        windowHeight: "373px",
        contentHeight: "373px",
      },
      definition: "Gebied dat in gebruik is voor openluchtrecreatie.",
    },
    begraafplaats: {
      title: "Begraafplaats",
      anchor: "begraafplaats",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Besloten gebied waar lichamen van overleden personen worden begraven en waar ook urnen kunnen worden bewaard.",
    },
    functioneel_beheer: {
      title: "Functioneel beheer",
      anchor: "functioneel-beheer",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Gebied waarvoor specifiek beheer nodig is, bepaald vanuit beheeroogpunt.",
    },
    recreatie_speeltuin: {
      title: "Recreatie: speeltuin",
      anchor: "recreatie-speeltuin",
      iframe: {
        windowHeight: "900px",
        contentHeight: "900px",
      },
      definition:
        "Geheel van begroeiing, verharding, opstallen en speelwerktuigen, bedoeld als speelplaats voor kinderen.",
    },
    recreatie_park: {
      title: "Recreatie: park",
      anchor: "recreatie-park",
      iframe: {
        windowHeight: "900px",
        contentHeight: "900px",
      },
      definition:
        "Landschappelijk ingericht terrein met onder meer vegetatie, verharding, objecten en waterpartijen, bedoeld als recreatieve voorziening.",
    },
    recreatie_sportterrein: {
      title: "Recreatie: sportterrein",
      anchor: "recreatie-sportterrein",
      iframe: {
        windowHeight: "900px",
        contentHeight: "900px",
      },
      definition:
        "Terrein, mogelijk met groenvoorziening, verharding en bebouwing, bestemd voor sportbeoefening.",
    },
    recreatie_camping: {
      title: "Recreatie: camping",
      anchor: "recreatie-camping",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Terrein met verharding, begroeiing en opstallen waar tijdelijk tenten of caravans kunnen worden geplaatst voor recreatie.",
    },
    recreatie_bungalowpark: {
      title: "Recreatie: bungalowpark",
      anchor: "recreatie-bungalowpark",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Gebied met verharding, begroeiing, opstallen en gebouwen, bedoeld voor vakantie- of weekendhuisjes die niet permanent bewoond worden.",
    },
    bushalte: {
      title: "Bushalte",
      anchor: "bushalte",
      iframe: {
        windowHeight: "520px",
        contentHeight: "720px",
      },
      definition: "Halteplaats voor bussen van het openbaar vervoer.",
    },
    carpoolplaats: {
      title: "Carpoolplaats",
      anchor: "carpoolplaats",
      iframe: {
        windowHeight: "260px",
        contentHeight: "260px",
      },
      definition:
        "Parkeerplaats die qua ligging en ontsluiting geschikt is voor carpooling.",
    },
    benzinestation: {
      title: "Benzinestation",
      anchor: "benzinestation",
      iframe: {
        windowHeight: "900px",
        contentHeight: "900px",
      },
      definition:
        "Geheel van installaties, verharding en opstallen waar brandstoffen voor verbrandingsmotoren worden verkocht.",
    },
    verzorgingsplaats: {
      title: "Verzorgingsplaats",
      anchor: "verzorgingsplaats",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Langs de weg gelegen parkeergelegenheid met bijbehorende banen en voorzieningen voor reizigers en/of voertuigen.",
    },
    functioneel_beheer_hondenuitlaatplaats: {
      title: "Functioneel beheer: hondenuitlaatplaats",
      anchor: "functioneel-beheer-hondenuitlaatplaats",
      iframe: {
        windowHeight: "900px",
        contentHeight: "900px",
      },
      definition:
        "Uitlaatplaats waar honden hun behoefte mogen doen en waar geen opruimplicht geldt.",
    },
    recreatie_volkstuin: {
      title: "Recreatie: volkstuin",
      anchor: "recreatie-volkstuin",
      iframe: {
        windowHeight: "397px",
        contentHeight: "397px",
      },
      definition:
        "Terreingedeelte in gebruik als volkstuinen, inclusief bebouwing, verharding en dergelijke.",
    },
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getIframeSettings(gebied) {
    return {
      windowHeight: "900px",
      contentHeight: "1016px",
      extraWidth: "600px",
      shiftX: "320px",
      shiftY: "0px",
      ...(gebied.iframe || {}),
    };
  }

  function render() {
    const key = window.functioneelGebiedKey;
    const gebied = gebieden[key];
    const target = document.getElementById("fg-page");
    if (!target || !gebied) return;

    const title = escapeHtml(gebied.title);
    const iframeUrl = `${baseUrl}#${gebied.anchor}`;
    const iframe = getIframeSettings(gebied);
    const isBgtRequired = Boolean(gebied.bgtRequired);
    const standardLabel = isBgtRequired ? "BGT" : "IMGeo";
    const typeLabel = isBgtRequired ? "BGT type" : "IMGEO type";
    const requiredLabel = isBgtRequired ? "Ja" : "Nee";
    const classification = isBgtRequired
      ? `
      <ul>
        <li>
          <strong>Wettelijke BGT-inhoud</strong>:
          <a href="pakketten.html?open=functioneel-gebied&amp;pakket=1" class="pill"
            >Pakket 1</a
          >
        </li>

        <li>
          <strong>Pakket 2 en 3</strong>: kering blijft onderdeel van
          <a href="pakketten.html?open=functioneel-gebied&amp;pakket=1" class="pill"
            >Pakket 1</a
          >
        </li>

        <li><strong>IMGEO-classificatie</strong>: N.v.t.</li>
      </ul>`
      : `
      <ul>
        <li>
          <strong>Wettelijke BGT-inhoud</strong>:
          <span class="pill">N.v.t.</span>
        </li>

        <li>
          <strong>Optionele IMGeo-inhoud</strong>:
          <a href="pakketten.html?open=functioneel-gebied&amp;pakket=2" class="pill"
            >Pakket 2</a
          >,
          <a href="pakketten.html?open=functioneel-gebied&amp;pakket=3" class="pill"
            >Pakket 3</a
          >
        </li>

        <li><strong>IMGEO-classificatie</strong>: ${title}</li>
      </ul>`;

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
      <h2>Functioneel gebied: ${title}</h2>
      <p>
        Detailpagina voor het type ${title} binnen de objectklasse
        Functioneel gebied.
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
        <h1>Functioneel gebied: ${title}</h1>
        <span>${standardLabel} &middot; Objectklasse: Functioneel gebied</span>
      </div>

      <div style="margin-top: 0.6rem; display: flex; gap: 0.4rem">
        <button id="playBtn" class="tab-btn">&#9654; Voorlezen</button>
        <button id="stopBtn" class="tab-btn">&#9632; Stop</button>
      </div>

      <div class="object-meta">
        <div class="meta-grid">
          <div class="meta-item">
            <div class="meta-item-label">Objectdeel</div>
            <div class="meta-item-value">Functioneel gebied</div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">${typeLabel}</div>
            <div class="meta-item-value">
              <span class="badge">${title}</span>
            </div>
          </div>

          <div class="meta-item">
            <div class="meta-item-label">Geometrie</div>
            <div class="meta-item-value">Vlak</div>
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
            <div class="meta-item-value">Inrichtend</div>
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
        ${escapeHtml(gebied.definition)}
      </p>

      <h3>BGT- en IMGeo-classificatie</h3>
      ${classification}
    </section>

    <section id="afbakening" class="card section-block">
      <h2>Afbakening</h2>
      <p class="intro">
        De landelijke IMGeo-afbakening is leidend voor Functioneel gebied type
        ${title}.
      </p>

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
            src="${iframeUrl}"
            title="IMGeo objectenhandboek &ndash; Functioneel gebied type ${title}"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <p class="intro" style="margin-top: 0.5rem">
        Wil je een grotere weergave?
        <a
          href="${iframeUrl}"
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
