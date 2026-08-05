# Onderhoud van de objectpagina's

De objectpagina's in deze map zijn volledige HTML-bestanden. Daardoor blijven
de inhoud, navigatie en landelijke iframe-informatie ook beschikbaar wanneer
JavaScript voor inhoudsopbouw niet wordt uitgevoerd.

## Gegenereerde pagina's

De 64 pagina's die in het Word-overzicht de status **Maken** hadden, plus de
later toegevoegde pagina's voor Bron, Kanaal, zes waterinrichtingselementen en Wijk,
worden beheerd met:

`tools/generate-missing-object-pages.mjs`

In dit bestand staan per pagina onder andere:

- titel, bestandsnaam, objectklasse en geometrie;
- definitie, classificatie en geometrie;
- de Geonovum-URL, het fragment en de gemeten iframe-hoogte;
- de koppeling naar het juiste BGT-pakket.

Voer vanuit deze map uit:

```powershell
node tools/generate-missing-object-pages.mjs
```

De generator bouwt de 73 pagina's opnieuw op en actualiseert tegelijk:

- de objectlinks op `index.html`;
- de centrale zoekindex in `site.js`;
- de aanvullende regels voor Sensor, Peilbuis en Pollerbedieningskast in
  `pakketten.html`.

## Belangrijk bij wijzigingen

Pas de gegevens van deze 73 pagina's aan in de array `rawPages` in de generator
en voer de generator daarna opnieuw uit. Wijzig een van deze gegenereerde
objectpagina's niet los, omdat die wijziging bij een volgende generatie wordt
overschreven.

De overige, oudere objectpagina's en algemene pagina's worden niet door deze
generator beheerd.
