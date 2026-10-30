const phases = [
  {
    title: "Prima di partire",
    heading: "Metti a fuoco il progetto",
    intro: "Prima di chiedere preventivi, chiarisci obiettivi e vincoli. Un brief semplice aiuta te e i professionisti a parlare della stessa cosa.",
    tasks: [
      { title: "Scrivi cosa vuoi cambiare e perché", detail: "Separa ciò che è indispensabile da ciò che è un desiderio." },
      { title: "Raccogli misure, foto e documenti disponibili", detail: "Annota dubbi e vincoli; fai verificare i dati tecnici." },
      { title: "Stabilisci un budget orientativo e un margine", detail: "Chiedi quali voci sono escluse e quali imprevisti potrebbero emergere." }
    ],
    questions: [
      "Quali aspetti richiedono un progetto o una verifica tecnica?",
      "Quali decisioni devo prendere prima di chiedere un'offerta?"
    ],
    note: "Per pratiche edilizie e vincoli, confrontati con un tecnico abilitato del tuo Comune."
  },
  {
    title: "Scegliere l'impresa",
    heading: "Confronta le offerte, non solo i totali",
    intro: "Per capire se due offerte sono confrontabili, guarda nel dettaglio lavorazioni, materiali, esclusioni, tempi e responsabilità indicate.",
    tasks: [
      { title: "Chiedi offerte scritte e con voci dettagliate", detail: "Descrizione, quantità, materiali e criteri di misurazione dovrebbero essere comprensibili." },
      { title: "Chiarisci cosa è incluso e cosa resta fuori", detail: "Trasporti, smaltimenti, protezioni, ripristini e forniture possono variare." },
      { title: "Verifica referenze e identità dell'impresa", detail: "Confronta nominativi, dati aziendali e lavori simili; chiedi chi seguirà il cantiere." }
    ],
    questions: [
      "Chi sarà il mio referente quotidiano?",
      "Quali lavorazioni o forniture non sono comprese nel prezzo?"
    ],
    note: "Per aspetti fiscali, autorizzativi o di sicurezza, chiedi verifiche aggiornate a professionisti o enti competenti."
  },
  {
    title: "Accordi scritti",
    heading: "Metti nero su bianco gli accordi",
    intro: "Un accordo chiaro riduce le incomprensioni: controlla che documenti e allegati descrivano il lavoro che ti aspetti.",
    tasks: [
      { title: "Leggi contratto e allegati prima di firmare", detail: "Controlla ambito dei lavori, materiali, prezzo, esclusioni e riferimenti ai documenti allegati." },
      { title: "Concorda tempi e modalità di pagamento", detail: "Chiedi un calendario comprensibile collegato alle fasi e ai documenti di spesa." },
      { title: "Chiarisci come si approvano modifiche e varianti", detail: "Fatti indicare come saranno comunicati costi e impatto sui tempi prima di procedere." }
    ],
    questions: [
      "Come verranno autorizzati e valorizzati eventuali lavori extra?",
      "A chi mi rivolgo se emerge un problema o un ritardo?"
    ],
    note: "In caso di clausole poco chiare o importi rilevanti, valuta una revisione indipendente prima della firma."
  },
  {
    title: "Durante i lavori",
    heading: "Segui l'avanzamento con metodo",
    intro: "Un punto periodico con il referente e un archivio ordinato aiutano a gestire dubbi, decisioni e cambiamenti senza affidarsi alla memoria.",
    tasks: [
      { title: "Concorda aggiornamenti regolari con il referente", detail: "Annota decisioni, responsabilità e prossimi passaggi dopo ogni confronto." },
      { title: "Fotografa l'avanzamento in modo datato", detail: "Organizza le immagini per stanza o fase e conserva gli originali." },
      { title: "Comunica per iscritto problemi e richieste", detail: "Descrivi il fatto, allega evidenze e chiedi tempi e modalità di riscontro." }
    ],
    questions: [
      "Quale lavorazione si farà adesso e quale viene dopo?",
      "Chi deve approvare una scelta prima che si proceda?"
    ],
    note: "Non intervenire su impianti o opere tecniche: sottoponi dubbi al professionista responsabile."
  },
  {
    title: "Varianti e pagamenti",
    heading: "Fai chiarezza prima di approvare",
    intro: "Se il lavoro cambia, fermati a capire cosa comporta. Conserva richiesta, motivazione, importo e aggiornamento dei tempi.",
    tasks: [
      { title: "Chiedi una descrizione scritta di ogni variante", detail: "Fatti spiegare cosa cambia rispetto all'accordo e perché è necessario." },
      { title: "Valuta costi e tempi aggiuntivi prima di dare l'ok", detail: "Richiedi l'impatto complessivo e una conferma tracciabile dell'accordo." },
      { title: "Abbina ogni pagamento a documenti e stato dei lavori", detail: "Conserva fatture, ricevute e riferimenti alla fase o alla voce concordata." }
    ],
    questions: [
      "È una lavorazione già prevista o una modifica rispetto all'accordo?",
      "Posso avere il dettaglio del costo e dell'impatto sui tempi per iscritto?"
    ],
    note: "Se non concordi su importi o prestazioni, non prendere decisioni affrettate: chiedi un parere indipendente."
  },
  {
    title: "Verifiche finali",
    heading: "Controlla e raccogli i documenti",
    intro: "Prima di considerare concluso il lavoro, organizza un sopralluogo, annota ciò che resta da sistemare e chiedi la documentazione prevista per il tuo intervento.",
    tasks: [
      { title: "Fai un giro di verifica con una lista stanza per stanza", detail: "Registra difformità o lavorazioni da completare con foto e descrizioni chiare." },
      { title: "Metti per iscritto le osservazioni e gli accordi di chiusura", detail: "Invia l'elenco ai referenti e conserva la risposta e le date concordate." },
      { title: "Chiedi e archivia i documenti di fine lavori pertinenti", detail: "La documentazione dipende dagli interventi: verifica con il tecnico responsabile cosa è necessario." }
    ],
    questions: [
      "Quali verifiche e documenti sono previsti per questo intervento?",
      "Come vengono gestite e tracciate le lavorazioni ancora da completare?"
    ],
    note: "Prima di firmare verbali di chiusura o saldare importi contestati, valuta il supporto di un professionista."
  }
];

