const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8793/index.html', { waitUntil: 'load' });
  const info = await page.evaluate(() => {
    function info(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { sel, fontSize: cs.fontSize, display: cs.display, text: el.textContent.trim() };
    }
    return [
      info('#servicios .feature-badge-pill'),
      info('#instalaciones .eyebrow'),
      info('#por-que-escogernos .eyebrow'),
      info('#contacto .eyebrow'),
    ];
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
