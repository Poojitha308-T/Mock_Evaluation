let user = {
  name: "Alice",
  address: {
    city: "Bengaluru",
    pin: 560001,
    geo: { lat: 11.22, lng: 77.33 }
  }
};
const {address:{city}}=user;
const {address:{geo:{lat}}}=user;
const {address:{geo:{lng}}}=user;
console.log(city);
console.log(lat);
console.log(lng);