const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let lives = 3;
let score = 0;
let zombies = [];
let gameOver = false;

const heartImage = new Image();
heartImage.src = 'elements/full_heart.png';

const emptyheartImage = new Image();
emptyheartImage.src = 'elements/empty_heart.png';

const crosshairImage = new Image();
crosshairImage.src = 'elements/aim.png';

const zombieImage = new Image();
zombieImage.src = 'elements/walkingdead.png';

const zombieSpriteWidth = 200;
const zombieSpriteHeight = 312;
const totalFrames = 10;

function spawnZombie() {
    zombies.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 50),
        speed: Math.random() * 2 + 1,
        size: Math.random() * 40 + 40,
        frame: 0,
    });
}

function drawUI() {

    ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);
    for (let i = 0; i < 3; i++) {
        if (i < lives) {
            ctx.drawImage(heartImage, 10 + i * 40, 10, 30, 30);
        } else {
            ctx.drawImage(emptyheartImage, 10 + i * 40, 10, 30, 30);
        }
    }
}

function drawCrosshair(mouseX, mouseY) {
    ctx.drawImage(crosshairImage, mouseX - 20, mouseY - 20, 40, 40);
}

function updateZombies() {
    for (let i = zombies.length - 1; i >= 0; i--) {
        const zombie = zombies[i];
        zombie.x -= zombie.speed;


        zombie.frame = (zombie.frame + 1) % totalFrames;


        ctx.drawImage(zombieImage, zombie.frame * zombieSpriteWidth, 0, zombieSpriteWidth, zombieSpriteHeight,zombie.x, zombie.y, zombie.size, (zombie.size * zombieSpriteHeight) / zombieSpriteWidth);

        if (zombie.x + zombie.size < 0) {
            zombies.splice(i, 1);
            lives -= 1;
            if (lives <= 0) {
                endGame();
            }
        }
    }
}

function endGame() {
    gameOver = true;
    canvas.style.cursor = 'default';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('music').play();
}

function restartGame() {
    lives = 3;
    score = 0;
    zombies = [];
    gameOver = false;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('music').pause();
    document.getElementById('music').currentTime = 0;
    canvas.style.cursor = 'none';
    animate();
}

canvas.addEventListener('click', (e) => {
    if (gameOver) return;
    const mouseX = e.clientX ;
    const mouseY = e.clientY;
    let hit = false;

    for (let i = zombies.length - 1; i >= 0; i--) {
        const zombie = zombies[i];
        if (
            mouseX >= zombie.x &&
            mouseX <= zombie.x + zombie.size &&
            mouseY >= zombie.y &&
            mouseY <= zombie.y + zombie.size
        ) {
            hit = true;
            score += 20;
            zombies.splice(i, 1);
            break;
        }
    }
    if (!hit) {
        score = Math.max(0, score - 5);
    }
});

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});



function animate() {
    if (gameOver) return;



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateZombies();
    drawUI();
    drawCrosshair(mouseX, mouseY);

    requestAnimationFrame(animate);
}

setInterval(spawnZombie, 1000);
animate();