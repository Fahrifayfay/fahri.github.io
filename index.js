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

        initLifeAnimation();

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
                xPercent:-50,
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
                    xPercent:-50,
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


            const getNavbarWideWidth=
                ()=>window.innerWidth<=900
                    ? Math.max(
                        250,
                        window.innerWidth-24
                    )
                    : Math.min(
                        1080,
                        window.innerWidth-40
                    );


            const getNavbarSmallWidth=
                ()=>window.innerWidth<=900
                    ? Math.max(
                        232,
                        window.innerWidth-34
                    )
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
                    borderRadius:"999px"
                }
            );


            const setNavbarScrollState=
                progress=>{

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
                                y:0,
                                scale:1,
                                opacity:1,
                                filter:"blur(0px)",
                                clipPath:
                                    "inset(0 0 0% 0 round 999px)"
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
                                    yPercent:5,
                                    ease:"none",

                                    scrollTrigger:{
                                        trigger:card,
                                        start:"top bottom",
                                        end:"bottom top",
                                        scrub:true
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
                                y:-7,
                                duration:.35,
                                ease:"power3.out"
                            }
                        );


                        gsap.to(
                            images,
                            {
                                scale:1.04,
                                duration:.65,
                                ease:"power3.out"
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
                                y:0,
                                duration:.45,
                                ease:"power3.out"
                            }
                        );


                        gsap.to(
                            images,
                            {
                                scale:1,
                                duration:.65,
                                ease:"power3.out"
                            }
                        );

                    }
                );

            }
        );

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

                ScrollTrigger.create({

                    trigger:section,

                    start:"top 46%",

                    end:"bottom 46%",

                    onEnter:()=>{

                        setActiveNav(
                            section.id
                        );

                    },

                    onEnterBack:()=>{

                        setActiveNav(
                            section.id
                        );

                    }

                });

            }
        );


        function setActiveNav(id){

            navLinks.forEach(
                link=>{

                    link.classList.toggle(
                        "is-active",

                        link.getAttribute(
                            "href"
                        )===`#${id}`
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
                            !selector ||
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
                                    offset:-70,
                                    duration:1.15
                                }
                            );

                        }
                        else{

                            target.scrollIntoView(
                                {
                                    behavior:"smooth",
                                    block:"start"
                                }
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


        const stage=
            stackLab.querySelector(
                "[data-stack-stage]"
            );


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


        let activeIndex=0;


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


                activeIndex=
                    index;


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


            const directory=
                document.querySelector(
                    ".stack-lab-directory"
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


                const frame=
                    stageSection.querySelector(
                        ".stack-lab-stage"
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

    if(
        typeof gsap==="undefined" ||
        typeof ScrollTrigger==="undefined"
    ){
        return;
    }


    const q =
        (selector, root=document) =>
            root.querySelector(selector);


    const qa =
        (selector, root=document) =>
            [...root.querySelectorAll(selector)];


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const mobile =
        window.matchMedia(
            "(max-width: 900px)"
        ).matches;


    const life =
        q("#life");


    if(!life){
        return;
    }


    /* =====================================================
       LATAR
    ===================================================== */

    const bgSky =
        q(".life-bg-sky", life);


    const bgMountainBack =
        q(".life-bg-mountain-back", life);


    const bgMountainFront =
        q(".life-bg-mountain-front", life);


    const bgWaterfall =
        q(".life-bg-waterfall", life);


    const mistA =
        q(".life-bg-mist-a", life);


    const mistB =
        q(".life-bg-mist-b", life);


    const glowA =
        q(".life-bg-glow-a", life);


    const glowB =
        q(".life-bg-glow-b", life);


    const orbs =
        qa(".life-bg-orb", life);


    const particles =
        qa(".life-particle", life);


    /* =====================================================
       PEMBUKA
    ===================================================== */

    const intro =
        q(".life-intro", life);


    const introOrbit =
        q(".life-orbit", life);


    const introTitle =
        q(".life-intro-title", life);


    const introCopy =
        q(".life-intro-copy", life);


    /* =====================================================
       PERJALANAN
    ===================================================== */

    const travel =
        q(".life-travel", life);


    const travelHead =
        q(
            ".life-travel .life-chapter-head",
            life
        );


    const route =
        q(".life-route", life);


    const routeLine =
        q(".life-route-line", life);


    const routeDots =
        qa(".life-route-dot", life);


    const travelCards =
        qa(
            "[data-travel-card]",
            life
        );


    const travelNote =
        q(".life-travel-note", life);


    const travelFloatingIcon =
        q(
            ".life-travel-floating-icon",
            life
        );


    const travelDoodles =
        qa(
            ".life-travel-doodle",
            life
        );


    const travelImages =
        qa(
            ".life-travel-image img",
            life
        );


    const ripples =
        qa(
            ".life-water-ripple",
            life
        );


    /* =====================================================
       PEMISAH
    ===================================================== */

    const divider =
        q(
            ".life-divider",
            life
        );


    /* =====================================================
       PERMAINAN
    ===================================================== */

    const gaming =
        q(
            ".life-gaming",
            life
        );


    const gamingHead =
        q(
            ".life-gaming-head",
            life
        );


    const gameWindow =
        q(
            ".life-game-window",
            life
        );


    const gameTrack =
        q(
            "[data-game-track]",
            life
        );


    const gameCards =
        qa(
            "[data-game-card]",
            life
        );


    const prevButton =
        q(
            "[data-game-prev]",
            life
        );


    const nextButton =
        q(
            "[data-game-next]",
            life
        );


    const progress =
        q(
            "[data-game-progress]",
            life
        );


    const counter =
        q(
            "[data-game-counter]",
            life
        );


    const gameStatusIcon =
        q(
            ".life-game-status-icon",
            life
        );


    /* =====================================================
       PENUTUP
    ===================================================== */

    const closing =
        q(
            ".life-closing",
            life
        );


    const closingIcon =
        q(
            ".life-closing-icon",
            life
        );


    const closingTitle =
        q(
            ".life-closing h3",
            life
        );


    const closingText =
        q(
            ".life-closing p",
            life
        );


    /* =====================================================
       PENGAMAN GAMBAR
    ===================================================== */

    travelImages.forEach(
        image => {

            const fallback =
                image.dataset.lifeFallback;


            if(!fallback){
                return;
            }


            image.addEventListener(
                "error",
                () => {

                    if(
                        image.dataset.fallbackUsed ===
                        "1"
                    ){
                        return;
                    }


                    image.dataset.fallbackUsed =
                        "1";


                    image.src =
                        fallback;

                }
            );

        }
    );


    qa(
        ".life-game-image img",
        life
    )
    .forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    if(
                        image.dataset.lifeFallback &&
                        image.dataset.fallbackUsed !==
                        "1"
                    ){

                        image.dataset.fallbackUsed =
                            "1";


                        image.src =
                            image.dataset.lifeFallback;

                        return;

                    }


                    image.classList.add(
                        "life-image-missing"
                    );

                }
            );

        }
    );


    /* =====================================================
       STATE AWAL ANIMASI
    ===================================================== */

    if(!reducedMotion){

        gsap.set(
            [
                introOrbit,
                introTitle,
                introCopy
            ]
            .filter(Boolean),
            {
                autoAlpha:0,
                y:42
            }
        );


        gsap.set(
            travelHead,
            {
                autoAlpha:0,
                y:45
            }
        );


        gsap.set(
            routeLine,
            {
                scaleY:0,
                transformOrigin:
                    "top center"
            }
        );


        gsap.set(
            routeDots,
            {
                autoAlpha:0,
                scale:.35
            }
        );


        gsap.set(
            travelCards,
            {
                autoAlpha:0,
                y:80,
                scale:.92
            }
        );


        gsap.set(
            travelNote,
            {
                autoAlpha:0,
                y:45,
                rotate:-5,
                scale:.9
            }
        );


        gsap.set(
            travelFloatingIcon,
            {
                autoAlpha:0,
                y:35,
                scale:.65,
                rotate:-15
            }
        );


        gsap.set(
            travelDoodles,
            {
                autoAlpha:0,
                scale:.5,
                rotate:-15
            }
        );


        gsap.set(
            gamingHead,
            {
                autoAlpha:0,
                y:45
            }
        );


        gsap.set(
            gameCards,
            {
                autoAlpha:0,
                y:65,
                scale:.93
            }
        );


        gsap.set(
            gameStatusIcon,
            {
                autoAlpha:0,
                scale:.65
            }
        );


        gsap.set(
            closing,
            {
                autoAlpha:0,
                y:45
            }
        );

    }


    /* =====================================================
       GERAKAN LATAR TERUS-MENERUS
    ===================================================== */

    if(!reducedMotion){

        if(bgSky){

            gsap.to(
                bgSky,
                {
                    x:18,
                    y:-8,
                    scale:1.04,
                    duration:11,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(bgMountainBack){

            gsap.to(
                bgMountainBack,
                {
                    x:28,
                    y:-8,
                    duration:13,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(bgMountainFront){

            gsap.to(
                bgMountainFront,
                {
                    x:-18,
                    y:5,
                    duration:15,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(bgWaterfall){

            gsap.to(
                bgWaterfall,
                {
                    x:8,
                    skewX:-2,
                    opacity:.34,
                    duration:4.5,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(mistA){

            gsap.to(
                mistA,
                {
                    x:90,
                    y:-22,
                    scale:1.1,
                    duration:10,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut"
                }
            );

        }


        if(mistB){

            gsap.to(
                mistB,
                {
                    x:-110,
                    y:20,
                    scale:1.13,
                    duration:13,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut",
                    delay:1.4
                }
            );

        }


        if(glowA){

            gsap.to(
                glowA,
                {
                    scale:1.15,
                    opacity:.75,
                    duration:6,
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
                    scale:.9,
                    opacity:.7,
                    duration:7,
                    repeat:-1,
                    yoyo:true,
                    ease:"sine.inOut",
                    delay:1.2
                }
            );

        }


        orbs.forEach(
            (
                orb,
                index
            ) => {

                gsap.to(
                    orb,
                    {
                        x:
                            index === 0
                                ? 45
                                : -25,

                        y:
                            index === 0
                                ? -28
                                : 24,

                        duration:
                            6.5 +
                            index,

                        repeat:-1,

                        yoyo:true,

                        ease:
                            "sine.inOut",

                        delay:
                            index * .6

                    }
                );

            }
        );


        particles.forEach(
            (
                particle,
                index
            ) => {

                gsap.to(
                    particle,
                    {
                        x:
                            index % 2
                                ? -18
                                : 18,

                        y:
                            index % 2
                                ? 20
                                : -24,

                        opacity:.24,

                        duration:
                            3.2 +
                            index * .35,

                        repeat:-1,

                        yoyo:true,

                        ease:
                            "sine.inOut",

                        delay:
                            index * .25

                    }
                );

            }
        );


        ripples.forEach(
            (
                ripple,
                index
            ) => {

                gsap.to(
                    ripple,
                    {
                        scale:1.65,
                        opacity:0,
                        duration:
                            2.5 +
                            index * .65,
                        repeat:-1,
                        ease:"sine.out",
                        delay:
                            index * .8
                    }
                );

            }
        );

    }


    /* =====================================================
       PARALLAX MOUSE
    ===================================================== */

    if(
        !mobile &&
        !reducedMotion
    ){

        life.addEventListener(
            "pointermove",
            event => {

                const rect =
                    life.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                gsap.to(
                    bgSky,
                    {
                        x:x * 20,
                        y:y * 12,
                        duration:1.1,
                        ease:"power3.out",
                        overwrite:"auto"
                    }
                );


                gsap.to(
                    bgMountainBack,
                    {
                        x:x * 30,
                        y:y * 12,
                        duration:1.2,
                        ease:"power3.out",
                        overwrite:"auto"
                    }
                );


                gsap.to(
                    bgMountainFront,
                    {
                        x:x * -20,
                        y:y * -8,
                        duration:1.35,
                        ease:"power3.out",
                        overwrite:"auto"
                    }
                );


                gsap.to(
                    mistA,
                    {
                        x:x * 42,
                        y:y * 18,
                        duration:1.25,
                        ease:"power3.out",
                        overwrite:"auto"
                    }
                );


                gsap.to(
                    mistB,
                    {
                        x:x * -35,
                        y:y * -15,
                        duration:1.3,
                        ease:"power3.out",
                        overwrite:"auto"
                    }
                );


                if(introOrbit){

                    gsap.to(
                        introOrbit,
                        {
                            x:x * 11,
                            y:y * 8,
                            duration:.8,
                            ease:"power3.out",
                            overwrite:"auto"
                        }
                    );

                }


                travelCards.forEach(
                    (
                        card,
                        index
                    ) => {

                        gsap.to(
                            card,
                            {
                                x:
                                    x *
                                    (
                                        index %
                                        2
                                            ? 7
                                            : -5
                                    ),

                                y:y * 4,

                                duration:.7,

                                ease:
                                    "power3.out",

                                overwrite:
                                    "auto"

                            }
                        );

                    }
                );

            }
        );


        life.addEventListener(
            "pointerleave",
            () => {

                [
                    bgSky,
                    bgMountainBack,
                    bgMountainFront,
                    mistA,
                    mistB,
                    introOrbit
                ]
                .filter(Boolean)
                .forEach(
                    element => {

                        gsap.to(
                            element,
                            {
                                x:0,
                                y:0,
                                duration:1.1,
                                ease:
                                    "power3.out"
                            }
                        );

                    }
                );


                travelCards.forEach(
                    card => {

                        gsap.to(
                            card,
                            {
                                x:0,
                                y:0,
                                duration:.8,
                                ease:
                                    "power3.out"
                            }
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       ANIMASI PERJALANAN
    ===================================================== */

    if(travel){

        const timeline =
            gsap.timeline({
                paused:true,
                defaults:{
                    overwrite:"auto"
                }
            });


        timeline.to(
            [
                introOrbit,
                introTitle,
                introCopy
            ]
            .filter(Boolean),
            {
                autoAlpha:1,
                y:0,
                duration:1,
                stagger:.11,
                ease:"power4.out"
            },
            0
        );


        if(travelHead){

            timeline.to(
                travelHead,
                {
                    autoAlpha:1,
                    y:0,
                    duration:1.1,
                    ease:"power4.out"
                },
                .2
            );

        }


        if(routeLine){

            timeline.to(
                routeLine,
                {
                    scaleY:1,
                    duration:1.3,
                    ease:"power3.inOut"
                },
                .32
            );

        }


        if(routeDots.length){

            timeline.to(
                routeDots,
                {
                    autoAlpha:1,
                    scale:1,
                    duration:.62,
                    stagger:.12,
                    ease:"back.out(1.7)"
                },
                .52
            );

        }


        if(travelCards.length){

            timeline.to(
                travelCards,
                {
                    autoAlpha:1,
                    y:0,
                    scale:1,
                    duration:1.2,
                    stagger:.18,
                    ease:"power4.out"
                },
                .42
            );

        }


        if(travelNote){

            timeline.to(
                travelNote,
                {
                    autoAlpha:1,
                    y:0,
                    rotate:-4,
                    scale:1,
                    duration:1,
                    ease:"back.out(1.3)"
                },
                1
            );

        }


        if(travelFloatingIcon){

            timeline.to(
                travelFloatingIcon,
                {
                    autoAlpha:1,
                    y:0,
                    rotate:8,
                    scale:1,
                    duration:.85,
                    ease:"back.out(1.6)"
                },
                1.08
            );

        }


        if(travelDoodles.length){

            timeline.to(
                travelDoodles,
                {
                    autoAlpha:1,
                    scale:1,
                    rotate:0,
                    duration:.65,
                    stagger:.1,
                    ease:"back.out(1.8)"
                },
                .9
            );

        }


        ScrollTrigger.create({

            trigger:
                travel,

            start:
                "top 82%",

            end:
                "bottom 12%",

            onEnter:
                () => {

                    timeline
                        .pause(0)
                        .restart();

                },

            onEnterBack:
                () => {

                    timeline
                        .pause(0)
                        .restart();

                },

            onLeave:
                () => {

                    timeline.pause(0);

                },

            onLeaveBack:
                () => {

                    timeline.pause(0);

                }

        });

    }


    /* =====================================================
       PARALLAX FOTO PERJALANAN
    ===================================================== */

    if(
        !reducedMotion &&
        travelImages.length
    ){

        travelImages.forEach(
            image => {

                const card =
                    image.closest(
                        ".life-travel-card"
                    );


                if(!card){
                    return;
                }


                gsap.fromTo(
                    image,
                    {
                        yPercent:5,
                        scale:1.08
                    },
                    {
                        yPercent:-5,
                        scale:1.03,
                        ease:"none",

                        scrollTrigger:{
                            trigger:card,
                            start:"top bottom",
                            end:"bottom top",
                            scrub:1.15
                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       TILT KARTU PERJALANAN
    ===================================================== */

    if(
        !mobile &&
        !reducedMotion
    ){

        travelCards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            .5;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            .5;


                        gsap.to(
                            card,
                            {
                                rotateY:
                                    x * 3.5,

                                rotateX:
                                    -y * 3.5,

                                duration:.42,

                                ease:
                                    "power3.out",

                                overwrite:
                                    "auto"
                            }
                        );

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        gsap.to(
                            card,
                            {
                                rotateX:0,
                                rotateY:0,
                                duration:.65,
                                ease:
                                    "power3.out"
                            }
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       GAMING CAROUSEL
    ===================================================== */

    let gameIndex =
        0;


    let dragging =
        false;


    let dragStartX =
        0;


    let dragStartTranslate =
        0;


    const getGameStep =
        () => {

            if(
                !gameCards.length ||
                !gameTrack
            ){
                return 0;
            }


            const first =
                gameCards[0];


            const rect =
                first.getBoundingClientRect();


            const gap =
                parseFloat(
                    getComputedStyle(
                        gameTrack
                    ).gap
                ) || 28;


            return (
                rect.width +
                gap
            );

        };


    const getMaxGame =
        () => {

            if(
                !gameTrack ||
                !gameWindow
            ){
                return 0;
            }


            const overflow =
                Math.max(
                    0,
                    gameTrack.scrollWidth -
                    gameWindow.clientWidth
                );


            const step =
                getGameStep();


            if(!step){
                return 0;
            }


            return Math.max(
                0,
                Math.ceil(
                    overflow /
                    step
                )
            );

        };


    const renderGame =
        (
            animate=true
        ) => {

            if(!gameTrack){
                return;
            }


            const max =
                getMaxGame();


            gameIndex =
                Math.max(
                    0,
                    Math.min(
                        max,
                        gameIndex
                    )
                );


            const step =
                getGameStep();


            const x =
                -(gameIndex * step);


            if(animate){

                gsap.to(
                    gameTrack,
                    {
                        x:x,
                        duration:.9,
                        ease:"power4.out",
                        overwrite:"auto"
                    }
                );

            }
            else{

                gsap.set(
                    gameTrack,
                    {
                        x:x
                    }
                );

            }


            if(progress){

                const percentage =
                    max === 0
                        ? 50
                        : 25 +
                          (
                            gameIndex /
                            Math.max(
                                1,
                                max
                            )
                          ) *
                          50;


                progress.style.width =
                    `${percentage}%`;

            }


            if(counter){

                counter.textContent =
                    `${String(
                        gameIndex + 1
                    ).padStart(
                        2,
                        "0"
                    )} / ${String(
                        gameCards.length
                    ).padStart(
                        2,
                        "0"
                    )}`;

            }

        };


    if(prevButton){

        prevButton.addEventListener(
            "click",
            () => {

                gameIndex =
                    Math.max(
                        0,
                        gameIndex - 1
                    );


                renderGame(true);

            }
        );

    }


    if(nextButton){

        nextButton.addEventListener(
            "click",
            () => {

                const max =
                    getMaxGame();


                gameIndex =
                    Math.min(
                        max,
                        gameIndex + 1
                    );


                renderGame(true);

            }
        );

    }


    /* =====================================================
       DRAG GAMING
    ===================================================== */

    if(gameTrack){

        gameTrack.addEventListener(
            "pointerdown",
            event => {

                dragging =
                    true;


                dragStartX =
                    event.clientX;


                const transform =
                    getComputedStyle(
                        gameTrack
                    ).transform;


                const matrix =
                    transform !== "none"
                        ? new DOMMatrix(
                            transform
                        )
                        : null;


                dragStartTranslate =
                    matrix
                        ? matrix.m41
                        : 0;


                gameTrack.classList.add(
                    "is-dragging"
                );


                try{

                    gameTrack.setPointerCapture(
                        event.pointerId
                    );

                }
                catch(error){}

            }
        );


        gameTrack.addEventListener(
            "pointermove",
            event => {

                if(!dragging){
                    return;
                }


                const step =
                    getGameStep();


                const max =
                    getMaxGame();


                const minX =
                    -(max * step);


                let x =
                    dragStartTranslate +
                    (
                        event.clientX -
                        dragStartX
                    );


                x =
                    Math.max(
                        minX - 65,
                        Math.min(
                            65,
                            x
                        )
                    );


                gsap.set(
                    gameTrack,
                    {
                        x:x
                    }
                );

            }
        );


        const finishDrag =
            event => {

                if(!dragging){
                    return;
                }


                dragging =
                    false;


                gameTrack.classList.remove(
                    "is-dragging"
                );


                const step =
                    getGameStep();


                if(step){

                    const transform =
                        getComputedStyle(
                            gameTrack
                        ).transform;


                    const matrix =
                        transform !==
                        "none"
                            ? new DOMMatrix(
                                transform
                            )
                            : null;


                    const currentX =
                        matrix
                            ? matrix.m41
                            : 0;


                    gameIndex =
                        Math.round(
                            Math.abs(
                                currentX
                            ) /
                            step
                        );

                }


                renderGame(true);


                try{

                    gameTrack.releasePointerCapture(
                        event.pointerId
                    );

                }
                catch(error){}

            };


        gameTrack.addEventListener(
            "pointerup",
            finishDrag
        );


        gameTrack.addEventListener(
            "pointercancel",
            finishDrag
        );

    }


    /* =====================================================
       ANIMASI PERMAINAN
    ===================================================== */

    if(gaming){

        const timeline =
            gsap.timeline({
                paused:true,
                defaults:{
                    overwrite:
                        "auto"
                }
            });


        if(gamingHead){

            timeline.to(
                gamingHead,
                {
                    autoAlpha:1,
                    y:0,
                    duration:1.05,
                    ease:
                        "power4.out"
                },
                0
            );

        }


        if(gameCards.length){

            timeline.to(
                gameCards,
                {
                    autoAlpha:1,
                    y:0,
                    scale:1,
                    rotate:0,
                    duration:1.1,
                    stagger:.18,
                    ease:
                        "power4.out"
                },
                .22
            );

        }


        if(gameStatusIcon){

            timeline.to(
                gameStatusIcon,
                {
                    autoAlpha:1,
                    scale:1,
                    duration:.7,
                    ease:
                        "back.out(1.6)"
                },
                .7
            );

        }


        ScrollTrigger.create({

            trigger:
                gaming,

            start:
                "top 84%",

            end:
                "bottom 12%",

            onEnter:
                () => {

                    timeline
                        .pause(0)
                        .restart();


                    gameIndex =
                        0;


                    renderGame(false);

                },

            onEnterBack:
                () => {

                    timeline
                        .pause(0)
                        .restart();


                    gameIndex =
                        0;


                    renderGame(false);

                },

            onLeave:
                () => {

                    timeline.pause(0);

                },

            onLeaveBack:
                () => {

                    timeline.pause(0);

                }

        });

    }


    /* =====================================================
       ANIMASI PENUTUP
    ===================================================== */

    if(closing){

        const closingTimeline =
            gsap.timeline({
                paused:true,
                defaults:{
                    overwrite:"auto"
                }
            });


        closingTimeline.to(
            closing,
            {
                autoAlpha:1,
                y:0,
                duration:1,
                ease:
                    "power4.out"
            },
            0
        );


        if(closingIcon){

            closingTimeline.fromTo(
                closingIcon,
                {
                    scale:.55,
                    rotate:-25
                },
                {
                    scale:1,
                    rotate:0,
                    duration:.8,
                    ease:
                        "back.out(1.7)"
                },
                .12
            );

        }


        if(closingTitle){

            closingTimeline.fromTo(
                closingTitle,
                {
                    y:30
                },
                {
                    y:0,
                    duration:.8,
                    ease:
                        "power4.out"
                },
                .2
            );

        }


        if(closingText){

            closingTimeline.fromTo(
                closingText,
                {
                    y:18
                },
                {
                    y:0,
                    duration:.7,
                    ease:
                        "power3.out"
                },
                .34
            );

        }


        ScrollTrigger.create({

            trigger:
                closing,

            start:
                "top 86%",

            end:
                "bottom 15%",

            onEnter:
                () => {

                    closingTimeline
                        .pause(0)
                        .restart();

                },

            onEnterBack:
                () => {

                    closingTimeline
                        .pause(0)
                        .restart();

                },

            onLeave:
                () => {

                    closingTimeline.pause(0);

                },

            onLeaveBack:
                () => {

                    closingTimeline.pause(0);

                }

        });

    }


    /* =====================================================
       HOVER ICON
    ===================================================== */

    if(!reducedMotion){

        qa(
            ".life-orbit-icon," +
            ".life-place-badge," +
            ".life-chapter-icon," +
            ".life-note-icon," +
            ".life-travel-floating-icon," +
            ".life-game-center-icon," +
            ".life-game-status-icon",
            life
        )
        .forEach(
            icon => {

                icon.addEventListener(
                    "mouseenter",
                    () => {

                        gsap.to(
                            icon,
                            {
                                scale:1.1,
                                rotate:-8,
                                y:-3,
                                duration:.35,
                                ease:
                                    "power3.out",
                                overwrite:
                                    "auto"
                            }
                        );

                    }
                );


                icon.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(
                            icon,
                            {
                                scale:1,
                                rotate:0,
                                y:0,
                                duration:.55,
                                ease:
                                    "elastic.out(1,.5)",
                                overwrite:
                                    "auto"
                            }
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       AWAL CAROUSEL
    ===================================================== */

    renderGame(false);


    /* =====================================================
       REFRESH
    ===================================================== */

    requestAnimationFrame(
        () => {

            ScrollTrigger.refresh();

        }
    );

}

/* =========================================================
   LIFE — INTERAKSI POSTINGAN
   LIKE / SAVE / DOUBLE CLICK
========================================================= */
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