const storageKey = "cantiere-chiaro-demo-v1";
const diaryStorageKey = "cantiere-chiaro-diario-v1";
const diaryCategories = {
  decisione: "Decisione",
  aggiornamento: "Aggiornamento",
  problema: "Problema o richiesta",
  pagamento: "Pagamento o spesa",
  incontro: "Incontro o telefonata"
};
const phaseList = document.querySelector("#phase-list");
const phaseDetail = document.querySelector("#phase-detail");
const dialog = document.querySelector("#sicurezza");
const backdrop = document.querySelector("#dialog-backdrop");
let activePhase = 0;
let completed = loadProgress();
let diaryEntries = loadDiary();

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch (error) {
    console.warn("Impossibile leggere i progressi salvati per questa demo.", error);
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  } catch (error) {
    console.warn("Impossibile salvare i progressi nel browser.", error);
  }
}

function loadDiary() {
  try {
    const saved = JSON.parse(localStorage.getItem(diaryStorageKey) || "[]");
    if (!Array.isArray(saved)) throw new TypeError("Il diario salvato non ha il formato previsto.");
    const validEntries = saved.filter(entry =>
      entry &&
      typeof entry.id === "string" &&
      typeof entry.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(entry.date) &&
      typeof entry.category === "string" &&
      Object.hasOwn(diaryCategories, entry.category) &&
      typeof entry.title === "string" &&
      typeof entry.description === "string"
    );
    if (validEntries.length !== saved.length) {
      console.warn("Alcune note del diario salvato non sono valide e non verranno mostrate.");
    }
    return validEntries;
  } catch (error) {
    console.warn("Impossibile leggere il diario salvato per questa demo.", error);
    return [];
  }
}

