const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/catFoodRecs.json");
const rawdata = fs.readFileSync(filePath, "utf8");

let jsonCatFoodRecs = JSON.parse(rawdata);

const addCatFoodRecs = async (
  nameInput,
  foodTypeInput,
  ageInput,
  activityInput,
  raceInput
) => {
  try {
    const catProduct = [];

    for (let i = 1; i < jsonCatFoodRecs.length; i++) {
      const item = jsonCatFoodRecs[i];

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
              const dataCat = {
                id: item.id,
                name: nameInput,
                brand: item.brand,
                productName: item.productName,
                // foodType: item.foodType,
                // age: item.age,
                // activity: item.activity,
                race: item.race,
                productLink: item.productLink,
              };

              catProduct.push(dataCat);
            }
          }
        }
      }
    }

    return catProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = addCatFoodRecs;
