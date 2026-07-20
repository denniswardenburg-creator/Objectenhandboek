import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(toolsDir, "..");
const dataPath = path.join(siteDir, "data", "object-pages.json");

function normalizeNewlines(value) {
  return String(value).replace(/\r\n/g, "\n");
}

function indentFragment(value, spaces) {
  const prefix = " ".repeat(spaces);
  const normalized = normalizeNewlines(value).trim();
  return normalized
    .split("\n")
    .map((line) => (line ? `${prefix}${line}` : ""))
    .join("\n");
}

export function renderPage(page) {
  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <title>${page.documentTitle}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="icon" type="image/x-icon" href="ecgeo.ico" />
    <link rel="stylesheet" href="object-detail.css" />
  </head>
  <body>
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
${indentFragment(page.sidebarIntroHtml, 10)}
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
${indentFragment(page.objectHeaderHtml, 10)}
        </section>

${indentFragment(page.sectionsHtml, 8)}
      </main>
    </div>

    <footer>
      &copy; <span id="year"></span> ECGeo &ndash; BGT Objectenhandboek.
    </footer>
    <script src="site.js"></script>
  </body>
</html>
`;
}

function loadData() {
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Centrale gegevensbron ontbreekt: ${dataPath}`);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  if (!Array.isArray(data.pages) || data.pages.length === 0) {
    throw new Error("De centrale gegevensbron bevat geen objectpagina's.");
  }

  const names = new Set();
  for (const page of data.pages) {
    for (const field of [
      "file",
      "documentTitle",
      "sidebarIntroHtml",
      "objectHeaderHtml",
      "sectionsHtml",
    ]) {
      if (typeof page[field] !== "string" || !page[field].trim()) {
        throw new Error(`${page.file || "Onbekende pagina"}: veld ${field} ontbreekt.`);
      }
    }
    if (!/^[a-z0-9_-]+\.html$/i.test(page.file)) {
      throw new Error(`Ongeldige bestandsnaam: ${page.file}`);
    }
    if (names.has(page.file)) {
      throw new Error(`Dubbele objectpagina in gegevensbron: ${page.file}`);
    }
    names.add(page.file);
  }

  return data;
}

export function generateAll({ check = false } = {}) {
  const data = loadData();
  const differences = [];

  for (const page of data.pages) {
    const outputPath = path.join(siteDir, page.file);
    const rendered = renderPage(page);

    if (check) {
      const current = fs.existsSync(outputPath)
        ? normalizeNewlines(fs.readFileSync(outputPath, "utf8"))
        : "";
      if (current !== normalizeNewlines(rendered)) {
        differences.push(page.file);
      }
    } else {
      fs.writeFileSync(outputPath, rendered, "utf8");
    }
  }

  if (check && differences.length) {
    throw new Error(
      `Deze pagina's wijken af van de centrale gegevensbron: ${differences.join(", ")}`,
    );
  }

  return data.pages.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check");
  try {
    const count = generateAll({ check });
    console.log(
      check
        ? `${count} objectpagina's komen overeen met de centrale gegevensbron.`
        : `${count} objectpagina's zijn opnieuw gegenereerd.`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
