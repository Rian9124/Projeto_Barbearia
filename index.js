// Documento js para funções

// função para a animação de abertura do site 
window.onload = function() {
    const logo = document.querySelector('.logo');
    const conteudo = document.querySelector('.conteudo');
    const bemVindo = document.querySelector('.bem-vindo');
    const logoContainer = document.querySelector('.logo-container');

    // Reinicializa o estado da logo e do texto quando o site é carregado novamente
    logo.style.display = 'block';
    bemVindo.style.display = 'block';
    logoContainer.style.display = 'flex'; // Mostra o container

    // Aparece o texto e a logo com a animação
    setTimeout(() => {
        bemVindo.classList.add('bem-vindo-animado'); // Aparece o texto "BEM VINDO" descendo de cima
        logo.classList.add('logo-animada'); // Aparece a logo
    }, 500);

    // Após 3 segundos, a logo sai para a esquerda e o texto "BEM VINDO" sai para a direita
    setTimeout(() => {
        logo.style.transform = 'translateX(-100vw)'; // Faz a logo sair para a esquerda
        logo.style.transition = 'transform 2s ease-in-out'; // Anima a saída para a esquerda

        bemVindo.classList.add('bem-vindo-saindo'); // Faz o texto sair para a direita

        // Revela o conteúdo gradualmente enquanto a logo está saindo
        conteudo.classList.add('revelando'); // Aplica a transição de opacidade no conteúdo

        // Muda o fundo da página gradualmente enquanto a animação acaba
        logoContainer.classList.add('revelar-fundo');

        // Remove a logo e o seu container após a transição
        setTimeout(() => {
            logoContainer.style.display = 'none'; // Remove a logo container
            document.body.style.overflow = 'auto'; // Permite rolar a página após a animação
        }, 2000); // Espera 2 segundos para remover a logo
    }, 3000); // 3 segundos antes de começar a sair a logo e o texto
};



// cabecalho
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('show');
  });
  
  
  
  
  
  
  












// Agenda
document.addEventListener("DOMContentLoaded", function() {
    const btAgenda = document.getElementById("bt-agenda");
    const btAgenda2 = document.getElementById("bt-agenda2");
    const calendarContainer = document.getElementById("calendar-container");
    const tituloAgenda = document.getElementById("titulo-agenda");
    const lgBt = document.querySelector(".lg-bt");
    const loginScreen = document.getElementById("login-screen");
    const setup = document.getElementById("setup");
    const saveScheduleButton = document.getElementById("save-schedule");
    const resetScheduleButton = document.getElementById("reset-schedule");
    const daysContainer = document.getElementById("days");
    const monthYearSpan = document.getElementById("month-year");
    const tbody = document.querySelector("#calendar tbody");
    const monthInput = document.getElementById("month");
    const cdLgBt = document.querySelector(".cd-lg-bt");

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let unavailableDays = loadUnavailableDays();

    // Eventos para botões
    btAgenda.addEventListener("click", function() {
        tituloAgenda.style.display = "none";
        lgBt.style.display = "none";
        calendarContainer.style.display = "block";
    });

    btAgenda2.addEventListener("click", function() {
        loginScreen.style.display = "flex";
    });
    
    // criação da tela de senha do agendamento
    document.getElementById("login-button").addEventListener("click", function() {
        const password = document.getElementById("password").value;
        if (password === "1234") {
            setup.style.display = "block";
            loginScreen.style.display = "none";
        } else {
            alert("Senha incorreta!");
        }
    });

    function generateDays() {
        daysContainer.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
            const day = document.createElement("div");
            day.classList.add("day");
            day.textContent = i;

            day.addEventListener("click", function() {
                day.classList.toggle("selected");
                const dayNumber = parseInt(day.textContent);
                toggleDaySelection(dayNumber);
                updateCalendarDays();
                saveUnavailableDays();
            });
            daysContainer.appendChild(day);
        }
    }

    function toggleDaySelection(dayNumber) {
        if (unavailableDays[currentMonth].includes(dayNumber)) {
            unavailableDays[currentMonth] = unavailableDays[currentMonth].filter(d => d !== dayNumber);
        } else {
            unavailableDays[currentMonth].push(dayNumber);
        }
    }

    function generateCalendar(month, year) {
        const firstDay = new Date(year, month).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        let date = 1;
        const cell = document.createElement("td");
        
        tbody.innerHTML = "";
        
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (date > lastDate) {
                    break;
                } else {
                    const cell = document.createElement("td");
                    cell.innerText = date;
                    
                    if (unavailableDays[month].includes(date)) {
                        cell.classList.add("selected");
                    }
                    
                    cell.addEventListener("click", function() {
                        cell.classList.toggle("selected");
                        toggleDaySelection(date);
                        updateCalendarDays();
                        saveUnavailableDays();
                    });
                    row.appendChild(cell);
                    date++;
                }
            }
            tbody.appendChild(row);
        }

        monthYearSpan.innerText = new Date(year, month).toLocaleString("pt-BR", { month: "long", year: "numeric" });
    }

    document.getElementById("prev-month").addEventListener("click", function() {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        generateCalendar(currentMonth, currentYear);
    });

    document.getElementById("next-month").addEventListener("click", function() {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        generateCalendar(currentMonth, currentYear);
    });

    saveScheduleButton.addEventListener("click", function() {
        if (monthInput.value) {
            const selectedMonthYear = new Date(monthInput.value);
            currentMonth = selectedMonthYear.getMonth();
            currentYear = selectedMonthYear.getFullYear();
            generateCalendar(currentMonth, currentYear);
        }
    });

    resetScheduleButton.addEventListener("click", function() {
        localStorage.removeItem(`unavailableDays_${currentYear}`);
        unavailableDays = loadUnavailableDays();
        generateCalendar(currentMonth, currentYear);
    });

    function updateCalendarDays() {
        const calendarCells = tbody.querySelectorAll("td");
        calendarCells.forEach(cell => {
            const dayNumber = parseInt(cell.innerText);
            if (unavailableDays[currentMonth].includes(dayNumber)) {
                cell.classList.add("selected");
            } else {
                cell.classList.remove("selected");
            }
        });
        updateCalendarBackground();
    }

    function updateCalendarBackground() {
        const days = cdLgBt.querySelectorAll("td");
        days.forEach(day => {
            const dayNumber = parseInt(day.innerText);
            if (unavailableDays[currentMonth].includes(dayNumber)) {
                day.style.backgroundColor = 'red'; // Cor para dias indisponíveis
                day.style.color = 'white';
            } else {
                day.style.backgroundColor = 'lightgreen'; // Cor para dias disponíveis
                day.style.color = 'black';
            }
        });
    }

    function saveUnavailableDays() {
        localStorage.setItem(`unavailableDays_${currentYear}`, JSON.stringify(unavailableDays));
    }

    function loadUnavailableDays() {
        const savedDays = localStorage.getItem(`unavailableDays_${currentYear}`);
        const data = savedDays ? JSON.parse(savedDays) : {};
        for (let month = 0; month < 12; month++) {
            if (!data[month]) {
                data[month] = [];
            }
        }
        return data;
    }

    generateDays();
    generateCalendar(currentMonth, currentYear);
});
// Fim agenda




