(function () {
  'use strict';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefix = location.pathname.includes('/template-pages/') ? '../' : '';
  // A native menu is independent of Lottie downloads and Webflow initialization.
  var wrapper = document.querySelector('.nav-wrapper');
  if (!wrapper) {
    var header = document.createElement('header');
    header.className = 'fallback-header';
    header.innerHTML = '<a class="nav-brand" href="' + prefix + 'index.html" aria-label="Andreia Ferraz home">AF</a><div class="nav-wrapper"></div>';
    document.body.prepend(header);
    wrapper = header.querySelector('.nav-wrapper');
  }
  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'site-menu-toggle';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'site-menu');
  toggle.innerHTML = '<span></span><span></span>';
  wrapper.appendChild(toggle);
  // Keep the header outside animated/overflow-clipped hero ancestors.
  var fixedHeader = wrapper.closest('.navbar, .oh-navbar, .fallback-header');
  if (fixedHeader) {
    var spacer = document.createElement('div');
    spacer.className = 'site-header-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    fixedHeader.before(spacer);
    fixedHeader.classList.add('site-header');
    document.body.prepend(fixedHeader);
  }
  var backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.title = 'Back to top';
  backToTop.innerHTML = '<svg viewBox="0 0 24 32" aria-hidden="true"><path d="M12 29V3M4 11l8-8 8 8"/></svg>';
  backToTop.addEventListener('click', function () {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    toggle.focus({preventScroll: true});
  });
  document.body.appendChild(backToTop);
  var panel = document.createElement('dialog');
  panel.id = 'site-menu';
  panel.className = 'site-menu';
  panel.setAttribute('aria-label', 'Site navigation');
  panel.innerHTML = '<button type="button" class="site-menu-close" aria-label="Close menu">×</button><nav>' + [['Home','index.html'],['Work','project.html'],['About','about.html'],['Contact','contact.html']].map(function (link, i) {
    return '<a style="--menu-index:' + i + '" href="' + prefix + link[1] + '">' + link[0] + '<small>0' + (i + 1) + '</small></a>';
  }).join('') + '</nav>';
  var brand = wrapper.querySelector('.nav-brand');
  if (brand) { var menuBrand = brand.cloneNode(true); menuBrand.className = 'site-menu-brand'; panel.prepend(menuBrand); }
  document.body.appendChild(panel);
  function updateHeader() { if (fixedHeader) fixedHeader.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', updateHeader, {passive: true});
  updateHeader();
  function closeMenu() {
    if (panel.classList.contains('is-closing')) return;
    panel.classList.add('is-closing');
    window.setTimeout(function () { panel.close(); panel.classList.remove('is-closing'); }, reducedMotion.matches ? 0 : 300);
  }
  panel.addEventListener('cancel', function (event) { event.preventDefault(); closeMenu(); });
  toggle.addEventListener('click', function () {
    panel.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('site-menu-open');
  });
  panel.querySelector('button').addEventListener('click', closeMenu);
  panel.addEventListener('close', function () {
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('site-menu-open');
    toggle.focus();
  });
  // Move the image wrapper, leaving Webflow's image animation untouched.
  var hero = document.querySelector('.hero_main');
  var image = hero && hero.querySelector('.hero-bg-image-wrap');
  if (image) {
    var pending = false;
    function paint() {
      pending = false;
      var offset = reducedMotion.matches ? 0 : Math.max(0, Math.min(-hero.getBoundingClientRect().top, hero.offsetHeight)) * 0.18;
      image.style.translate = '0 ' + offset + 'px';
    }
    window.addEventListener('scroll', function () {
      if (!pending) { pending = true; requestAnimationFrame(paint); }
    }, {passive: true});
    reducedMotion.addEventListener('change', paint);
    paint();
  }
  var covers = document.querySelectorAll('.section-project .project-image');
  var coverPending = false;
  function paintCovers() {
    coverPending = false;
    covers.forEach(function (cover) {
      var rect = cover.getBoundingClientRect();
      var progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight));
      cover.style.translate = '0 ' + (reducedMotion.matches ? 0 : progress * 12) + 'px';
    });
  }
  window.addEventListener('scroll', function () {
    if (!coverPending) { coverPending = true; requestAnimationFrame(paintCovers); }
  }, {passive: true});
  reducedMotion.addEventListener('change', paintCovers);
  paintCovers();
  // Load a single H.264 source close to the viewport and pause offscreen media.
  var videos = document.querySelectorAll('video');
  function load(video) {
    if (video.dataset.loaded) return;
    var sources = Array.from(video.querySelectorAll('source'));
    var source = sources.find(function (s) { return /\.mp4(?:$|\?)/i.test(s.dataset.src || s.src) && (!s.media || window.matchMedia(s.media).matches); }) || sources[0];
    if (source) {
      video.src = source.dataset.src || source.src;
      sources.forEach(function (s) { s.remove(); });
    }
    video.dataset.loaded = 'true';
    video.load();
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        load(video);
        if (!reducedMotion.matches && !(navigator.connection && navigator.connection.saveData)) {
          video.play().catch(function () { video.controls = false; });
        } else video.controls = false;
      } else video.pause();
    });
  }, {rootMargin: '100px', threshold: 0.01});
  videos.forEach(function (video) {
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('controlslist', 'nodownload noplaybackrate noremoteplayback');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';
    var parent = video.closest('[data-poster-url]');
    if (parent) video.poster = parent.dataset.posterUrl;
    observer.observe(video);
  });
  function resumeVisible() {
    if (document.hidden || reducedMotion.matches) return;
    videos.forEach(function (video) {
      var rect = video.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        load(video); video.play().catch(function () {});
      }
    });
  }
  document.addEventListener('pointerdown', resumeVisible, {passive:true});
  document.addEventListener('keydown', resumeVisible);
  document.addEventListener('visibilitychange', resumeVisible);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) videos.forEach(function (video) { video.pause(); });
  });
}());
