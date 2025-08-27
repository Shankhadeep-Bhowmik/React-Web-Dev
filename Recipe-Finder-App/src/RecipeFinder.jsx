import React, {useState} from 'react';
import './RecipeFinder.css';
function RecipeFinder(){
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const search = async () => {
    if(input.trim() === ''){
      return;
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    try{
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || [])
    }catch(error){
      console.log(error);
    }
  }
  return(
    <>
       <div className="recipe-container">
        <div className="heading">
          <h1>Recipe Finder</h1>
        </div>

        <div className="input-recipe">
          <input type="text" 
          value={input} 
          onChange={handleChange}
          placeholder='Enter your food'/>

          <button onClick={search}>Search</button>
        </div>
        
        <div className="recipes-instructions">
          {recipes.map(recipe => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              {/* recipe instruction */}
              <div className="instruction">
                {recipe.strInstructions}
              </div>
            </div>
          ))}
        </div>
       </div>
    </>
  );
}
export default RecipeFinder;