document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar").getElementsByTagName("tbody")[0];
    const monthYear = document.getElementById("month-year");
    let today = new Date();
    let currentMonth = today.getMonth() + 1; // +1 para ajustar a contagem (1-12)
    let currentYear = today.getFullYear();
    let currentAvailabilityState = true; // true = pares disponíveis, false = ímpares disponíveis

    // Função para verificar se o dia é sábado ou domingo
    function isWeekend(day, month, year) {
        const dayOfWeek = new Date(year, month - 1, day).getDay(); // Ajuste para indexação de mês
        return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Domingo, 6 = Sábado
    }

    // Função para determinar se um dia está disponível
    function isAvailable(day, month, year) {
        const isDayEven = (day % 2 === 0); // Dia par

        if (isWeekend(day, month, year)) {
            return true; // Sábados e domingos sempre disponíveis
        }

        // Alternância de disponibilidade
        return currentAvailabilityState ? isDayEven : !isDayEven;
    }

    // Função para alternar o estado de disponibilidade ao mudar o mês
    function toggleAvailabilityState() {
        currentAvailabilityState = !currentAvailabilityState;
    }

    // Função para gerar o calendário
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month - 1).getDay(); // Ajuste para indexação de mês
        const daysInMonth = new Date(year, month, 0).getDate(); // Total de dias no mês

        calendar.innerHTML = "";
        monthYear.textContent = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement("td");
                    cell.textContent = date;

                    // Determina se o dia é disponível
                    if (isAvailable(date, month, year)) {
                        cell.classList.add("available");
                    } else {
                        cell.classList.add("unavailable");
                    }

                    // Destacar o dia atual
                    if (date === today.getDate() && year === today.getFullYear() && month === currentMonth) {
                        cell.classList.add("today");
                    }

                    row.appendChild(cell);
                    date++;
                }
            }

            calendar.appendChild(row);
        }
    }

    // Funções para navegar entre meses
    function previousMonth() {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
        toggleAvailabilityState(); // Alterna o estado de disponibilidade ao mudar de mês
        generateCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
        toggleAvailabilityState(); // Alterna o estado de disponibilidade ao mudar de mês
        generateCalendar(currentMonth, currentYear);
    }

    // Event listeners para botões de navegação
    document.getElementById("prev-month").addEventListener("click", previousMonth);
    document.getElementById("next-month").addEventListener("click", nextMonth);

    // Inicializar o calendário com o mês atual
    generateCalendar(currentMonth, currentYear);
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

// formulários

const carousel = document.querySelector('.feedback-carousel');
let scrollAmount = 0;
let selectedCard = null; // Variável para armazenar o card selecionado para deletar

function scrollCarousel() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    scrollAmount += 1;
    if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
    }
    carousel.scrollLeft = scrollAmount;
}

setInterval(scrollCarousel, 20);

function showFeedbackForm() {
    document.getElementById('feedback-form').classList.remove('hidden');
}

function hideFeedbackForm() {
    document.getElementById('feedback-form').classList.add('hidden');
}

function showAdminPasswordForm() {
    if (selectedCard === null) {
        alert("Selecione um comentário para excluir.");
        return;
    }
    document.getElementById('admin-password').classList.remove('hidden');
}

function hideAdminPasswordForm() {
    document.getElementById('admin-password').classList.add('hidden');
}

function selectCard(card) {
    // Desseleciona o card anterior
    if (selectedCard) {
        selectedCard.classList.remove('selected');
    }
    // Seleciona o novo card
    selectedCard = card;
    selectedCard.classList.add('selected');
}

function verifyAdminPassword() {
    const adminPassword = "1234"; // Defina aqui a senha do administrador
    const enteredPassword = document.getElementById('admin-pass').value;

    if (enteredPassword === adminPassword) {
        selectedCard.remove();
        hideAdminPasswordForm();
        selectedCard = null; // Reseta a seleção
    } else {
        alert("Senha incorreta!");
    }
}

function addFeedback() {
    const commentText = document.getElementById('comment-text').value;
    const rating = document.getElementById('rating').value;
    const name = document.getElementById('name').value;

    if (commentText === '' || name === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const newCard = document.createElement('div');
    newCard.className = 'feedback-card';
    newCard.innerHTML = `
        <p>${commentText}</p>
        <div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <p class="name">${name}</p>
    `;
    newCard.setAttribute('onclick', 'selectCard(this)');

    carousel.appendChild(newCard);

    // Limpar o formulário
    document.getElementById('comment-text').value = '';
    document.getElementById('rating').value = '5';
    document.getElementById('name').value = '';

    hideFeedbackForm();
}

document.addEventListener('DOMContentLoaded', () => {
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Adicionando evento de clique para rolar para o topo
    document.querySelector('#scrollToTopBtn').addEventListener('click', scrollToTop)});