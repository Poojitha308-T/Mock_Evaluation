function displayCar(){
    console.log("Car");
}
function displayTruck(){
    console.log("Truck");
}
function displayBike(){
    console.log("Bike");
}
function vehicleInfo(vehicleCategory,callbackFn)
{
    callbackFn();
}
vehicleInfo("Car", displayCar);
vehicleInfo("Truck", displayTruck);
vehicleInfo("Bike", displayBike);