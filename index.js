document.addEventListener("DOMContentLoaded",()=>{"use strict";if(typeof gsap==="undefined"){console.warn("GSAP belum dimuat.");return;}if(typeof ScrollTrigger!=="undefined"){gsap.registerPlugin(ScrollTrigger);}const q=(selector,root=document)=>root.querySelector(selector);const qa=(selector,root=document)=>[...root.querySelectorAll(selector)];const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const mobile=window.matchMedia("(max-width: 900px)").matches;let lenis=null;if(!reducedMotion&&typeof window.Lenis!=="undefined"){lenis=new window.Lenis({duration:1.12,lerp:0.075,smoothWheel:true,smoothTouch:false,wheelMultiplier:0.9});lenis.on("scroll",()=>{if(typeof ScrollTrigger!=="undefined"){ScrollTrigger.update();}});gsap.ticker.add((time)=>{lenis.raf(time*1000);});gsap.ticker.lagSmoothing(0);}const referenceHero=q(".hero-reference-style");const oldHeader=q(".site-header");if(referenceHero&&oldHeader){oldHeader.style.display="none";}if(referenceHero){referenceHero.style.isolation="auto";}const loader=q(".site-loader");if(loader){loader.remove();}initMotion();function initMotion(){initHero();initTicker();initAboutAnimation();initSectionReveal();initWorkCards();initJourney();initMagnetic();initCursor();initNavigation();initSmoothAnchors();if(typeof ScrollTrigger!=="undefined"){requestAnimationFrame(()=>{ScrollTrigger.refresh();});setTimeout(()=>{ScrollTrigger.refresh();},500);}}function initHero(){if(!referenceHero){return;}const nav=q(".hero-nav-wrap",referenceHero);const mini=q(".hero-mini-info",referenceHero);const person=q(".hero-person",referenceHero);const personImage=q(".hero-person-img",referenceHero);const greeting=q(".hero-greeting",referenceHero);const nameLayers=qa(".hero-big-name",referenceHero);const bottom=q(".hero-bottom-info",referenceHero);if(!nav||!mini||!person||!personImage||!greeting||!nameLayers.length){return;}const fixStyleId="hero-name-motion-final-fix";if(!document.getElementById(fixStyleId)){const style=document.createElement("style");style.id=fixStyleId;style.textContent=`

.hero-reference-style .hero-big-name{
transform:translateX(-50%) translateY(var(--hero-name-y,0px)) scale(var(--hero-name-scale,1)) !important;
opacity:var(--hero-name-opacity,1) !important;
will-change:transform,opacity;
}
.hero-reference-style .hero-greeting{
transform:translate3d(var(--hero-greeting-x,0px),var(--hero-greeting-y,0px),0) !important;
will-change:transform,opacity;
}

`;document.head.appendChild(style);}const startScrollY=window.scrollY||window.pageYOffset||0;const hasDeepHash=window.location.hash&&window.location.hash!=="#hero"&&window.location.hash!=="#top"&&window.location.hash!=="#home";const shouldRunNavIntro=startScrollY<30&&!hasDeepHash;gsap.set(nav,{xPercent:-50,y:shouldRunNavIntro?-55:0,scale:shouldRunNavIntro?.94:1,opacity:shouldRunNavIntro?0:1,filter:shouldRunNavIntro?"blur(6px)":"blur(0px)"});nav.style.position="fixed";nav.style.zIndex="999999";nav.style.pointerEvents="auto";const navItems=qa(".hero-logo,.hero-menu a,.hero-contact",nav);if(navItems.length){gsap.set(navItems,{opacity:shouldRunNavIntro?0:1,y:shouldRunNavIntro?10:0});}gsap.set(mini,{xPercent:-50,y:-12,opacity:0});gsap.set(person,{xPercent:-50,y:60,scale:.965,opacity:0});gsap.set(greeting,{"--hero-greeting-x":"0px","--hero-greeting-y":"28px",opacity:0});nameLayers.forEach(name=>{gsap.set(name,{"--hero-name-y":"60px","--hero-name-scale":.965,"--hero-name-opacity":0});});referenceHero.classList.add("hero-animation-started");if(bottom){gsap.set(bottom,{xPercent:-50,y:15,opacity:0});}const intro=gsap.timeline({defaults:{ease:"power4.out"}});if(shouldRunNavIntro){intro.to(nav,{xPercent:-50,y:0,scale:1,opacity:1,filter:"blur(0px)",duration:1.15,ease:"expo.out"});if(navItems.length){intro.to(navItems,{opacity:1,y:0,duration:.58,stagger:.07,ease:"power3.out"},"-=.62");}}intro.to(mini,{xPercent:-50,y:0,opacity:1,duration:.42,ease:"power3.out"},shouldRunNavIntro?"-=.42":0);intro.to(person,{xPercent:-50,y:0,scale:1,opacity:1,duration:1.2,ease:"power4.out"},"-=.2");intro.to(greeting,{"--hero-greeting-y":"0px",opacity:1,duration:.65,ease:"power3.out"},"-=.62");intro.to(nameLayers,{"--hero-name-y":"0px","--hero-name-scale":1,"--hero-name-opacity":1,duration:1,ease:"power4.out"},"-=.42");if(bottom){intro.to(bottom,{xPercent:-50,y:0,opacity:1,duration:.42,ease:"power3.out"},"-=.25");}if(!reducedMotion){gsap.to(personImage,{y:-5,duration:2.8,repeat:-1,yoyo:true,ease:"sine.inOut"});}if(!mobile&&!reducedMotion){referenceHero.addEventListener("mousemove",event=>{const rect=referenceHero.getBoundingClientRect();const mouseX=(event.clientX-rect.left)/rect.width-.5;const mouseY=(event.clientY-rect.top)/rect.height-.5;gsap.to(personImage,{x:mouseX*12,y:-5+mouseY*7,duration:.8,ease:"power3.out",overwrite:"auto"});gsap.to(greeting,{"--hero-greeting-x":`${mouseX*-4}px`,duration:.75,ease:"power3.out",overwrite:"auto"});});referenceHero.addEventListener("mouseleave",()=>{gsap.to(personImage,{x:0,y:-5,duration:1,ease:"power3.out"});gsap.to(greeting,{"--hero-greeting-x":"0px",duration:1,ease:"power3.out"});});}if(typeof ScrollTrigger!=="undefined"&&!reducedMotion){gsap.timeline({scrollTrigger:{trigger:referenceHero,start:"top top",end:"bottom top",scrub:true}}).to(personImage,{yPercent:5,scale:1.045,ease:"none"},0);ScrollTrigger.create({trigger:referenceHero,start:"top top",end:"bottom top",invalidateOnRefresh:true,onUpdate:self=>{const moveY=`${-30*self.progress}px`;greeting.style.setProperty("--hero-greeting-y",moveY);nameLayers.forEach(name=>name.style.setProperty("--hero-name-y",moveY));}});let navIntroActive=shouldRunNavIntro;const navbarColorStyleId="navbar-color-adaptive-style";if(!document.getElementById(navbarColorStyleId)){const navbarColorStyle=document.createElement("style");navbarColorStyle.id=navbarColorStyleId;navbarColorStyle.textContent=`

.hero-reference-style .hero-nav-wrap{
transition:background-color .45s ease,color .45s ease,border-color .45s ease,box-shadow .45s ease;
}
.hero-reference-style .hero-nav-wrap .hero-logo,
.hero-reference-style .hero-nav-wrap .hero-menu a,
.hero-reference-style .hero-nav-wrap .hero-contact,
.hero-reference-style .hero-nav-wrap .hero-contact i{
transition:color .35s ease;
}
.hero-reference-style .hero-nav-wrap.nav-dark-mode{
background:#11110f !important;
color:#fff !important;
border-color:rgba(255,255,255,.16) !important;
box-shadow:0 14px 40px rgba(0,0,0,.30) !important;
}
.hero-reference-style .hero-nav-wrap.nav-dark-mode .hero-logo,
.hero-reference-style .hero-nav-wrap.nav-dark-mode .hero-menu a,
.hero-reference-style .hero-nav-wrap.nav-dark-mode .hero-contact,
.hero-reference-style .hero-nav-wrap.nav-dark-mode .hero-contact i{
color:#fff !important;
}
.hero-reference-style .hero-nav-wrap.nav-dark-mode .hero-menu a::after{
background:#fff !important;
}

`;document.head.appendChild(navbarColorStyle);}const setNavbarDarkMode=isDark=>{if(!nav)return;nav.classList.toggle("nav-dark-mode",isDark);};const darkSections=qa(".section-dark,.contact-section");darkSections.forEach(section=>{ScrollTrigger.create({trigger:section,start:"top 85px",end:"bottom 85px",onEnter:()=>setNavbarDarkMode(true),onEnterBack:()=>setNavbarDarkMode(true),onLeave:()=>setNavbarDarkMode(false),onLeaveBack:()=>setNavbarDarkMode(false)});});const getNavbarWideWidth=()=>window.innerWidth<=900?Math.max(260,window.innerWidth-32):Math.min(1180,window.innerWidth-48);const getNavbarSmallWidth=()=>window.innerWidth<=900?Math.max(240,window.innerWidth-56):Math.min(900,window.innerWidth-96);let navbarWideWidth=getNavbarWideWidth();let navbarSmallWidth=getNavbarSmallWidth();gsap.set(nav,{width:`${navbarWideWidth}px`,borderRadius:"999px"});const setNavbarScrollState=progress=>{const safeProgress=Math.max(0,Math.min(1,progress));const currentWidth=navbarWideWidth+(navbarSmallWidth-navbarWideWidth)*safeProgress;const currentRadius=999-(999-32)*safeProgress;const values={width:`${currentWidth}px`,borderRadius:`${currentRadius}px`};if(!navIntroActive)values.clipPath=`inset(0 0 0% 0 round ${currentRadius}px)`;gsap.set(nav,values);};ScrollTrigger.create({trigger:referenceHero,start:"top top",end:"35% top",invalidateOnRefresh:true,onRefreshInit:()=>{navbarWideWidth=getNavbarWideWidth();navbarSmallWidth=getNavbarSmallWidth();},onRefresh:self=>{const progress=self.progress;if(progress>.001)navIntroActive=false;setNavbarScrollState(progress);},onUpdate:self=>{const progress=self.progress;if(progress>.001)navIntroActive=false;setNavbarScrollState(progress);}});if(shouldRunNavIntro)intro.call(()=>{navIntroActive=false;});const syncNavbarAfterRefresh=()=>{const currentScroll=window.scrollY||window.pageYOffset||0;const currentlyScrolled=currentScroll>30||(window.location.hash&&window.location.hash!=="#hero"&&window.location.hash!=="#top"&&window.location.hash!=="#home");if(currentlyScrolled){navIntroActive=false;gsap.killTweensOf(nav);gsap.set(nav,{y:0,scale:1,opacity:1,filter:"blur(0px)",clipPath:"inset(0 0 0% 0 round 999px)"});if(navItems.length){gsap.killTweensOf(navItems);gsap.set(navItems,{opacity:1,y:0});}}if(lenis&&typeof lenis.resize==="function")lenis.resize();ScrollTrigger.refresh();};requestAnimationFrame(()=>requestAnimationFrame(syncNavbarAfterRefresh));setTimeout(syncNavbarAfterRefresh,80);setTimeout(syncNavbarAfterRefresh,220);setTimeout(syncNavbarAfterRefresh,500);window.addEventListener("load",syncNavbarAfterRefresh,{once:true});window.addEventListener("pageshow",()=>setTimeout(syncNavbarAfterRefresh,80));window.addEventListener("hashchange",()=>setTimeout(syncNavbarAfterRefresh,100));window.addEventListener("resize",()=>{navbarWideWidth=getNavbarWideWidth();navbarSmallWidth=getNavbarSmallWidth();ScrollTrigger.refresh();});}}

function initTicker(){const ticker=q(".ticker-track");if(!ticker||reducedMotion)return;const items=qa(".ticker-item",ticker);if(items.length<2)return;const half=Math.floor(items.length/2);const firstItem=items[0];const duplicateItem=items[half];const getDistance=()=>duplicateItem.offsetLeft-firstItem.offsetLeft;gsap.killTweensOf(ticker);gsap.to(ticker,{x:()=>-getDistance(),duration:22,repeat:-1,ease:"none"});}

function initAboutAnimation(){
const about=q("#about");if(!about)return;

const head=q(".section-head",about);
const sectionNumber=q(".section-number",about);
const title=q(".section-head h2",about);
const headDescription=q(".section-head > p",about);
const imageWrap=q(".about-image-wrap",about);
const image=q(".about-image",about);
const imageNote=q(".image-note",about);
const copy=q(".about-copy",about);
const bigText=q(".about-big",about);
const paragraphs=qa(".about-copy > p:not(.about-big)",about);
const details=qa(".about-details > div",about);

if(!imageWrap||!image)return;

const styleId="about-smooth-svg-animation-style";

if(!document.getElementById(styleId)){

const style=document.createElement("style");

style.id=styleId;

style.textContent=`

#about .about-image-wrap{
position:relative !important;
isolation:isolate !important;
overflow:visible !important;
}

#about .about-image{
position:relative !important;
z-index:3 !important;
display:block !important;
width:100% !important;
will-change:transform,opacity,filter !important;
backface-visibility:hidden;
transform:translateZ(0);
}

#about .about-svg-frame{
position:absolute !important;
pointer-events:none !important;
overflow:visible !important;
width:calc(100% + 30px) !important;
height:calc(100% + 30px) !important;
left:-15px !important;
top:-15px !important;
z-index:2 !important;
will-change:transform,opacity !important;
transform-origin:center center !important;
}

#about .about-svg-frame.back{
width:calc(100% + 48px) !important;
height:calc(100% + 48px) !important;
left:-24px !important;
top:-24px !important;
z-index:1 !important;
}

#about .about-svg-frame path{
fill:none;
vector-effect:non-scaling-stroke;
stroke-linecap:square;
stroke-linejoin:miter;
}

#about .about-svg-frame.main path{
stroke:rgba(255,255,255,.70);
stroke-width:1.05;
}

#about .about-svg-frame.back path{
stroke:rgba(255,255,255,.18);
stroke-width:.8;
}

#about .image-note{
position:relative !important;
z-index:10 !important;
}

@media(max-width:900px){

#about .about-svg-frame{
width:calc(100% + 22px) !important;
height:calc(100% + 22px) !important;
left:-11px !important;
top:-11px !important;
}

#about .about-svg-frame.back{
width:calc(100% + 34px) !important;
height:calc(100% + 34px) !important;
left:-17px !important;
top:-17px !important;
}

}

@media(max-width:600px){

#about .about-svg-frame{
width:calc(100% + 18px) !important;
height:calc(100% + 18px) !important;
left:-9px !important;
top:-9px !important;
}

#about .about-svg-frame.back{
width:calc(100% + 28px) !important;
height:calc(100% + 28px) !important;
left:-14px !important;
top:-14px !important;
}

}

`;

document.head.appendChild(style);

}

const oldStyle=document.getElementById(
"about-image-frame-animation-style"
);

if(oldStyle){
oldStyle.remove();
}

const createFrame=className=>{

const svg=document.createElementNS(
"http://www.w3.org/2000/svg",
"svg"
);

svg.classList.add(
"about-svg-frame",
className
);

svg.setAttribute(
"viewBox",
"0 0 100 100"
);

svg.setAttribute(
"preserveAspectRatio",
"none"
);

svg.setAttribute(
"aria-hidden",
"true"
);

const path=document.createElementNS(
"http://www.w3.org/2000/svg",
"path"
);

path.setAttribute(
"d",
"M 9 0 H 91 L 100 9 V 91 L 91 100 H 9 L 0 91 V 9 Z"
);

svg.appendChild(path);

imageWrap.prepend(svg);

return svg;

};

let mainFrame=q(
".about-svg-frame.main",
imageWrap
);

let backFrame=q(
".about-svg-frame.back",
imageWrap
);

if(!mainFrame){
mainFrame=createFrame("main");
}

if(!backFrame){
backFrame=createFrame("back");
}

const mainPath=q(
"path",
mainFrame
);

const backPath=q(
"path",
backFrame
);

[
head,
sectionNumber,
title,
headDescription,
imageWrap,
image,
mainFrame,
backFrame,
imageNote,
copy,
bigText,
...paragraphs,
...details
]
.filter(Boolean)
.forEach(element=>{
gsap.set(
element,
{
visibility:"visible"
}
);
});

if(reducedMotion){

[
head,
sectionNumber,
title,
headDescription,
imageWrap,
image,
mainFrame,
backFrame,
imageNote,
copy,
bigText,
...paragraphs,
...details
]
.filter(Boolean)
.forEach(element=>{
gsap.set(
element,
{
autoAlpha:1,
clearProps:"all",
visibility:"visible"
}
);
});

return;
}

const mainLength=
mainPath&&
typeof mainPath.getTotalLength==="function"
?mainPath.getTotalLength()
:400;

const backLength=
backPath&&
typeof backPath.getTotalLength==="function"
?backPath.getTotalLength()
:400;

gsap.set(
mainPath,
{
strokeDasharray:mainLength,
strokeDashoffset:mainLength
}
);

gsap.set(
backPath,
{
strokeDasharray:backLength,
strokeDashoffset:backLength
}
);

gsap.set(
imageWrap,
{
autoAlpha:1,
visibility:"visible"
}
);

/* FOTO: tetap terlihat. Animasi masuk hanya mengubah posisi/scale/blur. */
gsap.set(
image,
{
autoAlpha:1,
visibility:"visible",
x:0,
y:0,
scale:1,
rotate:0,
filter:"grayscale(100%) blur(0px)",
transformOrigin:"center center"
}
);

gsap.set(
backFrame,
{
autoAlpha:1,
x:16,
y:-10,
scale:.985,
rotate:4.5,
transformOrigin:"center center"
}
);

gsap.set(
mainFrame,
{
autoAlpha:1,
x:-13,
y:8,
scale:.985,
rotate:-4,
transformOrigin:"center center"
}
);

if(head){
gsap.set(
head,
{
autoAlpha:0,
y:25
}
);
}

if(sectionNumber){
gsap.set(
sectionNumber,
{
autoAlpha:0,
y:10
}
);
}

if(title){
gsap.set(
title,
{
autoAlpha:0,
y:32
}
);
}

if(headDescription){
gsap.set(
headDescription,
{
autoAlpha:0,
x:22
}
);
}

if(imageNote){
gsap.set(
imageNote,
{
autoAlpha:0,
x:8,
y:12,
scale:.94,
rotate:-3
}
);
}

if(copy){
gsap.set(
copy,
{
autoAlpha:0,
x:26
}
);
}

if(bigText){
gsap.set(
bigText,
{
autoAlpha:0,
y:23
}
);
}

if(paragraphs.length){
gsap.set(
paragraphs,
{
autoAlpha:0,
y:16
}
);
}

if(details.length){
gsap.set(
details,
{
autoAlpha:0,
y:15
}
);
}

const aboutTimeline=
gsap.timeline({
paused:true,
defaults:{
overwrite:"auto"
}
});

if(head){
aboutTimeline.to(
head,
{
autoAlpha:1,
y:0,
duration:.78,
ease:"power3.out"
},
0
);
}

if(sectionNumber){
aboutTimeline.to(
sectionNumber,
{
autoAlpha:1,
y:0,
duration:.5,
ease:"power2.out"
},
.04
);
}

if(title){
aboutTimeline.to(
title,
{
autoAlpha:1,
y:0,
duration:1,
ease:"power4.out"
},
.10
);
}

if(headDescription){
aboutTimeline.to(
headDescription,
{
autoAlpha:1,
x:0,
duration:.75,
ease:"power3.out"
},
.22
);
}

/* BORDER BELAKANG */

aboutTimeline.to(
backFrame,
{
autoAlpha:1,
x:0,
y:0,
scale:1,
rotate:1.2,
duration:1.15,
ease:"power3.out"
},
.10
);

aboutTimeline.to(
backPath,
{
strokeDashoffset:0,
duration:1.55,
ease:"power2.inOut"
},
.12
);

/* FOTO SMOOTH */

aboutTimeline.fromTo(
image,
{
x:0,
y:55,
scale:.94,
rotate:-1.2,
filter:"grayscale(100%) blur(5px)",
autoAlpha:1
},
{
x:0,
y:0,
scale:1,
rotate:0,
filter:"grayscale(100%) blur(0px)",
autoAlpha:1,
duration:1.35,
ease:"power4.out",
immediateRender:false
},
.22
);

/* BORDER DEPAN */

aboutTimeline.to(
mainFrame,
{
autoAlpha:1,
x:0,
y:0,
scale:1,
rotate:-.8,
duration:1.12,
ease:"power3.out"
},
.34
);

aboutTimeline.to(
mainPath,
{
strokeDashoffset:0,
duration:1.65,
ease:"power2.inOut"
},
.40
);

/* SETTLE HALUS */

aboutTimeline.to(
mainFrame,
{
x:1.5,
y:-1,
rotate:-.45,
duration:.28,
ease:"power2.out"
},
1.58
);

aboutTimeline.to(
mainFrame,
{
x:0,
y:0,
rotate:-.8,
duration:.62,
ease:"sine.inOut"
},
1.86
);

aboutTimeline.to(
backFrame,
{
x:-1,
y:1.5,
rotate:1.55,
duration:.28,
ease:"power2.out"
},
1.58
);

aboutTimeline.to(
backFrame,
{
x:0,
y:0,
rotate:1.2,
duration:.62,
ease:"sine.inOut"
},
1.86
);

if(imageNote){

aboutTimeline.to(
imageNote,
{
autoAlpha:1,
x:0,
y:0,
scale:1,
rotate:0,
duration:.52,
ease:"power3.out"
},
.92
);

}

if(copy){

aboutTimeline.to(
copy,
{
autoAlpha:1,
x:0,
duration:.82,
ease:"power4.out"
},
.44
);

}

if(bigText){

aboutTimeline.to(
bigText,
{
autoAlpha:1,
y:0,
duration:.78,
ease:"power4.out"
},
.55
);

}

if(paragraphs.length){

aboutTimeline.to(
paragraphs,
{
autoAlpha:1,
y:0,
duration:.62,
stagger:.10,
ease:"power3.out"
},
.70
);

}

if(details.length){

aboutTimeline.to(
details,
{
autoAlpha:1,
y:0,
duration:.55,
stagger:.08,
ease:"power3.out"
},
.98
);

}

/* FLOAT SANGAT TIPIS */

const floatTimeline=
gsap.timeline({
paused:true,
repeat:-1,
yoyo:true
});

floatTimeline.to(
image,
{
y:-2,
duration:4.2,
ease:"sine.inOut"
},
0
);

floatTimeline.to(
mainFrame,
{
y:-2,
rotate:-.42,
duration:4.2,
ease:"sine.inOut"
},
0
);

floatTimeline.to(
backFrame,
{
y:2,
rotate:1.48,
duration:4.8,
ease:"sine.inOut"
},
0
);

/* FALLBACK */

if(typeof ScrollTrigger==="undefined"){

aboutTimeline.play(0);

gsap.delayedCall(
2.15,
()=>floatTimeline.play()
);

return;
}

/* =====================================================
   REPLAY SETIAP KALI MASUK SECTION
   ATAS -> BAWAH
   BAWAH -> ATAS
   ===================================================== */

const playAboutAnimation=()=>{

floatTimeline.pause(0);

gsap.killTweensOf(image);
gsap.killTweensOf(mainFrame);
gsap.killTweensOf(backFrame);

aboutTimeline
.pause()
.restart();

gsap.delayedCall(
2.25,
()=>{

const rect=
about.getBoundingClientRect();

if(
rect.top<window.innerHeight &&
rect.bottom>0
){

floatTimeline.play();

}

}
);

};

const resetAboutAnimation=()=>{

floatTimeline.pause(0);

gsap.killTweensOf(image);
gsap.killTweensOf(mainFrame);
gsap.killTweensOf(backFrame);

aboutTimeline.pause(0);

};

ScrollTrigger.create({

trigger:
about,

start:
"top 80%",

end:
"bottom 12%",

once:
false,

/* ATAS -> BAWAH */
onEnter:
()=>{

playAboutAnimation();

},

/* BAWAH -> ATAS */
onEnterBack:
()=>{

playAboutAnimation();

},

/* keluar bawah */
onLeave:
()=>{

resetAboutAnimation();

},

/* keluar atas */
onLeaveBack:
()=>{

resetAboutAnimation();

}

});

}

function initSectionReveal(){

if(
typeof ScrollTrigger==="undefined" ||
reducedMotion
){

qa(
".reveal,.reveal-card,.reveal-row,.reveal-image"
)
.forEach(
el=>{

el.style.visibility=
"visible";

el.style.opacity=
"1";

}
);

return;
}

qa(
".reveal"
)
.filter(
el=>!el.closest("#about")
)
.forEach(
el=>{

gsap.set(
el,
{
visibility:
"visible"
}
);

gsap.fromTo(
el,
{
opacity:
0,
y:
42
},
{
opacity:
1,
y:
0,
duration:
.78,
ease:
"power3.out",

scrollTrigger:
{
trigger:
el,

start:
"top 84%",

once:
true
}
}
);

}
);

qa(
".reveal-row"
)
.filter(
el=>!el.closest("#about")
)
.forEach(
(el,index)=>{

gsap.set(
el,
{
visibility:
"visible"
}
);

gsap.fromTo(
el,
{
opacity:
0,
x:
-32
},
{
opacity:
1,
x:
0,
duration:
.65,
delay:
index*.035,
ease:
"power3.out",

scrollTrigger:
{
trigger:
el,

start:
"top 88%",

once:
true
}
}
);

}
);

qa(
".reveal-card"
)
.filter(
el=>!el.closest("#about")
)
.forEach(
(el,index)=>{

gsap.set(
el,
{
visibility:
"visible"
}
);

gsap.fromTo(
el,
{
opacity:
0,
y:
58
},
{
opacity:
1,
y:
0,
duration:
.82,
delay:
index*.055,
ease:
"power4.out",

scrollTrigger:
{
trigger:
el,

start:
"top 82%",

once:
true
}
}
);

}
);

qa(
".reveal-image"
)
.filter(
el=>!el.closest("#about")
)
.forEach(
el=>{

gsap.set(
el,
{
visibility:
"visible"
}
);

gsap.fromTo(
el,
{
opacity:
0,

clipPath:
"inset(100% 0 0 0)"
},
{
opacity:
1,

clipPath:
"inset(0% 0 0 0)",

duration:
1,

ease:
"power4.inOut",

scrollTrigger:
{
trigger:
el,

start:
"top 84%",

once:
true
}
}
);

}
);

if(
typeof SplitText!=="undefined"
){

qa(
".section-head h2,.contact-title"
)
.filter(
el=>!el.closest("#about")
)
.forEach(
el=>{

const split=
new SplitText(
el,
{
type:
"lines"
}
);

gsap.set(
split.lines,
{
overflow:
"hidden"
}
);

gsap.fromTo(
split.lines,
{
yPercent:
110,

opacity:
0
},
{
yPercent:
0,

opacity:
1,

duration:
.78,

stagger:
.08,

ease:
"power4.out",

scrollTrigger:
{
trigger:
el,

start:
"top 84%",

once:
true
}
}
);

}
);

}

}

function initWorkCards(){

const cards=
qa(
".work-card"
);

cards.forEach(
card=>{

const images=
qa(
".work-media img",
card
);

if(
!reducedMotion &&
typeof ScrollTrigger!=="undefined"
){

images.forEach(
img=>{

gsap.to(
img,
{
yPercent:
5,

ease:
"none",

scrollTrigger:
{
trigger:
card,

start:
"top bottom",

end:
"bottom top",

scrub:
true
}
}
);

}
);

}

card.addEventListener(
"mouseenter",
()=>{

gsap.to(
card,
{
y:
-7,

duration:
.35,

ease:
"power3.out"
}
);

gsap.to(
images,
{
scale:
1.04,

duration:
.65,

ease:
"power3.out"
}
);

}
);

card.addEventListener(
"mouseleave",
()=>{

gsap.to(
card,
{
y:
0,

duration:
.45,

ease:
"power3.out"
}
);

gsap.to(
images,
{
scale:
1,

duration:
.65,

ease:
"power3.out"
}
);

}
);

}
);

}

function initJourney(){

qa(
".journey-item"
)
.forEach(
(item,index)=>{

const icon=
q(
"i",
item
);

item.addEventListener(
"mouseenter",
()=>{

gsap.to(
item,
{
x:
7,

duration:
.3,

ease:
"power2.out"
}
);

if(icon){

gsap.to(
icon,
{
rotate:
index%2
? -7
: 7,

scale:
1.1,

duration:
.3,

ease:
"power2.out"
}
);

}

}
);

item.addEventListener(
"mouseleave",
()=>{

gsap.to(
item,
{
x:
0,

duration:
.4,

ease:
"power2.out"
}
);

if(icon){

gsap.to(
icon,
{
rotate:
0,

scale:
1,

duration:
.35
}
);

}

}
);

}
);

}

function initMagnetic(){

if(mobile){
return;
}

qa(
"[data-magnetic]"
)
.forEach(
element=>{

element.addEventListener(
"mousemove",
event=>{

const rect=
element.getBoundingClientRect();

const x=
event.clientX-
rect.left-
rect.width/
2;

const y=
event.clientY-
rect.top-
rect.height/
2;

gsap.to(
element,
{
x:
x*.11,

y:
y*.11,

duration:
.25,

ease:
"power2.out"
}
);

}
);

element.addEventListener(
"mouseleave",
()=>{

gsap.to(
element,
{
x:
0,

y:
0,

duration:
.6,

ease:
"elastic.out(1,.45)"
}
);

}
);

}
);

}

function initCursor(){

if(
mobile||
reducedMotion
){
return;
}

const dot=
q(
".cursor-dot"
);

const ring=
q(
".cursor-ring"
);

const label=
q(
".cursor-label"
);

if(
!dot||
!ring
){
return;
}

let mouseX=
window.innerWidth/
2;

let mouseY=
window.innerHeight/
2;

let ringX=
mouseX;

let ringY=
mouseY;

window.addEventListener(
"mousemove",
event=>{

mouseX=
event.clientX;

mouseY=
event.clientY;

gsap.set(
dot,
{
x:
mouseX,

y:
mouseY
}
);

},
{
passive:
true
}
);

gsap.ticker.add(
()=>{

ringX+=
(
mouseX-
ringX
)*
.14;

ringY+=
(
mouseY-
ringY
)*
.14;

gsap.set(
ring,
{
x:
ringX,

y:
ringY
}
);

if(label){

gsap.set(
label,
{
x:
ringX,

y:
ringY
}
);

}

}
);

qa(
"a,.work-card,.stack-row,.life-card"
)
.forEach(
element=>{

element.addEventListener(
"mouseenter",
()=>{

gsap.to(
ring,
{
width:
58,

height:
58,

duration:
.28,

ease:
"power2.out"
}
);

if(
label &&
element.classList.contains(
"work-card"
)
){

gsap.to(
label,
{
opacity:
1,

duration:
.2
}
);

}

}
);

element.addEventListener(
"mouseleave",
()=>{

gsap.to(
ring,
{
width:
34,

height:
34,

duration:
.28
}
);

if(label){

gsap.to(
label,
{
opacity:
0,

duration:
.18
}
);

}

}
);

}
);

}

function initNavigation(){

const navLinks=
qa(
".main-nav a"
);

if(
typeof ScrollTrigger==="undefined" ||
navLinks.length===0
){
return;
}

qa(
"section[id]"
)
.forEach(
section=>{

ScrollTrigger.create(
{
trigger:
section,

start:
"top 46%",

end:
"bottom 46%",

onEnter:
()=>{
setActiveNav(
section.id
);
},

onEnterBack:
()=>{
setActiveNav(
section.id
);
}

}
);

}
);

function setActiveNav(
id
){

navLinks.forEach(
link=>{

link.classList.toggle(
"is-active",

link.getAttribute(
"href"
)===
`#${id}`
);

}
);

}

}

function initSmoothAnchors(){

qa(
'a[href^="#"]'
)
.forEach(
link=>{

link.addEventListener(
"click",
event=>{

const selector=
link.getAttribute(
"href"
);

if(
!selector||
selector==="#"
){
return;
}

const target=
document.querySelector(
selector
);

if(!target){
return;
}

event.preventDefault();

if(lenis){

lenis.scrollTo(
target,
{
offset:
-70,

duration:
1.15
}
);

}else{

target.scrollIntoView(
{
behavior:
"smooth",

block:
"start"
}
);

}

}
);

}
);

}

});