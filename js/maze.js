const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1,
  4, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 0, 1, 2, 1,
  1, 2, 1, 0, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 2, 2, 2, 2, 0, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0, 1,
  1, 0, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1,
  1, 1, 1, 2, 1, 0, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1,
  1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1,
  1, 0, 1, 2, 2, 2, 2, 2, 0, 2, 1, 2, 1, 2, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 2, 0, 1, 2, 2, 2, 1, 0, 1, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
  1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  layout.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('gridSquare');
      grid.appendChild(div);
  });

  const gridSquare = document.querySelectorAll('.gridSquare');
  const infoBox = document.querySelector('.infoBox');
  let pacIndex = 114; // Начальная позиция бургера
  let gameStarted = false; // Флаг для отслеживания начала игры

  const ticketImages = [
    "./img/Ticket_fon_1.svg", 
    "./img/Ticket_fon_2.svg",
    "./img/Ticket_fon_3.png", 
    "./img/Ticket_fon_4.png",
  ];

  const foodImages = [
    "./img/Tomato_maze.png",
    "./img/Salat_maze.svg",
    "./img/Sous_maze.svg",
  ];

  function assignGrid() {
    gridSquare.forEach((square, i) => {
        if (layout[i] === 1) {
            square.classList.add('wall'); // Стена
        } else if (layout[i] === 0) {
          const randomFood = foodImages[Math.floor(Math.random() * foodImages.length)];
          square.classList.add('food');
          square.style.backgroundImage = `url(${randomFood})`;
        } else if (layout[i] === 3) {
            square.classList.add('pacman'); // Бургер
        } else if (layout[i] === 4) {
            square.classList.add('exit'); // Выход
        } else if (layout[i] === 2) {
            square.classList.add('path'); // Дорожка
        }
    });
}

function startGame() {
  if (!gameStarted) {
      gameStarted = true; // Установить флаг, что игра началась
      assignGrid();
      gridSquare[pacIndex].classList.add('pacman');
      infoBox.innerHTML = 'Соберите все овощи и найдите выход!';
  }
}

function movePacMan(e) {
  gridSquare[pacIndex].classList.remove('pacman'); // Убираем бургер с текущей клетки
  let newPacIndex = pacIndex; // Храним новый индекс бургер

  switch (e.key) {
      case 'ArrowLeft':
          if (!gridSquare[pacIndex - 1].classList.contains('wall') && pacIndex % 15 !== 0) {
              newPacIndex -= 1;
          }
          break;
      case 'ArrowUp':
          if (!gridSquare[pacIndex - 15].classList.contains('wall') && pacIndex - 15 >= 0) {
              newPacIndex -= 15;
          }
          break;
      case 'ArrowRight':
          if (!gridSquare[pacIndex + 1].classList.contains('wall') && pacIndex % 15 < 14) {
              newPacIndex += 1;
          }
          break;
      case 'ArrowDown':
          if (!gridSquare[pacIndex + 15].classList.contains('wall') && pacIndex + 15 < layout.length) {
              newPacIndex += 15;
          }
          break;
  }

  // Обновляем индекс бургер
  pacIndex = newPacIndex;
  gridSquare[pacIndex].classList.add('pacman'); // Добавляем бургер на новую клетку

  // Проверяем, собран ли овощ
  if (gridSquare[pacIndex].classList.contains('food')) {
      gridSquare[pacIndex].classList.remove('food'); // Убираем класс food
      gridSquare[pacIndex].style.backgroundImage = ''; // Убираем изображение овоща
  }
  checkWin();
}

function checkWin() {
  const foodRemaining = [...gridSquare].filter(square => square.classList.contains('food')).length;
  const exitSquare = gridSquare[pacIndex].classList.contains('exit');

  if (foodRemaining === 0 && exitSquare) {
    document.removeEventListener('keydown', movePacMan); // Приостанавливаем игру
      showWinningModal(); // Показать модальное окно
  } 
}

// Добавьте вызов assignGrid() в window.onload
window.onload = () => {
  assignGrid(); // Отображаем сетку
  gridSquare[pacIndex].classList.add('pacman'); // Добавляем бургер на стартовую позицию
};

function showWinningModal() {
  const modal = document.getElementById('modal');
  const winningImage = document.getElementById('winningImage');

  // Случайное изображение из массива
  const randomTicket = ticketImages[Math.floor(Math.random() * ticketImages.length)];
  winningImage.src = randomTicket;

  modal.style.display = 'block'; // Показываем модальное окно

  // Закрытие модального окна по кнопке
  const closeButton = document.querySelector('.bt_close');
  closeButton.addEventListener('click', () => {
    document.removeEventListener('keydown', movePacMan); // Приостанавливаем игру
    modal.style.display = 'none'; // Скрываем модальное окно
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.removeEventListener('keydown', movePacMan); // Приостанавливаем игру
        modal.style.display = 'none'; // Скрываем модальное окно
      }
  });
}

document.addEventListener('keydown', movePacMan);
});