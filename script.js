// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#8a2be2" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#8a2be2",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Add typing effect to search input
    const searchInput = document.getElementById('searchInput');
    const phrases = [
        "Entrez un nom d'utilisateur Snapchat...",
        "Recherchez n'importe quel profil...",
        "Accédez à toutes les données..."
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = '';
    let isDeleting = false;

    function type() {
        if (phraseIndex >= phrases.length) phraseIndex = 0;

        const fullPhrase = phrases[phraseIndex];

        if (isDeleting) {
            currentPhrase = fullPhrase.substring(0, currentPhrase.length - 1);
        } else {
            currentPhrase = fullPhrase.substring(0, currentPhrase.length + 1);
        }

        searchInput.placeholder = currentPhrase;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentPhrase === fullPhrase) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentPhrase === '') {
            isDeleting = false;
            phraseIndex++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});

function requestAccess() {
    window.location.href = "payment.html";
}
