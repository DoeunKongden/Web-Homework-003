var interval;
var elapsedTimeEverySecond;
var totalDistance = 0; // Initialize total distance


document.getElementById("stopInfo").style.display = 'none';
//calculate distance part
const distances = {
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


document.getElementById('startPoint').addEventListener('change', updateTotalDistance)
document.getElementById('endPoint').addEventListener('change', updateTotalDistance)


function updateTotalDistance() {
    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;

    if (startPoint && endPoint) {
        const combinationKey = `${startPoint}_${endPoint}`;
        const totalDistance = distances[combinationKey] || 0;
        document.getElementById('totalDistance').textContent = `${totalDistance} Km`
    }
}


document.getElementById("btnClear").addEventListener("click", function () {
    // Clear the interval if it's running
    clearInterval(interval);

    // Reset all values to their initial state
    document.getElementById("countTime").innerText = "";
    document.getElementById("distanceTravel").innerText = "0 ";
    document.getElementById("avgSpeed").value = "";
    document.getElementById("startPoint").selectedIndex = 0;
    document.getElementById("endPoint").selectedIndex = 0;
    document.getElementById("totalDistance").innerHTML = "0 ";
    document.getElementById("fuelEffiency").value = ""
    document.getElementById("stopInfo").style.display = 'none';
    document.getElementById('RemainingTime').innerText = '0h 0m 0s';
    document.getElementById('remainingFuel').innerText =  '0';
    document.getElementById('currentFuelLevel').value =  0;
});


//calculate the time and distannce travel part base on time
document.getElementById('btnStart').addEventListener('click', function () {
    var startTime = new Date().getTime();
    const avgSpeed = parseFloat(document.getElementById('avgSpeed').value);

    interval = setInterval(function () {

        elapsedTimeEverySecond = Math.floor((new Date().getTime() - startTime) / 1000);

        //update the display time
        document.getElementById('countTime').innerText = formatTime(elapsedTimeEverySecond);

        totalDistance = calculateDistance(avgSpeed, elapsedTimeEverySecond);


        document.getElementById('distanceTravel').innerText = totalDistance + "Km";

    }, 1000)



    document.getElementById("btnStop").addEventListener("click", function () {
        clearInterval(interval);
        // Update the displayed total distance
        document.getElementById('distanceTravel').innerText = totalDistance + " Km";
        // Display the total distance in the stopInfo div
        document.getElementById("stopInfo").style.display = 'block';
        // Display the total distance in the stopInfo div
        document.getElementById("stopInfo").innerHTML = '<p>Distance Travel : <span id="distanceTravel">' + totalDistance + '</span> Km</p>';

        //Display the remaining time until arrival
        document.getElementById("RemainingTime").innerText = calculateRemaingTimeUntilArrival()


        //Displau the remaining Fuel Level 
        const fuelEffiency = parseFloat(document.getElementById('fuelEffiency').value);

        calculateReamingFuel(fuelEffiency, elapsedTimeEverySecond);

    });
})



//calculate the distance travel base on average speed and duration travel
const calculateDistance = (avgSpeed, second) => {
    const distance = (((avgSpeed * second).toFixed(2)) / 3600).toFixed(2);
    return distance
}



//Calculate the remaining time until arrival
const calculateRemaingTimeUntilArrival = () => {
    const avgSpeed = parseFloat(document.getElementById('avgSpeed').value);
    const totalDistance = parseFloat(document.getElementById('totalDistance').textContent)
    // Check if avgSpeed is non-zero to avoid division by zero
    if (avgSpeed !== 0) {
        const timeTakeToArrive = totalDistance / avgSpeed; // Calculate time in hours

        // Get the elapsed time in seconds
        const elapsedTime = elapsedTimeEverySecond;

        // Calculate remaining time in seconds
        const remainingTime = Math.max(timeTakeToArrive * 3600 - elapsedTime, 0);

        // Format the remaining time
        const formattedRemainingTime = formatTime(remainingTime);

        return formattedRemainingTime;
    } else {
        // Handle the case where avgSpeed is 0
        return "Invalid Input: Average speed should be greater than 0";
    }
}


//calculate the remaining fuel
const calculateReamingFuel = (fuelEffiency, elapsedTime) => {


    console.log("elapsed Time  : ", elapsedTime)
    const fuelEffiencyToSeconds = fuelEffiency / 3600;
    const fuelConsumed = fuelEffiencyToSeconds * elapsedTime;

    console.log("fuel effiency to second ", fuelEffiencyToSeconds)
    console.log("fuel Consumed ", fuelConsumed)

    const currentFuelLevel = parseFloat(document.getElementById("currentFuelLevel").value);

    const remainingFuel = Math.max(currentFuelLevel - fuelConsumed, 0);

    document.getElementById('remainingFuel').innerText = remainingFuel.toFixed(2) + "Liters";

    return remainingFuel;
}



//time formatter
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = Math.round(seconds % 60);

    return hours + "h " + minutes + "m " + remainingSeconds + "s";
} 