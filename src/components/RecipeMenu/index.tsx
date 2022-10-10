import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import Recipe from '../../interfaces/Recipe';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown' 
import style from './style.module.css'
import { useDispatch } from 'react-redux'
import { push } from '../../store/features/shopList/shopSlice'
import { assign, remove} from '../../store/features/recipes/recipeSlice'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import RecipeForm from '../RecipeForm';

interface Prop {
    recipe: Recipe,
    index: number
}

const RMenu = ({recipe, index}: Prop) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { url } = useRouteMatch()
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const addToList = () => {
        recipe.ingredients.forEach(e => dispatch(push(e)))
        history.push('/shop')
    }

    const editRecipe = () => {
        history.push(`${url}/edit`)
    }

    const deleteRecipe = () => {
        dispatch(remove(index))
        history.push('/recipe')
    }

    return (
        <div>
            <img src={recipe.imageUrl} alt="Recipe" className={style.rImage}/>
            <h1>{recipe.name}</h1>
            <div>
                <Button
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon/>}
                className={style.noTextTransform}
                >
                    Manage Recipe
                </Button>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                    <MenuItem onClick={addToList}>To Shopping List</MenuItem>
                    <MenuItem onClick={editRecipe}>Edit Recipe</MenuItem>
                    <MenuItem onClick={deleteRecipe}>Delete Recipe</MenuItem>
                </Menu>
            </div>
            <p>{recipe.desc}</p>
            {recipe.ingredients.length > 0 && <div className={style.ingContainer}>
                {recipe.ingredients.map((i) => (
                    <div className={style.ingredient}>
                        {`${i.name} - ${i.qty}`}
                    </div>
                ))}
            </div>}

        </div>
    )
}

const RecipeMenu = ({recipe, index}: Prop) => {
    const { path, url } = useRouteMatch() 
    const history = useHistory()
    const dispatch = useDispatch()
    const handleSubmit = (r: Recipe) => {
        dispatch(assign({index: index, recipe: r}))
        history.push('/recipe')
    }
    return (
        <Switch>
            <Route exact path={path}>
                <RMenu recipe={recipe} index={index}/>
            </Route>
            <Route path={`${url}/edit`}>
                <RecipeForm handleSubmit={handleSubmit} goBack={() => history.push('/recipe')} initial={recipe}/>
            </Route>
        </Switch>
    )
}

export default RecipeMenu