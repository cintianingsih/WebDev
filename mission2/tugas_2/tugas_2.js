const dino = document.getElementById("dino");
const kaktus = document.getElementById("cactus");
const playerScore = document.getElementById("score");

let score = 0;
let interval = null;

let jumlahScore = () => {
    score++;
    playerScore.innerHTML = `Score : ${score}`;
};

function jump() {
    if (dino.classList != "animate") {
        dino.classList.add("animate");
    }
    setTimeout(function () {
        dino.classList.remove("animate");
    }, 500);
    let score = 0;
    interval = setInterval(jumlahScore, 100);
}

const ifHitCactus = setInterval(function () {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    const cactusleft = parseInt(window.getComputedStyle(kaktus).getPropertyValue("left"));

    if (cactusleft < 90 && cactusleft > 0 && dinoTop >= 80) {
        kaktus.style.animation = "none";
        kaktus.style.display = "none";

        const message = `Ups! Dino menabrak kaktus. Skor Anda : ${score}`;
        alert(message);

        score = 0;
        playerScore.innerHTML = `Score : ${score}`;
        window.location.reload();
    }
});
