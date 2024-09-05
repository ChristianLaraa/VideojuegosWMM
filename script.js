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

ScrollTrigger.create({
    trigger: ".second-section",
    start: "top 85%",
    end: "bottom 60%",
    scrub: true,
    onEnter: () => {
        gsap.fromTo(".second-section", {
            opacity: 0,
            scale: 0.95, // Comienza ligeramente más pequeña
            rotateX: -5, // Leve inclinación 3D en el eje X
            y: 30, // Sutil desplazamiento vertical hacia abajo
            backgroundColor: "#000000", // Color de fondo gris claro
        }, {
            opacity: 1,
            scale: 1, // Vuelve a su tamaño original
            rotateX: 0, // Rotación vuelve a la normalidad
            y: 0, // Regresa a su posición original
            duration: 1.2,
            ease: "sine.out", // Efecto de movimiento suave
            backgroundColor: "#000000", // Cambio sutil a un gris un poco más oscuro
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Sombra suave y difusa
        });
    },
    onLeaveBack: () => {
        gsap.to(".second-section", {
            opacity: 0,
            scale: 0.95, // Se reduce ligeramente al salir
            rotateX: 5, // Inclinación leve en la dirección opuesta
            y: 30, // Desplazamiento hacia abajo al salir
            duration: 1.2,
            ease: "sine.in",
            backgroundColor: "#000000", // Vuelve al color de fondo original
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", // Elimina la sombra
        });
    },
    onUpdate: (self) => {
        // Sutil efecto de movimiento de un elemento interno
        gsap.to(".second-section .inner-element", {
            x: self.progress * 20, // Desplazamiento sutil lateral del elemento interno
            duration: 0.5,
            ease: "power1.out",
        });
    }
});
