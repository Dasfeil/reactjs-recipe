import Ingredient from "./Ingredient"

export default interface Recipe {
    name: string,
    imageUrl: string,
    desc: string,
    ingredients: Array<Ingredient> 
}