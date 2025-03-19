document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".bt");
    const but = document.querySelector(".bt_1");
    const sections = document.querySelectorAll('div[class^="section"]');
    let isFirstSectionVisible = true; // Флаг для отслеживания состояния первой секции

    function showAllSections() {
        sections.forEach((section, i) => {
            if (i === 0) {
                section.classList.add('sectionnone'); // Скрыть первую секцию
            } else {
                section.classList.remove('sectionnone'); // Показать остальные секции
            }
        });
    }

    button.addEventListener('click', () => {
        if (isFirstSectionVisible) {
            showAllSections(); // Показываем все секции, кроме первой
            isFirstSectionVisible = false; // Обновляем флаг
        }
    });

    but.addEventListener('click', () => {
        if (isFirstSectionVisible) {
            showAllSections(); // Показываем все секции, кроме первой
            isFirstSectionVisible = false; // Обновляем флаг
        }
    });

    // Инициализация: показываем только первую секцию при загрузке
    sections.forEach((section, i) => {
        if (i === 0) {
            section.classList.remove('sectionnone'); // Показать первую секцию
        } else {
            section.classList.add('sectionnone'); // Скрыть остальные секции
        }
    });
});
