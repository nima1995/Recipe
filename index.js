
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    let userInput = document.getElementById("user-input").value;
    if(userInput.length == 0){
        result.innerHTML = `<h3> Input Field Cannot be Empty</h3>`;
    }
    else
    {
        fetch(url + userInput)
    .then(response => response.json())
    .then(data => 
        { let mymeal = data.meals[0];
        console.log(mymeal);
        console.log(mymeal.strMealThumb);
        console.log(mymeal.strMeal);
        console.log(mymeal.strArea); 
        console.log(mymeal.strInstructions);
        let count =1;
        let ingredients = [];
        for(let i in mymeal)
        {
            let ingredient ="";
            let measure = "";
            if(i.startsWith("strIngredient") && mymeal[i])
            {
                ingredient =mymeal[i];
                measure = mymeal[`strMeasure` +count];
                count+=1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);
        result.innerHTML = `<img src=${mymeal.strMealThumb}>
        <div class = "details">
            <h2>${mymeal.strMeal}</h2>
            <h4>${mymeal.strArea}</h4>
        </div>
        <div id = "ingredient-con"></div>
        <div id = "recipe">
            <button id="hide-recipe">x</button>
            <pre id = "instructions">${mymeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>`;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

            ingredients.forEach((i)=> {
                let child = document.createElement("li");
                child.innerText=i;
                parent.appendChild(child);
                ingredientCon.appendChild(parent);
            });

        hideRecipe.addEventListener("click", ()=>{
            recipe.style.display="none";
        });
        showRecipe.addEventListener("click", () =>{
            recipe.style.display="block";
        });
    })
    .catch(()=>{
        result.innerHTML = `<h3>Invalid Input</h3>`
    })
    }
});

