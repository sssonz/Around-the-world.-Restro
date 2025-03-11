document.addEventListener('DOMContentLoaded', () => {
    var url = './img/Ticket_back.svg'; // Одна и та же картинка для всех canvas
    var canvases = document.querySelectorAll('.canvas');
    var isPress = false;
    var old = null;
    var activeCanvas = null; // Текущий активный canvas
    var activeTicket = null; // Текущий активный ticket
    var totalPixels = 0; // Общее количество пикселей
    var erasedPixels = 0; // Количество стертых пикселей
    var modal = document.getElementById("modal");
    const closeModal = document.querySelector(".bt_close");
    const winningImage = document.getElementById("winningImage");
    
    canvases.forEach(function(canvas) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = url;
        
        img.onload = function() {
            var width = Math.min(500, img.width);
            var height = img.height * (width / img.width);

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Сохраняем общее количество пикселей для проверки
            totalPixels = canvas.width * canvas.height;
        };
  
        canvas.addEventListener('mousedown', function(e) {
            if (activeCanvas && activeCanvas !== canvas) {
                return; // Если другой canvas активен, ничего не делаем
            }
            isPress = true;
            activeCanvas = canvas; // Устанавливаем активный canvas
            old = { x: e.offsetX, y: e.offsetY };
            
            // Запоминаем активный ticket
            activeTicket = canvas.parentElement.className; // Получаем класс родительского div
        });
  
        canvas.addEventListener('mousemove', function(e) {
            if (isPress && activeCanvas === canvas) { // Проверяем, что это активный canvas
                var x = e.offsetX;
                var y = e.offsetY;
                ctx.globalCompositeOperation = 'destination-out';
    
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, 4 * Math.PI);
                ctx.fill();
    
                ctx.lineWidth = 40;
                ctx.beginPath();
                ctx.moveTo(old.x, old.y);
                ctx.lineTo(x, y);
                ctx.stroke();
    
                old = { x: x, y: y };
    
                // Увеличиваем количество стертых пикселей
                erasedPixels += Math.PI * Math.pow(20, 2); // Площадь круга
                checkErasedPercentage();
            }
        });
  
        canvas.addEventListener('mouseup', function() {
            isPress = false; // Окончание стирания, но активный canvas остается
        });
  
        canvas.addEventListener('mouseleave', function() {
            // Не сбрасываем активный canvas
            isPress = false; // Остановить стирание, если мышь покинула canvas
        });
    });

    function checkErasedPercentage() {
        if (erasedPixels >= totalPixels * 4.5) {
            // Получаем соответствующее изображение фона
            let winningImageSrc = '';
            switch (activeTicket) {
                case 'ticket_1':
                    winningImageSrc = './img/Ticket_fon_1.svg';
                    break;
                case 'ticket_2':
                    winningImageSrc = './img/Ticket_fon_2.svg';
                    break;
                case 'ticket_3':
                    winningImageSrc = './img/Ticket_fon_3.png';
                    break;
                case 'ticket_4':
                    winningImageSrc = './img/Ticket_fon_4.png';
                    break;
                default:
                    winningImageSrc = './img/default_image.png'; // Замените на изображение по умолчанию, если нужно
            }
            winningImage.src = winningImageSrc; // Устанавливаем выигрышное изображение
            modal.style.display = "block"; // Показываем модальное окно
        }
    }

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