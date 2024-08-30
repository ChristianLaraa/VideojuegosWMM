// Inicializa Lenis para smooth scrolling
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

// Configuración de ScrollTrigger para secciones y elementos específicos

// Pinning de la sección con clase .pinned
ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".whitespace",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
});

// Pinning de la sección con clase .header-info
ScrollTrigger.create({
    trigger: ".header-info",
    start: "top top",
    endTrigger: ".whitespace",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
});

// Animación de rotación en la clase .revealer
ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".header-info",
    end: "bottom bottom",
    onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.to(".revealer", { rotation });
    },
});

// Animación de clip-path en .revealer-1 y .revealer-2
ScrollTrigger.create({
    trigger: ".pinned",
    start: "top top",
    endTrigger: ".header-info",
    end: "bottom bottom",
    onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
            ${45 - 45 * progress}% ${0 + 0 * progress}%,
            ${55 + 45 * progress}% ${0 + 0 * progress}%,
            ${55 + 45 * progress}% ${100 - 0 * progress}%,
            ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;
        gsap.to(".revealer-1, .revealer-2", {
            clipPath: clipPath,
            ease: "none",
            duration: 0,
        });
    },
});

// Animación de desplazamiento horizontal en la clase .revealer
ScrollTrigger.create({
    trigger: ".header-info",
    start: "top top",
    end: "bottom 50%",
    scrub: 1,
    onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(".revealer", {
            left: `${left}%`,
            ease: "none",
            duration: 0,
        });
    },
});

// Animación de escala en la clase .revealer
ScrollTrigger.create({
    trigger: ".whitespace",
    start: "top 50%",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {
        const scale = 1 + 12 * self.progress;
        gsap.to(".revealer", {
            scale: scale,
            ease: "none",
            duration: 0,
        });
    },
});