function saveDiary() {
  try {
    localStorage.setItem(diaryStorageKey, JSON.stringify(diaryEntries));
    return true;
  } catch (error) {
    console.warn("Impossibile salvare il diario nel browser.", error);
    setDiaryStatus("Salvataggio non riuscito: il browser potrebbe non avere spazio disponibile. Esporta o annota le modifiche prima di chiudere la pagina.", true);
    return false;
  }
}

function setDiaryStatus(message, isError = false) {
  const status = document.querySelector("#diary-status");
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function renderDiary() {
  const container = document.querySelector("#diary-entries");
  const count = document.querySelector("#diary-count");
  const sortedEntries = [...diaryEntries].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  count.textContent = `${diaryEntries.length} ${diaryEntries.length === 1 ? "nota" : "note"}`;
  container.replaceChildren();

  if (sortedEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "diary-empty";
    empty.textContent = "Non hai ancora aggiunto note. Usa il modulo qui sopra per iniziare il tuo diario.";
    container.append(empty);
    return;
  }

  for (const entry of sortedEntries) {
    const article = document.createElement("article");
    article.className = "diary-entry";
    const meta = document.createElement("div");
    meta.className = "diary-entry-meta";
    const category = document.createElement("span");
    category.className = `diary-entry-category ${entry.category}`;
    category.textContent = diaryCategories[entry.category];
    const date = document.createElement("time");
    date.dateTime = entry.date;
    date.textContent = new Intl.DateTimeFormat("it-IT", { dateStyle: "long", timeZone: "UTC" })
      .format(new Date(`${entry.date}T00:00:00Z`));
    meta.append(category, date);

    const title = document.createElement("h4");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.textContent = entry.description;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "diary-remove";
    remove.textContent = "Elimina";
    remove.setAttribute("aria-label", `Elimina nota: ${entry.title}`);
    remove.dataset.removeEntry = entry.id;
    article.append(meta, title, description, remove);
    container.append(article);
  }
}

function completedForPhase(index) {
  const phaseProgress = completed[index];
  return Array.isArray(phaseProgress) ? phaseProgress : [];
}

function renderPhases() {
  phaseList.innerHTML = phases.map((phase, index) => {
    const isComplete = phase.tasks.every((_, taskIndex) => completedForPhase(index).includes(taskIndex));
    const state = isComplete ? "completed" : "";
    const marker = isComplete
      ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8 3 3 6-6"/></svg>'
      : String(index + 1).padStart(2, "0");
    return `<button type="button" class="phase-button ${state} ${activePhase === index ? "active" : ""}" id="phase-tab-${index}" role="tab" aria-selected="${activePhase === index}" aria-controls="phase-detail" tabindex="${activePhase === index ? "0" : "-1"}" data-phase="${index}"><span class="phase-dot">${marker}</span><span class="phase-label">${phase.title}</span></button>`;
  }).join("");
}

function renderDetail() {
  const phase = phases[activePhase];
  const checked = completedForPhase(activePhase);
  phaseDetail.setAttribute("aria-labelledby", `phase-tab-${activePhase}`);
  phaseDetail.innerHTML = `
    <div class="phase-detail-main">
      <div class="phase-detail-eyebrow"><span></span> FASE ${String(activePhase + 1).padStart(2, "0")} · ${phase.title.toLocaleUpperCase("it-IT")}</div>
      <h3>${phase.heading}</h3>
      <p class="phase-detail-intro">${phase.intro}</p>
      <div class="checklist" aria-label="Checklist: ${phase.title}">
        ${phase.tasks.map((task, index) => `
          <label class="check-item">
            <input type="checkbox" data-task="${index}" ${checked.includes(index) ? "checked" : ""}>
            <span><strong>${task.title}</strong><small>${task.detail}</small></span>
          </label>
        `).join("")}
      </div>
    </div>
    <aside class="phase-aside" aria-label="Domande e promemoria">
      <div class="aside-title"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1 .8-1.7 1.2-1.7 2.7M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>Domande da fare</div>
      <ul class="question-list">${phase.questions.map(question => `<li>${question}</li>`).join("")}</ul>
      <p class="phase-aside-note">${phase.note}</p>
    </aside>
  `;
}

function renderProgress() {
  const total = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const done = phases.reduce((sum, phase, index) => sum + completedForPhase(index).length, 0);
  const percent = total ? Math.round((done / total) * 100) : 0;
  document.querySelector("#progress-value").textContent = String(percent);
  document.querySelector("#completed-count").textContent = String(done);
  document.querySelector("#total-count").textContent = String(total);
  document.querySelector("#progress-bar").style.width = `${percent}%`;
  document.querySelector("#progress-ring").style.strokeDashoffset = String(195 - (195 * percent / 100));
  document.querySelector(".ring-wrap").setAttribute("aria-label", `Progresso ${percent}%`);

  const next = phases.findIndex((phase, index) => !phase.tasks.every((_, taskIndex) => completedForPhase(index).includes(taskIndex)));
  const nextIndex = next === -1 ? phases.length - 1 : next;
  document.querySelector(".step-index").innerHTML = `${String(nextIndex + 1).padStart(2, "0")} <span>/ 06</span>`;
  document.querySelector("#next-title").textContent = next === -1 ? "Percorso completato" : phases[nextIndex].heading;
  document.querySelector("#next-description").textContent = next === -1
    ? "Hai spuntato tutte le checklist di questa demo."
    : phases[nextIndex].tasks.find((_, taskIndex) => !completedForPhase(nextIndex).includes(taskIndex))?.title ?? phases[nextIndex].intro;
  document.querySelector("#next-action").innerHTML = `${next === -1 ? "Rivedi la checklist" : "Apri la checklist"} <span aria-hidden="true">→</span>`;
  document.querySelector("#next-action").dataset.phase = String(nextIndex);
  document.querySelector("#continue-button").innerHTML = `${next === -1 ? "Rivedi il percorso" : "Continua il percorso"} <span aria-hidden="true">→</span>`;
  document.querySelector("#continue-button").dataset.phase = String(nextIndex);
}

function render() {
  renderPhases();
  renderDetail();
  renderProgress();
}

function setActivePhase(index, focusTab = false) {
  activePhase = Math.max(0, Math.min(phases.length - 1, index));
  render();
  if (focusTab) document.querySelector(`#phase-tab-${activePhase}`).focus();
}

phaseList.addEventListener("click", event => {
  const button = event.target.closest("[data-phase]");
  if (button) setActivePhase(Number(button.dataset.phase));
});

phaseList.addEventListener("keydown", event => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const nextIndex = event.key === "Home" ? 0
    : event.key === "End" ? phases.length - 1
      : activePhase + (event.key === "ArrowRight" ? 1 : -1);
  setActivePhase((nextIndex + phases.length) % phases.length, true);
});

