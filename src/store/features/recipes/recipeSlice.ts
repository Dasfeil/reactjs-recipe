import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IRecipe from '../../../interfaces/Recipe' 

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        value: new Array<IRecipe>()
    },
    reducers: {
        push: (state, action: PayloadAction<IRecipe>) => {
            state.value.push(action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1)
        },
        assign: (state, action: PayloadAction<{index: number, recipe: IRecipe}>) => {
            state.value[action.payload.index] = action.payload.recipe
        }
    }
})

export const { push, remove, assign } = recipeSlice.actions

export default recipeSlice.reducer