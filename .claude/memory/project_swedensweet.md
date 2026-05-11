---
name: Sweden Sweet — B2B Shopify-projekt
description: Fullständig kontext för pågående kundprojekt att bygga swedensweet.com
type: project
---

## Kund
- **Företag:** Gramlux Foods AB / The Nordic Hype
- **Kontakt:** Vän till användaren
- **Befintliga sajter:** swedishcandy.store (Shopify), thenordichype.com (WordPress), faire.com/direct/swedishcandystore1

## Vad som ska byggas
Ny B2B-grossistbutik på **swedensweet.com** — Next.js headless frontend kopplad mot befintliga swedishcandy.store Shopify-kontot.

**Why:** Kunden vill ha en egen B2B-kanal utan att betala Faire 15–25% provision på alla ordrar.

## Teknisk stack
- Frontend: Next.js (headless, finns i `swedensweet`-repot)
- Backend: Shopify Basic (~$39/mån, kunden betalar) via Storefront API
- Domän: swedensweet.com (ägs av kunden på GoDaddy)
- Accentfärg: #D85A30
- Valuta: USD, marknad: USA

## Lagermodell (två lager)
Kunden har två lager med separata sortiment och priser:
- **USA-lager (Chicago, IL):** Kärnasortiment, snabb inrikesleverans
- **Svenskt lager:** Bredare sortiment, fler produkter, eventuellt andra priser
Besökaren väljer lager på startsidan → kommer till rätt katalog

## B2B-modell
Öppen butik med standardpriser. Butiker ansöker om grossistkonto → användaren/kunden godkänner → tilldelar rabattsats → kunden loggar in och ser sina priser.

## Pris & villkor
- **Fast pris bygge:** 7 000 kr (50% förskott, 50% vid leverans)
- **Månadsavgift drift:** 599 kr/mån
- Kunden betalar Shopify separat direkt

## Deadline
**7 maj 2026** — genomförbar men kräver att kunden levererar bilder senast 28–29 april.

## Produkter
50–70 artiklar. Texter finns redan i swedishcandy.store. Kunden tar NYA bilder (inte klara än). Kategorier: godis, choklad, chips, kakor. Märken: BUBS, Fazer, Cloetta, Marabou, Malaco m.fl.

## Designreferens
Kunden har skickat en HTML-mockup: `candy_b2b_simple (1).html` i projektmappen. Clean, minimalistisk B2B-stil, färg #D85A30, sektioner: nav, hero, stats-rad, kategorier, produkter, prisnivåer, footer.

## Aktuell status (2026-05-11)
- Sverige-katalogen är dold tills vidare — ersatt med email-signup-sida (/catalog/sweden). Kunden behöver bestämma MOQ, priser och frakt från Sverige.
- Pricing-sektionen på startsidan är dold (`{false && ...}`) tills priserna är klara.
- Sverige-lager-kortet, footer-referensen och USA-katalogens Sverige-upsell är borttagna.
- **ShipStation konfigurerat:** USPS, UPS, FedEx aktiverade med rabatterade priser. Shopify-butiken kopplad. "Send email and marketplace notification when shipping label is created" aktiverat — Shopify notifieras automatiskt vid fulfillment. Återstår: lägga till lageradress (Santa Fe Springs, CA) under Settings → Warehouse, samt välja plan innan 10 juni 2026.

## Bygge-prioritetsordning
1. ✅ Miljövariabler (.env.local med Shopify-credentials)
2. ✅ Nav-länkar och knappar kopplade till rätt sidor
3. ✅ Katalog-sida (/catalog/usa och /catalog/sweden) med produktfiltrering
4. ✅ Ansökningsformulär för B2B-konto
5. ✅ Produktdetaljsidor (/products/[handle])
6. ✅ Responsiv design (mobil)
7. ✅ Kontaktsida
8. 🔜 ShipStation-integration (USA-frakt)
9. 🔜 Sverige-katalog med MOQ/priser/frakt (när kunden bestämt sig)

## How to apply
Använd denna kontext när användaren frågar om Sweden Sweet-projektet, prissättning, tekniska val eller kundkommunikation.
