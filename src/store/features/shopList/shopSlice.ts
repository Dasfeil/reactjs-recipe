import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Ingredient from '../../../interfaces/Ingredient'
export const shopSlice = createSlice({
    name: 'shoplist',
    initialState: {
        value: new Array<Ingredient>()
    },
    reducers: {
        push: (state, action: PayloadAction<Ingredient>) => {
            const i = state.value.find(e => e.name === action.payload.name)
            if (i !== undefined) {
                i.qty += action.payload.qty
            } else {
                state.value.push(action.payload)
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1)
        },
        update: (state, action: PayloadAction<{target: number, ingredient: Ingredient}>) => {
            state.value[action.payload.target] = action.payload.ingredient
        }
    }
})

export const { push, remove, update } = shopSlice.actions

export default shopSlice.reducer