(() => {
  const petalEmojis = ['🌸', '🌺', '🌷', '🌼', '💮', '🏵️'];
  const petalsLayer = document.getElementById('petals');
  const heartsLayer = document.getElementById('heartsLayer');
  const loveBtn = document.getElementById('loveBtn');
  const clickCounter = document.getElementById('clickCounter');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnPetal() {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

    const startLeft = Math.random() * 100;
    const fallDuration = 8 + Math.random() * 8;
    const swayDuration = 3 + Math.random() * 3;
    const size = 1 + Math.random() * 1.2;
    const delay = Math.random() * 2;

    petal.style.left = `${startLeft}vw`;
    petal.style.fontSize = `${size}rem`;
    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${delay}s, ${delay}s`;

    petalsLayer.appendChild(petal);

    window.setTimeout(() => petal.remove(), (fallDuration + delay) * 1000 + 200);
  }

  function startPetalRain() {
    if (prefersReducedMotion) return;
    const petalCount = window.innerWidth < 600 ? 12 : 22;
    for (let i = 0; i < petalCount; i++) {
      window.setTimeout(spawnPetal, i * 350);
    }
    window.setInterval(spawnPetal, 900);
  }

  const heartEmojis = ['💗', '💕', '💖', '🌸', '✨'];
  let clickCount = 0;

  function burstHearts() {
    const burstSize = 18;
    for (let i = 0; i < burstSize; i++) {
      window.setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        const left = 45 + (Math.random() * 10 - 5);
        const drift = (Math.random() * 200 - 100) + 'px';
        heart.style.left = `${left}vw`;
        heart.style.setProperty('--drift', drift);
        heart.style.fontSize = `${1.2 + Math.random() * 1.4}rem`;
        heartsLayer.appendChild(heart);
        window.setTimeout(() => heart.remove(), 3000);
      }, i * 60);
    }
  }

  const cheerMessages = [
    "Honey's smiling already! 🌷",
    "Sending double the love! 💞",
    "That's the spirit, Honey! ✨",
    "Get well soon, superstar! 🌟",
    "You're going to feel amazing soon! 🌈",
  ];

  if (loveBtn) {
    loveBtn.addEventListener('click', () => {
      burstHearts();
      clickCount += 1;
      const message = cheerMessages[(clickCount - 1) % cheerMessages.length];
      clickCounter.textContent = `${message}  (${clickCount} ${clickCount === 1 ? 'hug' : 'hugs'} sent)`;
    });
  }

  // ---------- Randomized bouquet ----------
  // A fresh arrangement of flowers blooms every time this page opens.
  const PETAL_COLORS = [
    '#ff9dc4', '#ffb6d9', '#ffc4dd', '#ffdcec', '#fff0f6',
    '#ffb0cf', '#ff7fae', '#ffe0f5', '#f6c8ff', '#ffd9b8',
  ];
  const CENTER_COLORS = ['#ffe066', '#ffd15c', '#ffcf40', '#fff2b0'];
  const STEM_COLORS = ['#7bab6e', '#8fc07f', '#6fa261'];
  const SWAY_CLASSES = ['sway1', 'sway2', 'sway3'];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function blossomMarkup(colorA, colorB, centerColor) {
    const offsets = [
      [0, -1], [0.87, -0.5], [0.87, 0.5],
      [0, 1], [-0.87, 0.5], [-0.87, -0.5],
    ];
    const petals = offsets.map(([dx, dy], i) => {
      const color = i % 2 === 0 ? colorA : colorB;
      return `<circle cx="${(dx * 18).toFixed(1)}" cy="${(dy * 18).toFixed(1)}" r="14" fill="${color}"/>`;
    }).join('');
    return `<g class="petals-group">${petals}</g><circle cx="0" cy="0" r="10" fill="${centerColor}"/>`;
  }

  function daisyMarkup(color, centerColor) {
    const petalCount = 10;
    let petals = '';
    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i;
      petals += `<ellipse cx="0" cy="-17" rx="5.5" ry="14" fill="${color}" transform="rotate(${angle.toFixed(1)})"/>`;
    }
    return `<g class="petals-group">${petals}</g><circle cx="0" cy="0" r="9" fill="${centerColor}"/>`;
  }

  function peonyMarkup(colorA, colorB, centerColor) {
    const offsets = [
      [0, -1], [0.87, -0.5], [0.87, 0.5],
      [0, 1], [-0.87, 0.5], [-0.87, -0.5],
    ];
    const outer = offsets.map(([dx, dy]) =>
      `<circle cx="${(dx * 19).toFixed(1)}" cy="${(dy * 19).toFixed(1)}" r="15" fill="${colorA}"/>`
    ).join('');
    const inner = offsets.map(([dx, dy]) =>
      `<circle cx="${(dx * 11).toFixed(1)}" cy="${(dy * 11).toFixed(1)}" r="10" fill="${colorB}" opacity="0.95"/>`
    ).join('');
    return `<g class="petals-group">${outer}${inner}</g><circle cx="0" cy="0" r="8" fill="${centerColor}"/>`;
  }

  function rotatePoint([px, py], deg) {
    const r = (deg * Math.PI) / 180;
    return [px * Math.cos(r) - py * Math.sin(r), px * Math.sin(r) + py * Math.cos(r)];
  }

  function ranunculusMarkup(colorA, colorB, colorC, centerColor) {
    const offsets = [
      [0, -1], [0.87, -0.5], [0.87, 0.5],
      [0, 1], [-0.87, 0.5], [-0.87, -0.5],
    ];
    const outer = offsets.map(([dx, dy]) =>
      `<circle cx="${(dx * 20).toFixed(1)}" cy="${(dy * 20).toFixed(1)}" r="15" fill="${colorA}"/>`
    ).join('');
    const mid = offsets.map((p) => rotatePoint(p, 30)).map(([dx, dy]) =>
      `<circle cx="${(dx * 13).toFixed(1)}" cy="${(dy * 13).toFixed(1)}" r="11" fill="${colorB}" opacity="0.95"/>`
    ).join('');
    const inner = offsets.map((p) => rotatePoint(p, 15)).map(([dx, dy]) =>
      `<circle cx="${(dx * 7).toFixed(1)}" cy="${(dy * 7).toFixed(1)}" r="7" fill="${colorC}" opacity="0.95"/>`
    ).join('');
    return `<g class="petals-group">${outer}${mid}${inner}</g><circle cx="0" cy="0" r="5" fill="${centerColor}"/>`;
  }

  function flowerMarkup() {
    const type = pick(['blossom', 'daisy', 'peony', 'ranunculus']);
    const colorA = pick(PETAL_COLORS);
    let colorB = pick(PETAL_COLORS);
    if (colorB === colorA) colorB = pick(PETAL_COLORS);
    let colorC = pick(PETAL_COLORS);
    if (colorC === colorB) colorC = pick(PETAL_COLORS);
    const centerColor = pick(CENTER_COLORS);

    if (type === 'daisy') return daisyMarkup(colorA, centerColor);
    if (type === 'peony') return peonyMarkup(colorA, colorB, centerColor);
    if (type === 'ranunculus') return ranunculusMarkup(colorA, colorB, colorC, centerColor);
    return blossomMarkup(colorA, colorB, centerColor);
  }

  function fillerMarkup(base) {
    let markup = '';
    const clusters = randInt(5, 8);
    for (let c = 0; c < clusters; c++) {
      const angleDeg = rand(-48, 48);
      const radius = rand(105, 215);
      const angleRad = (angleDeg * Math.PI) / 180;
      const cx = base.x + radius * Math.sin(angleRad);
      const cy = base.y - radius * Math.cos(angleRad);
      const dotCount = randInt(3, 5);
      for (let d = 0; d < dotCount; d++) {
        const dx = cx + rand(-14, 14);
        const dy = cy + rand(-14, 14);
        const r = rand(1.6, 3);
        markup += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff8fb" opacity="${rand(0.7, 0.95).toFixed(2)}"/>`;
      }
    }
    return markup;
  }

  function generateBouquet() {
    const stemsG = document.getElementById('bouquetStems');
    const flowersG = document.getElementById('bouquetFlowers');
    const caption = document.getElementById('bouquetCaption');
    if (!stemsG || !flowersG) return;

    const base = { x: 210, y: 260 };
    const count = randInt(10, 14);

    let stemsMarkup = '';
    let flowersMarkup = '';
    let sparkleMarkup = '';

    for (let i = 0; i < count; i++) {
      const normalized = count === 1 ? 0 : (i / (count - 1)) * 2 - 1; // -1..1
      const angleDeg = normalized * 47 + rand(-6, 6);
      const radius = 212 - Math.abs(normalized) * 78 + rand(-10, 10);
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = base.x + radius * Math.sin(angleRad);
      const y = base.y - radius * Math.cos(angleRad);
      const size = Math.max(0.55, Math.min(1.5, 1.4 - Math.abs(normalized) * 0.6 + rand(-0.06, 0.06)));

      // curved stem from the base of the bouquet up to the flower
      const bulge = (x - base.x) * 0.18;
      const cx = (base.x + x) / 2 + bulge;
      const cy = (base.y + y) / 2;
      const stemColor = pick(STEM_COLORS);
      const stemWidth = (3 + size * 3).toFixed(1);
      stemsMarkup += `<path d="M${base.x} ${base.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" stroke="${stemColor}" stroke-width="${stemWidth}" fill="none" stroke-linecap="round"/>`;

      if (Math.random() < 0.45) {
        const t = 0.5 + rand(-0.1, 0.1);
        const lx = base.x + (x - base.x) * t;
        const ly = base.y + (y - base.y) * t;
        const leafAngle = (Math.atan2(y - base.y, x - base.x) * 180) / Math.PI + (Math.random() < 0.5 ? -60 : 60);
        stemsMarkup += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="12" ry="5" fill="${pick(STEM_COLORS)}" transform="rotate(${leafAngle.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)})"/>`;
      }

      const swayClass = pick(SWAY_CLASSES);
      const swayDelay = rand(-2, 0).toFixed(2);
      const bloomDelay = rand(-2, 0).toFixed(2);

      flowersMarkup += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${size.toFixed(2)})"><g class="flower ${swayClass}" style="animation-delay:${swayDelay}s">${flowerMarkup().replace('class="petals-group"', `class="petals-group" style="animation-delay:${bloomDelay}s"`)}</g></g>`;

      if (Math.random() < 0.4) {
        const sx = x + rand(-22, 22);
        const sy = y + rand(-24, -6);
        const sparkleDelay = rand(0, 2).toFixed(2);
        sparkleMarkup += `<text x="${sx.toFixed(1)}" y="${sy.toFixed(1)}" class="sparkle" style="animation-delay:${sparkleDelay}s">✨</text>`;
      }
    }

    stemsG.innerHTML = stemsMarkup;
    flowersG.innerHTML = fillerMarkup(base) + flowersMarkup + sparkleMarkup;

    if (caption) {
      caption.textContent = `${count} fresh flowers, picked just for you today 🌸`;
    }
  }

  const regenBtn = document.getElementById('regenBtn');
  if (regenBtn) {
    regenBtn.addEventListener('click', generateBouquet);
  }

  generateBouquet();
  startPetalRain();
})();
