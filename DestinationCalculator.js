var interval;
var elapsedTimeEverySecond = 0;
var totalDistance = 0; // Initialize total distance;
var lastStartTime;
var isContinue = false;
var remainingFuel;

if (document.getElementById("startPoint").value != '') {
    document.getElementById('error-select1').textContent = '';
}




document.getElementById("stopInfo").style.display = 'none';
document.getElementById("fuelAndTimeInfo").style.display = 'none';
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

//calculate the time and distannce travel part base on time
document.getElementById('btnStart').addEventListener('click', function () {

    var startPoint = document.getElementById("startPoint").value;
    var errorSelect1 = document.getElementById('error-select1');
    const avgSpeed = document.getElementById('avgSpeed').value;
    const fuelEffiency = document.getElementById('fuelEffiency').value;
    const currentFuelLevel = document.getElementById('currentFuelLevel').value;


    var endPoint = document.getElementById("endPoint").value;
    var errorSeelct2 = document.getElementById("error-select2");
    var errorSelect1 = document.getElementById('error-select1');
    var errorSelect2 = document.getElementById('error-select2');
    var errorAvgSpeed = document.getElementById('errorAvgSpeed');
    var errorFuelEffiency = document.getElementById('errorFuelEffiecny');
    var errorCurrentFuelLevel = document.getElementById('errorCurrentFuelLevel');

    //Reseting previous error message;
    errorSelect1.textContent = '';
    errorSeelct2.textContent = '';


    document.getElementById('startPoint').addEventListener('change', function () {
        if (this.value) {
            errorSelect1.textContent = '';
        }
    })

    document.getElementById('endPoint').addEventListener('change', function () {
        if (this.value) {
            errorSeelct2.textContent = '';
        }
    })



    if (!startPoint || !endPoint) {
        if (!startPoint) {
            errorSelect1.textContent = 'Please select a start point.';
        }
        if (!endPoint) {
            errorSeelct2.textContent = 'Please select an end point.';
        }
    }
    else if (!avgSpeed) {
        errorAvgSpeed.textContent = 'Please enter average speed.';
    }
    else if (!fuelEffiency) {
        errorFuelEffiency.textContent = 'Please enter fuel effiency.';
    }
    else if (!currentFuelLevel) {
        errorCurrentFuelLevel.textContent = 'Please enter current fuel level.';
    }
    else {
        if (!interval || isContinue) {
            lastStartTime = new Date().getTime() - elapsedTimeEverySecond * 1000;

            //Reset Flag
            isContinue = false;

            interval = setInterval(function () {
                elapsedTimeEverySecond = Math.floor((new Date().getTime() - lastStartTime) / 1000);

                // update the display time
                document.getElementById('countTime').innerText = formatTime(elapsedTimeEverySecond);

                // totalDistance = calculateDistance(avgSpeed, elapsedTimeEverySecond);
                document.getElementById('stopInfo').style.display = 'none';
                document.getElementById('fuelAndTimeInfo').style.display = 'none';
            }, 1000)
        }
    }
});

document.getElementById("btnStop").addEventListener("click", function () {

    const startPoint = document.getElementById('startPoint').value;
    const endPoint = document.getElementById('endPoint').value;
    const avgSpeed = document.getElementById('avgSpeed').value;
    const fuelEffiency = document.getElementById('fuelEffiency').value;
    const currentFuelLevel = document.getElementById('currentFuelLevel').value;


    var errorSelect1 = document.getElementById('error-select1');
    var errorSelect2 = document.getElementById('error-select2');
    var errorAvgSpeed = document.getElementById('errorAvgSpeed');
    var errorFuelEffiency = document.getElementById('errorFuelEffiecny');
    var errorCurrentFuelLevel = document.getElementById('errorCurrentFuelLevel');


    if (startPoint === '') {
        errorSelect1.textContent = 'Please select a start point.';
    }
    else if (endPoint === '') {
        errorSelect2.textContent = "Please select an end point.";
    }
    else if (!avgSpeed) {
        errorAvgSpeed.textContent = 'Please enter average speed.';
    }
    else if (!fuelEffiency) {
        errorFuelEffiency.textContent = 'Please enter fuel effiency.';
    }
    else if (!currentFuelLevel) {
        errorCurrentFuelLevel.textContent = 'Please enter current fuel Level.';
    }
    else {
        clearInterval(interval);
        interval = null;

        // Update the displayed total distance
        document.getElementById('distanceTravel').innerText = totalDistance + " Km";

        // Display the total distance in the stopInfo div
        document.getElementById("stopInfo").style.display = 'block';

        //Display the RemainingTimeUntilArrival and the RemaingFuel
        document.getElementById("fuelAndTimeInfo").style.display = 'flex';

        // Display the total distance in the stopInfo div
        document.getElementById("stopInfo").innerHTML = '<p>Distance Travel : <span id="distanceTravel">' + totalDistance + '</span> Km</p>';

        //Display the remaining time until arrival
        document.getElementById("RemainingTime").innerText = calculateRemaingTimeUntilArrival()

        const avgSpeed = parseFloat(document.getElementById('avgSpeed').value);

        totalDistance = calculateDistance(avgSpeed, elapsedTimeEverySecond);

        document.getElementById('distanceTravel').innerText = totalDistance;


        //Display the remaining Fuel Level 
        const fuelEffiency = parseFloat(document.getElementById('fuelEffiency').value);

        calculateReamingFuel(fuelEffiency, totalDistance);
        checkFuelLevel();
    }

    document.getElementById('startPoint').addEventListener('change', function () {
        if (this.value) {
            errorSelect1.textContent = '';
        }
    })

    document.getElementById('endPoint').addEventListener('change', function () {
        if (this.value) {
            errorSelect2.textContent = '';
        }
    })
});

