document.addEventListener("DOMContentLoaded", () => {
    
    const emojiValue = [
        "./img/Ticket_fon_1.svg", 
        "./img/Ticket_fon_2.svg",
        "./img/Ticket_fon_3.png", 
        "./img/Ticket_fon_4.png",
    ];

    const btnReload = document.querySelector(".bt_slot");
    const reel = document.querySelector(".reel");
    const modal = document.getElementById("modal");
    const winningImage = document.getElementById("winningImage");
    const closeModal = document.querySelector(".bt_close");
    
    let isGameActive = true; // Флаг для проверки активности игры
    
    btnReload.addEventListener("click", () => {
        if (!isGameActive) return; // Если игра уже активирована, ничего не делаем
        isGameActive = false; // Делаем игру неактивной
    
        // Генерируем 9 случайных изображений
        const randomImages = [];
            for (let i = 0; i < 19; i++) {
                const randomIndex = Math.floor(Math.random() * emojiValue.length);
                randomImages.push(emojiValue[randomIndex]);
            }
    
        randomImages.forEach((src) => {
            const inner = document.createElement("div");
            inner.classList.add("inner"); // Создаем элемент inner
      
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100%"; // Устанавливаем ширину изображения
            inner.appendChild(img); // Добавляем изображение в inner
            reel.appendChild(inner); // Добавляем inner в reel
        });
    
        setTimeout(() => {
            const winningImageSrc = randomImages[1]; // Предпоследнее изображение
            winningImage.src = winningImageSrc; // Устанавливаем выигрышное изображение
            modal.style.display = "block"; // Показываем модальное окно
            checkAndAddWinningImage(); // Проверяем и добавляем изображение снова
        }, 3500);
    });
      
    // Закрытие модального окна
    closeModal.onclick = function() {
        modal.style.display = "none";
    };
      
    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

