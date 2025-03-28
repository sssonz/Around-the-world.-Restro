document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "./img/Text_res_1.svg", // Не все игры сыграны
        "./img/Text_res_2.svg", // Есть одинаковые билеты (проигрыш)
        "./img/Text_res_3.svg", // Победа
    ];

    const btImages = [
        "./img/Arrow_res.svg",
        "./img/Again_res.svg",
        "./img/Star_res.svg",
    ];

    let winningImages = []; // Собранные билеты
    // Отслеживание изменения src у #winningImage
    const winningImageElement = document.getElementById("winningImage");

    if (winningImageElement) {
        const observer = new MutationObserver(() => {
            const newSrc = winningImageElement.src;
            if (newSrc) {
                const fileName = newSrc.split('/').pop(); // Получаем имя файла

                // Добавляем только если его еще нет
                winningImages.push(fileName);
                console.log("Текущие билеты:", winningImages);
            }
        });

        observer.observe(winningImageElement, { attributes: true, attributeFilter: ["src"] });
    }

    // Функция проверки результата
    function openModal() {
        const modal = document.getElementById("modal");
        const blRes = document.querySelector(".bl_res");
        const blWinner = document.querySelector(".bl_winner");
        const imgRes = document.querySelector(".img_res");
        const imgBtRes = document.querySelector(".img_bt");
        const butRes = document.getElementById("but_res");
        const resText = document.querySelector(".res");
        const closeButton = document.querySelector(".bt_close");

        modal.style.display = "block"; 
        blRes.style.display = "flex";
        blWinner.style.display = "none";

        const count = winningImages.length;
        const uniqueImages = [...new Set(winningImages)];

        console.log("Количество билетов:", count);
        console.log("Уникальные билеты:", uniqueImages);

        if (count <= 3) {
            // Не все игры сыграны
            imgRes.src = images[0];
            resText.textContent = "Сыграйте во все мини-игры";
            imgBtRes.src = btImages[0];
            butRes.style.backgroundColor =" #F49EB7";
            butRes.onclick = function () {
                modal.style.display = "none";
                blRes.style.display = "none";
                blWinner.style.display = "flex";
            };
        } else if (uniqueImages.length < count) {
            // Есть повторяющиеся билеты — проигрыш
            imgRes.src = images[1];
            resText.textContent = "Есть одинаковые билеты";
            imgBtRes.src = btImages[1];
            butRes.style.backgroundColor =" #FF814A";
            butRes.onclick = function () {
                location.reload(); // Перезагрузка страницы для новой игры
            };
        } else {
            // Все билеты уникальные — победа
            imgRes.src = images[2];
            resText.textContent = "путешествие в любую страну";
            imgBtRes.src = btImages[2];
            butRes.style.backgroundColor =" #F6CA45";
            butRes.onclick = function () {
                modal.style.display = "none";
            };   
        }

        closeButton.onclick = function () {
            modal.style.display = 'none'; // Скрываем модальное окно
            blRes.style.display = "none";
            blWinner.style.display = "flex";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                blRes.style.display = "none";
                blWinner.style.display = "flex";
            }
        };
    }

    // Привязываем обработчик к кнопке результата
    const buttonRes = document.querySelector(".bt_res");
    if (buttonRes) {
        buttonRes.onclick = openModal;
    }

    const buttonR = document.querySelector(".bt_r");
    if (buttonR) {
        buttonR.onclick = openModal;
    }

    const btRes = document.querySelector(".bt_result");
    if (btRes) {
        btRes.onclick = openModal;
    }
});