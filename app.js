
const colors = ['#454B1B', '#023020', '#50C878', '#355E3B', '#C9CC3F', '#8A9A5B', '#808000', '#C4B454'];

function getRandomColor() {
	const randomIndex = Math.floor(Math.random() * colors.length);
	const randomColor = colors[randomIndex];

	return randomColor;
};

const startButton = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeBoard = document.querySelector('.time-list');
const currentTimeElement = document.querySelector('.currentTime');
const mainBoard = document.querySelector('.board');

let choosenTime = 0;
let score = 0;



startButton.addEventListener('click', (event) => {
	event.preventDefault();  //! отменяем действие по умолчанию - добавление в адресную строку значения из href (у нас там #)
	screens[0].classList.add('up')  //! первому "экрану" (индекс 0) добавляем класс "up", т.е. он передвинется наверх, и станет виден второй экран
});

timeBoard.addEventListener('click', function (event) {

	if (event.target.classList.contains('time-btn')) {
		let valueAttr = event.target.dataset.time;  //! значение атрибута data-time, прописанное в HTML у кнопок
		choosenTime = parseInt(valueAttr);  //! превращаем полученную из атрибута строку в число
		startGame();
	};
});

mainBoard.addEventListener('click', function (event) {

	if (event.target.classList.contains('circle')) {
		score += 1;
		event.target.remove();  //! удаляем старый кружок
		createRandomCircle();  //! создаём новый кружок
	};
});

function startGame() {

	screens[1].classList.add('up')  //! второму "экрану" (индекс 1) добавляем класс "up", т.е. он передвинется наверх, и станет виден третий экран

	//! сначала вписываем выбранное время, а потом уменьшаем его каждую секунду функцией decreaseTime
	currentTimeElement.innerHTML = `00:${choosenTime}`;
	setInterval(decreaseTime, 1000);  //! функция по уменьшению времени вызывается каждую секунду

	createRandomCircle();  //! появляется кружок
};

function decreaseTime() {

	if (choosenTime === 0) {
		finishGame();
	} else {
		choosenTime -= 1;
		let currentTime = choosenTime;

		if (currentTime < 10) {
			currentTime = `0${currentTime}`;  //! если время состоит из одной цифры, то добавляем ноль для красивой записи 09, 08 и т.д.
		};

		currentTimeElement.innerHTML = `00:${currentTime}`;
	};
};

function finishGame() {
	//! сделаем невидимым при помощи класса "hide" заголовок <h3>Осталось <span class="currentTime">00:00</span></h3>:
	currentTimeElement.parentNode.classList.add('hide');  //! т.е. этот заголовок является родителем нашего currentTimeElement
	//! при помощи innerHTML мы сразу и чистим доску от кружочка, и добавляем надпись с результатом игры
	mainBoard.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
};

function createRandomCircle() {
	const circle = document.createElement('div');
	const sizeCircle = getRandomNumber(10, 60);
	const widthMainBoard = mainBoard.getBoundingClientRect().width;  //! получаем ширину игрового поля
	const heightMainBoard = mainBoard.getBoundingClientRect().height;  //! получаем высоту игрового поля
	const x = getRandomNumber(0, widthMainBoard - sizeCircle);  //! нужно отнимать размер кружка, чтобы он не вылез за края игрового поля
	const y = getRandomNumber(0, heightMainBoard - sizeCircle);  //! нужно отнимать размер кружка, чтобы он не вылез за края игрового поля

	circle.classList.add('circle');
	circle.style.width = `${sizeCircle}px`;
	circle.style.height = `${sizeCircle}px`;
	circle.style.left = `${x}px`;
	circle.style.top = `${y}px`;
	circle.style.backgroundColor = `${getRandomColor()}`;

	mainBoard.append(circle);
};

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);  //! алгоритм получения случайного числа из заданного интервала
};



