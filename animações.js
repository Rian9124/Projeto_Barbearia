// Arquivo java script para animações


// animação imagem

window.addEventListener('scroll', function() {
    const imagem = document.querySelector('#img-slide');
    const position = imagem.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (position < windowHeight && position > 0) {
        imagem.style.right = '0px';
        imagem.style.opacity = '1';
    } else {
        // Se a imagem não estiver visível na tela
        imagem.style.right = '-100px';
        imagem.style.opacity = '0';
    }
});

// Mostrar ou ocultar o botão de rolagem para o topo
window.onscroll = function() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
// Adicionando evento de clique para rolar para o topo
document.addEventListener('DOMContentLoaded', () => {
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelector('#scrollToTopBtn').addEventListener('click', scrollToTop)});