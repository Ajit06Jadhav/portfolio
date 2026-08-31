(function () {
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var tabbarNav = document.querySelector('.tabbar__nav');
  if (navToggle && tabbarNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = tabbarNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------- tab navigation: smooth scroll + active state ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'];

  function goToSection(id) {
    var target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (tabbarNav) tabbarNav.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  for (var t = 0; t < tabs.length; t++) {
    (function (index) {
      tabs[index].addEventListener('click', function () {
        goToSection(sectionIds[index]);
      });
    })(t);
  }

  var heroActionContact = document.querySelector('[data-nav-target="contact"]');
  if (heroActionContact) {
    heroActionContact.addEventListener('click', function (e) {
      e.preventDefault();
      goToSection('contact');
    });
  }

  var sections = [];
  for (var s = 0; s < sectionIds.length; s++) {
    var el = document.getElementById(sectionIds[s]);
    if (el) sections.push(el);
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            var idx = sections.indexOf(entries[e].target);
            for (var ti = 0; ti < tabs.length; ti++) tabs[ti].classList.remove('is-active');
            if (tabs[idx]) tabs[idx].classList.add('is-active');
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    for (var si = 0; si < sections.length; si++) navObserver.observe(sections[si]);
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAllReveals() {
    for (var r = 0; r < revealEls.length; r++) revealEls[r].classList.add('is-visible');
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        for (var e2 = 0; e2 < entries.length; e2++) {
          if (entries[e2].isIntersecting) {
            entries[e2].target.classList.add('is-visible');
            obs.unobserve(entries[e2].target);
          }
        }
      },
      { threshold: 0.12 }
    );
    for (var rv = 0; rv < revealEls.length; rv++) revealObserver.observe(revealEls[rv]);
    // safety net: if an observer implementation never fires (older/partial
    // support), make sure content still appears rather than staying hidden.
    window.setTimeout(showAllReveals, 2500);
  } else {
    showAllReveals();
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
      for (var ti2 = 0; ti2 < tokens.length; ti2++) {
        var tok = tokens[ti2];
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

      // start slightly after load so the window "opens" first
      window.setTimeout(typeNext, 350);
    }
  }
})();
