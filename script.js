(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Size the embedded vote demo from the height it reports.
  window.addEventListener('message',function(e){if(e.origin!=='https://app.causealytics.com')return;var d=e.data||{};if(d.type==='ll-poll-height'&&d.height){var f=document.getElementById('demo-vote');if(f)f.style.height=d.height+'px';}});

  var nav=document.querySelector('.nav');
  window.addEventListener('scroll',function(){if(nav)nav.classList.toggle('scrolled',window.scrollY>8);},{passive:true});

  if(!(window.gsap&&window.ScrollTrigger)||reduce)return;
  gsap.registerPlugin(ScrollTrigger);
  var E='power3.out';

  // Hero: staggered entrance, then the glow drifts with scroll.
  gsap.fromTo('.hero .wrap > *',{y:22,autoAlpha:0},{y:0,autoAlpha:1,duration:.8,stagger:.1,ease:E,clearProps:'all'});
  gsap.to('.hero .glow',{yPercent:28,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  // Section headings reveal line by line.
  document.querySelectorAll('.sec-head').forEach(function(h){
    gsap.fromTo(h.children,{y:18,autoAlpha:0},{y:0,autoAlpha:1,duration:.65,stagger:.1,ease:E,clearProps:'all',scrollTrigger:{trigger:h,start:'top 85%',once:true}});
  });

  // Live demo: the two frames slide in from opposite sides.
  var frames=document.querySelectorAll('.live-grid .frame');
  frames.forEach(function(f,i){
    gsap.fromTo(f,{x:i%2?40:-40,autoAlpha:0},{x:0,autoAlpha:1,duration:.85,ease:E,clearProps:'all',scrollTrigger:{trigger:'.live-grid',start:'top 80%',once:true}});
  });

  // Card grids stagger in as a group, so rows land together.
  document.querySelectorAll('.grid-2, .grid-3').forEach(function(g){
    var items=g.querySelectorAll(':scope > *');if(!items.length)return;
    gsap.fromTo(items,{y:26,autoAlpha:0},{y:0,autoAlpha:1,duration:.6,stagger:.09,ease:E,clearProps:'all',scrollTrigger:{trigger:g,start:'top 82%',once:true}});
  });

  // Privacy promise: the card, then each checkmark line.
  var promise=document.querySelector('.promise');
  if(promise){
    gsap.fromTo(promise,{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,ease:E,clearProps:'all',scrollTrigger:{trigger:promise,start:'top 80%',once:true}});
    gsap.fromTo(promise.querySelectorAll('li'),{x:-14,autoAlpha:0},{x:0,autoAlpha:1,duration:.5,stagger:.12,ease:E,clearProps:'all',scrollTrigger:{trigger:promise,start:'top 70%',once:true}});
  }

  // Pricing: tiers rise in together, the 'Most popular' flag lands last.
  var pg=document.querySelector('.price-grid');
  if(pg){gsap.fromTo(pg.querySelectorAll('.tier'),{y:30,autoAlpha:0},{y:0,autoAlpha:1,duration:.65,stagger:.1,ease:E,clearProps:'all',scrollTrigger:{trigger:pg,start:'top 82%',once:true}});
  gsap.fromTo('.tier .flag',{scale:.6,autoAlpha:0},{scale:1,autoAlpha:1,duration:.5,delay:.45,ease:'back.out(2)',clearProps:'all',scrollTrigger:{trigger:pg,start:'top 82%',once:true}});}
})();