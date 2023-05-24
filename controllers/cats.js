const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/catFoodRecs.json");
const rawdata = fs.readFileSync(filePath, "utf8");

const filePathCats = path.join(__dirname, "../data/cats.json");
const rawdataCats = fs.readFileSync(filePathCats, "utf8");

let jsonCatFoodRecs = JSON.parse(rawdata);
let jsonCats = JSON.parse(rawdataCats);

const addCatFoodRecs = async (
  nameInput,
  foodTypeInput,
  ageInput,
  activityInput,
  raceInput
) => {
  try {
    const catProduct = await [];

    for (let i = 0; i < jsonCatFoodRecs.length; i++) {
      const item = jsonCatFoodRecs[i];
      console.log(item);

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

const getAllCat = async () => {
  try {
    const catData = await [];
    for (let i = 0; i < jsonCats.length; i++) {
      const cat = jsonCats[i];

      catData.push(cat);
    }

    // console.log(catData);
    return catData;
  } catch (error) {
    throw error;
  }
};

const getCatById = async (id) => {
  try {
    const catData = await jsonCats.find((cat) => cat.id === id);

    console.log(catData);
    return catData;
  } catch (error) {
    throw error;
  }
};

module.exports = { addCatFoodRecs, getAllCat, getCatById };
