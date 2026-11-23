(function () {
  var hero = document.getElementById('hero'),
      br = document.getElementById('br'),
      serifEl = br.querySelector('.serif');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var target = 0, cur = 0;

  // Imposta esplicitamente font Trust 3A e scaling verticale al 75%
  serifEl.style.fontFamily = '"Trust 3A", trust-3a, sans-serif';
  serifEl.style.fontWeight = '500';
  serifEl.style.display = 'inline-block';
  serifEl.style.transformOrigin = 'center baseline';
  serifEl.style.transform = 'scaleY(0.75)';

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
        // Parte largo (0.716em) e si chiude esattamente sul tracking 76 (0.076em)
        ls = (0.716 - 0.64 * k * (2 - k)).toFixed(3) + 'em';

    br.style.opacity = o;
    br.style.filter = 'blur(' + (12 * (1 - o)).toFixed(1) + 'px)';
    br.style.letterSpacing = ls;
    br.style.paddingLeft = ls;
    serifEl.style.letterSpacing = ls;
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
})();