document.addEventListener("DOMContentLoaded", function() {

    const images = [
        "./img/Text_res_1.svg",
        "./img/Text_res_2.svg",
        "./img/Text_res_3.svg",
    ];

    const btImages = [
        "./img/Arrow_res.svg",
        "./img/Again_res.svg",
        "./img/Star_res.svg",
    ];

    // Массив для выигрышных изображений
    let winningImages = []; // Этот массив должен заполняться src загруженных изображений

    // Функция для добавления изображения в массив
    function addWinningImage(src) {
        winningImages.push(src); // Добавляем src в массив, даже если он уже существует
    }

    // Функция для добавления src в winningImages, если bl_winner виден
    function checkAndAddWinningImage() {
        const blWinner = document.querySelector(".bl_winner");
        const winningImageElement = document.getElementById("winningImage");
        
        if (blWinner.style.display === "flex") {
            addWinningImage(winningImageElement.src); // Добавляем изображение, если bl_winner виден
        }
    }

    // Функция для открытия модального окна
    function openModal() {
        const modal = document.getElementById("modal");
        const blRes = document.querySelector(".bl_res");
        const blWinner = document.querySelector(".bl_winner");
        const imgRes = document.querySelector(".img_res");
        const imgBtRes = document.querySelector(".img_bt");
        const butRes = document.querySelector(".but_res");
        const resText = document.querySelector(".res");

        modal.style.display = "block"; // Открываем модальное окно
        blRes.style.display = "flex"; // Показываем div bl_res
        blWinner.style.display = "none"; // Скрываем div bl_winner

        // Проверяем и добавляем изображение, если bl_winner виден
        checkAndAddWinningImage();

        // Определяем количество загруженных изображений
        const count = winningImages.length;

        if (count < 4) {
            // Если меньше 4
            imgRes.src = images[0];
            resText.textContent = "Сыграйте во все мини-игры";
            imgBtRes.src = btImages[0];
            butRes.onclick = function() {
                modal.style.display = "none"; // Закрываем модальное окно
                blRes.style.display = "none"; // Скрываем div bl_res
                blWinner.style.display = "flex"; // Показываем div bl_winner
            };

        } else {
            // Проверка на уникальность названий изображений
            const uniqueImages = [...new Set(winningImages)];

            if (uniqueImages.length < count) {
                // Если есть одинаковые названия
                imgRes.src = images[1];
                resText.textContent = "Есть одинаковые билеты";
                imgBtRes.src = btImages[1];
                butRes.onclick = function() {
                    location.reload(); // Перезапускаем страницу
                };
            } else {
                // Если все названия разные
                imgRes.src = images[2];
                resText.textContent = "Главный подарок — ваша удача";
                imgBtRes.src = btImages[2];
                butRes.onclick = function() {
                    modal.style.display = "none"; // Закрываем модальное окно
                    blRes.style.display = "none"; // Скрываем div bl_res
                    blWinner.style.display = "flex"; // Показываем div bl_winner
                };
            }
        }
    }

    // Привязываем обработчик события к кнопке открытия модального окна
    const buttonRes = document.querySelector(".bt_res");
    if (buttonRes) {
        buttonRes.onclick = openModal; // Открываем модальное окно
    }

    // Закрытие модального окна при нажатии на кнопку закрытия
    const closeButton = document.querySelector(".bt_close");
    if (closeButton) {
        closeButton.onclick = function() {
            const modal = document.getElementById("modal");
            modal.style.display = "none"; // Закрываем модальное окно
            blRes.style.display = "none"; // Скрываем div bl_res
            blWinner.style.display = "flex"; // Показываем div bl_winner
        };
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        const modal = document.getElementById("modal");
        if (event.target === modal) {
            modal.style.display = "none"; // Закрываем модальное окно
            blRes.style.display = "none"; // Скрываем div bl_res
            blWinner.style.display = "flex"; // Показываем div bl_winner
        }
    };
});


