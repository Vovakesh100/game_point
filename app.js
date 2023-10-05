const startBtn = document.querySelector('#start');
console.log(startBtn);
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const restartBtn = document.createElement('a');
restartBtn.className = 'restart-btn';
restartBtn.textContent = 'Restart';
const colors = ['#FF69B4', '#3498DB', '#FFD700 ', '#00FF7F', '#FF4500'];
let time = 0;
let score = 0;
const boardText = `<div class="viewport"><h1>Счет: <span class="primary">${score}</span> </h1> </div>`;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	}
	let currnet = --time;
	if (currnet < 10) {
		currnet = `0${currnet}`;
	}
	timeEl.innerHTML = `00:${currnet}`;
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	board.innerHTML = boardText;
	board.appendChild(restartBtn);
	timeEl.parentNode.classList.add('hide');
	startBtn.parentNode.classList.add('hide');
}

function createRandomCircle() {
	const circle = document.createElement('div');
	board.append(circle);
	const color = getRandomColor();
	const size = getRandomNumber(10, 60);
	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = color;
	// circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}
restartBtn.addEventListener('click', event => {
	screens[1].classList.remove('up');
});

// function setColor(element) {
// 	const color = getRandomColor();
// 	element.style.backgroundColor = color;
// 	e.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
// }

// restartBtn.addEventListener('click', event => {
// 	startGame();
// 	timeEl.parentNode.classList.remove('hide');
// 	startBtn.parentNode.classList.remove('hide');
// 	const firstElement = board.querySelector('.viewport');
// 	const secondElement = board.querySelector('.restart-btn');
// 	firstElement.classList.add('hide');
// 	secondElement.classList.add('hide');
// });
