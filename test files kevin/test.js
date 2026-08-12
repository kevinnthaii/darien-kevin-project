//FoodData central API key (U.S agricultural) 
const apiKey = 'HC5yHN6QbG53eqJW8sUkqwrJRLp3zi1wpfGAbFKh';

async function getFoodSearch(food) {
    const searchEndpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&dataType=Branded&pageSize=5&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&brandOwner=Kar%20Nut%20Products%20Company&api_key=HC5yHN6QbG53eqJW8sUkqwrJRLp3zi1wpfGAbFKh`;

    //const searchEndpoint = '/.netlify/functions/askNutri';

    const options = {
        method: 'GET',
        // body: JSON.stringify({
        //     message: food
    }
    try {
        let response = await fetch(searchEndpoint, options);
        //console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }

}

const foodInput = document.querySelector('#enterFood');
const searchFoodBtn = document.querySelector('#searchFood');

function getNutrientValue(nutrientsArray, nutrientName) {
    const nutrient = nutrientsArray.find(n => n.nutrientName === nutrientName);
    return nutrient ? `${nutrient.value} ${nutrient.unitName}` : 'N/A';
}

async function displayFoods(event) {
    event.preventDefault();

    const foodValue = foodInput.value.trim();
    if (!foodValue) return;
    const data = await getFoodSearch(foodValue);
    const foodsArray = data.foods;
    console.log(foodsArray);

    const resultsList = document.querySelector('#resultsList');
    resultsList.innerHTML = '';

    for (let food of foodsArray) {
        const btn = document.createElement('button');
        btn.classList.add("btn", "btn-light", "mb-2", "w-100", "food-btn");
        btn.textContent = food.description;

        const calories = getNutrientValue(food.foodNutrients, 'Energy')
        const protein = getNutrientValue(food.foodNutrients, 'Protein');
        const carbs = getNutrientValue(food.foodNutrients, 'Carbohydrate, by difference');
        const fat = getNutrientValue(food.foodNutrients, 'Total lipid (fat)');

        btn.dataset.calories = calories;
        btn.dataset.protein = protein;
        btn.dataset.carbs = carbs;
        btn.dataset.fat = fat;

        resultsList.appendChild(btn);
    }

    document.querySelector('#results').style.display = 'block';
}

resultsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('food-btn')) {
        const button = event.target;
        const nutritionInfo = document.querySelector('#nutritionInfo');
        nutritionInfo.innerHTML = '';

        const li = document.createElement('li');
        li.classList.add('list-group-item', 'text-center');
        li.innerHTML = `
            <div class="fw-bold mb-1">${button.textContent}</div>
            <div>Calories: ${button.dataset.calories}</div>
            <div>Protein: ${button.dataset.protein}</div>
            <div>Carbs: ${button.dataset.carbs}</div>
            <div>Fat: ${button.dataset.fat}</div>
        `;

        nutritionInfo.appendChild(li);

        console.log(`--- ${button.textContent} ---`);
        console.log(`Protein: ${button.dataset.protein}`);
        console.log(`Carbs: ${button.dataset.carbs}`);
        console.log(`Fat: ${button.dataset.fat}`);
    }
});

searchFoodBtn.addEventListener('click', displayFoods);

function showNutrition(){

}