phaseDetail.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-task]");
  if (!checkbox) return;
  const taskIndex = Number(checkbox.dataset.task);
  const phaseProgress = new Set(completedForPhase(activePhase));
  if (checkbox.checked) phaseProgress.add(taskIndex);
  else phaseProgress.delete(taskIndex);
  completed[activePhase] = [...phaseProgress].sort((a, b) => a - b);
  saveProgress();
  render();
});

document.querySelector("#continue-button").addEventListener("click", event => {
  setActivePhase(Number(event.currentTarget.dataset.phase));
  document.querySelector("#percorso").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#next-action").addEventListener("click", event => {
  setActivePhase(Number(event.currentTarget.dataset.phase));
  document.querySelector("#percorso").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#reset-button").addEventListener("click", () => {
  completed = {};
  saveProgress();
  render();
});

function todayAsLocalDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

document.querySelector("#diary-date").value = todayAsLocalDate();

document.querySelector("#diary-form").addEventListener("submit", event => {
  event.preventDefault();
  if (diaryEntries.length >= 250) {
    setDiaryStatus("Hai raggiunto il limite di 250 note per questa demo. Esporta il diario prima di rimuovere le note che non ti servono.", true);
    return;
  }

  const form = event.currentTarget;
  const formData = new FormData(form);
  const entry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    date: String(formData.get("date")),
    category: String(formData.get("category")),
    title: String(formData.get("title")).trim(),
    description: String(formData.get("description")).trim()
  };
  if (!entry.date || !Object.hasOwn(diaryCategories, entry.category) || !entry.title || !entry.description) {
    setDiaryStatus("Controlla i campi: data, tipo di nota, titolo e descrizione sono obbligatori.", true);
    return;
  }

  diaryEntries.push(entry);
  const saved = saveDiary();
  renderDiary();
  if (saved) {
    form.reset();
    document.querySelector("#diary-date").value = todayAsLocalDate();
    document.querySelector("#diary-category").value = "decisione";
    document.querySelector("#diary-title").focus();
    setDiaryStatus("Nota aggiunta al diario del browser.");
  }
});

