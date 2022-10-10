import React from 'react'
import { useParams } from 'react-router-dom'
import Recipe from '../../interfaces/Recipe'
import RecipeMenu from '../RecipeMenu'
import NoMatch from '../NoMatch'

interface Props {
    recipes: Recipe[]
}

const ChildFormWrapper = ({recipes}: Props) => {
    let {param} = useParams<{param: string}>()
    let id = parseInt(param)
    if (recipes[id]) return (<RecipeMenu recipe={recipes[id]} index={id}/>)
    else return (<NoMatch/>)
}

export default ChildFormWrapper