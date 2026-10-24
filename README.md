# InfoBandi Italia

Guida ai bandi per famiglie e lavoratori: bonus e bandi dei comuni, calcolatore del premio di produzione (cash o welfare), Fondo Cometa, comparatore dei fondi pensione e CCNL metalmeccanico.

Sito statico: solo HTML, CSS e JavaScript, nessuna installazione richiesta.

## Struttura

```
index.html              la pagina (testi e struttura)
manifest.webmanifest    nome e icone per "Aggiungi a schermata Home"
assets/style.css        stile grafico e font
assets/app.js           calcolatore e pulsante "torna su"
assets/fonts/           font Bricolage Grotesque (licenza SIL OFL, vedi OFL.txt)
assets/                 logo e icone
.nojekyll               dice a GitHub Pages di pubblicare i file così come sono
```

## Pubblicare con GitHub Pages

1. Crea un nuovo repository su GitHub (ad esempio `infobandi-italia`), pubblico.
2. Carica tutti i file di questa cartella nella radice del repository (*Add file → Upload files*), compresa la cartella `assets`.
3. Vai su *Settings → Pages*, in *Build and deployment* scegli *Deploy from a branch*, branch `main`, cartella `/ (root)`, e salva.
4. Dopo uno o due minuti il sito è online su `https://<tuo-utente>.github.io/infobandi-italia/`.

## Modificare i contenuti

Tutto si trova in `index.html`:

- **Link Telegram**: cerca `t.me/`
- **Messaggi del banner NEWS**: cerca `ticker-move`
- **Link donazioni**: cerca `donate-link`
- **Parametri del calcolatore** (soglia, % extra, INPS, imposta): cerca `p-soglia`

## Sicurezza

La pagina ha una Content Security Policy (il tag `meta http-equiv="Content-Security-Policy"` in `index.html`) che permette di caricare solo file di questo sito. Per questo stile e script stanno in `assets/style.css` e `assets/app.js`: non aggiungere blocchi `<style>` o `<script>` dentro `index.html`, né attributi `style="..."` od `onclick="..."`, perché verrebbero bloccati. Anche immagini, font o script presi da altri siti verrebbero bloccati, a meno di aggiornare la policy. I normali link verso altri siti funzionano.

## Avvertenza

I contenuti hanno carattere informativo e non costituiscono consulenza legale, fiscale o finanziaria.
