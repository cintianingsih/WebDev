const gajah = document.getElementById("gajah");
const pohon = document.getElementById("pohon");
const playerScore = document.getElementById("score");

let score = 0;
let interval = null;

let jumlahScore = () => {
    score++;
    playerScore.innerHTML = `Score : ${score}`;
};

function jump() {
    if (gajah.classList != "animate") {
        gajah.classList.add("animate");
    }
    setTimeout(function () {
        gajah.classList.remove("animate");
    }, 500);
    let score = 0;
    interval = setInterval(jumlahScore, 100);
}

const ifHitpohon = setInterval(function () {
    const gajahTop = parseInt(window.getComputedStyle(gajah).getPropertyValue("top"));
    const pohonleft = parseInt(window.getComputedStyle(pohon).getPropertyValue("left"));

    if (pohonleft < 90 && pohonleft > 0 && gajahTop >= 70) {
        pohon.style.animation = "none";
        pohon.style.display = "none";

        const message = `Ups! lylia menabrak menabrak pohon. Skor Anda : ${score}`;
        alert(message);

        score = 0;
        playerScore.innerHTML = `Score : ${score}`;
        window.location.reload();
    }
});
