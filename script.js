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

  startPetalRain();
})();
