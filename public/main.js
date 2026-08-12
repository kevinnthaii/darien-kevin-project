//FoodData central API key (U.S agricultural) 
const apiKey = 'HC5yHN6QbG53eqJW8sUkqwrJRLp3zi1wpfGAbFKh';

async function getFoodSearch(food){
    // const searchEndpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&dataType=Branded&pageSize=5&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&brandOwner=Kar%20Nut%20Products%20Company&api_key=HC5yHN6QbG53eqJW8sUkqwrJRLp3zi1wpfGAbFKh`;

    const searchEndpoint = '/.netlify/functions/askNutri';

    const options = {
        method: 'POST',
        body: JSON.stringify({
            message: food
        })
    };

    try {
         let response = await fetch(searchEndpoint, options);
         //console.log(response);
         return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//getFoodSearch('rice');
//console.log(getFoodSearch('brown rice'));
console.log(await getFoodSearch('rice'));