document.getElementById("btnClear").addEventListener("click", function () {
    // Clear the interval if it's running
    clearInterval(interval);

    interval = null;
    elapsedTimeEverySecond = 0;
    // Reset all values to their initial state
    document.getElementById("countTime").innerText = "0h 0m 0s";
    document.getElementById("distanceTravel").innerText = "0";
    document.getElementById("avgSpeed").value = "";
    document.getElementById("startPoint").selectedIndex = 0;
    document.getElementById("endPoint").selectedIndex = 0;
    document.getElementById("totalDistance").innerHTML = "0 km";
    document.getElementById("fuelEffiency").value = ""
    document.getElementById("stopInfo").style.display = 'none';
    document.getElementById('RemainingTime').innerText = '0h 0m 0s';
    document.getElementById('remainingFuel').innerText = '0';
    document.getElementById('currentFuelLevel').value = '';
    document.getElementById('error-select1').textContent = '';
    document.getElementById('error-select2').textContent = '';
    document.getElementById('errorFuelEffiecny').textContent = '';
    document.getElementById('errorCurrentFuelLevel').textContent = '';
    document.getElementById('errorAvgSpeed').textContent = '';


    document.getElementById('stopInfo').style.display = 'none';
    document.getElementById('fuelAndTimeInfo').style.display = 'none';
});

//calculate the distance travel base on average speed and duration travel
const calculateDistance = (avgSpeed, second) => {
    const distance = (avgSpeed * second / 3600).toFixed(2);
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
const calculateReamingFuel = (fuelEffiency, distanceTraveled) => {

    console.log("Fuel Effiency :", fuelEffiency)
    console.log("Distance Travel :", distanceTraveled)

    const fuelConsumed = distanceTraveled / fuelEffiency;

    const currentFuelLevel = parseFloat(document.getElementById("currentFuelLevel").value);

    remainingFuel = Math.max(currentFuelLevel - fuelConsumed, 0);

    document.getElementById('remainingFuel').innerText = remainingFuel.toFixed(2);

    return remainingFuel;
}

//function to check the fuel level
function checkFuelLevel() {

    const remainingFuelLevel = parseFloat(document.getElementById("remainingFuel").textContent);

    console.log("remaining fuel level : ", remainingFuelLevel)

    if (0.5 <= remainingFuelLevel && remainingFuelLevel <= 1) {
        showFuelAlertModal()
    }
}

function showFuelAlertModal() {
    document.getElementById("fuelAlertModal").classList.remove('hidden');
}

function hideFuelAlertModal() {
    document.getElementById('fuelAlertModal').classList.add("hidden")
}

function submitFuelLevel() {
    const newFuelLevel = parseFloat(document.getElementById("newFuelLevelInput").value) + parseFloat(document.getElementById('remainingFuel').textContent)

    if (!isNaN(newFuelLevel)) {
        document.getElementById("currentFuelLevel").value = newFuelLevel;
    } else {
        console.log("Invalid Input. Please Enter a valid number.")
    }

    console.log(remainingFuel)
}

document.getElementById("submitFuelLevel").addEventListener("click", function () {
    submitFuelLevel()

    document.getElementById("fuelAlertModal").classList.add("hidden");
})



document.getElementById('avgSpeed').addEventListener('keyup', function () {
    var inputValue = this.value;
    var errorAvgSpeed = document.getElementById('errorAvgSpeed');
    var regex = /^\d*\.?\d*$/;

    if (!regex.test(inputValue)) {
        errorAvgSpeed.textContent = 'Please Enter Number Only.';
    } else {
        errorAvgSpeed.textContent = '';
    }
})

document.getElementById('fuelEffiency').addEventListener('keyup', function () {
    var inputValue = this.value;
    var errorFuelEffiecny = document.getElementById('errorFuelEffiecny');

    var regex = /^\d*\.?\d*$/;

    if (!regex.test(inputValue)) {
        errorFuelEffiecny.textContent = 'Please Enter Number Only.';
    } else {
        errorFuelEffiecny.textContent = '';
    }
})

document.getElementById('currentFuelLevel').addEventListener('keyup', function () {
    var inputValue = this.value;
    var errorCurrentFuelLevel = document.getElementById('errorCurrentFuelLevel');

    var regex = /^\d*\.?\d*$/;

    if (!regex.test(inputValue)) {
        errorCurrentFuelLevel.textContent = 'Please Enter Number Only.';
    } else {
        errorCurrentFuelLevel.textContent = '';
    }
})

document.getElementById('newFuelLevelInput').addEventListener('keyup', function () {
    var inputValue = this.value;
    var errorNewFuelLevel = document.getElementById('errorNewFuelLevel');

    var regex = /^\d*\.?\d*$/;

    if (!regex.test(inputValue)) {
        errorNewFuelLevel.textContent = 'Please Enter Number Only.';
    } else {
        errorNewFuelLevel.textContent = '';
    }
})





//time formatter
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = Math.round(seconds % 60);

    return hours + "h " + minutes + "m " + remainingSeconds + "s";
} 