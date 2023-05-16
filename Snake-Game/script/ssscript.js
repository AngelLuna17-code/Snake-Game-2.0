document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.scenery div'); // Select all the squares on the screen
	const scoreDisplay = document.querySelector('span'); // Score display
	const startBtn = document.querySelector('.start'); //start button
	const startBtn2 = document.querySelector('.start2'); //start button
	const startBtn3 = document.querySelector('.start3'); //start button
	const countLives = document.querySelector('.lives'); //lives display

	const width = 10;
	let currentIndex = 0;
	let foodIndex = 0;
	let currentSnake = [2, 1, 0];
	let direction = 1;
	let score = 0;
	let intervalTime = 0;
	let interval = 0;
	let lives = 3;
	let highScore = localStorage.getItem('highScore') || 0;
	countLives.innerText = lives;
	let main = new Audio("audio/main.wav");
	let eat = new Audio("audio/coin03.ogg");
	let gemi2 = new Audio("audio/GameOver.wav");

	function startGame() { //Easy mode
		main.loop = true;
		main.play();
		currentSnake.forEach((index) => squares[index].classList.remove('snake')); // removes the previous snake and food from the screen
		squares[foodIndex].classList.remove('food');
		clearInterval(interval); // resets the score to 0.
		score = 0;
		randomFood();
		direction = 1;
		scoreDisplay.innerText = score; //score counting
		intervalTime = 250;
		currentSnake = [2, 1, 0];
		currentIndex = 100;
		currentSnake.forEach((index) => squares[index].classList.add('snake'));
		interval = setInterval(borderReturn, intervalTime);
	}

	function startGame2() { //Hard mode
		main.loop = true;
		main.play();
		currentSnake.forEach((index) => squares[index].classList.remove('snake')); // removes the previous snake and food from the screen
		squares[foodIndex].classList.remove('food');
		clearInterval(interval); // resets the score to 0.
		score = 0;
		randomFood();
		direction = 1;
		scoreDisplay.innerText = score; //score counting
		intervalTime = 100;
		currentSnake = [2, 1, 0];
		currentIndex = 100;
		currentSnake.forEach((index) => squares[index].classList.add('snake'));
		interval = setInterval(borderReturn, intervalTime);
	}

	function borderReturn() {
		//snake body movement
		const body = currentSnake.pop(); //add square
		squares[body].classList.remove('snake'); //renoves last part on array "snake"
		currentSnake.unshift(currentSnake[0] + direction);

		if (currentSnake[0] < 0) { // retuurn up & down
			currentSnake.unshift(currentSnake[0] + (width * width));
		} else if (currentSnake[0] >= (width * width)) {
			currentSnake.unshift(currentSnake[0] - (width * width));
		} else if (currentSnake[1] % width === width - 1 && direction === 1) {
			squares[currentSnake.pop()].classList.remove("snake"); //avoid snake take 1 square when it return
			currentSnake.unshift(currentSnake[1] - (width - 1)); //keep the snake in the same line
		} else if (currentSnake[1] % width === 0 && direction === -1) {
			squares[currentSnake.pop()].classList.remove("snake");
			currentSnake.unshift(currentSnake[1] + (width - 1));
		} else if (currentSnake[0] >= (width * width)) {
			currentSnake.unshift(currentSnake[0] - (width * width));
		}

		if (currentSnake.slice(1).includes(currentSnake[0])) { // body collision
			gemi2.play();
			lives--;
			countLives.innerText = lives;
			if (lives === 0) {
				main.pause();
				if (score > highScore && score != 0) {
					highScore = score;
					localStorage.setItem('highScore', highScore);
				}
				alert('¡Game over!');
				window.location.reload()
				clearInterval(interval);
			} else {
				while (currentSnake.length > 3) {
					const body = currentSnake.pop();
					squares[body].classList.remove('snake');

				}
			}
		}
		if (squares[currentSnake[0]].classList.contains('food')) {
			eat.play();
			squares[currentSnake[0]].classList.remove('food');
			squares[body].classList.add('snake');
			currentSnake.push(body);
			randomFood();
			score++;
			scoreDisplay.textContent = score;
			clearInterval(interval);
			interval = setInterval(borderReturn, intervalTime);
		}
		squares[currentSnake[0]].classList.add('snake');

	}

	function randomFood() {
		foodIndex = Math.floor(Math.random() * squares.length); //take a random index on scenery
		while (foodIndex === currentIndex || foodIndex === 100 || currentSnake.includes(foodIndex)) { //avoid the food take index 100 and same index of snake
			foodIndex = Math.floor(Math.random() * squares.length);
		}
		squares[foodIndex].classList.add('food'); //add class to selected index
	}

	//key codes controls
	function movementKeyControl(control) {
		squares[currentIndex].classList.remove('snake')
		if (control.keyCode === 38 && direction != +width) {
			direction = -width //up
		} else if (control.key === 'w' && direction != +width) {
			direction = -width //up
		} else if (control.keyCode === 40 && direction != -width) {
			direction = +width //down
		} else if (control.key === 's' && direction != -width) {
			direction = +width //down
		} else if (control.keyCode === 39 && direction != -1) {
			direction = 1 //right
		} else if (control.key === 'd' && direction != -1) {
			direction = 1 //right
		} else if (control.keyCode === 37 && direction != 1) {
			direction = -1 //left
		} else if (control.key === 'a' && direction != 1) {
			direction = -1 //left
		}
	}
	document.addEventListener('keyup', movementKeyControl)
	startBtn.addEventListener('click', startGame)
	startBtn2.addEventListener('click', startGame2)
	startBtn3.addEventListener('click', startGame3)
})