document.querySelector("#diary-entries").addEventListener("click", event => {
  const removeButton = event.target.closest("[data-remove-entry]");
  if (!removeButton) return;
  const previousEntries = diaryEntries;
  diaryEntries = diaryEntries.filter(entry => entry.id !== removeButton.dataset.removeEntry);
  if (!saveDiary()) {
    diaryEntries = previousEntries;
  } else {
    setDiaryStatus("Nota eliminata.");
  }
  renderDiary();
});

document.querySelector("#export-diary").addEventListener("click", () => {
  if (diaryEntries.length === 0) {
    setDiaryStatus("Il diario è vuoto: aggiungi almeno una nota prima di esportarlo.", true);
    return;
  }
  const data = {
    exportedAt: new Date().toISOString(),
    note: "Esportazione locale del diario Cantiere Chiaro.",
    entries: [...diaryEntries].sort((a, b) => a.date.localeCompare(b.date))
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `diario-lavori-${todayAsLocalDate()}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  setDiaryStatus("Esportazione completata. Conserva il file in un luogo sicuro.");
});

document.querySelector("#clear-diary").addEventListener("click", () => {
  if (diaryEntries.length === 0) {
    setDiaryStatus("Il diario è già vuoto.");
    return;
  }
  if (!window.confirm("Vuoi eliminare tutte le note del diario salvate in questo browser? Questa operazione non si può annullare.")) return;
  const previousEntries = diaryEntries;
  diaryEntries = [];
  if (!saveDiary()) {
    diaryEntries = previousEntries;
  } else {
    setDiaryStatus("Diario svuotato.");
  }
  renderDiary();
});

function openHelp() {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  backdrop.hidden = false;
  document.querySelector("#close-dialog").focus();
}

function closeHelp() {
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  backdrop.hidden = true;
  document.querySelector("#help-button").focus();
}

document.querySelector("#help-button").addEventListener("click", openHelp);
document.querySelector("#footer-help").addEventListener("click", event => {
  event.preventDefault();
  openHelp();
});
document.querySelector("#close-dialog").addEventListener("click", closeHelp);
document.querySelector("#done-dialog").addEventListener("click", closeHelp);
backdrop.addEventListener("click", closeHelp);
dialog.addEventListener("cancel", () => {
  backdrop.hidden = true;
  document.querySelector("#help-button").focus();
});
dialog.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeHelp();
  }
});
dialog.addEventListener("click", event => {
  if (event.target === dialog) closeHelp();
});

render();
renderDiary();
