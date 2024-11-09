// https://youtu.be/DkUjwWQEgOE?si=QJya2cpKvTIh-Dhf

const searchbutton=document.querySelector(".searchbutton");
const SearchBox=document.querySelector(".searchBox");
const recipecontainer=document.querySelector(".recipe-container");
const recipeDeatilsContent=document.querySelector(".recipe-deatils-content");
const CloseBtn=document.querySelector(".Recipe-close-btn");


const fetchRecipes=async (query)=>{
    recipecontainer.innerHTML="<h2>Fetching Recipes...</h2>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json();
        // console.log(response.meals);

        recipecontainer.innerHTML="";
        response.meals.forEach(meal=>{
            //  console.log(meal);
            const recipeDiv =document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3> ${meal.strMeal}</h3>
            <p> ${meal.strArea} Dish</p>
            <p> ${meal.strCategory}</p>
            
            `
            const button=document.createElement('button');
            button.textContent="view Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe button

            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            })

            recipecontainer.appendChild(recipeDiv);


        });
    } 
    catch (error) {

                recipecontainer.innerHTML="<h2>Try another Recipe We dont have that.</h2>"
        }
}

const fetchIngredients=(meal)=>{
    // console.log(meal);
    let IngredientsList ="";
    for(let i=1; i < 20; i++)
    {
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            IngredientsList +=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return  IngredientsList;
}


const openRecipePopup=(meal)=>{
    recipeDeatilsContent.innerHTML=`
    <h4 class="recipeName">${meal.strMeal}</h4>
    <h4 > Ingrediant:</h4>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <br>
    <br>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDeatilsContent.parentElement.style.display="block";
}




CloseBtn.addEventListener('click',()=>{
    recipeDeatilsContent.parentElement.style.display="none";

})



searchbutton.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput = SearchBox.value.trim();
    if(!searchinput){
        recipecontainer.innerHTML=`<h2>Type the  meal in the SearchBox.</h2>` ;
        return;
    }
    fetchRecipes(searchinput);
    // console.log("button clicked");
})

