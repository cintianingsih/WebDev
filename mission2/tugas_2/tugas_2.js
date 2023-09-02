const char = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const playerScore = document.getElementById("score")

let score = 0
let interval = null

let jumlahScore = ()=>{
    score++
    playerScore.innerHTML = `score : ${score}`
}

function jump(){
    if(char.classList != "animate"){
        char.classList.add("animate");
    }
    setTimeout(function(){
        char.classList.remove("animate")
    }, 500)
    let score = 0
    interval = setInterval(jumlahScore, 100)
}

const ifHitCactus = setInterval(function(){
    const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
    const cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if(cactusleft< 90 && cactusleft> 0 && charTop >= 90){
        cactus.style.animation ="none"
        cactus.style.display ="none"
        if(confirm("dino nabrak katus")){
            window.location.reload()
        }
    }
})
