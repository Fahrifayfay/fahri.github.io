
document.addEventListener("DOMContentLoaded",
()=>{
    "use strict";

    if(typeof gsap==="undefined"){
        console.warn("GSAP belum dimuat.");
        return;
    }

    if(typeof ScrollTrigger!=="undefined"){
        gsap.registerPlugin(ScrollTrigger);
    }

    const q=(selector,
    root=document)=>root.querySelector(selector);

    const qa=(selector,
    root=document)=>[...root.querySelectorAll(selector)];

    const reducedMotion=
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const mobile=
        window.matchMedia(
            "(max-width: 900px)"
        ).matches;

    let lenis=null;

    if(
        !reducedMotion &&
        typeof window.Lenis!=="undefined"
    ){

        lenis=new window.Lenis({
            duration:1.12,
            lerp:0.075,
            smoothWheel:true,
            smoothTouch:false,
            wheelMultiplier:0.9
        });

        lenis.on(
            "scroll",
            ()=>{
                if(typeof ScrollTrigger!=="undefined"){
                    ScrollTrigger.update();
                }
            }
        );

        gsap.ticker.add(
            (time)=>{
                lenis.raf(time*1000);
            }
        );

        gsap.ticker.lagSmoothing(0);
    }

    const referenceHero=
        q(".hero-reference-style");

    const oldHeader=
        q(".site-header");

    if(
        referenceHero &&
        oldHeader
    ){

        oldHeader.style.display="none";

    }

    if(referenceHero){
        referenceHero.style.isolation="auto";
    }

    const loader=
        q(".site-loader");

    if(loader){
        loader.remove();
    }

    initMotion();


    function initMotion(){

        initHero();

        initHeroResponsive();

        initTicker();

        initAboutAnimation();

        initSectionReveal();

        initProjectAnimation();

        initWorkCards();

        initProjectsV2();

        initLifeAnimation();
        initLifeV3();

        initLifeSocialInteractions();

        initSmoothPortfolioMotion();

        initJourney();

        initMagnetic();

        initCursor();

        initNavigation();

        initSmoothAnchors();

        if(
            typeof ScrollTrigger!=="undefined"
        ){

            requestAnimationFrame(
                ()=>{
                    ScrollTrigger.refresh();
                }
            );

            setTimeout(
                ()=>{
                    ScrollTrigger.refresh();
                },
                500
            );

        }

    }


    function initHero(){

        if(!referenceHero){
            return;
        }

        const nav=
            q(
                ".hero-nav-wrap",
                referenceHero
            );

        const mini=
            q(
                ".hero-mini-info",
                referenceHero
            );

        const person=
            q(
                ".hero-person",
                referenceHero
            );

        const personImage=
            q(
                ".hero-person-img",
                referenceHero
            );

        const greeting=
            q(
                ".hero-greeting",
                referenceHero
            );

        const nameLayers=
            qa(
                ".hero-big-name",
                referenceHero
            );

        const bottom=
            q(
                ".hero-bottom-info",
                referenceHero
            );

        const isMobileHeroNav=
            () => window.innerWidth <= 900;

        const getNavXPercent=
            () => isMobileHeroNav() ? 0 : -50;

        if(
            !nav ||
            !mini ||
            !person ||
            !personImage ||
            !greeting ||
            !nameLayers.length
        ){
            return;
        }


        const fixStyleId=
            "hero-name-motion-final-fix";

        if(
            !document.getElementById(
                fixStyleId
            )
        ){

            const style=
                document.createElement(
                    "style"
                );

            style.id=
                fixStyleId;

            style.textContent=`

.hero-reference-style .hero-big-name{
transform:translateX(-50%) translateY(var(--hero-name-y,0px)) scale(var(--hero-name-scale,1)) !important;
opacity:var(--hero-name-opacity,1) !important;
will-change:transform,opacity;
}

.hero-reference-style .hero-greeting{
transform:translate3d(var(--hero-greeting-x,0px),var(--hero-greeting-y,0px),0) !important;
will-change:transform,opacity;
}

`;

            document.head.appendChild(
                style
            );

        }


        const startScrollY=
            window.scrollY ||
            window.pageYOffset ||
            0;

        const hasDeepHash=
            window.location.hash &&
            window.location.hash!=="#hero" &&
            window.location.hash!=="#top" &&
            window.location.hash!=="#home";

        const shouldRunNavIntro=
            startScrollY<30 &&
            !hasDeepHash;


        gsap.set(
            nav,
            {
                xPercent:getNavXPercent(),
                y:shouldRunNavIntro?-55:0,
                scale:shouldRunNavIntro?.94:1,
                opacity:shouldRunNavIntro?0:1,
                filter:
                    shouldRunNavIntro
                    ? "blur(6px)"
                    : "blur(0px)"
            }
        );


        nav.style.position="fixed";
        nav.style.zIndex="999999";
        nav.style.pointerEvents="auto";


        const navItems=
            qa(
                ".hero-logo,.hero-menu a,.hero-contact,.hero-mobile-toggle",
                nav
            );


        if(navItems.length){

            gsap.set(
                navItems,
                {
                    opacity:
                        shouldRunNavIntro
                        ? 0
                        : 1,

                    y:
                        shouldRunNavIntro
                        ? 10
                        : 0
                }
            );

        }


        gsap.set(
            mini,
            {
                xPercent:-50,
                y:-12,
                opacity:0
            }
        );


        gsap.set(
            person,
            {
                xPercent:-50,
                y:60,
                scale:.965,
                opacity:0
            }
        );


        gsap.set(
            greeting,
            {
                "--hero-greeting-x":"0px",
                "--hero-greeting-y":"28px",
                opacity:0
            }
        );


        nameLayers.forEach(
            name=>{

                gsap.set(
                    name,
                    {
                        "--hero-name-y":"60px",
                        "--hero-name-scale":.965,
                        "--hero-name-opacity":0
                    }
                );

            }
        );


        referenceHero.classList.add(
            "hero-animation-started"
        );


        if(bottom){

            gsap.set(
                bottom,
                {
                    xPercent:-50,
                    y:15,
                    opacity:0
                }
            );

        }


        const intro=
            gsap.timeline({
                defaults:{
                    ease:"power4.out"
                }
            });


        if(shouldRunNavIntro){

            intro.to(
                nav,
                {
                    xPercent:getNavXPercent(),
                    y:0,
                    scale:1,
                    opacity:1,
                    filter:"blur(0px)",
                    duration:1.15,
                    ease:"expo.out"
                }
            );


            if(navItems.length){

                intro.to(
                    navItems,
                    {
                        opacity:1,
                        y:0,
                        duration:.58,
                        stagger:.07,
                        ease:"power3.out"
                    },
                    "-=.62"
                );

            }

        }


        intro.to(
            mini,
            {
                xPercent:-50,
                y:0,
                opacity:1,
                duration:.42,
                ease:"power3.out"
            },
            shouldRunNavIntro
                ? "-=.42"
                : 0
        );


        intro.to(
            person,
            {
                xPercent:-50,
                y:0,
                scale:1,
                opacity:1,
                duration:1.2,
                ease:"power4.out"
            },
            "-=.2"
        );


        intro.to(
            greeting,
            {
                "--hero-greeting-y":"0px",
                opacity:1,
                duration:.65,
                ease:"power3.out"
            },
            "-=.62"
        );


        intro.to(
            nameLayers,
            {
                "--hero-name-y":"0px",
                "--hero-name-scale":1,
                "--hero-name-opacity":1,
                duration:1,
                ease:"power4.out"
            },
            "-=.42"
        );


        if(bottom){

            intro.to(
                bottom,
                {
                    xPercent:-50,
                    y:0,
                    opacity:1,
                    duration:.42,
                    ease:"power3.out"
                },
                "-=.25"
            );

        }


        if(!reducedMotion){

            gsap.to(
                personImage,
                {
                    y:-5,
                    duration:2.8,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(
            !mobile &&
            !reducedMotion
        ){

            referenceHero.addEventListener(
                "mousemove",
                event=>{

                    const rect=
                        referenceHero.getBoundingClientRect();

                    const mouseX=
                        (event.clientX-rect.left) /
                        rect.width-
                        .5;

                    const mouseY=
                        (event.clientY-rect.top) /
                        rect.height-
                        .5;


                    gsap.to(
                        personImage,
                        {
                            x:mouseX*12,
                            y:-5+mouseY*7,
                            duration:.8,
                            ease:"power3.out",
                            overwrite:"auto"
                        }
                    );


                    gsap.to(
                        greeting,
                        {
                            "--hero-greeting-x":
                                `${mouseX*-4}px`,
                            duration:.75,
                            ease:"power3.out",
                            overwrite:"auto"
                        }
                    );

                }
            );


            referenceHero.addEventListener(
                "mouseleave",
                ()=>{

                    gsap.to(
                        personImage,
                        {
                            x:0,
                            y:-5,
                            duration:1,
                            ease:"power3.out"
                        }
                    );


                    gsap.to(
                        greeting,
                        {
                            "--hero-greeting-x":"0px",
                            duration:1,
                            ease:"power3.out"
                        }
                    );

                }
            );

        }


        if(
            typeof ScrollTrigger!=="undefined" &&
            !reducedMotion
        ){

            gsap.timeline({
                scrollTrigger:{
                    trigger:referenceHero,
                    start:"top top",
                    end:"bottom top",
                    scrub:true
                }
            }).to(
                personImage,
                {
                    yPercent:5,
                    scale:1.045,
                    ease:"none"
                },
                0
            );


            ScrollTrigger.create({

                trigger:referenceHero,

                start:"top top",

                end:"bottom top",

                invalidateOnRefresh:true,

                onUpdate:self=>{

                    const moveY=
                        `${-30*self.progress}px`;

                    greeting.style.setProperty(
                        "--hero-greeting-y",
                        moveY
                    );

                    nameLayers.forEach(
                        name=>{
                            name.style.setProperty(
                                "--hero-name-y",
                                moveY
                            );
                        }
                    );

                }

            });


            let navIntroActive=
                shouldRunNavIntro;


            const navbarColorStyleId=
                "navbar-color-adaptive-style";


            if(
                !document.getElementById(
                    navbarColorStyleId
                )
            ){

                const navbarColorStyle=
                    document.createElement(
                        "style"
                    );

                navbarColorStyle.id=
                    navbarColorStyleId;

                navbarColorStyle.textContent=`

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

`;

                document.head.appendChild(
                    navbarColorStyle
                );

            }


            const setNavbarDarkMode=
                isDark=>{

                    if(!nav){
                        return;
                    }

                    nav.classList.toggle(
                        "nav-dark-mode",
                        isDark
                    );

                };


            const darkSections=
                qa(
                    ".section-dark,.contact-section"
                );


            darkSections.forEach(
                section=>{

                    ScrollTrigger.create({
                        trigger:section,
                        start:"top 85px",
                        end:"bottom 85px",

                        onEnter:()=>{
                            setNavbarDarkMode(true);
                        },

                        onEnterBack:()=>{
                            setNavbarDarkMode(true);
                        },

                        onLeave:()=>{
                            setNavbarDarkMode(false);
                        },

                        onLeaveBack:()=>{
                            setNavbarDarkMode(false);
                        }
                    });

                }
            );


            /*
             * LIFE dan YANG SAYA SUKA memakai background gelap dengan
             * gradient yang berbeda. Navbar akan meniru background
             * section aktif agar terasa menyatu saat masuk section.
             */
            const navbarColorSections =
                qa(
                    "#life.life-redesign, #love.like-redesign"
                );

            const matchNavbarToSection =
                section=>{

                    if(!nav || !section){
                        return;
                    }

                    const background =
                        getComputedStyle(
                            section
                        ).background;

                    nav.style.setProperty(
                        "--nav-section-bg",
                        background
                    );

                    nav.classList.add(
                        "nav-section-match"
                    );

                    nav.classList.remove(
                        "nav-dark-mode"
                    );

                };

            const clearNavbarSectionMatch =
                ()=>{

                    if(!nav){
                        return;
                    }

                    nav.classList.remove(
                        "nav-section-match"
                    );

                    nav.style.removeProperty(
                        "--nav-section-bg"
                    );

                };

            const syncNavbarSectionColor =
                ()=>{

                    if(!nav){
                        return;
                    }

                    const y =
                        nav.getBoundingClientRect().bottom;

                    const active =
                        navbarColorSections.find(
                            section=>{

                                const rect =
                                    section.getBoundingClientRect();

                                return (
                                    rect.top <= y &&
                                    rect.bottom > y
                                );

                            }
                        );

                    if(active){

                        matchNavbarToSection(
                            active
                        );

                        return;
                    }

                    clearNavbarSectionMatch();

                };

            navbarColorSections.forEach(
                section=>{

                    ScrollTrigger.create({

                        trigger:section,

                        start:"top 85px",

                        end:"bottom 85px",

                        onEnter:()=>{
                            matchNavbarToSection(
                                section
                            );
                        },

                        onEnterBack:()=>{
                            matchNavbarToSection(
                                section
                            );
                        },

                        onLeave:()=>{
                            syncNavbarSectionColor();
                        },

                        onLeaveBack:()=>{
                            syncNavbarSectionColor();
                        }

                    });

                }
            );

            window.addEventListener(
                "scroll",
                ()=>{
                    syncNavbarSectionColor();
                },
                {
                    passive:true
                }
            );

            window.addEventListener(
                "hashchange",
                ()=>{
                    setTimeout(
                        syncNavbarSectionColor,
                        120
                    );
                }
            );

            const getNavbarWideWidth=
                ()=>window.innerWidth<=900
                    ? (window.innerWidth<=560 ? 46 : 48)
                    : Math.min(
                        1080,
                        window.innerWidth-40
                    );


            const getNavbarSmallWidth=
                ()=>window.innerWidth<=900
                    ? (window.innerWidth<=560 ? 46 : 48)
                    : Math.min(
                        920,
                        window.innerWidth-64
                    );


            let navbarWideWidth=
                getNavbarWideWidth();

            let navbarSmallWidth=
                getNavbarSmallWidth();


            gsap.set(
                nav,
                {
                    width:
                        `${navbarWideWidth}px`,
                    borderRadius:
                        window.innerWidth<=900
                            ? "50%"
                            : "999px",
                    xPercent:getNavXPercent()
                }
            );


            const setNavbarScrollState=
                progress=>{

                    if(isMobileHeroNav()){

                        gsap.set(
                            nav,
                            {
                                width:`${getNavbarWideWidth()}px`,
                                borderRadius:"50%",
                                xPercent:0,
                                clipPath:"none"
                            }
                        );

                        return;

                    }


                    const safeProgress=
                        Math.max(
                            0,
                            Math.min(
                                1,
                                progress
                            )
                        );

                    const currentWidth=
                        navbarWideWidth+
                        (
                            navbarSmallWidth-
                            navbarWideWidth
                        )*
                        safeProgress;

                    const currentRadius=
                        999-
                        (
                            999-32
                        )*
                        safeProgress;

                    const values={
                        width:
                            `${currentWidth}px`,
                        borderRadius:
                            `${currentRadius}px`
                    };


                    if(!navIntroActive){

                        values.clipPath=
                            `inset(0 0 0% 0 round ${currentRadius}px)`;

                    }


                    gsap.set(
                        nav,
                        values
                    );

                };


            ScrollTrigger.create({

                trigger:referenceHero,

                start:"top top",

                end:"35% top",

                invalidateOnRefresh:true,

                onRefreshInit:()=>{

                    navbarWideWidth=
                        getNavbarWideWidth();

                    navbarSmallWidth=
                        getNavbarSmallWidth();

                },

                onRefresh:self=>{

                    const progress=
                        self.progress;

                    if(progress>.001){
                        navIntroActive=false;
                    }

                    setNavbarScrollState(
                        progress
                    );

                },

                onUpdate:self=>{

                    const progress=
                        self.progress;

                    if(progress>.001){
                        navIntroActive=false;
                    }

                    setNavbarScrollState(
                        progress
                    );

                }

            });


            if(shouldRunNavIntro){

                intro.call(
                    ()=>{
                        navIntroActive=false;
                    }
                );

            }


            const syncNavbarAfterRefresh=
                ()=>{

                    const currentScroll=
                        window.scrollY ||
                        window.pageYOffset ||
                        0;

                    const currentlyScrolled=
                        currentScroll>30 ||
                        (
                            window.location.hash &&
                            window.location.hash!=="#hero" &&
                            window.location.hash!=="#top" &&
                            window.location.hash!=="#home"
                        );


                    if(currentlyScrolled){

                        navIntroActive=false;

                        gsap.killTweensOf(nav);

                        gsap.set(
                            nav,
                            {
                                xPercent:getNavXPercent(),
                                y:0,
                                scale:1,
                                opacity:1,
                                filter:"blur(0px)",
                                clipPath:
                                    isMobileHeroNav()
                                        ? "none"
                                        : "inset(0 0 0% 0 round 999px)",
                                borderRadius:
                                    isMobileHeroNav()
                                        ? "50%"
                                        : "999px",
                                width:
                                    `${getNavbarWideWidth()}px`
                            }
                        );


                        if(navItems.length){

                            gsap.killTweensOf(
                                navItems
                            );

                            gsap.set(
                                navItems,
                                {
                                    opacity:1,
                                    y:0
                                }
                            );

                        }

                    }


                    if(
                        lenis &&
                        typeof lenis.resize==="function"
                    ){

                        lenis.resize();

                    }


                    ScrollTrigger.refresh();

                };


            requestAnimationFrame(
                ()=>{
                    requestAnimationFrame(
                        syncNavbarAfterRefresh
                    );
                }
            );


            setTimeout(
                syncNavbarAfterRefresh,
                80
            );

            setTimeout(
                syncNavbarAfterRefresh,
                220
            );

            setTimeout(
                syncNavbarAfterRefresh,
                500
            );


            window.addEventListener(
                "load",
                syncNavbarAfterRefresh,
                {
                    once:true
                }
            );


            window.addEventListener(
                "pageshow",
                ()=>{
                    setTimeout(
                        syncNavbarAfterRefresh,
                        80
                    );
                }
            );


            window.addEventListener(
                "hashchange",
                ()=>{
                    setTimeout(
                        syncNavbarAfterRefresh,
                        100
                    );
                }
            );


            window.addEventListener(
                "resize",
                ()=>{

                    navbarWideWidth=
                        getNavbarWideWidth();

                    navbarSmallWidth=
                        getNavbarSmallWidth();

                    gsap.set(
                        nav,
                        {
                            xPercent:getNavXPercent(),
                            width:`${navbarWideWidth}px`,
                            borderRadius:
                                isMobileHeroNav()
                                    ? "50%"
                                    : "999px"
                        }
                    );

                    ScrollTrigger.refresh();

                }
            );

        }

    }


    function initTicker(){

        const ticker=
            q(".ticker-track");

        if(
            !ticker ||
            reducedMotion
        ){
            return;
        }


        const items=
            qa(
                ".ticker-item",
                ticker
            );


        if(items.length<2){
            return;
        }


        const half=
            Math.floor(
                items.length/2
            );


        const firstItem=
            items[0];

        const duplicateItem=
            items[half];


        const getDistance=
            ()=>duplicateItem.offsetLeft-
                firstItem.offsetLeft;


        gsap.killTweensOf(
            ticker
        );


        gsap.to(
            ticker,
            {
                x:()=>-getDistance(),
                duration:22,
                repeat:-1,
                ease:"none"
            }
        );

    }


    function initAboutAnimation(){

        const about=
            q("#about");

        if(!about){
            return;
        }


        const head=
            q(
                ".section-head",
                about
            );

        const sectionNumber=
            q(
                ".section-number",
                about
            );

        const title=
            q(
                ".section-head h2",
                about
            );

        const headDescription=
            q(
                ".section-head > p",
                about
            );

        const imageWrap=
            q(
                ".about-image-wrap",
                about
            );

        const image=
            q(
                ".about-image",
                about
            );

        const imageNote=
            q(
                ".image-note",
                about
            );

        const copy=
            q(
                ".about-copy",
                about
            );

        const bigText=
            q(
                ".about-big",
                about
            );

        const paragraphs=
            qa(
                ".about-copy > p:not(.about-big)",
                about
            );

        const details=
            qa(
                ".about-details > div",
                about
            );


        if(
            !imageWrap ||
            !image
        ){
            return;
        }


        const styleId=
            "about-smooth-svg-animation-style";


        if(
            !document.getElementById(
                styleId
            )
        ){

            const style=
                document.createElement(
                    "style"
                );

            style.id=
                styleId;

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

#about .about-svg-frame .about-svg-motion-path{
stroke:rgba(255,255,255,.68);
stroke-width:1.35;
stroke-linecap:round;
stroke-linejoin:round;
stroke-dasharray:52 348;
stroke-dashoffset:0;
opacity:0;
}

#about .about-svg-frame.back .about-svg-motion-path{
stroke:rgba(255,255,255,.22);
stroke-width:1;
stroke-dasharray:34 366;
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

            document.head.appendChild(
                style
            );

        }


        const oldStyle=
            document.getElementById(
                "about-image-frame-animation-style"
            );


        if(oldStyle){
            oldStyle.remove();
        }


        const createFrame=
            className=>{

                const svg=
                    document.createElementNS(
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


                const path=
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );


                path.setAttribute(
                    "d",
                    "M 9 0 H 91 L 100 9 V 91 L 91 100 H 9 L 0 91 V 9 Z"
                );


                svg.appendChild(
                    path
                );


                const motionPath=
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                motionPath.classList.add(
                    "about-svg-motion-path"
                );

                motionPath.setAttribute(
                    "d",
                    "M 9 0 H 91 L 100 9 V 91 L 91 100 H 9 L 0 91 V 9 Z"
                );

                motionPath.setAttribute(
                    "fill",
                    "none"
                );

                motionPath.setAttribute(
                    "vector-effect",
                    "non-scaling-stroke"
                );

                svg.appendChild(
                    motionPath
                );


                imageWrap.prepend(
                    svg
                );


                return svg;

            };


        let mainFrame=
            q(
                ".about-svg-frame.main",
                imageWrap
            );

        let backFrame=
            q(
                ".about-svg-frame.back",
                imageWrap
            );


        if(!mainFrame){
            mainFrame=
                createFrame("main");
        }


        if(!backFrame){
            backFrame=
                createFrame("back");
        }


        const mainPath=
            q(
                "path",
                mainFrame
            );

        const backPath=
            q(
                "path:not(.about-svg-motion-path)",
                backFrame
            );

        const mainMotionPath=
            q(
                ".about-svg-motion-path",
                mainFrame
            );

        const backMotionPath=
            q(
                ".about-svg-motion-path",
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
            mainMotionPath,
            backMotionPath,
            imageNote,
            copy,
            bigText,
            ...paragraphs,
            ...details
        ]
        .filter(Boolean)
        .forEach(
            element=>{

                gsap.set(
                    element,
                    {
                        visibility:"visible"
                    }
                );

            }
        );


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
            .forEach(
                element=>{

                    gsap.set(
                        element,
                        {
                            autoAlpha:1,
                            clearProps:"all",
                            visibility:"visible"
                        }
                    );

                }
            );

            return;
        }


        const mainLength=
            mainPath &&
            typeof mainPath.getTotalLength==="function"
            ? mainPath.getTotalLength()
            : 400;


        const backLength=
            backPath &&
            typeof backPath.getTotalLength==="function"
            ? backPath.getTotalLength()
            : 400;


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


        gsap.set(
            image,
            {
                autoAlpha:1,
                visibility:"visible",
                x:0,
                y:0,
                scale:1,
                rotate:0,
                filter:
                    "grayscale(100%) blur(0px)",
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


        gsap.set(
            [mainMotionPath, backMotionPath].filter(Boolean),
            {
                opacity:0,
                strokeDashoffset:0
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


        aboutTimeline.to(
            backFrame,
            {
                autoAlpha:1,
                x:0,
                y:0,
                scale:1,
                rotate:1.2,
                duration:1.30,
                ease:"power3.out"
            },
            .10
        );


        aboutTimeline.to(
            backPath,
            {
                strokeDashoffset:0,
                duration:1.80,
                ease:"power2.inOut"
            },
            .12
        );


        aboutTimeline.fromTo(
            image,
            {
                x:0,
                y:55,
                scale:.94,
                rotate:-1.2,
                filter:
                    "grayscale(100%) blur(5px)",
                autoAlpha:1
            },
            {
                x:0,
                y:0,
                scale:1,
                rotate:0,
                filter:
                    "grayscale(100%) blur(0px)",
                autoAlpha:1,
                duration:1.65,
                ease:"power4.out",
                immediateRender:false
            },
            .22
        );


        aboutTimeline.to(
            mainFrame,
            {
                autoAlpha:1,
                x:0,
                y:0,
                scale:1,
                rotate:-.8,
                duration:1.30,
                ease:"power3.out"
            },
            .34
        );


        aboutTimeline.to(
            mainPath,
            {
                strokeDashoffset:0,
                duration:1.90,
                ease:"power2.inOut"
            },
            .40
        );


        aboutTimeline.to(
            mainMotionPath,
            {
                opacity:0.78,
                duration:.75,
                ease:"power2.out"
            },
            1.02
        );


        aboutTimeline.to(
            backMotionPath,
            {
                opacity:0.30,
                duration:.85,
                ease:"power2.out"
            },
            .92
        );


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
                    duration:.62,
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
                    duration:.92,
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
                    duration:.88,
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
                    duration:.72,
                    stagger:.12,
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
                    duration:.65,
                    stagger:.10,
                    ease:"power3.out"
                },
                .98
            );

        }


        let mainMotionTween=null;
        let backMotionTween=null;


        const startBorderMotion=()=>{

            if(mainMotionTween){
                mainMotionTween.kill();
            }

            if(backMotionTween){
                backMotionTween.kill();
            }

            if(mainMotionPath){
                mainMotionTween=
                    gsap.to(
                        mainMotionPath,
                        {
                            strokeDashoffset:-400,
                            duration:3.8,
                            repeat:-1,
                            ease:"none"
                        }
                    );
            }

            if(backMotionPath){
                backMotionTween=
                    gsap.to(
                        backMotionPath,
                        {
                            strokeDashoffset:-400,
                            duration:5.6,
                            repeat:-1,
                            ease:"none"
                        }
                    );
            }

        };


        const stopBorderMotion=()=>{

            if(mainMotionTween){
                mainMotionTween.kill();
                mainMotionTween=null;
            }

            if(backMotionTween){
                backMotionTween.kill();
                backMotionTween=null;
            }

        };


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


        if(
            typeof ScrollTrigger==="undefined"
        ){

            aboutTimeline.play(0);
            startBorderMotion();

            gsap.delayedCall(
                2.15,
                ()=>{
                    floatTimeline.play();
                }
            );

            return;

        }


        const playAboutAnimation=
            ()=>{

                floatTimeline.pause(0);

                gsap.killTweensOf(
                    image
                );

                gsap.killTweensOf(
                    mainFrame
                );

                gsap.killTweensOf(
                    backFrame
                );

                aboutTimeline
                    .pause()
                    .restart();

                startBorderMotion();


                gsap.delayedCall(
                    2.25,
                    ()=>{

                        const rect=
                            about.getBoundingClientRect();

                        if(
                            rect.top<
                                window.innerHeight &&
                            rect.bottom>0
                        ){

                            floatTimeline.play();

                        }

                    }
                );

            };


        const resetAboutAnimation=
            ()=>{

                floatTimeline.pause(0);

                gsap.killTweensOf(
                    image
                );

                gsap.killTweensOf(
                    mainFrame
                );

                gsap.killTweensOf(
                    backFrame
                );

                stopBorderMotion();

                gsap.set(
                    [mainMotionPath, backMotionPath].filter(Boolean),
                    {
                        opacity:0,
                        strokeDashoffset:0
                    }
                );

                aboutTimeline.pause(0);

            };


        ScrollTrigger.create({

            trigger:about,

            start:"top 80%",

            end:"bottom 12%",

            once:false,

            onEnter:()=>{
                playAboutAnimation();
            },

            onEnterBack:()=>{
                playAboutAnimation();
            },

            onLeave:()=>{
                resetAboutAnimation();
            },

            onLeaveBack:()=>{
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

                    el.style.visibility="visible";
                    el.style.opacity="1";

                }
            );

            return;

        }


        qa(
            ".reveal"
        )
        .filter(
            el=>
                !el.closest("#about") &&
                !el.closest("#work") &&
                !el.closest("#life")
        )
        .forEach(
            el=>{

                gsap.set(
                    el,
                    {
                        visibility:"visible"
                    }
                );


                gsap.fromTo(
                    el,
                    {
                        opacity:0,
                        y:42
                    },
                    {
                        opacity:1,
                        y:0,
                        duration:.78,
                        ease:"power3.out",

                        scrollTrigger:{
                            trigger:el,
                            start:"top 84%",
                            once:true
                        }

                    }
                );

            }
        );


        qa(
            ".reveal-row"
        )
        .filter(
            el=>
                !el.closest("#about") &&
                !el.closest("#work") &&
                !el.closest("#life")
        )
        .forEach(
            (
                el,
                index
            )=>{

                gsap.set(
                    el,
                    {
                        visibility:"visible"
                    }
                );


                gsap.fromTo(
                    el,
                    {
                        opacity:0,
                        x:-32
                    },
                    {
                        opacity:1,
                        x:0,
                        duration:.65,
                        delay:index*.035,
                        ease:"power3.out",

                        scrollTrigger:{
                            trigger:el,
                            start:"top 88%",
                            once:true
                        }

                    }
                );

            }
        );


        qa(
            ".reveal-card"
        )
        .filter(
            el=>
                !el.closest("#about") &&
                !el.closest("#work") &&
                !el.closest("#life")
        )
        .forEach(
            (
                el,
                index
            )=>{

                gsap.set(
                    el,
                    {
                        visibility:"visible"
                    }
                );


                gsap.fromTo(
                    el,
                    {
                        opacity:0,
                        y:58
                    },
                    {
                        opacity:1,
                        y:0,
                        duration:.82,
                        delay:index*.055,
                        ease:"power4.out",

                        scrollTrigger:{
                            trigger:el,
                            start:"top 82%",
                            once:true
                        }

                    }
                );

            }
        );


        qa(
            ".reveal-image"
        )
        .filter(
            el=>
                !el.closest("#about") &&
                !el.closest("#work") &&
                !el.closest("#life")
        )
        .forEach(
            el=>{

                gsap.set(
                    el,
                    {
                        visibility:"visible"
                    }
                );


                gsap.fromTo(
                    el,
                    {
                        opacity:0,
                        clipPath:
                            "inset(100% 0 0 0)"
                    },
                    {
                        opacity:1,
                        clipPath:
                            "inset(0% 0 0 0)",
                        duration:1,
                        ease:"power4.inOut",

                        scrollTrigger:{
                            trigger:el,
                            start:"top 84%",
                            once:true
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
                el=>
                    !el.closest("#about") &&
                    !el.closest("#work") &&
                    !el.closest("#life")
            )
            .forEach(
                el=>{

                    const split=
                        new SplitText(
                            el,
                            {
                                type:"lines"
                            }
                        );


                    gsap.set(
                        split.lines,
                        {
                            overflow:"hidden"
                        }
                    );


                    gsap.fromTo(
                        split.lines,
                        {
                            yPercent:110,
                            opacity:0
                        },
                        {
                            yPercent:0,
                            opacity:1,
                            duration:.78,
                            stagger:.08,
                            ease:"power4.out",

                            scrollTrigger:{
                                trigger:el,
                                start:"top 84%",
                                once:true
                            }

                        }
                    );

                }
            );

        }

    }


    function initProjectAnimation(){

        if(
            typeof gsap==="undefined" ||
            typeof ScrollTrigger==="undefined" ||
            reducedMotion
        ){
            return;
        }


        const projectSection=
            q("#work");


        if(!projectSection){
            return;
        }


        const heading=
            q("#work .section-head");

        const headingInner=
            q("#work .section-head > div");

        const sectionNumber=
            q("#work .section-number");

        const title=
            q("#work .section-head h2");

        const description=
            q("#work .section-head > p");

        const cards=
            qa("#work .project-card");

        const browserLabels=
            qa("#work .project-browser-label");

        const previewLabels=
            qa("#work .project-preview-label");

        const meta=
            qa(
                "#work .project-card .work-meta"
            );

        const bottomLine=
            q("#work .work-bottom-line");

        const cardMedia=
            qa(
                "#work .project-card .project-preview"
            );


        const allElements=[
            heading,
            headingInner,
            sectionNumber,
            title,
            description,
            ...cards,
            ...browserLabels,
            ...previewLabels,
            ...meta,
            bottomLine
        ]
        .filter(Boolean);


        allElements.forEach(
            element=>{

                gsap.set(
                    element,
                    {
                        visibility:"visible"
                    }
                );

            }
        );


        if(headingInner){

            gsap.set(
                headingInner,
                {
                    autoAlpha:0,
                    y:30
                }
            );

        }


        if(sectionNumber){

            gsap.set(
                sectionNumber,
                {
                    autoAlpha:0,
                    y:18
                }
            );

        }


        if(title){

            gsap.set(
                title,
                {
                    autoAlpha:0,
                    y:72,
                    scale:.975,
                    transformOrigin:
                        "center bottom"
                }
            );

        }


        if(description){

            gsap.set(
                description,
                {
                    autoAlpha:0,
                    x:24
                }
            );

        }


        if(cards.length){

            gsap.set(
                cards,
                {
                    autoAlpha:0,
                    y:72,
                    scale:.975,
                    transformOrigin:
                        "center top"
                }
            );

        }


        if(browserLabels.length){

            gsap.set(
                browserLabels,
                {
                    autoAlpha:0,
                    x:-14
                }
            );

        }


        if(previewLabels.length){

            gsap.set(
                previewLabels,
                {
                    autoAlpha:0,
                    y:18
                }
            );

        }


        if(meta.length){

            gsap.set(
                meta,
                {
                    autoAlpha:0,
                    y:26
                }
            );

        }


        if(bottomLine){

            gsap.set(
                bottomLine,
                {
                    autoAlpha:0,
                    y:22
                }
            );

        }


        const projectTimeline=
            gsap.timeline({
                paused:true,
                defaults:{
                    overwrite:"auto"
                }
            });


        if(headingInner){

            projectTimeline.to(
                headingInner,
                {
                    autoAlpha:1,
                    y:0,
                    duration:.85,
                    ease:"power4.out"
                },
                0
            );

        }


        if(sectionNumber){

            projectTimeline.to(
                sectionNumber,
                {
                    autoAlpha:1,
                    y:0,
                    duration:.62,
                    ease:"power3.out"
                },
                .05
            );

        }


        if(title){

            projectTimeline.to(
                title,
                {
                    autoAlpha:1,
                    y:0,
                    scale:1,
                    duration:1.55,
                    ease:"power4.out"
                },
                .10
            );

        }


        if(description){

            projectTimeline.to(
                description,
                {
                    autoAlpha:1,
                    x:0,
                    duration:1.05,
                    ease:"power3.out"
                },
                .26
            );

        }


        if(cards.length){

            projectTimeline.to(
                cards,
                {
                    autoAlpha:1,
                    y:0,
                    scale:1,
                    duration:1.20,

                    stagger:{
                        each:.16,
                        from:"start"
                    },

                    ease:"power4.out"
                },
                .40
            );

        }


        if(browserLabels.length){

            projectTimeline.to(
                browserLabels,
                {
                    autoAlpha:1,
                    x:0,
                    duration:.82,
                    stagger:.12,
                    ease:"power3.out"
                },
                .62
            );

        }


        if(previewLabels.length){

            projectTimeline.to(
                previewLabels,
                {
                    autoAlpha:1,
                    y:0,
                    duration:.78,
                    stagger:.12,
                    ease:"power3.out"
                },
                .70
            );

        }


        if(meta.length){

            projectTimeline.to(
                meta,
                {
                    autoAlpha:1,
                    y:0,
                    duration:.95,
                    stagger:.14,
                    ease:"power4.out"
                },
                .78
            );

        }


        if(bottomLine){

            projectTimeline.to(
                bottomLine,
                {
                    autoAlpha:1,
                    y:0,
                    duration:.82,
                    ease:"power3.out"
                },
                1.08
            );

        }


        if(cardMedia.length){

            gsap.set(
                cardMedia,
                {
                    willChange:
                        "transform,opacity"
                }
            );

        }


        const playProjectAnimation=
            ()=>{

                projectTimeline
                    .pause()
                    .restart();

            };


        const resetProjectAnimation=
            ()=>{

                projectTimeline.pause(0);

            };


        ScrollTrigger.create({

            trigger:projectSection,

            start:"top 80%",

            end:"bottom 15%",

            onEnter:()=>{

                playProjectAnimation();

            },

            onEnterBack:()=>{

                playProjectAnimation();

            },

            onLeave:()=>{

                resetProjectAnimation();

            },

            onLeaveBack:()=>{

                resetProjectAnimation();

            }

        });


        requestAnimationFrame(
            ()=>{
                ScrollTrigger.refresh();
            }
        );

    }


    function initWorkCards(){

        const cards=qa(".work-card");

        cards.forEach(card=>{

            const preview=q(".project-preview",card);
            const images=qa(".work-media img",card);
            const coords=q(".project-hud-coords",card);

            if(!preview){
                return;
            }

            if(!reducedMotion && typeof ScrollTrigger!=="undefined"){

                images.forEach(img=>{
                    gsap.to(img,{
                        yPercent:5,
                        ease:"none",
                        scrollTrigger:{
                            trigger:card,
                            start:"top bottom",
                            end:"bottom top",
                            scrub:.55
                        }
                    });
                });

            }

            const resetPointer=()=>{
                card.classList.remove("is-hovered");
                preview.style.setProperty("--tilt-x","0deg");
                preview.style.setProperty("--tilt-y","0deg");
                preview.style.setProperty("--spot-x","50%");
                preview.style.setProperty("--spot-y","50%");
                preview.style.setProperty("--image-x","0px");
                preview.style.setProperty("--image-y","0px");
                if(coords){ coords.textContent="Y 00 / X 00"; }
                gsap.to(card,{y:0,duration:.65,ease:"power3.out"});
            };

            card.addEventListener("pointerenter",event=>{
                card.classList.add("is-hovered");
                gsap.to(card,{y:-5,duration:.55,ease:"power3.out"});
            });

            card.addEventListener("pointermove",event=>{
                const rect=preview.getBoundingClientRect();
                const px=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
                const py=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
                const rotateY=(px-.5)*5.4;
                const rotateX=(.5-py)*5.4;
                const imageX=(px-.5)*-8;
                const imageY=(py-.5)*-7;

                preview.style.setProperty("--tilt-x",`${rotateX.toFixed(2)}deg`);
                preview.style.setProperty("--tilt-y",`${rotateY.toFixed(2)}deg`);
                preview.style.setProperty("--spot-x",`${(px*100).toFixed(1)}%`);
                preview.style.setProperty("--spot-y",`${(py*100).toFixed(1)}%`);
                preview.style.setProperty("--image-x",`${imageX.toFixed(1)}px`);
                preview.style.setProperty("--image-y",`${imageY.toFixed(1)}px`);

                if(coords){
                    coords.textContent=`Y ${String(Math.round(py*99)).padStart(2,"0")} / X ${String(Math.round(px*99)).padStart(2,"0")}`;
                }
            });

            card.addEventListener("pointerleave",resetPointer);
            card.addEventListener("focusin",()=>card.classList.add("is-hovered"));
            card.addEventListener("focusout",event=>{
                if(!card.contains(event.relatedTarget)) resetPointer();
            });

        });

    }


    function initSmoothPortfolioMotion(){

        if(
            typeof gsap==="undefined" ||
            typeof ScrollTrigger==="undefined" ||
            reducedMotion
        ){
            return;
        }


        const progressBar=
            q(".scroll-progress");


        if(progressBar){

            const updateProgress=
                ()=>{

                    const maxScroll=
                        Math.max(
                            1,
                            document.documentElement
                                .scrollHeight-
                            window.innerHeight
                        );


                    const progress=
                        Math.min(
                            1,
                            Math.max(
                                0,
                                window.scrollY/maxScroll
                            )
                        );


                    gsap.to(
                        progressBar,
                        {
                            scaleX:progress,
                            duration:.35,
                            ease:"power2.out",
                            overwrite:"auto"
                        }
                    );

                };


            gsap.set(
                progressBar,
                {
                    scaleX:0,
                    transformOrigin:
                        "left center"
                }
            );


            window.addEventListener(
                "scroll",
                updateProgress,
                {
                    passive:true
                }
            );


            window.addEventListener(
                "resize",
                updateProgress,
                {
                    passive:true
                }
            );


            updateProgress();

        }


        qa(
            ".project-card"
        )
        .forEach(
            (
                card,
                index
            )=>{

                const frame=
                    q(
                        ".project-live-frame",
                        card
                    );


                const projectUrl=
                    card.dataset.projectUrl;


                const preview=
                    q(
                        ".project-preview",
                        card
                    );


                if(frame){

                    if(projectUrl){

                        frame.src=
                            projectUrl;

                        frame.style.display=
                            "block";


                        if(preview){

                            preview.classList.add(
                                "has-live-preview"
                            );

                        }

                    }
                    else{

                        frame.removeAttribute(
                            "src"
                        );

                        frame.style.display=
                            "none";


                        if(preview){

                            preview.classList.remove(
                                "has-live-preview"
                            );

                        }

                    }

                }


                if(!mobile){

                    card.addEventListener(
                        "pointermove",
                        event=>{

                            const rect=
                                card.getBoundingClientRect();


                            const px=
                                (
                                    event.clientX-
                                    rect.left
                                )/
                                rect.width-
                                .5;


                            const py=
                                (
                                    event.clientY-
                                    rect.top
                                )/
                                rect.height-
                                .5;


                            gsap.to(
                                card,
                                {
                                    rotationY:
                                        px*2.8,
                                    rotationX:
                                        -py*2.8,
                                    duration:.55,
                                    ease:"power3.out",
                                    overwrite:"auto"
                                }
                            );

                        }
                    );


                    card.addEventListener(
                        "pointerleave",
                        ()=>{

                            gsap.to(
                                card,
                                {
                                    rotationX:0,
                                    rotationY:0,
                                    duration:.7,
                                    ease:"power3.out"
                                }
                            );

                        }
                    );

                }


                if(preview){

                    preview.addEventListener(
                        "mouseenter",
                        ()=>{

                            gsap.to(
                                preview,
                                {
                                    "--project-image-scale":
                                        "1.035",
                                    duration:.85,
                                    ease:"power3.out",
                                    overwrite:"auto"
                                }
                            );

                        }
                    );


                    preview.addEventListener(
                        "mouseleave",
                        ()=>{

                            gsap.to(
                                preview,
                                {
                                    "--project-image-scale":
                                        "1",
                                    duration:1,
                                    ease:"power3.out",
                                    overwrite:"auto"
                                }
                            );

                        }
                    );

                }


                const projectLink=
                    q(
                        "[data-project-link]",
                        card
                    );


                if(projectLink){

                    if(projectUrl){

                        projectLink.href=
                            projectUrl;

                        projectLink.target=
                            "_blank";

                        projectLink.rel=
                            "noopener noreferrer";

                    }
                    else{

                        projectLink.href=
                            "#contact";

                    }

                }


                const browserLabel=
                    q(
                        ".project-browser-label",
                        card
                    );


                if(
                    browserLabel &&
                    !card.closest("#work")
                ){

                    gsap.fromTo(
                        browserLabel,
                        {
                            opacity:0,
                            x:-12
                        },
                        {
                            opacity:1,
                            x:0,
                            duration:.75,
                            delay:
                                .20+
                                index*.08,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:card,
                                start:"top 82%",
                                once:true
                            }

                        }
                    );

                }

            }
        );


        qa(
            ".fact"
        )
        .forEach(
            (
                fact,
                index
            )=>{

                gsap.fromTo(
                    fact,
                    {
                        opacity:0,
                        y:24
                    },
                    {
                        opacity:1,
                        y:0,
                        duration:.75,
                        delay:index*.07,
                        ease:"power3.out",

                        scrollTrigger:{
                            trigger:fact,
                            start:"top 90%",
                            once:true
                        }

                    }
                );

            }
        );


        qa(
            ".now-card,.contact-top,.contact-intro,.contact-bottom,.site-footer"
        )
        .forEach(
            (
                element,
                index
            )=>{

                gsap.fromTo(
                    element,
                    {
                        opacity:0,
                        y:28
                    },
                    {
                        opacity:1,
                        y:0,
                        duration:.85,
                        delay:index*.04,
                        ease:"power3.out",

                        scrollTrigger:{
                            trigger:element,
                            start:"top 88%",
                            once:true
                        }

                    }
                );

            }
        );


        qa(
            ".life-card-photo img"
        )
        .forEach(
            image=>{

                gsap.fromTo(
                    image,
                    {
                        yPercent:5,
                        scale:1.04
                    },
                    {
                        yPercent:-3,
                        scale:1,
                        ease:"none",

                        scrollTrigger:{
                            trigger:image,
                            start:"top bottom",
                            end:"bottom top",
                            scrub:1.2
                        }

                    }
                );

            }
        );


        qa(
            ".pill-button,.under-link,.contact-email,.back-top"
        )
        .forEach(
            element=>{

                element.addEventListener(
                    "mouseenter",
                    ()=>{

                        gsap.to(
                            element,
                            {
                                y:-2,
                                duration:.3,
                                ease:"power3.out",
                                overwrite:"auto"
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
                                y:0,
                                duration:.45,
                                ease:"power3.out",
                                overwrite:"auto"
                            }
                        );

                    }
                );

            }
        );


        if(
            typeof ScrollTrigger!=="undefined"
        ){

            ScrollTrigger.refresh();

        }

    }


    function initJourney(){

        qa(
            ".journey-item"
        )
        .forEach(
            (
                item,
                index
            )=>{

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
                                x:7,
                                duration:.3,
                                ease:"power2.out"
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
                                    scale:1.1,
                                    duration:.3,
                                    ease:"power2.out"
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
                                x:0,
                                duration:.4,
                                ease:"power2.out"
                            }
                        );


                        if(icon){

                            gsap.to(
                                icon,
                                {
                                    rotate:0,
                                    scale:1,
                                    duration:.35
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
                            rect.width/2;


                        const y=
                            event.clientY-
                            rect.top-
                            rect.height/2;


                        gsap.to(
                            element,
                            {
                                x:x*.11,
                                y:y*.11,
                                duration:.25,
                                ease:"power2.out"
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
                                x:0,
                                y:0,
                                duration:.6,
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
            mobile ||
            reducedMotion
        ){
            return;
        }


        const dot=
            q(".cursor-dot");

        const ring=
            q(".cursor-ring");

        const label=
            q(".cursor-label");


        if(
            !dot ||
            !ring
        ){
            return;
        }


        let mouseX=
            window.innerWidth/2;

        let mouseY=
            window.innerHeight/2;

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
                        x:mouseX,
                        y:mouseY
                    }
                );

            },
            {
                passive:true
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
                        x:ringX,
                        y:ringY
                    }
                );


                if(label){

                    gsap.set(
                        label,
                        {
                            x:ringX,
                            y:ringY
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
                                width:58,
                                height:58,
                                duration:.28,
                                ease:"power2.out"
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
                                    opacity:1,
                                    duration:.2
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
                                width:34,
                                height:34,
                                duration:.28
                            }
                        );


                        if(label){

                            gsap.to(
                                label,
                                {
                                    opacity:0,
                                    duration:.18
                                }
                            );

                        }

                    }
                );

            }
        );

    }


    function initNavigation(){

        const navLinks =
            qa(
                ".hero-menu a"
            );


        const mobileLinks =
            qa(
                ".hero-mobile-menu a"
            );


        const allLinks =
            [...navLinks, ...mobileLinks];


        if(!allLinks.length){
            return;
        }


        const targets = [];
        const seen = new Set();


        allLinks.forEach(
            link => {

                const href =
                    link.getAttribute("href");


                if(
                    !href ||
                    href === "#" ||
                    !href.startsWith("#")
                ){
                    return;
                }


                const target =
                    document.querySelector(href);


                if(
                    !target ||
                    seen.has(target)
                ){
                    return;
                }


                seen.add(target);
                targets.push(target);

            }
        );


        const setActiveNav =
            id => {

                allLinks.forEach(
                    link => {

                        link.classList.toggle(
                            "is-active",
                            link.getAttribute("href") === `#${id}`
                        );

                    }
                );

            };


        if(
            typeof ScrollTrigger !== "undefined" &&
            !reducedMotion
        ){

            targets.forEach(
                target => {

                    ScrollTrigger.create({
                        trigger: target,
                        start: "top 42%",
                        end: "bottom 42%",

                        onEnter: () => {
                            setActiveNav(target.id);
                        },

                        onEnterBack: () => {
                            setActiveNav(target.id);
                        }
                    });

                }
            );

        }
        else{

            const updateActiveByScroll = () => {

                const marker = window.scrollY + window.innerHeight * .42;
                let active = targets[0];

                targets.forEach(
                    target => {
                        const rect = target.getBoundingClientRect();
                        const top = rect.top + window.scrollY;
                        if(marker >= top){
                            active = target;
                        }
                    }
                );

                if(active){
                    setActiveNav(active.id);
                }

            };


            window.addEventListener(
                "scroll",
                updateActiveByScroll,
                {passive:true}
            );


            updateActiveByScroll();

        }

    }

    function initProjectsV2(){

        const section=q("#work.projects-v2");
        if(!section){
            return;
        }

        const cards=qa(".project-v2-card", section);
        const finePointer=window.matchMedia("(pointer:fine)").matches;

        cards.forEach((card,index)=>{

            const inner=q(".project-v2-card-inner",card);
            const media=q(".project-v2-media",card);
            const image=q(".project-v2-media img",card);
            const focus=q(".project-v2-focus",card);
            const label=q(".project-v2-floating-label",card);
            const open=q(".project-v2-open",card);

            if(!inner || !media){
                return;
            }

            const reset=()=>{
                inner.style.setProperty("--rx","0deg");
                inner.style.setProperty("--ry","0deg");
                inner.style.setProperty("--mx","50%");
                inner.style.setProperty("--my","50%");
                inner.style.setProperty("--ix","0px");
                inner.style.setProperty("--iy","0px");
                card.classList.remove("is-active");
                if(focus){
                    focus.style.opacity="0";
                }
            };

            if(finePointer && !reducedMotion){
                let raf=0;
                let px=.5;
                let py=.5;

                const render=()=>{
                    raf=0;
                    const rx=(.5-py)*7.2;
                    const ry=(px-.5)*8.2;
                    const ix=(px-.5)*-14;
                    const iy=(py-.5)*-10;
                    inner.style.setProperty("--rx",`${rx.toFixed(2)}deg`);
                    inner.style.setProperty("--ry",`${ry.toFixed(2)}deg`);
                    inner.style.setProperty("--mx",`${(px*100).toFixed(1)}%`);
                    inner.style.setProperty("--my",`${(py*100).toFixed(1)}%`);
                    inner.style.setProperty("--ix",`${ix.toFixed(1)}px`);
                    inner.style.setProperty("--iy",`${iy.toFixed(1)}px`);
                    if(focus){
                        focus.style.opacity="1";
                    }
                };

                card.addEventListener("pointerenter",()=>{
                    card.classList.add("is-active");
                });

                card.addEventListener("pointermove",event=>{
                    const rect=media.getBoundingClientRect();
                    px=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
                    py=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
                    if(!raf){
                        raf=requestAnimationFrame(render);
                    }
                });

                card.addEventListener("pointerleave",()=>{
                    if(raf){
                        cancelAnimationFrame(raf);
                        raf=0;
                    }
                    inner.style.setProperty("--rx","0deg");
                    inner.style.setProperty("--ry","0deg");
                    inner.style.setProperty("--mx","50%");
                    inner.style.setProperty("--my","50%");
                    inner.style.setProperty("--ix","0px");
                    inner.style.setProperty("--iy","0px");
                    card.classList.remove("is-active");
                    if(focus){
                        focus.style.opacity="0";
                    }
                });
            }

            if(label){
                const hoverText=label.querySelector("strong");
                if(hoverText){
                    hoverText.textContent="OPEN WEBSITE";
                }
            }

            if(open){
                open.setAttribute("aria-hidden","true");
            }

            if(image && !reducedMotion){
                gsap.to(image,{
                    yPercent:4,
                    ease:"none",
                    scrollTrigger: typeof ScrollTrigger!=="undefined" ? {
                        trigger:card,
                        start:"top bottom",
                        end:"bottom top",
                        scrub:.9
                    } : undefined
                });
            }

            reset();
        });

        if(!reducedMotion && typeof ScrollTrigger!=="undefined"){
            const intro=q(".projects-v2-title-wrap",section);
            const copy=q(".projects-v2-copy",section);
            const topLine=q(".projects-v2-topline",section);
            const stage=q(".projects-v2-stage",section);
            const footer=q(".projects-v2-footer",section);

            gsap.fromTo(
                [topLine,intro,copy].filter(Boolean),
                {y:42,opacity:0},
                {
                    y:0,
                    opacity:1,
                    duration:1.15,
                    stagger:.08,
                    ease:"power4.out",
                    scrollTrigger:{trigger:section,start:"top 72%",once:true}
                }
            );

            gsap.fromTo(
                cards,
                {y:70,opacity:0,rotationZ:index=>index===0?-2.5:2.5,scale:.965},
                {
                    y:0,
                    opacity:1,
                    rotationZ:0,
                    scale:1,
                    duration:1.25,
                    stagger:.16,
                    ease:"expo.out",
                    scrollTrigger:{trigger:stage,start:"top 76%",once:true}
                }
            );

            gsap.fromTo(
                footer,
                {y:22,opacity:0},
                {y:0,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:footer,start:"top 90%",once:true}}
            );
        }

    }


    function initSmoothAnchors(){

        qa(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const selector =
                            link.getAttribute("href");


                        if(
                            !selector ||
                            selector === "#"
                        ){
                            return;
                        }


                        const target =
                            document.querySelector(selector);


                        if(!target){
                            return;
                        }


                        event.preventDefault();


                        const offset = -92;
                        const duration = 1.65;


                        /*
                         * Lenis:
                         * perpindahan dibuat panjang dan halus,
                         * jadi section tidak terasa "loncat".
                         */
                        if(lenis){

                            lenis.scrollTo(
                                target,
                                {
                                    offset,
                                    duration,
                                    lock:true,
                                    easing:
                                        time =>
                                            1 -
                                            Math.pow(
                                                1 - time,
                                                4
                                            )
                                }
                            );

                        }
                        else{

                            /*
                             * Fallback tanpa Lenis.
                             * Tetap smooth dengan easing kuartik.
                             */
                            const startY =
                                window.scrollY;


                            const targetY =
                                target.getBoundingClientRect().top +
                                window.scrollY +
                                offset;


                            const distance =
                                targetY - startY;


                            const startTime =
                                performance.now();


                            const animateScroll =
                                now => {

                                    const progress =
                                        Math.min(
                                            1,
                                            (now - startTime) /
                                            (duration * 1000)
                                        );


                                    const eased =
                                        1 -
                                        Math.pow(
                                            1 - progress,
                                            4
                                        );


                                    window.scrollTo(
                                        0,
                                        startY +
                                        distance * eased
                                    );


                                    if(progress < 1){
                                        requestAnimationFrame(
                                            animateScroll
                                        );
                                    }

                                };


                            requestAnimationFrame(
                                animateScroll
                            );

                        }


                        /*
                         * Mobile menu ditutup tanpa menunggu
                         * scroll selesai.
                         */
                        const mobileToggle =
                            document.querySelector(
                                ".hero-mobile-toggle"
                            );


                        if(
                            mobileToggle &&
                            window.innerWidth <= 900
                        ){
                            mobileToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }


                        if(
                            window.history &&
                            window.history.replaceState
                        ){
                            window.history.replaceState(
                                null,
                                "",
                                selector
                            );
                        }

                    }
                );

            }
        );

    }

});


