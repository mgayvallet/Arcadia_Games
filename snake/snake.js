document.addEventListener("DOMContentLoaded", () => {
    const openRulesBtn = document.getElementById("open-rules");
    const modal = document.getElementById("rules-modal");
    const closeModal = document.querySelector(".modal .close");

    openRulesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex"; 
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snake-game");
    const ctx = canvas.getContext("2d");

    const tileSize = 20;
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    let snake = [{ x: 3 * tileSize, y: 3 * tileSize }];
    let direction = "RIGHT";
    let food = spawnFood();
    let score = 0;
    let gameRunning = false;

    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        if (!gameRunning) {
            gameRunning = true;
            score = 0;
            snake = [{ x: 3 * tileSize, y: 3 * tileSize }];
            direction = "RIGHT";
            food = spawnFood();
            document.getElementById("score").textContent = score;
            gameLoop();
        }
    });

    function gameLoop() {
        if (!gameRunning) return;
        setTimeout(() => {
            update();
            draw();
            gameLoop();
        }, 150);
    }

    function spawnFood() {
        const x = Math.floor(Math.random() * cols) * tileSize;
        const y = Math.floor(Math.random() * rows) * tileSize;
        return { x, y };
    }

    function update() {
        const head = { ...snake[0] };
        if (direction === "UP") head.y -= tileSize;
        if (direction === "DOWN") head.y += tileSize;
        if (direction === "LEFT") head.x -= tileSize;
        if (direction === "RIGHT") head.x += tileSize;

        if (
            head.x < 0 || head.x >= canvas.width || 
            head.y < 0 || head.y >= canvas.height || 
            snake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            gameRunning = false;
            alert(`Game Over! Votre score : ${score}`);
            return;
        }

        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById("score").textContent = score;
            food = spawnFood();
        } else {
            snake.pop();
        }

        snake.unshift(head);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#2c3e50";
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
        });
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(food.x, food.y, tileSize, tileSize);
    }

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });
});
