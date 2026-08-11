export default async function askNutri(request) {
    const reqData = await request.json();
    const searchEndpoint = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${reqData.food}&dataType=Branded&pageSize=5&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&brandOwner=Kar%20Nut%20Products%20Company&api_key=${Netlify.env.get('dk_api_key')}`;

    const options = {
        method: 'GET'
    };

    try {
        let response = await fetch(searchEndpoint, options);
        console.log(response);
        // return await response.json();
        return new Response(
            response, 
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
                error: "Could not complete fetch call"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}





async function getFoodSearch(food) {
    //let
    const searchEndpoint = https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&dataType=Branded&pageSize=5&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&brandOwner=Kar%20Nut%20Products%20Company&api_key=HC5yHN6QbG53eqJW8sUkqwrJRLp3zi1wpfGAbFKh;

    const options = {
        method: 'GET'
    };

    try {
        let response = await fetch(searchEndpoint, options);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//getFoodSearch('rice');
console.log(getFoodSearch('brown rice'));
