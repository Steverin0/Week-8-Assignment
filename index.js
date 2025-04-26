/* 
Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the 
following requirements:
1) Use at least one array.
2) Use at least two classes.
3) Your menu should have the options to create, view, and delete elements.
*/

//favorite recipes

class Recipe {
    constructor (name, timeOfDay) {
        this.name = name;
        this.timeOfDay = timeOfDay;
    }
    describe () {
        return `${this.name} is served at ${this.timeOfDay}.`;
    }
}

class RecipeBook {
    constructor (name) {
        this.name = name;
        this.ingredients = [];
    }
    addIngredient(ingredient) {
        if(ingredient instanceof Recipe) {
            this.ingredients.push(ingredient);
        } else {
            throw new Error (`You can only add an instance of an ingredient.
                Argument is not an ingredient: ${ingredient}`)
        }
    }
    describe () {
        return `${this.name} has ${this.ingredients.length} ingredients.`
    }
}

class Menu {
    constructor () {
        this.recipes = [];
        this.selectedRecipes = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case "1" :
                    this.createRecipe();
                    break;
                case "2" :
                    this.viewRecipe();
                    break;
                case "3" :
                    this.deleteRecipe();
                    break;
                case "4" :
                    this.dislplayRecipe();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ("Goodbye!");
    }

    showMainMenuOptions() {
        return prompt (`
            0) Exit
            1) Create new Recipe
            2) View Recipe
            3) Delete Recipe
            4) Display all Recipes
            `);
    }

    showRecipeBookOptions(recipeInfo) {
        return prompt (`
            0) Back
            1) Create Ingredient
            2) Delete Ingredient
            -------------------------
            ${recipeInfo}
            `);
    }

    dislplayRecipe() {
        let recipeString = "";
        for (let i = 0; i < this.recipes.length; i++) {
            recipeString += i + ") " + this.recipes[i].name + "\n";
        }
        alert (recipeString);
    }

    createRecipe() {
        let name = prompt ("Enter name for new Recipe:")
        this.recipes.push (new RecipeBook(name));
    }

    deleteRecipe() {
        let index = prompt ("Enter index of Recipe to be deleted: ")
        if (index > -1 && index < this.recipes.length) {
            this.recipes.splice(index, 1);
        }
    }

    createIngredient() {
        let name = prompt ("Enter new Ingredient:")
        let timeOfDay = prompt ("Enter the meal's time it is eaten:")
        this.selectedRecipes.ingredients.push(new Recipe(name, timeOfDay));
    }

    deleteIngredient() {
        let index = prompt ("Enter index of Ingredient to be deleted: ")
        if (index > -1 && index < this.selectedRecipes.ingredients.length) {
            this.selectedRecipes.ingredients.splice(index, 1)
        }
    }
    //Jesus this is taking a while and I barely understand what I am doing.

    viewRecipe() {
        let index = prompt ("Enter the index of the Recipe you wish to view.");
        if (index > -1 && index < this.recipes.length){
            this.selectedRecipes = this.recipes[index];
            let description = "Recipe name: " + this.selectedRecipes.name + "\n";
            for (let i = 0; i < this.selectedRecipes.ingredients.length; i++) {
                description += i + ") " + this.selectedRecipes.ingredients[i].name +
                 " - " + this.selectedRecipes.ingredients[i].ingredient + "\n";
            }
            let selection = this.showRecipeBookOptions(description);
            switch (selection) {
                case "1":
                    this.createIngredient();
                    break;
                case "2":
                    this.deleteIngredient();
                    //Doesn't need a break here since it is the end.
            }
        }
    }
}

let menu = new Menu ();
menu.start()