
let averageSpeed, fuelEffiency, currentFuel, timerId, startTime;
let elapseTime = 0;
const startBtn = document.getElementById('btnStart');
const stopBtn = document.getElementById('btnStop');
const clearBtn = document.getElementById('btnClear');

const startPoint = document.getElementById('startPoint');
const endpoint = document.getElementById('endpoint');

const errorSelect1 = document.getElementById('error-select1');
const errorSelect2 = document.getElementById('error-select2');




const distance = {
    KoreaSoftwareHRDCenter_AeonMallSenSok: 370,
    KoreaSoftwareHRDCenter_AmazonKPK: 220,
    KoreaSoftwareHRDCenter_PidaoCafe: 200,
    KoreaSoftwareHRDCenter_EdenGarden: 310,
    RiverSide_AeonMallSenSok: 820,
    RiverSide_AmazonKPK: 380,
    RiverSide_PidaoCafe: 410,
    RiverSide_EdenGarden: 270,
    PochentongAirport_AeonMallSenSok: 900,
    PochentongAirport_AmazonKPK: 700,
    PochentongAirport_PidaoCafe: 720,
    PochentongAirport_EdenGarden: 880,
    AeonMall1_AeonMallSenSok: 110,
    AeonMall1_AmazonKPK: 560,
    AeonMall1_PidaoCafe: 570,
    AeonMall1_EdenGarden: 530
}

document.getElementById('startPoint').addEventListener('change', updateTotalDistance());
document.getElementById('endPoint').addEventListener('change', updateTotalDistance);


function updateTotalDistance() {
    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;
    if (startPoint && endPoint) {
        const combinationPoint = `${startPoint}_${endPoint}`;
        const totalDistanceValue = distance[combinationPoint] || 0;
        document.getElementById('totalDistance').textContent = `${totalDistanceValue} km`;
    }
}


//function to start the timer
function startTimer() {
    if(startPoint.value == ''){

    }


    startTime = Date.now() - elapseTime * 1000;
    timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    console.log("result :", currentTime - startTime)
    elapseTime = (currentTime - startTime) / 1000;
    displayTime(elapseTime)
}

function displayTime(time) {
    const formattedTime = formatTime(time)
    document.getElementById('countTime').innerText = formattedTime
}

startBtn.addEventListener('click', startTimer)

function formatTime(seconds) {
    let hour = Math.floor(seconds / 3600);
    let minute = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = Math.round(seconds % 60);
    return hour + 'h ' + minute + 'm ' + remainingSeconds + 's';
}