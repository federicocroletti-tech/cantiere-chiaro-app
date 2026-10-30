# Cantiere Chiaro — applicazione web

Applicazione statica per organizzare le fasi dei lavori di casa. La knowledge base e i moduli originali sono mantenuti separatamente nel [repository documentale Cantiere Chiaro](https://github.com/federicocroletti-tech/cantiere-chiaro).

## Avvertenze sui dati

Checklist e diario sono salvati nel browser tramite `localStorage`; non vengono sincronizzati con un server. Chi usa lo stesso profilo browser potrebbe vederli. Il diario può essere esportato in un file JSON: conservalo con attenzione e non inserirvi dati o documenti non necessari. La persistenza locale non è un archivio sicuro né un backup.

I contenuti dell'app hanno finalità informative e organizzative e non sostituiscono consulenza legale, tecnica, fiscale, contabile o amministrativa.

## Sviluppo e test

Requisiti: Node.js 22.

```sh
npm ci
npm run test:playwright
npm run serve
```

Il codice è pubblicato per consultazione; tutti i diritti restano riservati e non viene concessa una licenza generale di riutilizzo, modifica o distribuzione. Eventuali contributi di codice richiedono termini scritti separati e approvati prima della pubblicazione; una revisione o un merge non trasferiscono automaticamente diritti.