/* =========================================================
   STACK LAB INTERACTION
   ADDITIVE ONLY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        "use strict";


        const stackLab=
            document.querySelector(
                "[data-stack-lab]"
            );


        if(!stackLab){
            return;
        }


        const items=[
            ...stackLab.querySelectorAll(
                "[data-stack-item]"
            )
        ];


        const stageLogo=
            stackLab.querySelector(
                "[data-stack-stage-logo]"
            );


        const stageImage=
            stackLab.querySelector(
                "[data-stack-stage-image]"
            );


        const stageName=
            stackLab.querySelector(
                "[data-stack-stage-name]"
            );


        const stageType=
            stackLab.querySelector(
                "[data-stack-stage-type]"
            );


        const stageDescription=
            stackLab.querySelector(
                "[data-stack-stage-description]"
            );


        const stageNumber=
            stackLab.querySelector(
                "[data-stack-stage-number]"
            );


        const count=
            document.querySelector(
                "[data-stack-count]"
            );


        const readoutName=
            stackLab.querySelector(
                "[data-stack-readout-name]"
            );


        const libraryItems=[
            ...document.querySelectorAll(
                "[data-library]"
            )
        ];


        const reducedMotion=
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        const finePointer=
            window.matchMedia(
                "(pointer: fine)"
            ).matches;


        const selectStack=
            (
                item,
                index
            )=>{

                if(!item){
                    return;
                }


                items.forEach(
                    current=>{

                        current.classList.toggle(
                            "is-active",
                            current===item
                        );

                    }
                );


                const name=
                    item.dataset.name ||
                    "HTML";


                const type=
                    item.dataset.type ||
                    "";


                const number=
                    item.dataset.number ||
                    "01";


                const description=
                    item.dataset.description ||
                    "";


                const logo=
                    item.dataset.logo ||
                    "";


                const difficulty=
                    Number(
                        item.dataset.difficulty ||
                        3
                    );


                const difficultyLabel=
                    difficulty<=2
                        ? "MUDAH"
                        : difficulty===3
                            ? "MENENGAH"
                            : "SULIT";


                const difficultyBars=[
                    ...stackLab.querySelectorAll(
                        "[data-stack-difficulty] i"
                    )
                ];


                const difficultyLabelElement=
                    stackLab.querySelector(
                        "[data-stack-difficulty-label]"
                    );


                if(difficultyLabelElement){

                    difficultyLabelElement.textContent=
                        difficultyLabel;

                }


                difficultyBars.forEach(
                    (
                        bar,
                        barIndex
                    )=>{

                        bar.classList.toggle(
                            "is-filled",
                            barIndex<difficulty
                        );

                    }
                );


                stackLab.dataset.difficultyLevel=
                    difficulty;


                if(count){

                    count.textContent=
                        number;

                }


                if(readoutName){

                    readoutName.textContent=
                        name;

                }


                if(
                    stageLogo &&
                    stageImage
                ){

                    stageLogo.classList.add(
                        "is-changing"
                    );


                    window.setTimeout(
                        ()=>{

                            stageImage.src=
                                logo;

                            stageImage.alt=
                                name;


                            stageName.textContent=
                                name;


                            stageType.textContent=
                                type;


                            stageDescription.textContent=
                                description;


                            stageNumber.textContent=
                                number;


                            stageLogo.classList.remove(
                                "is-changing"
                            );

                        },
                        reducedMotion
                            ? 0
                            : 160
                    );

                }


                if(
                    !reducedMotion &&
                    typeof gsap!=="undefined"
                ){

                    gsap.fromTo(
                        stageName,
                        {
                            y:12,
                            opacity:0
                        },
                        {
                            y:0,
                            opacity:1,
                            duration:.42,
                            ease:"power3.out"
                        }
                    );


                    gsap.fromTo(
                        stageDescription,
                        {
                            y:8,
                            opacity:0
                        },
                        {
                            y:0,
                            opacity:1,
                            duration:.4,
                            delay:.03,
                            ease:"power3.out"
                        }
                    );


                    gsap.fromTo(
                        stageLogo,
                        {
                            scale:.92
                        },
                        {
                            scale:1,
                            duration:.65,
                            ease:
                                "elastic.out(1,.55)"
                        }
                    );

                }

            };


        items.forEach(
            (
                item,
                index
            )=>{

                item.addEventListener(
                    "mouseenter",
                    ()=>{

                        selectStack(
                            item,
                            index
                        );

                    }
                );


                item.addEventListener(
                    "focus",
                    ()=>{

                        selectStack(
                            item,
                            index
                        );

                    }
                );


                item.addEventListener(
                    "click",
                    ()=>{

                        selectStack(
                            item,
                            index
                        );

                    }
                );

            }
        );


        if(
            finePointer &&
            !reducedMotion
        ){

            stackLab.addEventListener(
                "pointermove",
                event=>{

                    const rect=
                        stackLab.getBoundingClientRect();


                    const x=
                        (
                            event.clientX-
                            rect.left
                        )/
                        rect.width;


                    const y=
                        (
                            event.clientY-
                            rect.top
                        )/
                        rect.height;


                    const moveX=
                        (
                            x-.5
                        )*
                        28;


                    const moveY=
                        (
                            y-.5
                        )*
                        22;


                    stackLab.style.setProperty(
                        "--mouse-x",
                        `${x*100}%`
                    );


                    stackLab.style.setProperty(
                        "--mouse-y",
                        `${y*100}%`
                    );


                    if(stageLogo){

                        stageLogo.style.setProperty(
                            "--stage-x",
                            `${moveX}px`
                        );


                        stageLogo.style.setProperty(
                            "--stage-y",
                            `${moveY}px`
                        );

                    }

                }
            );


            stackLab.addEventListener(
                "pointerleave",
                ()=>{

                    stackLab.style.setProperty(
                        "--mouse-x",
                        "50%"
                    );


                    stackLab.style.setProperty(
                        "--mouse-y",
                        "50%"
                    );


                    if(stageLogo){

                        stageLogo.style.setProperty(
                            "--stage-x",
                            "0px"
                        );


                        stageLogo.style.setProperty(
                            "--stage-y",
                            "0px"
                        );

                    }

                }
            );

        }


        if(
            !reducedMotion &&
            typeof gsap!=="undefined" &&
            typeof ScrollTrigger!=="undefined"
        ){

            gsap.registerPlugin(
                ScrollTrigger
            );


            const section=
                document.querySelector(
                    "#stack"
                );


            const heading=
                document.querySelector(
                    ".stack-lab-heading"
                );


            const consoleBox=
                document.querySelector(
                    ".stack-lab-console"
                );


            const stageSection=
                document.querySelector(
                    ".stack-lab-stage"
                );


            const readout=
                document.querySelector(
                    ".stack-lab-readout"
                );


            const libraries=
                document.querySelector(
                    ".stack-libraries"
                );


            const libraryItemsScroll=[
                ...document.querySelectorAll(
                    "[data-library]"
                )
            ];


            const stackItems=[
                ...document.querySelectorAll(
                    ".stack-lab-item"
                )
            ];


            if(!section){
                return;
            }


            if(heading){

                const index=
                    heading.querySelector(
                        ".stack-lab-index"
                    );


                const title=
                    heading.querySelector(
                        ".stack-lab-title"
                    );


                const note=
                    heading.querySelector(
                        ".stack-lab-note"
                    );


                const kicker=
                    heading.querySelector(
                        ".stack-lab-kicker"
                    );


                const titleText=
                    title?.querySelector(
                        "h2"
                    );


                const counter=
                    heading.querySelector(
                        ".stack-lab-counter"
                    );


                gsap.set(
                    heading,
                    {
                        autoAlpha:1
                    }
                );


                if(index){

                    gsap.fromTo(
                        index,
                        {
                            y:35,
                            x:-14,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            x:0,
                            autoAlpha:1,
                            duration:1.35,
                            ease:"power4.out",

                            scrollTrigger:{
                                trigger:heading,
                                start:"top 87%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(kicker){

                    gsap.fromTo(
                        kicker,
                        {
                            y:22,
                            autoAlpha:0,
                            letterSpacing:".24em"
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            letterSpacing:".14em",
                            duration:1.15,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:heading,
                                start:"top 87%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(titleText){

                    gsap.fromTo(
                        titleText,
                        {
                            y:85,
                            autoAlpha:0,
                            scale:.975,
                            filter:"blur(7px)"
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            scale:1,
                            filter:"blur(0px)",
                            duration:1.65,
                            ease:"power4.out",

                            scrollTrigger:{
                                trigger:heading,
                                start:"top 87%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(note){

                    gsap.fromTo(
                        note,
                        {
                            y:38,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.35,
                            delay:.18,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:heading,
                                start:"top 87%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(counter){

                    gsap.fromTo(
                        counter,
                        {
                            scaleX:.55,
                            transformOrigin:
                                "left center",
                            autoAlpha:0
                        },
                        {
                            scaleX:1,
                            autoAlpha:1,
                            duration:1.1,
                            delay:.38,
                            ease:"expo.out",

                            scrollTrigger:{
                                trigger:heading,
                                start:"top 87%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }

            }


            if(consoleBox){

                gsap.fromTo(
                    consoleBox,
                    {
                        y:80,
                        scale:.965,
                        autoAlpha:0,
                        filter:"blur(8px)"
                    },
                    {
                        y:0,
                        scale:1,
                        autoAlpha:1,
                        filter:"blur(0px)",
                        duration:1.8,
                        delay:.12,
                        ease:"power4.out",

                        scrollTrigger:{
                            trigger:consoleBox,
                            start:"top 86%",
                            toggleActions:
                                "restart none restart reset"
                        }
                    }
                );

            }


            if(stackItems.length){

                gsap.fromTo(
                    stackItems,
                    {
                        x:-30,
                        autoAlpha:0
                    },
                    {
                        x:0,
                        autoAlpha:1,
                        duration:1.15,

                        stagger:{
                            each:.12,
                            from:"start"
                        },

                        delay:.22,
                        ease:"power4.out",

                        scrollTrigger:{
                            trigger:".stack-lab-directory",
                            start:"top 84%",
                            toggleActions:
                                "restart none restart reset"
                        }
                    }
                );


                stackItems.forEach(
                    (
                        item,
                        index
                    )=>{

                        const logo=
                            item.querySelector(
                                ".stack-lab-item-logo"
                            );


                        const name=
                            item.querySelector(
                                ".stack-lab-item-name"
                            );


                        const number=
                            item.querySelector(
                                ".stack-lab-no"
                            );


                        const arrow=
                            item.querySelector(
                                "i"
                            );


                        if(logo){

                            gsap.fromTo(
                                logo,
                                {
                                    scale:.72,
                                    rotate:-10,
                                    autoAlpha:0
                                },
                                {
                                    scale:1,
                                    rotate:0,
                                    autoAlpha:1,
                                    duration:1.05,

                                    delay:
                                        .32+
                                        index*.12,

                                    ease:
                                        "elastic.out(1,.65)",

                                    scrollTrigger:{
                                        trigger:
                                            ".stack-lab-directory",
                                        start:"top 84%",
                                        toggleActions:
                                            "restart none restart reset"
                                    }
                                }
                            );

                        }


                        if(name){

                            gsap.fromTo(
                                name,
                                {
                                    x:-12,
                                    autoAlpha:0
                                },
                                {
                                    x:0,
                                    autoAlpha:1,
                                    duration:.9,

                                    delay:
                                        .36+
                                        index*.12,

                                    ease:"power3.out",

                                    scrollTrigger:{
                                        trigger:
                                            ".stack-lab-directory",
                                        start:"top 84%",
                                        toggleActions:
                                            "restart none restart reset"
                                    }
                                }
                            );

                        }


                        if(number){

                            gsap.fromTo(
                                number,
                                {
                                    autoAlpha:0,
                                    x:-7
                                },
                                {
                                    autoAlpha:1,
                                    x:0,
                                    duration:.8,

                                    delay:
                                        .28+
                                        index*.12,

                                    ease:"power3.out",

                                    scrollTrigger:{
                                        trigger:
                                            ".stack-lab-directory",
                                        start:"top 84%",
                                        toggleActions:
                                            "restart none restart reset"
                                    }
                                }
                            );

                        }


                        if(arrow){

                            gsap.fromTo(
                                arrow,
                                {
                                    x:-8,
                                    autoAlpha:0
                                },
                                {
                                    x:0,
                                    autoAlpha:.5,
                                    duration:.8,

                                    delay:
                                        .44+
                                        index*.12,

                                    ease:"power3.out",

                                    scrollTrigger:{
                                        trigger:
                                            ".stack-lab-directory",
                                        start:"top 84%",
                                        toggleActions:
                                            "restart none restart reset"
                                    }
                                }
                            );

                        }

                    }
                );

            }


            if(stageSection){

                const stageTop=
                    stageSection.querySelector(
                        ".stack-stage-top"
                    );


                const orbits=[
                    ...stageSection.querySelectorAll(
                        ".stack-stage-orbit"
                    )
                ];


                const crosshair=
                    stageSection.querySelector(
                        ".stack-stage-crosshair"
                    );


                const logo=
                    stageSection.querySelector(
                        ".stack-stage-logo"
                    );


                const data=
                    stageSection.querySelector(
                        ".stack-stage-data"
                    );


                const footer=
                    stageSection.querySelector(
                        ".stack-stage-footer"
                    );


                if(stageTop){

                    gsap.fromTo(
                        stageTop,
                        {
                            y:-18,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.15,
                            delay:.2,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(orbits.length){

                    gsap.fromTo(
                        orbits,
                        {
                            scale:.55,
                            rotate:-25,
                            autoAlpha:0
                        },
                        {
                            scale:1,
                            rotate:0,
                            autoAlpha:1,
                            duration:1.45,
                            stagger:.12,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(crosshair){

                    gsap.fromTo(
                        crosshair,
                        {
                            scale:.72,
                            autoAlpha:0
                        },
                        {
                            scale:1,
                            autoAlpha:.65,
                            duration:1.8,
                            delay:.38,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(logo){

                    gsap.fromTo(
                        logo,
                        {
                            scale:.55,
                            y:45,
                            rotate:-13,
                            autoAlpha:0
                        },
                        {
                            scale:1,
                            y:0,
                            rotate:0,
                            autoAlpha:1,
                            duration:1.75,
                            delay:.52,
                            ease:
                                "elastic.out(1,.55)",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(data){

                    gsap.fromTo(
                        data,
                        {
                            y:38,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.3,
                            delay:.76,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(footer){

                    gsap.fromTo(
                        footer,
                        {
                            y:18,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.05,
                            delay:1,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:stageSection,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }

            }


            if(readout){

                const heading=
                    readout.querySelector(
                        ".stack-readout-heading"
                    );


                const main=
                    readout.querySelector(
                        ".stack-readout-main"
                    );


                const rows=[
                    ...readout.querySelectorAll(
                        ".stack-readout-list div"
                    )
                ];


                const bottom=
                    readout.querySelector(
                        ".stack-readout-bottom"
                    );


                if(heading){

                    gsap.fromTo(
                        heading,
                        {
                            x:25,
                            autoAlpha:0
                        },
                        {
                            x:0,
                            autoAlpha:1,
                            duration:1.1,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:readout,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(main){

                    gsap.fromTo(
                        main,
                        {
                            y:35,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.35,
                            delay:.16,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:readout,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(rows.length){

                    gsap.fromTo(
                        rows,
                        {
                            x:18,
                            autoAlpha:0
                        },
                        {
                            x:0,
                            autoAlpha:1,
                            duration:.82,
                            stagger:.1,
                            delay:.32,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:readout,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                if(bottom){

                    gsap.fromTo(
                        bottom,
                        {
                            y:20,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:.95,
                            delay:.72,
                            ease:"power3.out",

                            scrollTrigger:{
                                trigger:readout,
                                start:"top 84%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }

            }


            if(
                libraries &&
                libraryItemsScroll.length
            ){

                const libraryHeading=
                    libraries.querySelector(
                        ".stack-libraries-heading"
                    );


                if(libraryHeading){

                    gsap.fromTo(
                        libraryHeading,
                        {
                            y:45,
                            autoAlpha:0
                        },
                        {
                            y:0,
                            autoAlpha:1,
                            duration:1.45,
                            ease:"power4.out",

                            scrollTrigger:{
                                trigger:libraries,
                                start:"top 88%",
                                toggleActions:
                                    "restart none restart reset"
                            }
                        }
                    );

                }


                gsap.fromTo(
                    libraryItemsScroll,
                    {
                        y:55,
                        scale:.96,
                        autoAlpha:0
                    },
                    {
                        y:0,
                        scale:1,
                        autoAlpha:1,

                        duration:1.2,

                        stagger:{
                            each:.14,
                            from:"start"
                        },

                        delay:.2,

                        ease:"power4.out",

                        scrollTrigger:{
                            trigger:libraries,
                            start:"top 88%",
                            toggleActions:
                                "restart none restart reset"
                        }
                    }
                );

            }


            requestAnimationFrame(
                ()=>{
                    ScrollTrigger.refresh();
                }
            );

        }


        if(
            typeof gsap!=="undefined" &&
            !reducedMotion
        ){

            libraryItems.forEach(
                library=>{

                    const symbol=
                        library.querySelector(
                            ".stack-library-symbol"
                        );


                    if(!symbol){
                        return;
                    }


                    library.addEventListener(
                        "mouseenter",
                        ()=>{

                            gsap.to(
                                symbol,
                                {
                                    rotate:-8,
                                    y:-4,
                                    scale:1.08,
                                    duration:.4,
                                    ease:"power3.out",
                                    overwrite:true
                                }
                            );

                        }
                    );


                    library.addEventListener(
                        "mouseleave",
                        ()=>{

                            gsap.to(
                                symbol,
                                {
                                    rotate:0,
                                    y:0,
                                    scale:1,
                                    duration:.5,
                                    ease:
                                        "elastic.out(1,.5)",
                                    overwrite:true
                                }
                            );

                        }
                    );

                }
            );

        }


        if(items[0]){

            selectStack(
                items[0],
                0
            );

        }

    }
);


/* =========================================================
   LIFE — TRAVEL + GAMING
========================================================= */

