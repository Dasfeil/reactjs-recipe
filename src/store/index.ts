import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './features/recipes/recipeSlice'
import shopReducer from './features/shopList/shopSlice'

const store =  configureStore({
    reducer: {
        recipes: recipeReducer,
        shopListing: shopReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispath = typeof store.dispatch

export default store