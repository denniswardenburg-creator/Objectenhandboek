# Onderhoud van de objectpagina's

De objectpagina's in deze map zijn volledige HTML-bestanden. Daardoor blijven
de inhoud, navigatie en landelijke iframe-informatie ook beschikbaar wanneer
JavaScript voor inhoudsopbouw niet wordt uitgevoerd.

## Centrale gegevensbron

Alle objectspecifieke inhoud staat in:

`data/object-pages.json`

Per pagina bevat dit bestand:

- de titel van het HTML-document;
- de introductie in de zijbalk;
- de kop en metagegevens van het object;
- de volledige definitie- en afbakeningssecties;
- de bestaande iframe-URL's en alle bijbehorende afmetingen en verschuivingen.

De HTML-fragmenten worden bewust letterlijk opgeslagen. Hierdoor blijven de
bestaande teksten, links, opmaak en iframe-instellingen behouden.

## Pagina's opnieuw genereren

Voer vanuit deze map uit:

```powershell
node tools/generate-object-pages.mjs
```

Hiermee worden alle objectpagina's opnieuw opgebouwd vanuit de centrale bron.

Controleer zonder bestanden te wijzigen:

```powershell
node tools/generate-object-pages.mjs --check
```

De controle meldt het wanneer een gegenereerde objectpagina handmatig is
gewijzigd en daardoor niet meer overeenkomt met de centrale gegevensbron.

## Belangrijk bij wijzigingen

Pas objectspecifieke inhoud aan in `data/object-pages.json` en genereer daarna
de HTML-pagina's opnieuw. Wijzig een gegenereerde objectpagina niet los, omdat
die wijziging bij een volgende generatie wordt overschreven.

De algemene pagina's, zoals `index.html`, `handboek.html`, `leeswijzer.html`,
`kwaliteit.html`, `rc.html`, `fg.html`, `pakketten.html` en `versie.html`, worden
niet door deze generator beheerd.
