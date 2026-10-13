(function () {
  'use strict';
  var root = document.documentElement;
  var musicUrl = new URL('../audio/glide.mp3', document.currentScript.src).href;
  var key = 'af-theme';
  var preference = null;
  var system = window.matchMedia('(prefers-color-scheme: dark)');
  var control;
  try { preference = localStorage.getItem(key); } catch (_) {}
  if (preference !== 'light' && preference !== 'dark') preference = null;
  function apply(theme) {
    root.dataset.theme = theme;
    if (control) control.querySelectorAll('button[data-theme-choice]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    });
  }
  apply(preference || (system.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', function () {
    control = document.createElement('div');
    control.className = 'theme-control';
    control.setAttribute('role', 'group');
    control.setAttribute('aria-label', 'Colour theme');
    control.innerHTML = '<button type="button" data-theme-choice="light" aria-label="Light mode" title="Light mode"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button><span aria-hidden="true">/</span><button type="button" data-theme-choice="dark" aria-label="Dark mode" title="Dark mode"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg></button>';
    control.addEventListener('click', function (event) {
      var target = event.target.closest('button');
      if (!target || !target.dataset.themeChoice) return;
      preference = target.dataset.themeChoice;
      try { localStorage.setItem(key, preference); } catch (_) {}
      apply(preference);
    });
    var music = document.createElement('button');
    music.type = 'button';music.className = 'site-music-toggle';
    music.setAttribute('aria-label', 'Play music');music.title = 'Play music';music.setAttribute('aria-pressed', 'false');
    music.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/></svg>';
    var audio = new Audio(musicUrl);audio.preload = 'none';audio.loop = true;
    var playing = false;
    function musicState(on) { playing = on;music.setAttribute('aria-pressed', String(on));music.setAttribute('aria-label', on ? 'Stop music' : 'Play music');music.title = music.getAttribute('aria-label'); }
    music.addEventListener('click', async function () {
      if (playing) { audio.pause();audio.currentTime = 0;musicState(false);return; }
      musicState(true);
      try { await audio.play();if (!playing) audio.pause(); } catch (_) { musicState(false); }
    });
    audio.addEventListener('error', function () { musicState(false); });
    window.addEventListener('pagehide', function () { audio.pause();musicState(false); });
    control.setAttribute('aria-label', 'Theme and music');control.appendChild(music);
    document.body.appendChild(control);
    apply(root.dataset.theme);
  });
  system.addEventListener('change', function (event) {
    if (!preference) apply(event.matches ? 'dark' : 'light');
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
    apply(preference || (system.matches ? 'dark' : 'light'));
  });
}());
