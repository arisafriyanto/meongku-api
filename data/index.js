const fs = require("fs");

let rawdata = fs.readFileSync("recommendation2.json");
let jsonData = JSON.parse(rawdata);
// console.log(cats);
// for (let i = 0; i < jsonData.length; i++) {
//   const item = jsonData;
//   console.log(item);
// }

const foodTypeInput = "Dry";
const ageInput = 2;
const activityInput = "Both";
const raceInput = "British Shorthair";

for (let i = 1; i < jsonData.length; i++) {
  const item = jsonData[i];

  const race = item.race;
  if (race == raceInput) {
    const foodType = item.foodType;
    if (foodType == foodTypeInput) {
      const age = item.age;
      if (age == ageInput) {
        const activity = item.activity;
        if (activity == activityInput) {
          //   const productName = item.productName;
          //   const link = item.productLink;
          //   console.log(productName);
          //   console.log(link);
          console.log("ID:", item.id);
          console.log("Brand:", item.brand);
          console.log("Product Name:", item.productName);
          console.log("Food Type:", item.foodType);
          console.log("Age:", item.age);
          console.log("Activity:", item.activity);
          console.log("Race:", item.race);
          console.log("Product Link:", item.productLink);
          console.log("----------------------------------");
        }
      }
    }
  }
}