// Configuração do form de agendamento
document.getElementById('bt-agenda').addEventListener('click', function() {
    const nome = document.getElementById('nome-agenda').value;
    const data = new Date(document.getElementById('data-agendamento').value);
    const hora = document.getElementById('hora').value;
    const obs = document.getElementById('comentario').value;

    // Verifica se todos os campos estão preenchidos
    if (nome && hora && data) {
        // Define o intervalo de horário disponível
        const horaMinima = "14:00";
        const horaMaxima = "19:00";
        
        // Valida o horário
        if (horaMinima <= hora && hora <= horaMaxima) {
            const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
            const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);

            // Monta a mensagem de envio
            const mensagem = `Olá, meu nome é ${nome}. Gostaria de agendar um horário no dia ${dataFormatada} às ${hora}. Poderia verificar se o dia e horário estão disponíveis, por favor? ${obs}`;

            // Link de envio para WhatsApp
            const numeroWhatsapp = '5531982283547'; // Remova o + do número
            const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

            // Redireciona para WhatsApp
            window.open(linkWhatsapp, '_blank');
        } else {
            alert('O horário deve estar entre 14:00 e 19:00.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Configuração do form de agendamento
document.getElementById('bt-agenda').addEventListener('click', function() {
    const nome = document.getElementById('nome-agenda').value;
    const data = new Date(document.getElementById('data-agendamento').value);
    const hora = document.getElementById('hora').value;
    const obs = document.getElementById('comentario').value;

    // Verifica se todos os campos estão preenchidos
    if (nome && hora && data) {
        // Define o intervalo de horário disponível
        const horaMinima = "14:00";
        const horaMaxima = "19:00";
        
        // Valida o horário
        if (horaMinima <= hora && hora <= horaMaxima) {
            const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
            const dataFormatada = data.toLocaleDateString('pt-BR', opcoes);

            // Monta a mensagem de envio
            const mensagem = `Olá, meu nome é ${nome}. Gostaria de agendar um horário no dia ${dataFormatada} às ${hora}. Poderia verificar se o dia e horário estão disponíveis, por favor? ${obs}`;

            // Link de envio para WhatsApp
            const numeroWhatsapp = '5531982283547'; // Remova o + do número
            const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

            // Redireciona para WhatsApp
            window.open(linkWhatsapp, '_blank');
        } else {
            alert('O horário deve estar entre 14:00 e 19:00.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
























// Inicio do Feedback

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