function initLifeAnimation(){

    const life =
        document.querySelector(
            "#life.life-redesign"
        );

    const like =
        document.querySelector(
            "#love.like-redesign"
        );

    if(
        !life &&
        !like
    ){
        return;
    }


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const finePointer =
        window.matchMedia(
            "(hover:hover) and (pointer:fine)"
        ).matches;


    /* =====================================================
       GENERIC REVEAL
    ===================================================== */

    const revealGroups = [
        ...(life
            ? life.querySelectorAll(
                ".life-reveal"
            )
            : []),

        ...(like
            ? like.querySelectorAll(
                ".like-reveal"
            )
            : [])
    ];


    if(
        revealGroups.length &&
        "IntersectionObserver" in window
    ){

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if(
                                !entry.isIntersecting
                            ){
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:.12,
                    rootMargin:
                        "0px 0px -8% 0px"
                }
            );


        revealGroups.forEach(
            item =>
                observer.observe(item)
        );

    }
    else{

        revealGroups.forEach(
            item =>
                item.classList.add(
                    "is-visible"
                )
        );

    }


    /* =====================================================
       AMBIENT POINTER
    ===================================================== */

    if(
        finePointer &&
        !reduceMotion
    ){

        const ambientSections = [
            life,
            like,
            document.querySelector(
                "#contact.contact-redesign"
            )
        ].filter(Boolean);


        ambientSections.forEach(
            section => {

                section.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            section.getBoundingClientRect();


                        const x =
                            (
                                (event.clientX -
                                rect.left) /
                                rect.width
                            ) * 100;


                        const y =
                            (
                                (event.clientY -
                                rect.top) /
                                rect.height
                            ) * 100;


                        section.style.setProperty(
                            "--spot-x",
                            `${x}%`
                        );


                        section.style.setProperty(
                            "--spot-y",
                            `${y}%`
                        );

                    },
                    {
                        passive:true
                    }
                );

            }
        );

    }


    /* =====================================================
       LIFE CARD TILT
    ===================================================== */

    if(
        life &&
        finePointer &&
        !reduceMotion
    ){

        life
            .querySelectorAll(
                ".life-story-card"
            )
            .forEach(
                card => {

                    card.addEventListener(
                        "pointermove",
                        event => {

                            const rect =
                                card.getBoundingClientRect();


                            const px =
                                (
                                    event.clientX -
                                    rect.left
                                ) / rect.width -
                                .5;


                            const py =
                                (
                                    event.clientY -
                                    rect.top
                                ) / rect.height -
                                .5;


                            card.style.setProperty(
                                "--tilt-x",
                                `${(-py * 3).toFixed(2)}deg`
                            );


                            card.style.setProperty(
                                "--tilt-y",
                                `${(px * 4).toFixed(2)}deg`
                            );

                        },
                        {
                            passive:true
                        }
                    );


                    card.addEventListener(
                        "pointerleave",
                        () => {

                            card.style.setProperty(
                                "--tilt-x",
                                "0deg"
                            );


                            card.style.setProperty(
                                "--tilt-y",
                                "0deg"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       MUSIC PLAYER — 10 LAGU / PILIH & GESER
    ===================================================== */

    if(!like){
        return;
    }

    const audio = like.querySelector("[data-music-audio]");
    const playButton = like.querySelector("[data-music-play]");
    const disc = like.querySelector("[data-music-disc]");
    const progress = like.querySelector("[data-music-progress]");
    const timeLabel = like.querySelector("[data-music-time]");
    const status = like.querySelector("[data-music-status]");
    const title = like.querySelector("[data-music-title]");
    const label = like.querySelector("[data-music-label]");
    const tracks = qa("[data-music-track]", like);

    const icon = playButton
        ? playButton.querySelector("i")
        : null;

    if(!audio || !playButton){
        return;
    }

    // Tandai player sudah aktif agar failsafe di bawah tidak memasang listener ganda.
    like.dataset.musicReady = "true";

    const formatTime = value => {
        if(!Number.isFinite(value)){
            return "00:00";
        }

        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);

        return String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
    };

    const setActiveTrack = (track, autoPlay=false) => {
        if(!track){
            return;
        }

        const src = track.dataset.src || "";
        const trackTitle = track.dataset.title || "Judul lagu";
        const artist = track.dataset.artist || "Pilihan saya";

        tracks.forEach(item => {
            item.classList.toggle("is-active", item === track);
        });

        audio.pause();
        audio.currentTime = 0;
        audio.src = src;
        audio.load();

        if(title){
            title.textContent = trackTitle;
        }

        if(label){
            label.textContent = "PUTAR LAGU";
        }

        if(status){
            status.textContent = `${artist} · ${src}`;
        }

        if(progress){
            progress.style.width = "0%";
        }

        if(timeLabel){
            timeLabel.textContent = "00:00";
        }

        if(autoPlay){
            audio.play().then(() => {
                if(status){
                    status.textContent = `Sedang diputar · ${artist}`;
                }
                syncMusicUI();
            }).catch(() => {
                if(status){
                    status.textContent = `File belum tersedia: ${src}`;
                }
                syncMusicUI();
            });
        }
    };

    const syncMusicUI = () => {
        const duration = audio.duration || 0;
        const current = audio.currentTime || 0;
        const ratio = duration > 0 ? current / duration : 0;

        if(progress){
            progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
        }

        if(timeLabel){
            timeLabel.textContent = formatTime(current);
        }

        if(icon){
            icon.className = audio.paused
                ? "bi bi-play-fill"
                : "bi bi-pause-fill";
        }

        if(disc){
            disc.classList.toggle("is-playing", !audio.paused);
        }
    };

    tracks.forEach(track => {
        track.addEventListener("click", () => {
            setActiveTrack(track, true);
        });
    });

    playButton.addEventListener("click", async () => {
        if(!audio.src){
            return;
        }

        try{
            if(audio.paused){
                await audio.play();
                const active = like.querySelector("[data-music-track].is-active");
                const artist = active?.dataset.artist || "Pilihan saya";

                if(status){
                    status.textContent = `Sedang diputar · ${artist}`;
                }
            }else{
                audio.pause();

                if(status){
                    status.textContent = "Lagu dijeda.";
                }
            }
        }catch(error){
            const active = like.querySelector("[data-music-track].is-active");
            const src = active?.dataset.src || audio.currentSrc || "";

            if(status){
                status.textContent = src
                    ? `File audio belum ditemukan: ${src}`
                    : "File audio belum dipilih.";
            }
        }

        syncMusicUI();
    });

    audio.addEventListener("loadedmetadata", () => {
        if(status){
            const active = like.querySelector("[data-music-track].is-active");
            const artist = active?.dataset.artist || "Pilihan saya";
            status.textContent = `Siap diputar · ${artist}`;
        }

        syncMusicUI();
    });

    audio.addEventListener("error", () => {
        const active = like.querySelector("[data-music-track].is-active");
        const src = active?.dataset.src || audio.currentSrc || "";

        if(status){
            status.textContent = src
                ? `File audio belum ditemukan: ${src}`
                : "File audio belum dipilih.";
        }

        syncMusicUI();
    });

    audio.addEventListener("timeupdate", syncMusicUI);
    audio.addEventListener("play", syncMusicUI);
    audio.addEventListener("pause", syncMusicUI);

    audio.addEventListener("ended", () => {
        syncMusicUI();

        const activeIndex = tracks.findIndex(track => track.classList.contains("is-active"));
        const nextTrack = tracks[activeIndex + 1];

        if(nextTrack){
            setActiveTrack(nextTrack, true);
        }else if(status){
            status.textContent = "Semua lagu di daftar sudah selesai.";
        }
    });

    const progressTrack = like.querySelector(".like-music-progress");

    if(progressTrack){
        progressTrack.addEventListener("click", event => {
            if(!Number.isFinite(audio.duration) || audio.duration <= 0){
                return;
            }

            const rect = progressTrack.getBoundingClientRect();
            const ratio = (event.clientX - rect.left) / rect.width;

            audio.currentTime = Math.min(
                audio.duration,
                Math.max(0, ratio * audio.duration)
            );
        });
    }

    const firstTrack = tracks[0];

    if(firstTrack){
        setActiveTrack(firstTrack, false);
    }

    syncMusicUI();

}


/* =========================================================
   FILM + CONTACT SUPPORT
   Kecepatan reveal/tilt dibuat konsisten dengan section baru.
========================================================= */

/* =========================================================
   MOUNTAIN GALLERY V3 — INTERACTION
   Gentle 3D tilt, image parallax, ambience and video control.
========================================================= */
function initLifeV3(){

    const life =
        document.querySelector(
            "#life.life-v3"
        );

    if(!life){
        return;
    }

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const finePointer =
        window.matchMedia(
            "(hover:hover) and (pointer:fine)"
        ).matches;


    /* ---------- Decorative background motion ---------- */
    if(
        !reducedMotion &&
        typeof gsap !== "undefined"
    ){

        const orbitA =
            life.querySelector(".life-v3-orbit-a");

        const orbitB =
            life.querySelector(".life-v3-orbit-b");

        const glowA =
            life.querySelector(".life-v3-glow-a");

        const glowB =
            life.querySelector(".life-v3-glow-b");

        if(orbitA){
            gsap.to(
                orbitA,
                {
                    rotation:"+=360",
                    duration:30,
                    repeat:-1,
                    ease:"none"
                }
            );
        }

        if(orbitB){
            gsap.to(
                orbitB,
                {
                    rotation:"-=360",
                    duration:38,
                    repeat:-1,
                    ease:"none"
                }
            );
        }

        if(glowA){
            gsap.to(
                glowA,
                {
                    x:14,
                    y:10,
                    scale:1.04,
                    duration:8,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );
        }

        if(glowB){
            gsap.to(
                glowB,
                {
                    x:-12,
                    y:-10,
                    scale:1.035,
                    duration:10,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );
        }

    }


    /* ---------- Photo cards ---------- */
    if(
        finePointer &&
        !reducedMotion
    ){

        life
            .querySelectorAll(
                "[data-life-v3-card]"
            )
            .forEach(
                card=>{

                    const media =
                        card.querySelector(
                            ".life-v3-media"
                        );

                    if(!media){
                        return;
                    }


                    card.addEventListener(
                        "pointerenter",
                        ()=>{
                            card.classList.add(
                                "is-hovered"
                            );
                        },
                        {
                            passive:true
                        }
                    );


                    card.addEventListener(
                        "pointermove",
                        event=>{

                            const rect =
                                card.getBoundingClientRect();

                            const px =
                                (
                                    event.clientX -
                                    rect.left
                                ) / rect.width - .5;

                            const py =
                                (
                                    event.clientY -
                                    rect.top
                                ) / rect.height - .5;


                            card.style.setProperty(
                                "--tilt-x",
                                `${(-py * 3.2).toFixed(2)}deg`
                            );

                            card.style.setProperty(
                                "--tilt-y",
                                `${(px * 4.2).toFixed(2)}deg`
                            );

                            media.style.setProperty(
                                "--life-photo-x",
                                `${(px * -12).toFixed(2)}px`
                            );

                            media.style.setProperty(
                                "--life-photo-y",
                                `${(py * -10).toFixed(2)}px`
                            );

                        },
                        {
                            passive:true
                        }
                    );


                    card.addEventListener(
                        "pointerleave",
                        ()=>{

                            card.classList.remove(
                                "is-hovered"
                            );

                            card.style.setProperty(
                                "--tilt-x",
                                "0deg"
                            );

                            card.style.setProperty(
                                "--tilt-y",
                                "0deg"
                            );

                            media.style.setProperty(
                                "--life-photo-x",
                                "0px"
                            );

                            media.style.setProperty(
                                "--life-photo-y",
                                "0px"
                            );

                        }
                    );

                }
            );

    }


    /* ---------- Video viewport playback ---------- */
    const video =
        life.querySelector(
            "[data-life-v3-video] video"
        );

    if(video){

        video.muted=true;

        if(
            "IntersectionObserver" in window
        ){

            const videoObserver =
                new IntersectionObserver(
                    entries=>{

                        entries.forEach(
                            entry=>{

                                if(
                                    entry.isIntersecting
                                ){

                                    const promise =
                                        video.play();

                                    if(
                                        promise &&
                                        typeof promise.catch==="function"
                                    ){
                                        promise.catch(
                                            ()=>{}
                                        );
                                    }

                                }
                                else{

                                    video.pause();

                                }

                            }
                        );

                    },
                    {
                        threshold:.15
                    }
                );

            videoObserver.observe(
                video
            );

        }

    }

}


function initLifeSocialInteractions(){

    const life =
        document.querySelector("#life");

    if(!life){
        return;
    }


    const posts =
        [
            ...life.querySelectorAll(
                ".life-social-post"
            )
        ];


    if(!posts.length){
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const createHeartBurst =
        post => {

            const image =
                post.querySelector(
                    ".life-travel-image"
                );

            if(!image){
                return;
            }


            const heart =
                document.createElement("span");

            heart.className =
                "life-social-heart-pop";

            heart.innerHTML =
                '<i class="bi bi-heart-fill"></i>';

            image.appendChild(heart);


            if(
                reducedMotion ||
                typeof gsap === "undefined"
            ){

                heart.remove();

                return;

            }


            gsap.fromTo(
                heart,
                {
                    xPercent:-50,
                    yPercent:-50,
                    scale:.35,
                    opacity:0,
                    rotate:-12
                },
                {
                    scale:1.28,
                    opacity:1,
                    rotate:8,
                    duration:.28,
                    ease:"back.out(2)"
                }
            );


            gsap.to(
                heart,
                {
                    y:-82,
                    scale:1.05,
                    opacity:0,
                    duration:.62,
                    delay:.06,
                    ease:"power2.out",
                    onComplete:()=>{
                        heart.remove();
                    }
                }
            );


            const ring =
                document.createElement("span");

            ring.className =
                "life-social-like-ring";

            image.appendChild(ring);


            gsap.fromTo(
                ring,
                {
                    xPercent:-50,
                    yPercent:-50,
                    scale:.45,
                    opacity:.7
                },
                {
                    scale:2.8,
                    opacity:0,
                    duration:.55,
                    ease:"power2.out",
                    onComplete:()=>{
                        ring.remove();
                    }
                }
            );

        };


    const updateLike =
        (post, liked, animate=true) => {

            const button =
                post.querySelector(
                    "[data-social-like]"
                );

            const icon =
                button?.querySelector("i");

            const count =
                post.querySelector(
                    "[data-like-count]"
                );

            if(
                !button ||
                !icon ||
                !count
            ){
                return;
            }


            const base =
                Number(
                    count.dataset.likeBase || 0
                );


            const value =
                liked
                    ? base + 1
                    : base;


            count.textContent =
                `${value} suka`;

            button.classList.toggle(
                "is-liked",
                liked
            );

            button.setAttribute(
                "aria-pressed",
                String(liked)
            );


            icon.classList.toggle(
                "bi-heart-fill",
                liked
            );

            icon.classList.toggle(
                "bi-heart",
                !liked
            );


            if(
                animate &&
                !reducedMotion &&
                typeof gsap !== "undefined"
            ){

                gsap.killTweensOf(button);

                gsap.fromTo(
                    button,
                    {
                        scale:liked ? .72 : .9
                    },
                    {
                        scale:1,
                        duration:.52,
                        ease:"elastic.out(1,.55)"
                    }
                );

            }


            if(
                liked &&
                animate
            ){

                createHeartBurst(post);

            }

        };


    const updateSave =
        (post, saved, animate=true) => {

            const button =
                post.querySelector(
                    "[data-social-save]"
                );

            const icon =
                button?.querySelector("i");

            if(
                !button ||
                !icon
            ){
                return;
            }


            button.classList.toggle(
                "is-saved",
                saved
            );

            button.setAttribute(
                "aria-pressed",
                String(saved)
            );


            icon.classList.toggle(
                "bi-bookmark-fill",
                saved
            );

            icon.classList.toggle(
                "bi-bookmark",
                !saved
            );


            if(
                animate &&
                !reducedMotion &&
                typeof gsap !== "undefined"
            ){

                gsap.killTweensOf(button);

                gsap.fromTo(
                    button,
                    {
                        scale:.72,
                        rotate:saved ? -8 : 5
                    },
                    {
                        scale:1,
                        rotate:0,
                        duration:.58,
                        ease:"elastic.out(1,.48)"
                    }
                );

            }

        };


    posts.forEach(
        post => {

            const likeButton =
                post.querySelector(
                    "[data-social-like]"
                );

            const saveButton =
                post.querySelector(
                    "[data-social-save]"
                );

            const image =
                post.querySelector(
                    ".life-travel-image"
                );


            if(likeButton){

                likeButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const next =
                            !likeButton.classList.contains(
                                "is-liked"
                            );

                        updateLike(
                            post,
                            next,
                            true
                        );

                    }
                );

            }


            if(saveButton){

                saveButton.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const next =
                            !saveButton.classList.contains(
                                "is-saved"
                            );

                        updateSave(
                            post,
                            next,
                            true
                        );

                    }
                );

            }


            post.querySelectorAll(
                '[data-social-action="comment"],' +
                '[data-social-action="share"]'
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        event => {

                            event.preventDefault();
                            event.stopPropagation();

                            if(
                                reducedMotion ||
                                typeof gsap === "undefined"
                            ){
                                return;
                            }


                            gsap.fromTo(
                                button,
                                {
                                    scale:.82,
                                    y:2
                                },
                                {
                                    scale:1,
                                    y:0,
                                    duration:.48,
                                    ease:"elastic.out(1,.5)"
                                }
                            );

                        }
                    );

                }
            );


            if(image){

                image.addEventListener(
                    "dblclick",
                    event => {

                        if(
                            event.target.closest(
                                "button"
                            )
                        ){
                            return;
                        }


                        const alreadyLiked =
                            likeButton?.classList.contains(
                                "is-liked"
                            );


                        if(!alreadyLiked){

                            updateLike(
                                post,
                                true,
                                true
                            );

                        }else{

                            createHeartBurst(post);

                        }

                    }
                );


                image.addEventListener(
                    "pointerdown",
                    event => {

                        if(
                            event.pointerType === "mouse" ||
                            reducedMotion ||
                            typeof gsap === "undefined"
                        ){
                            return;
                        }


                        const ripple =
                            document.createElement(
                                "span"
                            );

                        ripple.className =
                            "life-social-touch-ripple";

                        const rect =
                            image.getBoundingClientRect();

                        ripple.style.left =
                            `${event.clientX - rect.left}px`;

                        ripple.style.top =
                            `${event.clientY - rect.top}px`;

                        image.appendChild(ripple);


                        gsap.fromTo(
                            ripple,
                            {
                                xPercent:-50,
                                yPercent:-50,
                                scale:.2,
                                opacity:.55
                            },
                            {
                                scale:1.8,
                                opacity:0,
                                duration:.52,
                                ease:"power2.out",
                                onComplete:()=>{
                                    ripple.remove();
                                }
                            }
                        );

                    }
                );

            }

        }
    );

}

/* =========================================================
   HERO — RESPONSIVE NAV / IMAGE / NAME
   Tambahan terpisah supaya animasi lama tetap aman.
========================================================= */

function initHeroResponsive(){

    const hero =
        document.querySelector(
            ".hero-reference-style"
        );

    if(!hero){
        return;
    }


    const nav =
        hero.querySelector(
            ".hero-nav-wrap"
        );


    const toggle =
        hero.querySelector(
            ".hero-mobile-toggle"
        );


    const mobileMenu =
        hero.querySelector(
            ".hero-mobile-menu"
        );


    if(!nav){
        return;
    }


    const reduce =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    let isOpen =
        false;


    const setOpenState =
        (open, animate=true) => {

            isOpen =
                Boolean(open);


            if(toggle){

                toggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                toggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Tutup menu"
                        : "Buka menu"
                );

                toggle.classList.toggle(
                    "is-open",
                    isOpen
                );

            }


            if(mobileMenu){

                mobileMenu.setAttribute(
                    "aria-hidden",
                    String(!isOpen)
                );

                mobileMenu.classList.toggle(
                    "is-open",
                    isOpen
                );

            }


            if(
                !mobileMenu ||
                window.innerWidth > 900
            ){
                return;
            }


            if(
                reduce ||
                typeof gsap === "undefined" ||
                !animate
            ){

                mobileMenu.style.opacity =
                    isOpen ? "1" : "0";

                mobileMenu.style.visibility =
                    isOpen ? "visible" : "hidden";

                mobileMenu.style.transform =
                    isOpen
                        ? "translateY(0) scale(1)"
                        : "translateY(-8px) scale(.98)";

                return;

            }


            if(isOpen){

                gsap.to(
                    mobileMenu,
                    {
                        autoAlpha:1,
                        y:0,
                        scale:1,
                        duration:.48,
                        ease:"power4.out",
                        overwrite:"auto"
                    }
                );

            }
            else{

                gsap.to(
                    mobileMenu,
                    {
                        autoAlpha:0,
                        y:-8,
                        scale:.98,
                        duration:.28,
                        ease:"power2.out",
                        overwrite:"auto"
                    }
                );

            }

        };


    if(toggle){

        toggle.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                setOpenState(
                    !isOpen,
                    true
                );

            }
        );

    }


    if(mobileMenu){

        mobileMenu
            .querySelectorAll("a")
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            setOpenState(
                                false,
                                true
                            );

                        }
                    );

                }
            );

    }


    document.addEventListener(
        "pointerdown",
        event => {

            if(
                !isOpen ||
                window.innerWidth > 900
            ){
                return;
            }


            if(
                !nav.contains(
                    event.target
                )
            ){

                setOpenState(
                    false,
                    true
                );

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if(
                event.key === "Escape" &&
                isOpen
            ){

                setOpenState(
                    false,
                    true
                );

            }

        }
    );


    const syncResponsive =
        () => {

            if(
                window.innerWidth > 900
            ){

                if(isOpen){

                    setOpenState(
                        false,
                        false
                    );

                }

                if(mobileMenu){

                    mobileMenu.style.opacity =
                        "";

                    mobileMenu.style.visibility =
                        "";

                    mobileMenu.style.transform =
                        "";

                }

                return;
            }


            setOpenState(
                isOpen,
                false
            );

        };


    window.addEventListener(
        "resize",
        syncResponsive,
        {
            passive:true
        }
    );


    window.addEventListener(
        "orientationchange",
        () => {

            window.setTimeout(
                syncResponsive,
                120
            );

        },
        {
            passive:true
        }
    );


    syncResponsive();


    /*
     * Mobile menu animation berbasis GSAP.
     * Desktop menu tetap memakai navbar lama.
     */
    if(mobileMenu){

        if(
            typeof gsap !== "undefined" &&
            !reduce
        ){

            gsap.set(
                mobileMenu,
                {
                    autoAlpha:0,
                    y:-8,
                    scale:.98
                }
            );

        }

    }

}


