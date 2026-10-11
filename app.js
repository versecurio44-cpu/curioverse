(function(){
var A=window.ARTICLES,C=window.CATEGORIES,$=function(s,r){return(r||document).querySelector(s)};
var catName=function(id){var c=C.find(function(x){return x.id===id});return c?c.name:id};
var mins=function(a){return Math.max(1,Math.round(a.body.map(function(b){return b[1]}).join(' ').split(/\s+/).length/220))};
var fmt=function(d){return new Date(d+'T00:00:00').toLocaleDateString('en',{year:'numeric',month:'long',day:'numeric'})};
var card=function(a,big){return '<a class="card'+(big?' big':'')+'" href="article.html?a='+a.slug+'"><div class="thumb t-'+a.cat+'" aria-hidden="true"></div><div class="cb"><span class="meta">'+catName(a.cat)+', '+mins(a)+' min read</span><h3>'+a.title+'</h3><p>'+a.summary+'</p></div></a>'};
var ad=function(id){return '<!-- AD PLACEHOLDER: no ad code is loaded. When ready, paste your ad provider snippet here. --><div class="ad-slot" data-ad-slot="'+id+'" role="complementary" aria-label="Advertisement placeholder">Advertisement placeholder. No ads are loaded yet.</div>'};
var meta=function(sel,v){var m=$(sel);if(m)m.setAttribute('content',v)};

/* Shared header and footer */
var h=$('#site-header');
if(h){h.className='site';h.innerHTML='<a class="skip" href="#main">Skip to content</a><div class="bar"><a class="brand" href="index.html">CurioVerse</a><nav id="nav" aria-label="Main"><a href="index.html">Home</a><a href="articles.html">Articles</a><a href="about.html">About</a></nav><button id="theme" aria-label="Switch between dark and light mode">&#9680;</button><button id="menu" aria-label="Open menu" aria-expanded="false">&#9776;</button></div>';
$('#theme').onclick=function(){var t=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=t;try{localStorage.setItem('cv-theme',t)}catch(e){}};
$('#menu').onclick=function(){var o=$('#nav').classList.toggle('open');this.setAttribute('aria-expanded',o)}}
var f=$('#site-footer');
if(f){f.className='site';f.innerHTML='<div class="wrap"><p><strong>CurioVerse</strong>. Small questions. Bigger worlds.</p><p>'+C.map(function(c){return '<a href="articles.html?cat='+c.id+'">'+c.name+'</a>'}).join('')+'</p><p>Articles are educational and are not professional advice. Illustrations are labelled and are not real footage.</p></div>'}

var page=document.body.dataset.page;
if(page==='home'){
 var fe=A.filter(function(a){return a.featured});
 $('#featured').innerHTML=card(fe[0],true)+'<div class="grid">'+fe.slice(1).map(function(a){return card(a)}).join('')+'</div>';
 var latest=A.slice().sort(function(a,b){return b.date.localeCompare(a.date)}).slice(0,6);
 $('#latest').innerHTML=latest.map(function(a){return card(a)}).join('');
 var svg={
 orbit:'<svg viewBox="0 0 200 140" role="img" aria-label="Animated schematic of a planet orbiting a star"><circle cx="100" cy="70" r="55" fill="none" stroke="#2a3a78" stroke-dasharray="2 4"/><circle cx="100" cy="70" r="9" fill="#ffd98a"/><g class="spin"><circle cx="155" cy="70" r="5" fill="#8fb0ff"/></g></svg>',
 wave:'<svg viewBox="0 0 200 140" role="img" aria-label="Animated schematic of a travelling wave"><path class="wave" fill="none" stroke="#8fb0ff" stroke-width="2.5" d="M-100 70 Q-75 30 -50 70 T0 70 T50 70 T100 70 T150 70 T200 70 T250 70 T300 70"/><path class="wave" fill="none" stroke="#6fd3a8" stroke-opacity=".5" stroke-width="2" transform="translate(0 6)" d="M-100 70 Q-75 45 -50 70 T0 70 T50 70 T100 70 T150 70 T200 70 T250 70 T300 70"/></svg>',
 grow:'<svg viewBox="0 0 200 140" role="img" aria-label="Animated analogy of dots moving apart as space expands"><g class="grow" fill="#cfd9ff">'+[-1,0,1].map(function(i){return [-1,0,1].map(function(j){return '<circle cx="'+(100+i*30)+'" cy="'+(70+j*25)+'" r="3"/>'}).join('')}).join('')+'</g></svg>'};
 $('#anims').innerHTML=window.ANIMS.map(function(a){return '<figure class="anim">'+svg[a.type]+'<figcaption><b>'+a.title+'</b>'+a.cap+'<span class="badge">Illustration, not real footage</span></figcaption></figure>'}).join('');
 $('#ad').innerHTML=ad('home-middle');
}
if(page==='list'){
 var q=$('#q'),chips=$('#chips'),list=$('#list'),count=$('#count');
 var cat=new URLSearchParams(location.search).get('cat')||'all';
 chips.innerHTML=[{id:'all',name:'All'}].concat(C).map(function(c){return '<button class="chip" data-c="'+c.id+'" aria-pressed="false">'+c.name+'</button>'}).join('');
 var run=function(){var t=q.value.trim().toLowerCase();
  var r=A.filter(function(a){return(cat==='all'||a.cat===cat)&&(!t||(a.title+' '+a.summary+' '+catName(a.cat)+' '+a.body.map(function(b){return b[1]}).join(' ')).toLowerCase().indexOf(t)>-1)});
  count.textContent=r.length?r.length+(r.length>1?' articles':' article'):'No matches. Try another word or choose All.';
  list.innerHTML=r.map(function(a){return card(a)}).join('');
  chips.querySelectorAll('.chip').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.c===cat)})};
 chips.onclick=function(e){var b=e.target.closest('.chip');if(b){cat=b.dataset.c;run()}};
 q.oninput=run;run();
}
if(page==='article'){
 var slug=new URLSearchParams(location.search).get('a'),a=A.find(function(x){return x.slug===slug}),m=$('#main');
 if(!a){m.innerHTML='<div class="article"><h1>Article not found</h1><p><a href="articles.html">Browse all articles</a></p></div>'}
 else{
  document.title=a.title+' | CurioVerse';
  meta('meta[name=description]',a.summary);meta('meta[property="og:title"]',a.title);meta('meta[property="og:description"]',a.summary);
  var lk=$('link[rel=canonical]');if(lk)lk.href=location.origin+location.pathname+'?a='+a.slug;
  var ld=document.createElement('script');ld.type='application/ld+json';
  ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.summary,datePublished:a.date,publisher:{'@type':'Organization',name:'CurioVerse'}});document.head.appendChild(ld);
  var L={est:'Established knowledge',hyp:'Hypothesis',spec:'Speculation'};
  var body=a.body.map(function(b){return b[0]==='h'?'<h2>'+b[1]+'</h2>':b[0]==='p'?'<p>'+b[1]+'</p>':'<aside class="note '+b[0]+'"><strong>'+L[b[0]]+'</strong><p>'+b[1]+'</p></aside>'}).join('');
  var rel=A.filter(function(x){return x.slug!==a.slug}).sort(function(x,y){return(y.cat===a.cat)-(x.cat===a.cat)}).slice(0,3);
  m.innerHTML='<article class="article"><a class="meta" href="articles.html?cat='+a.cat+'">'+catName(a.cat)+'</a><h1>'+a.title+'</h1><p class="lede">'+a.summary+'</p><p class="meta">'+fmt(a.date)+', '+mins(a)+' min read</p><p class="key">Labels in this article: <strong>Established knowledge</strong> is well supported by evidence. A <strong>Hypothesis</strong> is a testable idea still under study. <strong>Speculation</strong> goes beyond current evidence.</p>'+body+ad('article-bottom')+'<h2>References</h2><ol class="refs">'+a.refs.map(function(r){return '<li>'+r.t+(r.u?' <a href="'+r.u+'" rel="noopener" target="_blank">Open source</a>':'')+'</li>'}).join('')+'</ol></article><section class="wrap block"><h2>Related articles</h2><div class="grid c3">'+rel.map(function(x){return card(x)}).join('')+'</div></section>';
 }
}
})();
