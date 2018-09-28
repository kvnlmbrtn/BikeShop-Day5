// Génération de la constante sr qui va être égale à la méthode ScrollReveal


const sr = ScrollReveal();



// Gestion des animations à l'ouverture de la page : titre, logo, etc.

sr.reveal('#companyName', {
	distance: '50px',
	origin: 'bottom',
	rotate: {
      x: 100,
      y: 0,
      z: 0
    },
    scale: 0.1,
	duration: 500
});

sr.reveal('#companyDescription', {
	distance: '10px',
	origin: 'top',
	duration: 500,
	delay: 500
});


sr.reveal('#learnMoreText', {
	distance: '0px',
	origin: 'left',
	duration: 300,
	delay: 1000
});


sr.reveal('.fas', {
	distance: '0px',
	origin: 'center',
	duration: 300,
	delay: 1000
});
