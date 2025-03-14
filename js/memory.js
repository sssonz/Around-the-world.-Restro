(function(){
	var Memory = {
		// создаём карточку
		init: function(cards){
			//  получаем доступ к классам
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// собираем из карточек массив — игровое поле
			this.cardsArray = $.merge(cards, cards);
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// и раскладываем их
			this.setup();
		},

		// как перемешиваются карточки
		shuffleCards: function(cardsArray){
			// используем встроенный метод .shuffle
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// раскладываем карты
		setup: function(){
			// подготавливаем код с карточками на страницу
			this.html = this.buildHTML();
			// добавляем код в блок с игрой
			this.$game.html(this.html);
			// получаем доступ к сформированным карточкам
			this.$memoryCards = $(".card");
			// на старте мы не ждём переворота второй карточки
			this.paused = false;
			// на старте у нас нет перевёрнутой первой карточки
     		this.guess = null;
     		// добавляем элементам на странице реакции на нажатия
			this.binding();
		},

		// как элементы будут реагировать на нажатия
		binding: function(){
			// обрабатываем нажатие на карточку
			this.$memoryCards.on("click", this.cardClicked);
		},

		// что происходит при нажатии на карточку
		cardClicked: function(){
			// получаем текущее состояние родительской переменной
			var _ = Memory;
			// и получаем доступ к карточке, на которую нажали
			var $card = $(this);
			// если карточка уже не перевёрнута и мы не нажимаем на ту же самую карточку второй раз подряд
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				// переворачиваем её
				$card.find(".inside").addClass("picked");
				// если мы перевернули первую карточку
				if(!_.guess){
					// то пока просто запоминаем её
					_.guess = $(this).attr("data-id");
				// если мы перевернули вторую и она совпадает с первой
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					// оставляем обе на поле перевёрнутыми и показываем анимацию совпадения
					$(".picked").addClass("matched");
					// обнуляем первую карточку
					_.guess = null;
						// если вторая не совпадает с первой
				} else {
					// обнуляем первую карточку
					_.guess = null;
					// не ждём переворота второй карточки
					_.paused = true;
					// ждём полсекунды и переворачиваем всё обратно
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				// если мы перевернули все карточки
				if($(".matched").length == $(".card").length){
					// показываем победное сообщение
					_.win();
				}
			}
		},

		// показываем победное сообщение
		win: function(){
			// плавно показываем модальное окно с предложением сыграть ещё
			setTimeout(function(){
				Memory.showModal();
			}, 1000);
		},

		showModal: function(){
			// массив изображений для победного экрана
			var images = [
				"./img/Ticket_fon_1.svg", 
				"./img/Ticket_fon_2.svg",
				"./img/Ticket_fon_3.png", 
				"./img/Ticket_fon_4.png",
			];
		
			// выбираем случайное изображение из массива
			var randomImage = images[Math.floor(Math.random() * images.length)];
			
			// устанавливаем выбранное изображение в элемент модального окна
			this.$modal.find("#winningImage").attr("src", randomImage);
			
			// показываем блок с сообщением без анимации
			this.$overlay.show();
			this.$modal.show();
		
			// закрытие модального окна при нажатии на кнопку
			this.$modal.find(".close-button").on("click", function() {
				this.$modal.hide();
				this.$overlay.hide();
			}.bind(this));
		
			// Закрытие модального окна при клике на оверлей
			this.$overlay.on("click", function() {
				this.$modal.hide();
				this.$overlay.hide();
			}.bind(this));
		},

		// Тасование Фишера–Йетса - https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		// код, как добавляются карточки на страницу
		buildHTML: function(){
			// сюда будем складывать HTML-код
			var frag = '';
			// перебираем все карточки подряд
			this.$cards.each(function(k, v){
				// добавляем HTML-код для очередной карточки
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="./img/Card_back.svg"\/></div></div>\
				</div>';
			});
			// возвращаем собранный код
			return frag;
		}
	};

	// карточки
	var cards = [
		{	
			// название
			name: "sushi_red",
			// адрес картинки
			img: "./img/Sushi_1.svg",
			// порядковый номер пары
			id: 1,
		},
		{
			name: "sushi_yellow",
			img: "./img/Sushi_2.svg",
			id: 2
		},
		{
			name: "sushi_orange",
			img: "./img/Sushi_3.svg",
			id: 3
		},
	];
    
	// запускаем игру
	Memory.init(cards);
})();