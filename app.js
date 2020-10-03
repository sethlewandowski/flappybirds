document.addEventListener('DOMContentLoaded', () => {
	const bird = document.querySelector('.bird');
	const gameDisplay = document.querySelector('.game-container');
	const ground = document.querySelector('.ground');
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
	let birdLeft = vw * .1;
	let birdBottom = vh * .5;
	let birdTop = birdBottom + 60; // get top of bird for intersection with upper obstacle
	let obstacleHeight = vh * .4; // as stated in css
	let gravity = 1.5; // speed that bird falls 
	let isGameOver = false;
	let groundHeight = vh * .2;
	console.log(`screen width: ${vw} and screen height: ${vh}`)

	document.addEventListener('click', jump);
	document.addEventListener('touchstart', jump); //listen for keyup then call jump

	let gameTimerId = setInterval(startGame, 20); // run every 20 miliseconds

	function startGame(){
		birdBottom -= gravity; 
		bird.style.bottom = birdBottom + 'px';
		bird.style.left = birdLeft + 'px';
	}	
	
	function jump() {
		if (birdBottom < vh - 60) {
			birdBottom += 40;
			bird.style.bottom = birdBottom + 'px';
		}
	}

	function generateObstacle(){
		let gap = (.3*vh) + (Math.random() * 100); // distance between upper and lower obstacle
		let obstacleLeft = vw; // start obstacle at right edge of container
		let obstacleBottom = (Math.random() * 100); // give it a random height
		
		const bottomObstacle = document.createElement('div');
		const topObstacle = document.createElement('div');
		
		if (!isGameOver){
			bottomObstacle.classList.add('bottomObstacle');
			topObstacle.classList.add('topObstacle');
		} 
		gameDisplay.appendChild(bottomObstacle); 
		gameDisplay.appendChild(topObstacle);

		bottomObstacle.style.left = obstacleLeft + 'px'; // start off screen to right
		topObstacle.style.left = obstacleLeft + 'px'; // start off screen to right
		bottomObstacle.style.bottom = obstacleBottom + 'px'; //start at bottom of screen
		topObstacle.style.bottom = obstacleHeight + gap + 'px'; // start at top of screen


		function moveObstacle() {
			obstacleLeft -=2;
			bottomObstacle.style.left = obstacleLeft + 'px';
			topObstacle.style.left = obstacleLeft + 'px';

			// if obstacle is off the screen, remove it
			if (obstacleLeft < 0){
				clearInterval(gameTimerId);
				gameDisplay.removeChild(bottomObstacle);
				gameDisplay.removeChild(topObstacle);
			} 

			// 
			if (birdBottom < 0 || // hits the ground OR

				(obstacleLeft  < birdLeft + 60
					&& 
				(birdBottom < (obstacleBottom + obstacleHeight - groundHeight)))
				||

				(obstacleLeft < birdLeft + 60 &&
					(birdBottom + 80 > (obstacleBottom + obstacleHeight + gap - groundHeight))
				)) {
				gameOver();
				clearInterval(gameTimerId);
			}
		}
		let gameTimerId = setInterval(moveObstacle, 20);
		
		if (!isGameOver) setTimeout(generateObstacle, 3000);  // create a new obstacle every 3 seconds
	}

	generateObstacle();

	function gameOver() {
		clearInterval(gameTimerId);
		console.log(`game over. birdbottom was ${birdBottom}`)
		isGameOver = true;
		document.removeEventListener('touchstart', jump);
		document.removeEventListener('click', jump);
	}
})







