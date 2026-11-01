const { test, expect } = require('@playwright/test');

test('la landing page mostra il percorso e le fonti di supporto', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Cantiere Chiaro/i);
  await expect(page.getByRole('heading', { name: /Ristrutturare, con più/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Manuali e moduli' })).toHaveAttribute('href', './manuali/');
  await expect(page.locator('#fonti')).toContainText('FONTI E VERIFICA');
  await expect(page.locator('#fonti')).toContainText("Testo Unico dell'Edilizia");
  await expect(page.locator('#fonti a[href^="https://www.normattiva.it/"]')).toHaveAttribute('target', '_blank');
  await page.getByRole('button', { name: /serve una mano\?/i }).click();
  await expect(page.locator('#sicurezza')).toBeVisible();
  await page.locator('#close-dialog').click();
  await expect(page.locator('#sicurezza')).not.toBeVisible();
});

test('la raccolta di manuali è accessibile separatamente dall’app', async ({ page }) => {
  await page.goto('/manuali/');

  await expect(page).toHaveTitle(/Manuali e moduli \| Cantiere Chiaro/i);
  await expect(page.getByRole('heading', { name: 'Manuali e moduli' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Leggi il manuale completo su GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/federicocroletti-tech/cantiere-chiaro/blob/main/docs/orientamento/percorso-base.md'
  );
  await expect(page.getByRole('link', { name: 'Apri e copia i moduli su GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/federicocroletti-tech/cantiere-chiaro/blob/main/templates/moduli.md'
  );
});

test('il pulsante prossimo passo apre la fase successiva', async ({ page }) => {
  await page.goto('/');

  for (let taskIndex = 0; taskIndex < 3; taskIndex += 1) {
    await page.locator(`[data-task="${taskIndex}"]`).check();
  }

  await expect(page.locator('#next-title')).toHaveText('Confronta le offerte, non solo i totali');
  await page.locator('#next-action').click();

  await expect(page.locator('#phase-tab-1')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#phase-detail h3')).toHaveText('Confronta le offerte, non solo i totali');
});

test('la checklist aggiorna il progresso e il diario salva le note', async ({ page }) => {
  await page.goto('/');

  const firstTask = page.locator('[data-task="0"]');
  await firstTask.check();
  await expect(page.locator('#progress-value')).not.toHaveText('0');

  await page.locator('#diary-date').fill('2026-10-28');
  await page.locator('#diary-category').selectOption('decisione');
  await page.locator('#diary-title').fill('Scelta del fornitore');
  await page.locator('#diary-description').fill('Abbiamo concordato di richiedere tre preventivi e di verificare le referenze.');
  await page.locator('#diary-form button[type="submit"]').click();

  await expect(page.locator('#diary-count')).toContainText('1 nota');
  await expect(page.getByText('Scelta del fornitore')).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#export-diary').click()
  ]);
  await expect(download.suggestedFilename()).toMatch(/diario-lavori-/);
});

test('i progressi non validi salvati vengono ignorati', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('cantiere-chiaro-demo-v1', JSON.stringify({
      0: [0, 0, 99],
      99: [0],
      1: 'non-array'
    }));
  });
  await page.goto('/');

  await expect(page.locator('#progress-value')).toHaveText('6');
  await expect(page.locator('#progress-status')).toContainText('solo in questo browser');
});

test('annullare il reset conserva i progressi; confermarlo li azzera', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-task="0"]').check();
  await expect(page.locator('#progress-value')).not.toHaveText('0');

  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('#reset-button').click();
  await expect(page.locator('#progress-value')).not.toHaveText('0');

  page.once('dialog', dialog => dialog.accept());
  await page.locator('#reset-button').click();
  await expect(page.locator('#progress-value')).toHaveText('0');
});

test('un errore di archiviazione non mostra progressi non salvati come completati', async ({ page }) => {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'cantiere-chiaro-demo-v1') throw new DOMException('Storage full', 'QuotaExceededError');
      return originalSetItem.call(this, key, value);
    };
  });
  await page.goto('/');
  await page.locator('[data-task="0"]').click();

  await expect(page.locator('#progress-value')).toHaveText('0');
  await expect(page.locator('#progress-status')).toContainText('Salvataggio non riuscito');
  await expect(page.locator('[data-task="0"]')).not.toBeChecked();
});