/* =========================================================
   TOP 3 FILM — POINTER TILT
   Scoped to [data-film-tilt] only.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const filmCards = [...document.querySelectorAll("[data-film-tilt]")];
  if (!filmCards.length) return;

  const isFinePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (!isFinePointer) return;

  filmCards.forEach((card) => {
    const reset = () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    };

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 7;
      const rotateX = (0.5 - py) * 7;

      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointercancel", reset);
  });
});


/* =========================================================
   CONTACT — SOCIAL TILT / REVEAL
   Additive only.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const contact = document.querySelector("#contact.contact-v2");
  if (!contact) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* Reveal */

  const revealItems = contact.querySelectorAll(
    ".contact-v2-reveal"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {

    revealItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(28px)";
      item.style.transition =
        "opacity .8s cubic-bezier(.2,.7,.2,1), " +
        "transform .8s cubic-bezier(.2,.7,.2,1)";
      item.style.transitionDelay =
        `${Math.min(index * 70, 320)}ms`;
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: .12,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach(item => observer.observe(item));

  } else {

    revealItems.forEach(item => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });

  }


  /* Social card tilt */

  if (!finePointer || reduceMotion) return;

  contact
    .querySelectorAll("[data-contact-social]")
    .forEach(card => {

      let raf = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const render = () => {

        currentX +=
          (targetX - currentX) * .12;

        currentY +=
          (targetY - currentY) * .12;

        card.style.transform =
          `perspective(850px)
           rotateX(${currentY.toFixed(2)}deg)
           rotateY(${currentX.toFixed(2)}deg)
           translateZ(0)`;

        raf = requestAnimationFrame(render);

      };

      const stop = () => {
        if (!raf) return;
        cancelAnimationFrame(raf);
        raf = 0;
      };

      card.addEventListener("pointerenter", () => {
        if (!raf) raf = requestAnimationFrame(render);
        card.style.setProperty("--contact-glow", "1");
      });

      card.addEventListener("pointermove", event => {

        const rect =
          card.getBoundingClientRect();

        const px =
          (event.clientX - rect.left) /
          rect.width;

        const py =
          (event.clientY - rect.top) /
          rect.height;

        targetX =
          (px - .5) * 4.2;

        targetY =
          (.5 - py) * 4.2;

        card.style.setProperty(
          "--contact-spot-x",
          `${px * 100}%`
        );

        card.style.setProperty(
          "--contact-spot-y",
          `${py * 100}%`
        );

      });

      card.addEventListener("pointerleave", () => {

        targetX = 0;
        targetY = 0;

        card.style.setProperty(
          "--contact-glow",
          "0"
        );

        window.setTimeout(() => {

          if (!card.matches(":hover")) {
            stop();
            card.style.transform = "";
          }

        }, 380);

      });

    });

});



