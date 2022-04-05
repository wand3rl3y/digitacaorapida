const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0, 0, 0, 0]
var intervalo
var tempoCorrido = false;

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}


// Executa um timer padrão de minuto / segundo / centésimos:

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Verifica se texto digitado com o fornecido na página:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length)

    if (textEntered == originText) {
        clearInterval(intervalo);
        testWrapper.style.borderColor = "green";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}

// Inicia o cronômetro:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !tempoCorrido) {
        tempoCorrido = true;
        intervalo = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Função de recomeçar:
function reset() {
    clearInterval(intervalo);
    intervalo = null;
    timer = [0, 0, 0, 0];
    tempoCorrido = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Listeners de eventos para entrada de teclado e o botão de recomeçar:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);





