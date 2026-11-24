(function () {
  var hero = document.getElementById('hero'),
      heroImg = document.getElementById('hero-img'),
      br = document.getElementById('br'),
      serifEl = br.querySelector('.serif'),
      subEl = br.querySelector('.sub');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var target = 0, cur = 0;

  // Imposta esplicitamente font Trust 3A e scaling verticale al 75%
  serifEl.style.fontFamily = '"Trust 3A", trust-3a, sans-serif';
  serifEl.style.fontWeight = '500';
  serifEl.style.display = 'inline-block';
  serifEl.style.transformOrigin = 'center center';
  serifEl.style.transform = 'scaleY(0.75)';

  // Imposta Trust 1A Regular e lo stesso scaling verticale al 75% sul sottotitolo
  if (subEl) {
    subEl.style.fontFamily = '"Trust 1A", trust-1a, sans-serif';
    subEl.style.fontWeight = '400';
    subEl.style.display = 'inline-block';
    subEl.style.transformOrigin = 'center center';
    subEl.style.transform = 'scaleY(0.75)';
  }

  function prog() {
    var r = hero.getBoundingClientRect(),
        t = hero.offsetHeight - innerHeight,
        p = Math.max(0, Math.min(1, -r.top / t));
    p = Math.max(0, Math.min(1, (p - 0.04) / 0.9));
    return p * p * (3 - 2 * p);
  }

  function brand() {
    var o = Math.max(0, Math.min(1, (cur - 0.04) / 0.5)),
        k = Math.min(1, cur / 0.85),
        ls = (0.716 - 0.64 * k * (2 - k)).toFixed(3) + 'em',
        textBlur = 'blur(' + (12 * (1 - o)).toFixed(1) + 'px)';

    br.style.opacity = o;
    br.style.letterSpacing = ls;
    serifEl.style.letterSpacing = ls;
    serifEl.style.paddingLeft = ls;
    serifEl.style.filter = textBlur;
    if (subEl) {
      subEl.style.letterSpacing = ls;
      subEl.style.paddingLeft = ls;
      subEl.style.filter = textBlur;
    }

    // Sfocatura responsive della fascia dietro i testi sincronizzata allo scroll
    var baseH = Math.max(56, Math.min(183, window.innerWidth * 0.128));
    br.style.setProperty('--bd-blur', (baseH * 0.16 * k).toFixed(1) + 'px');

    // Sfocatura e leggero zoom dell'immagine sincronizzati con il logo
    if (heroImg) {
      var imgBlur = (28 * (1 - k)).toFixed(1);
      var imgScale = (1 + 0.06 * (1 - k)).toFixed(4);
      heroImg.style.filter = 'blur(' + imgBlur + 'px)';
      heroImg.style.transform = 'scale(' + imgScale + ')';
    }
  }

  function tick() {
    target = prog();
    var d = target - cur;
    if (Math.abs(d) > 0.0004) {
      cur = reduce ? target : cur + d * 0.14;
      brand();
    }
    requestAnimationFrame(tick);
  }

  brand();
  tick();

  // Comparsa in opacità e blur delle sezioni allo scroll
  var sections = document.querySelectorAll('section.s');

  if (reduce || !('IntersectionObserver' in window)) {
    sections.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // L'animazione avviene una volta sola
        }
      });
    }, {
      threshold: 0.15, // Si attiva quando almeno il 15% della sezione è visibile
      rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(function (el) {
      observer.observe(el);
    });
  }
})();