/* =========================================================
   LIFE VIDEO PREVIEW
   Video akan bergerak halus saat disentuh/diarahkan.
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    const cards =
        document.querySelectorAll(
            "#life.life-redesign [data-life-video]"
        );

    cards.forEach(card => {

        const video =
            card.querySelector(".life-video");

        if(!video){
            return;
        }

        card.addEventListener(
            "pointerenter",
            () => {

                const promise =
                    video.play();

                if(
                    promise &&
                    typeof promise.catch === "function"
                ){
                    promise.catch(() => {});
                }

            }
        );

        card.addEventListener(
            "pointerleave",
            () => {

                video.pause();
                video.currentTime = 0;

            }
        );

    });

});


/* =========================================================
   LIFE VIDEO 03 — AUTOPLAY SAAT MASUK LAYAR
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    const video =
        document.querySelector(
            "#life.life-redesign .life-video-card-landscape .life-video"
        );

    if(!video){
        return;
    }

    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = () => {
        const promise = video.play();

        if(
            promise &&
            typeof promise.catch === "function"
        ){
            promise.catch(() => {});
        }
    };

    if("IntersectionObserver" in window){

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if(entry.isIntersecting){
                            playVideo();
                        }
                        else{
                            video.pause();
                        }

                    });

                },
                {
                    threshold:.18
                }
            );

        observer.observe(video);

    }
    else{
        playVideo();
    }

});


/* =========================================================
   MUSIC PLAYER FAILSAFE
   Tetap membuat player musik bekerja walau GSAP gagal dimuat.
   Tidak memakai autoplay; lagu diputar setelah klik.
========================================================= */
(function initMusicPlayerFailsafe(){
    "use strict";

    const boot = () => {
        const like = document.querySelector("#love.like-redesign");
        if(!like || like.dataset.musicReady === "true"){
            return;
        }

        const audio = like.querySelector("[data-music-audio]");
        const playButton = like.querySelector("[data-music-play]");
        const prevButton = like.querySelector("[data-music-prev]");
        const nextButton = like.querySelector("[data-music-next]");
        const progress = like.querySelector("[data-music-progress]");
        const timeLabel = like.querySelector("[data-music-time]");
        const currentTimeLabel = like.querySelector(".like-music-time-current");
        const status = like.querySelector("[data-music-status]");
        const title = like.querySelector("[data-music-title]");
        const currentImage = like.querySelector("[data-music-current-image]");
        const disc = like.querySelector("[data-music-disc]");
        const tracks = [...like.querySelectorAll("[data-music-track]")];

        if(!audio || !playButton || !tracks.length){
            return;
        }

        like.dataset.musicReady = "true";

        const icon = playButton.querySelector("i");

        const formatTime = (value) => {
            if(!Number.isFinite(value)){
                return "00:00";
            }

            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60);

            return String(minutes).padStart(2, "0") + ":" +
                   String(seconds).padStart(2, "0");
        };

        const syncUI = () => {
            const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
            const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
            const ratio = duration > 0 ? current / duration : 0;

            if(progress){
                progress.style.width =
                    `${Math.min(100, Math.max(0, ratio * 100))}%`;
            }

            if(currentTimeLabel){
                currentTimeLabel.textContent = formatTime(current);
            }

            if(timeLabel){
                timeLabel.textContent = formatTime(duration);
            }

            if(icon){
                icon.className = audio.paused
                    ? "bi bi-play-fill"
                    : "bi bi-pause-fill";
            }

            if(disc){
                disc.classList.toggle("is-playing", !audio.paused);
            }

            const activeTrack = like.querySelector("[data-music-track].is-active");
            if(activeTrack){
                const activeDisc = activeTrack.querySelector(".like-music-track-disc");
                if(activeDisc){
                    activeDisc.classList.toggle("is-playing", !audio.paused);
                }
            }
        };

        const setActiveTrack = (track, shouldPlay) => {
            if(!track){
                return;
            }

            const src = (track.dataset.src || "").trim();
            const trackTitle = track.dataset.title || "Judul lagu";
            const artist = track.dataset.artist || "Pilihan saya";
            const imageSrc = (track.dataset.musicImage || "").trim();

            if(!src){
                if(status){
                    status.textContent = "File audio belum dipilih.";
                }
                return;
            }

            tracks.forEach(item => {
                item.classList.toggle("is-active", item === track);
            });

            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            audio.src = src;
            audio.load();

            if(title){
                title.textContent = trackTitle;
            }

            if(currentImage && imageSrc){
                currentImage.src = imageSrc;
            }

            if(status){
                status.textContent = `Siap diputar · ${artist}`;
            }

            if(progress){
                progress.style.width = "0%";
            }

            if(currentTimeLabel){
                currentTimeLabel.textContent = "00:00";
            }

            if(timeLabel){
                timeLabel.textContent = "00:00";
            }

            if(shouldPlay){
                const result = audio.play();

                if(result && typeof result.catch === "function"){
                    result.then(() => {
                        if(status){
                            status.textContent = `Sedang diputar · ${artist}`;
                        }
                        syncUI();
                    }).catch(() => {
                        if(status){
                            status.textContent =
                                `Tidak bisa memutar ${src}`;
                        }
                        syncUI();
                    });
                }
            }

            syncUI();
        };

        const getActiveIndex = () => {
            const active = tracks.findIndex(
                track => track.classList.contains("is-active")
            );
            return active >= 0 ? active : 0;
        };

        tracks.forEach(track => {
            track.addEventListener("click", () => {
                setActiveTrack(track, true);
            });
        });

        if(prevButton){
            prevButton.addEventListener("click", () => {
                const index = getActiveIndex();
                const nextIndex = (index - 1 + tracks.length) % tracks.length;
                setActiveTrack(tracks[nextIndex], true);
            });
        }

        if(nextButton){
            nextButton.addEventListener("click", () => {
                const index = getActiveIndex();
                const nextIndex = (index + 1) % tracks.length;
                setActiveTrack(tracks[nextIndex], true);
            });
        }

        playButton.addEventListener("click", async () => {
            const active =
                like.querySelector("[data-music-track].is-active") ||
                tracks[0];

            if(!audio.src){
                setActiveTrack(active, false);
            }

            try{
                if(audio.paused){
                    await audio.play();

                    const artist =
                        active.dataset.artist || "Pilihan saya";

                    if(status){
                        status.textContent =
                            `Sedang diputar · ${artist}`;
                    }
                }else{
                    audio.pause();

                    if(status){
                        status.textContent = "Lagu dijeda.";
                    }
                }
            }catch(error){
                if(status){
                    status.textContent =
                        `File audio belum ditemukan: ${active.dataset.src || ""}`;
                }
            }

            syncUI();
        });

        audio.addEventListener("loadedmetadata", syncUI);
        audio.addEventListener("timeupdate", syncUI);
        audio.addEventListener("play", syncUI);
        audio.addEventListener("pause", syncUI);

        audio.addEventListener("ended", () => {
            const index = getActiveIndex();
            const nextIndex = (index + 1) % tracks.length;
            setActiveTrack(tracks[nextIndex], true);
        });

        audio.addEventListener("error", () => {
            const active =
                like.querySelector("[data-music-track].is-active");

            if(status){
                status.textContent = active?.dataset.src
                    ? `File audio belum ditemukan: ${active.dataset.src}`
                    : "File audio belum dipilih.";
            }

            syncUI();
        });

        const progressTrack = like.querySelector(".like-music-progress");

        if(progressTrack){
            progressTrack.addEventListener("click", (event) => {
                if(!Number.isFinite(audio.duration) || audio.duration <= 0){
                    return;
                }

                const rect = progressTrack.getBoundingClientRect();
                const ratio =
                    Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));

                audio.currentTime = ratio * audio.duration;
                syncUI();
            });
        }

        const firstTrack =
            like.querySelector("[data-music-track].is-active") ||
            tracks[0];

        setActiveTrack(firstTrack, false);
        syncUI();
    };

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", boot, {once:true});
    }else{
        boot();
    }
})();;

