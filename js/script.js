(function () {
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- jump navigation (topbar brand, dotnav, hero CTA, scroll hint) ---------- */
  var jumpEls = Array.prototype.slice.call(document.querySelectorAll('[data-jump]'));

  function goToSection(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  for (var j = 0; j < jumpEls.length; j++) {
    (function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        goToSection(el.getAttribute('data-jump'));
      });
    })(jumpEls[j]);
  }

  /* ---------- active section tracking (dotnav highlight + arrival fade) ---------- */
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var dotItems = Array.prototype.slice.call(document.querySelectorAll('.dotnav__item'));

  function setActive(id) {
    for (var d = 0; d < dotItems.length; d++) {
      var isMatch = dotItems[d].getAttribute('data-jump') === id;
      dotItems[d].classList.toggle('is-active', isMatch);
      if (isMatch) {
        dotItems[d].setAttribute('aria-current', 'true');
      } else {
        dotItems[d].removeAttribute('aria-current');
      }
    }
  }

  if ('IntersectionObserver' in window && panels.length) {
    var panelObserver = new IntersectionObserver(
      function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            entries[e].target.classList.add('is-active');
            setActive(entries[e].target.id);
          }
        }
      },
      { threshold: 0.45 }
    );
    for (var p = 0; p < panels.length; p++) panelObserver.observe(panels[p]);

    // safety net in case an old/partial observer implementation never fires
    window.setTimeout(function () {
      for (var pi = 0; pi < panels.length; pi++) panels[pi].classList.add('is-active');
      if (panels[0]) setActive(panels[0].id);
    }, 2000);
  } else {
    for (var pj = 0; pj < panels.length; pj++) panels[pj].classList.add('is-active');
    if (panels[0]) setActive(panels[0].id);
  }

  /* ---------- hero JSON typewriter ---------- */
  var typedEl = document.getElementById('jsonTyped');

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (typedEl) {
    var tokens = [
      { t: '{\n', c: 'p' },
      { t: '  "name"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"Ajit Narayan Jadhav"', c: 's' }, { t: ',\n', c: 'p' },
      { t: '  "role"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"Full-Stack Developer"', c: 's' }, { t: ',\n', c: 'p' },
      { t: '  "location"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"India"', c: 's' }, { t: ',\n', c: 'p' },
      { t: '  "experience_years"', c: 'k' }, { t: ': ', c: 'p' }, { t: '4.3', c: 'n' }, { t: ',\n', c: 'p' },
      { t: '  "primary_stack"', c: 'k' }, { t: ': [', c: 'p' }, { t: '"Node.js"', c: 's' }, { t: ', ', c: 'p' }, { t: '"React.js"', c: 's' }, { t: ', ', c: 'p' }, { t: '"JavaScript"', c: 's' }, { t: '],\n', c: 'p' },
      { t: '  "also_knows"', c: 'k' }, { t: ': [', c: 'p' }, { t: '"PHP"', c: 's' }, { t: ', ', c: 'p' }, { t: '"C"', c: 's' }, { t: ', ', c: 'p' }, { t: '"C++"', c: 's' }, { t: ', ', c: 'p' }, { t: '"TypeScript"', c: 's' }, { t: '],\n', c: 'p' },
      { t: '  "currently"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"Software Engineer @ RWS (India)"', c: 's' }, { t: ',\n', c: 'p' },
      { t: '  "status"', c: 'k' }, { t: ': ', c: 'p' }, { t: '"open_to_work"', c: 's' }, { t: '\n', c: 'p' },
      { t: '}', c: 'p' }
    ];

    function renderFull() {
      var html = '';
      for (var tk = 0; tk < tokens.length; tk++) {
        html += '<span class="' + tokens[tk].c + '">' + escapeHtml(tokens[tk].t) + '</span>';
      }
      typedEl.innerHTML = html;
    }

    if (prefersReducedMotion || !('requestAnimationFrame' in window)) {
      renderFull();
    } else {
      var flatChars = [];
      for (var ti = 0; ti < tokens.length; ti++) {
        var tok = tokens[ti];
        for (var ci = 0; ci < tok.t.length; ci++) {
          flatChars.push({ ch: tok.t.charAt(ci), c: tok.c });
        }
      }

      var cursor = document.createElement('span');
      cursor.className = 'cursor';
      typedEl.appendChild(cursor);

      var idxChar = 0;

      function typeNext() {
        if (idxChar >= flatChars.length) return;
        var current = flatChars[idxChar];
        var spans = typedEl.querySelectorAll('span:not(.cursor)');
        var last = spans.length ? spans[spans.length - 1] : null;
        if (last && last.getAttribute('data-c') === current.c) {
          last.textContent += current.ch;
        } else {
          var span = document.createElement('span');
          span.className = current.c;
          span.setAttribute('data-c', current.c);
          span.textContent = current.ch;
          typedEl.insertBefore(span, cursor);
        }
        idxChar++;
        var delay = current.ch === '\n' ? 40 : 8 + Math.random() * 14;
        window.setTimeout(typeNext, delay);
      }

      window.setTimeout(typeNext, 400);
    }
  }
})();
