(() => {
  'use strict';
  const images = [...document.querySelectorAll('.pw-reveal')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || motion.matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  images.forEach(image => {
    // Keep already-visible artwork readable, including direct anchor navigation.
    if (image.getBoundingClientRect().top > window.innerHeight) {
      image.classList.add('is-pending');
      observer.observe(image);
    }
  });
  motion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      images.forEach(image => image.classList.remove('is-pending'));
    }
  });
})();

(() => {
  const ribbon = document.querySelector('.pw-marquee');
  const toggle = document.querySelector('.pw-marquee-toggle');
  if (ribbon && toggle) toggle.addEventListener('click', () => {
    const paused = ribbon.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
  const board = document.querySelector('.pw-network-board');
  if (!board) return;
  const svg = board.querySelector('svg');
  function draw() {
    const base = board.getBoundingClientRect();
    const nodes = {};
    board.querySelectorAll('[data-node]').forEach(node => {
      const r = node.getBoundingClientRect();
      nodes[node.dataset.node] = {x:r.left-base.left,y:r.top-base.top,w:r.width,h:r.height};
    });
    svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    svg.replaceChildren();
    const links = [['figma','webflow',false],['figma','context',true],['lovable','context',true],['context','codex',true],['content','codex',false],['imagery','codex',false],['webflow','codex',false]];
    links.forEach(([from,to,context]) => {
      const a=nodes[from], b=nodes[to];
      let d;
      if (base.width<=700 && from==='figma' && to==='context') {
        d=`M${a.x} ${a.y+a.h/2} H4 V${b.y-20} H${b.x+b.w/2} V${b.y}`;
      } else if (base.width<=700 && from==='content' && to==='codex') {
        d=`M${a.x} ${a.y+a.h/2} H${base.width/2} V${b.y}`;
      } else if (from==='figma' && to==='webflow' && base.width>700) {
        const y=16; d=`M${a.x+a.w/2} ${a.y} V${y} H${b.x+b.w/2} V${b.y}`;
      } else if (from==='webflow' && to==='codex') {
        const edge=base.width-4;
        d=`M${a.x+a.w} ${a.y+a.h/2} H${edge} V${b.y+b.h+20} H${b.x+b.w/2} V${b.y+b.h}`;
      } else if (Math.abs(a.y-b.y)<20) {
        d=`M${a.x+a.w} ${a.y+a.h/2} H${b.x}`;
      } else {
        const x1=a.x+a.w/2,y1=a.y+a.h,x2=b.x+b.w/2,y2=b.y, mid=(y1+y2)/2;
        d=`M${x1} ${y1} V${mid} H${x2} V${y2}`;
      }
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',d);
      if(context) path.setAttribute('class','pw-context-link');
      svg.appendChild(path);
    });
  }
  new ResizeObserver(draw).observe(board);
  draw();
})();