/* =========================================================
   FILM TRAILER MODAL — KEEP USER ON THE PORTFOLIO PAGE
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("[data-film-modal]");
  const cards = [...document.querySelectorAll("[data-youtube-id]")];

  if (!modal || !cards.length) return;

  const iframe = modal.querySelector("[data-film-iframe]");
  const title = modal.querySelector("[data-film-modal-title]");
  const closeButtons = [...modal.querySelectorAll("[data-film-close]")];
  const originalTitle = document.title;
  let lastFocused = null;

  const openTrailer = (card) => {
    const videoId = card.dataset.youtubeId;
    const filmTitle = card.dataset.filmTitle || "Trailer";

    if (!videoId || !iframe) return;

    lastFocused = document.activeElement;

    if (title) {
      title.textContent = filmTitle;
    }

    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("film-modal-open");

    window.setTimeout(() => {
      closeButtons.find(button => button.tagName === "BUTTON")?.focus();
    }, 60);
  };

  const closeTrailer = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("film-modal-open");

    if (iframe) {
      iframe.src = "about:blank";
    }

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openTrailer(card);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      closeTrailer();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeTrailer();
    }
  });

  window.addEventListener("pagehide", closeTrailer);
});


/* =========================================================
   MUSIC STORY LYRICS — REAL SYNC
   ---------------------------------------------------------
   Display text: user-provided lyrics.
   Timing: synchronized LRC timestamps from LRCLIB.
   Inspired by open synchronized-lyrics players such as
   Braccato/Lyricer: track currentTime and switch the
   active line smoothly.
========================================================= */
(function initRealMusicStoryLyrics(){

  "use strict";

  const boot = () => {

    const root =
      document.querySelector("#love.like-redesign");

    const lyricNode =
      document.querySelector("#user-provided-music-lyrics");

    if(!root || !lyricNode){
      return;
    }

    const audio =
      root.querySelector("[data-music-audio]");

    const story =
      root.querySelector("[data-music-story]");

    const currentEl =
      root.querySelector("[data-lyric-current]");

    const prevEl =
      root.querySelector("[data-lyric-prev]");

    const nextEl =
      root.querySelector("[data-lyric-next]");

    const counterEl =
      root.querySelector("[data-lyric-counter]");

    const titleEl =
      root.querySelector("[data-lyric-title]");

    const stateEl =
      root.querySelector("[data-lyric-state]");

    const tracks = [
      ...root.querySelectorAll("[data-music-track]")
    ];

    if(
      !audio ||
      !story ||
      !currentEl ||
      !tracks.length
    ){
      return;
    }

    let userLyrics = {};

    try{
      userLyrics =
        JSON.parse(
          lyricNode.textContent || "{}"
        );
    }catch(error){
      userLyrics = {};
    }

    let activeTrack = null;
    let syncedLines = [];
    let alignedLines = [];
    let activeLineIndex = -1;
    let requestId = 0;

    const MANUAL_SYNC_TIMES = {
      1: [1.17, 4.69, 7.66, 9.45, 12.07, 16.23, 19.37, 22.70, 35.72, 38.79, 43.30, 49.26, 55.25, 61.66, 67.24, 74.31, 79.43, 84.96, 87.98, 94.63, 97.64, 102.77, 106.30, 124.73, 129.78, 135.29, 140.33, 145.82]
    };

    const buildManualLines = (trackNumber,userLines) => {
      const times=MANUAL_SYNC_TIMES[trackNumber];
      if(!Array.isArray(times) || !Array.isArray(userLines) || !userLines.length){
        return null;
      }
      const count=Math.min(times.length,userLines.length);
      const lines=[];
      for(let i=0;i<count;i++){
        lines.push({time:Number(times[i]),text:userLines[i]});
      }
      if(userLines.length>count){
        const base=lines.length?lines[lines.length-1].time:0;
        for(let i=count;i<userLines.length;i++){
          lines.push({time:base+(i-count+1)*.75,text:userLines[i]});
        }
      }
      for(let i=1;i<lines.length;i++){
        if(lines[i].time<=lines[i-1].time){
          lines[i].time=lines[i-1].time+.08;
        }
      }
      return lines;
    };

    const cacheKey = track => {

      const title =
        (track?.dataset.title || "").trim();

      const artist =
        (track?.dataset.artist || "").trim();

      return (
        "fahri-music-sync-v4-slower::" +
        title.toLowerCase() +
        "::" +
        artist.toLowerCase()
      );

    };

    const normalise = value =>
      String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[’‘`´]/g, "'")
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9\s']/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const similarity = (a, b) => {

      const left = normalise(a);
      const right = normalise(b);

      if(!left || !right){
        return 0;
      }

      if(left === right){
        return 1;
      }

      const aWords = new Set(left.split(" "));
      const bWords = new Set(right.split(" "));

      let common = 0;

      aWords.forEach(word => {
        if(bWords.has(word)){
          common++;
        }
      });

      const union =
        new Set([
          ...aWords,
          ...bWords
        ]).size;

      const jaccard =
        union
          ? common / union
          : 0;

      const prefix =
        left.startsWith(right) ||
        right.startsWith(left)
          ? .18
          : 0;

      return Math.min(
        1,
        jaccard * .82 + prefix
      );
    };

    const parseLrc = text => {

      const lines = [];

      String(text || "")
        .replace(/\r/g, "")
        .split("\n")
        .forEach(raw => {

          const stamps = [
            ...raw.matchAll(
              /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g
            )
          ];

          if(!stamps.length){
            return;
          }

          const lyricText =
            raw.replace(
              /\[\d{1,3}:\d{2}(?:[.:]\d{1,3})?\]/g,
              ""
            ).trim();

          if(!lyricText){
            return;
          }

          stamps.forEach(stamp => {

            const minutes =
              Number(stamp[1]);

            const seconds =
              Number(stamp[2]);

            const fraction =
              stamp[3]
                ? Number(
                    `0.${stamp[3]}`
                  )
                : 0;

            lines.push({
              time:
                minutes * 60 +
                seconds +
                fraction,
              apiText:lyricText
            });

          });

        });

      return lines.sort(
        (a,b) => a.time - b.time
      );
    };

    const alignUserTextToSync = (
      userLines,
      apiLines,
      duration = 0
    ) => {

      if(
        !Array.isArray(userLines) ||
        !userLines.length
      ){
        return [];
      }

      const usableApiLines =
        Array.isArray(apiLines)
          ? apiLines.filter(line =>
              line &&
              Number.isFinite(Number(line.time)) &&
              Number(line.time) >= 0
            )
          : [];

      /*
       * IMPORTANT:
       * The user-provided lyric list is the source of truth for
       * displayed text. LRCLIB only supplies timing anchors.
       * No user lyric line is discarded.
       */

      if(!usableApiLines.length){

        const totalDuration =
          Number.isFinite(duration) && duration > 0
            ? duration
            : Math.max(1, userLines.length - 1);

        const step =
          userLines.length > 1
            ? totalDuration / (userLines.length - 1)
            : 0;

        return userLines.map((text,index) => ({
          time:index * step,
          text
        }));

      }

      /*
       * Find monotonic text/timestamp anchors. We are allowed to
       * skip an API timestamp, but NEVER a user lyric line.
       */
      const anchors = [];
      let userCursor = 0;

      for(let apiIndex = 0; apiIndex < usableApiLines.length; apiIndex++){

        if(userCursor >= userLines.length){
          break;
        }

        let bestUserIndex = -1;
        let bestScore = -1;

        const lookAhead =
          Math.min(
            userLines.length - 1,
            userCursor + 7
          );

        for(
          let candidate = userCursor;
          candidate <= lookAhead;
          candidate++
        ){

          const score = similarity(
            userLines[candidate],
            usableApiLines[apiIndex].apiText
          );

          if(score > bestScore){
            bestScore = score;
            bestUserIndex = candidate;
          }

        }

        if(
          bestUserIndex >= userCursor &&
          bestScore >= .28
        ){

          anchors.push({
            userIndex:bestUserIndex,
            time:Number(usableApiLines[apiIndex].time)
          });

          userCursor = bestUserIndex + 1;

        }

      }

      const cleanAnchors = [];
      for(const anchor of anchors){

        const previous =
          cleanAnchors[cleanAnchors.length - 1];

        if(
          previous &&
          anchor.userIndex <= previous.userIndex
        ){
          continue;
        }

        if(
          previous &&
          anchor.time < previous.time
        ){
          anchor.time = previous.time;
        }

        cleanAnchors.push(anchor);

      }

      const result = userLines.map(text => ({
        time:0,
        text
      }));

      if(!cleanAnchors.length){

        const totalDuration =
          Number.isFinite(duration) && duration > 0
            ? duration
            : Math.max(
                1,
                Number(
                  usableApiLines[usableApiLines.length - 1].time
                )
              );

        const step =
          userLines.length > 1
            ? totalDuration / (userLines.length - 1)
            : 0;

        result.forEach((line,index) => {
          line.time = index * step;
        });

      }else{

        const first = cleanAnchors[0];

        // User lines before the first real API anchor.
        if(first.userIndex === 0){

          result[0].time = Math.max(0, first.time);

        }else{

          const count = first.userIndex;

          for(let i = 0; i <= count; i++){

            result[i].time =
              first.time * (i / count);

          }

        }

        // User lines between real API anchors.
        for(
          let a = 0;
          a < cleanAnchors.length - 1;
          a++
        ){

          const current = cleanAnchors[a];
          const next = cleanAnchors[a + 1];

          const gap =
            next.userIndex - current.userIndex;

          if(gap <= 0){
            continue;
          }

          for(let offset = 0; offset <= gap; offset++){

            const index =
              current.userIndex + offset;

            const ratio =
              offset / gap;

            result[index].time =
              current.time +
              (next.time - current.time) * ratio;

          }

        }

        // User lines after the last API anchor.
        const last =
          cleanAnchors[cleanAnchors.length - 1];

        const trailingCount =
          userLines.length - 1 - last.userIndex;

        if(trailingCount > 0){

          const fallbackEnd =
            Number.isFinite(duration) &&
            duration > last.time
              ? duration
              : Math.max(
                  last.time + trailingCount * 1.8,
                  Number(
                    usableApiLines[
                      usableApiLines.length - 1
                    ]?.time || last.time
                  )
                );

          const span =
            Math.max(
              0,
              fallbackEnd - last.time
            );

          for(
            let offset = 1;
            offset <= trailingCount;
            offset++
          ){

            const index =
              last.userIndex + offset;

            result[index].time =
              last.time +
              span *
              (offset / trailingCount);

          }

        }

      }

      /*
       * Make every timestamp strictly increasing.
       * This prevents renderAtTime() from jumping past a line
       * when two lines happen to receive the same timestamp.
       */
      const minimumGap = .08;

      for(let i = 1; i < result.length; i++){

        if(
          !Number.isFinite(result[i].time) ||
          result[i].time <= result[i - 1].time
        ){

          result[i].time =
            result[i - 1].time + minimumGap;

        }

      }

      /*
       * If interpolation overshoots the audio duration, compress
       * the generated timeline while preserving every lyric line
       * and its order.
       */
      if(
        Number.isFinite(duration) &&
        duration > 0 &&
        result.length > 1 &&
        result[result.length - 1].time > duration
      ){

        const startTime =
          Math.max(0, result[0].time);

        const oldEnd =
          result[result.length - 1].time;

        const availableSpan =
          Math.max(
            minimumGap * (result.length - 1),
            duration - startTime
          );

        const oldSpan =
          Math.max(.001, oldEnd - startTime);

        for(let i = 0; i < result.length; i++){

          const ratio =
            Math.max(
              0,
              Math.min(
                1,
                (result[i].time - startTime) / oldSpan
              )
            );

          result[i].time =
            startTime +
            availableSpan * ratio;

        }

        for(let i = 1; i < result.length; i++){

          if(
            result[i].time <=
            result[i - 1].time
          ){

            result[i].time =
              result[i - 1].time + minimumGap;

          }

        }

      }

      return result;

    };

    const renderEmpty = (
      title,
      state="PAUSED"
    ) => {

      if(prevEl){
        prevEl.textContent = "...";
      }

      if(currentEl){
        currentEl.classList.remove(
          "is-changing"
        );

        currentEl.textContent = "...";
      }

      if(nextEl){
        nextEl.textContent = "...";
      }

      if(counterEl){
        counterEl.textContent = "...";
      }

      if(titleEl){
        titleEl.textContent =
          title || "...";
      }

      if(stateEl){
        stateEl.textContent = state;
      }

      story.dataset.hasLyrics = "false";
    };

    const fetchRealSyncedLyrics = async (
      track,
      duration
    ) => {

      if(
        !track ||
        !Number.isFinite(duration) ||
        duration <= 0
      ){
        return null;
      }

      const title =
        (track.dataset.title || "").trim();

      const artist =
        (track.dataset.artist || "").trim();

      if(!title || !artist){
        return null;
      }

      const key =
        cacheKey(track) +
        "::" +
        Math.round(duration);

      try{

        const cached =
          sessionStorage.getItem(key);

        if(cached){
          const parsed =
            JSON.parse(cached);

          if(
            parsed &&
            Array.isArray(parsed.lines)
          ){
            return parsed.lines;
          }

        }

      }catch(error){}

      const params =
        new URLSearchParams({
          track_name:title,
          artist_name:artist,
          duration:String(
            Number(duration.toFixed(2))
          )
        });

      // LRCLIB recommends exact matching with duration.
      const endpoint =
        "https://lrclib.net/api/get?" +
        params.toString();

      try{

        const response =
          await fetch(
            endpoint,
            {
              method:"GET",
              headers:{
                "X-User-Agent":
                  "FahriPortfolioMusic/1.0"
              },
              cache:"no-store"
            }
          );

        if(response.ok){

          const data =
            await response.json();

          if(
            data &&
            typeof data.syncedLyrics ===
              "string" &&
            data.syncedLyrics.trim()
          ){

            const lines =
              parseLrc(
                data.syncedLyrics
              );

            if(lines.length){

              try{
                sessionStorage.setItem(
                  key,
                  JSON.stringify({
                    lines,
                    fetchedAt:Date.now()
                  })
                );
              }catch(error){}

              return lines;
            }

          }

        }

      }catch(error){
        /* Continue to search fallback below. */
      }

      // Search fallback for tracks with metadata variants.
      try{

        const searchParams =
          new URLSearchParams({
            track_name:title,
            artist_name:artist
          });

        const response =
          await fetch(
            "https://lrclib.net/api/search?" +
            searchParams.toString(),
            {
              method:"GET",
              headers:{
                "X-User-Agent":
                  "FahriPortfolioMusic/1.0"
              },
              cache:"no-store"
            }
          );

        if(!response.ok){
          return null;
        }

        const results =
          await response.json();

        if(!Array.isArray(results)){
          return null;
        }

        const scored =
          results
            .filter(item =>
              item &&
              typeof item.syncedLyrics ===
                "string" &&
              item.syncedLyrics.trim()
            )
            .map(item => {

              const titleScore =
                similarity(
                  title,
                  item.trackName
                );

              const artistScore =
                similarity(
                  artist,
                  item.artistName
                );

              const durationScore =
                Number.isFinite(
                  Number(item.duration)
                )
                  ? Math.max(
                      0,
                      1 -
                      Math.abs(
                        Number(item.duration) -
                        duration
                      ) / 30
                    )
                  : 0;

              return {
                item,
                score:
                  titleScore * .48 +
                  artistScore * .32 +
                  durationScore * .20
              };

            })
            .sort(
              (a,b) =>
                b.score - a.score
            );

        const best =
          scored[0]?.item;

        if(
          best &&
          typeof best.syncedLyrics ===
            "string"
        ){

          const lines =
            parseLrc(
              best.syncedLyrics
            );

          if(lines.length){

            try{
              sessionStorage.setItem(
                key,
                JSON.stringify({
                  lines,
                  fetchedAt:Date.now()
                })
              );
            }catch(error){}

            return lines;
          }

        }

      }catch(error){}

      return null;
    };

    const renderAtTime = () => {

      if(!activeTrack){
        return;
      }

      const title =
        activeTrack.dataset.title ||
        "Judul lagu";

      // Explicit user requirement: track 09 is ...
      if(
        activeTrack.dataset.title
          ?.toLowerCase()
          .includes("love in the air")
      ){

        renderEmpty(
          title,
          "NO LYRICS"
        );

        return;
      }

      if(!alignedLines.length){

        renderEmpty(
          title,
          !audio.paused
            ? "SYNCING"
            : "PAUSED"
        );

        return;
      }

      let index = -1;

      for(
        let i = 0;
        i < alignedLines.length;
        i++
      ){

        if(
          audio.currentTime >=
          alignedLines[i].time
        ){
          index = i;
        }else{
          break;
        }

      }

      if(audio.paused){
        index = -1;
      }

      if(index < 0){

        renderEmpty(
          title,
          audio.paused
            ? "PAUSED"
            : "SYNCING"
        );

        return;
      }

      const line =
        alignedLines[index];

      if(
        currentEl.textContent !==
        line.text
      ){

        currentEl.classList.remove(
          "is-changing"
        );

        void currentEl.offsetWidth;

        currentEl.textContent =
          line.text;

        currentEl.classList.add(
          "is-changing"
        );

      }

      if(prevEl){
        prevEl.textContent =
          alignedLines[index - 1]?.text ||
          "...";
      }

      if(nextEl){
        nextEl.textContent =
          alignedLines[index + 1]?.text ||
          "...";
      }

      if(counterEl){
        counterEl.textContent =
          `${String(index + 1).padStart(2,"0")} / ${String(alignedLines.length).padStart(2,"0")}`;
      }

      if(titleEl){
        titleEl.textContent = title;
      }

      if(stateEl){
        stateEl.textContent = "PLAYING";
      }

      story.dataset.hasLyrics = "true";
      story.dataset.playing = "true";
      activeLineIndex = index;

    };

    const prepareTrack = async track => {

      if(!track){
        return;
      }

      const token =
        ++requestId;

      activeTrack = track;
      alignedLines = [];
      syncedLines = [];
      activeLineIndex = -1;

      const title =
        track.dataset.title ||
        "Judul lagu";

      if(titleEl){
        titleEl.textContent = title;
      }

      // Love in the air => "..."
      if(
        title
          .toLowerCase()
          .includes("love in the air")
      ){

        renderEmpty(
          title,
          "NO LYRICS"
        );

        return;
      }

      // Wait for metadata if needed.
      const duration =
        Number.isFinite(audio.duration)
          ? audio.duration
          : 0;

      if(duration <= 0){

        renderEmpty(
          title,
          "LOADING"
        );

        return;
      }

      const nMatch =
        (track.dataset.src || "")
          .match(/lagu(\d+)\.mp3/i);

      const n =
        nMatch
          ? Number(nMatch[1])
          : 1;

      const userLines =
        Array.isArray(userLyrics[n])
          ? userLyrics[n]
          : [];

      if(!userLines.length){

        renderEmpty(
          title,
          "NO LYRICS"
        );

        return;
      }

      const manualLines = buildManualLines(n,userLines);

      if(manualLines){
        syncedLines = manualLines;
        alignedLines = manualLines;
        if(token !== requestId){
          return;
        }
        renderAtTime();
        return;
      }

      const apiLines =
        await fetchRealSyncedLyrics(
          track,
          duration
        );

      if(token !== requestId){
        return;
      }

      if(!apiLines || !apiLines.length){
        renderEmpty(title,"SYNC UNAVAILABLE");
        return;
      }

      syncedLines = apiLines;
      alignedLines = alignUserTextToSync(userLines,apiLines,duration);

      if(!alignedLines.length){

        renderEmpty(
          title,
          "SYNC UNAVAILABLE"
        );

        return;
      }

      renderAtTime();

    };

    const syncSelectedTrack = () => {

      const selected =
        root.querySelector(
          "[data-music-track].is-active"
        );

      if(
        selected &&
        selected !== activeTrack
      ){
        prepareTrack(selected);
      }

    };

    audio.addEventListener(
      "loadedmetadata",
      () => {
        const selected =
          root.querySelector(
            "[data-music-track].is-active"
          );

        if(selected){
          prepareTrack(selected);
        }
      }
    );

    audio.addEventListener(
      "timeupdate",
      () => {
        syncSelectedTrack();
        renderAtTime();
      }
    );

    audio.addEventListener(
      "play",
      () => {
        renderAtTime();
      }
    );

    audio.addEventListener(
      "pause",
      () => {
        renderAtTime();
      }
    );

    audio.addEventListener(
      "ended",
      () => {
        renderAtTime();
      }
    );

    tracks.forEach(track => {
      track.addEventListener(
        "click",
        () => {
          setTimeout(
            () => {
              syncSelectedTrack();
              renderAtTime();
            },
            40
          );
        }
      );
    });

    const observer =
      new MutationObserver(
        () => syncSelectedTrack()
      );

    tracks.forEach(track => {
      observer.observe(
        track,
        {
          attributes:true,
          attributeFilter:["class"]
        }
      );
    });

    const first =
      root.querySelector(
        "[data-music-track].is-active"
      ) || tracks[0];

    if(first){
      activeTrack = first;
      renderEmpty(
        first.dataset.title ||
        "Staying",
        "PAUSED"
      );

      // Delay a bit so the existing player has set metadata.
      setTimeout(
        () => prepareTrack(first),
        120
      );
    }

  };

  if(
    document.readyState ===
    "loading"
  ){
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {once:true}
    );
  }else{
    boot();
  }

})();

