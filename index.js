// Documento js para funções
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