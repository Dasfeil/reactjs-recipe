import { Button } from '@mui/material'
import style from './style.module.css'
import Divider from '../../components/Divider'
import { useHistory, Route, useRouteMatch, NavLink, Switch } from 'react-router-dom'
import IRecipe from '../../interfaces/Recipe'
import RecipeForm from '../../components/RecipeForm'
import RecipeMenuWrapper from '../../components/RecipeMenuWrapper'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'
import { push } from '../../store/features/recipes/recipeSlice'

const Recipe = () => {
    const recipes = useSelector((state: RootState)  => state.recipes.value)
    const dispatch = useDispatch()
    const { path } = useRouteMatch()
    const history = useHistory()
    const handleSubmit = (r: IRecipe) => {
        dispatch(push(r))
        history.push(path)
    }
    
    return (
        <div className={style.container}>
            <div className={style.leftDiv}>
                <Button 
                color='success' variant="contained" 
                className='noTextTransform' onClick={() => history.push(`${path}/form`)}>
                    New Recipe
                </Button>
                <Divider color='whitesmoke'/>
                <div>
                    {recipes.map((r, index) => (
                        <NavLink to={`${path}/${index}`} className={style.rLink} activeClassName={style.rActive} key={index}>
                            <div className={style.rContainer}>
                                <div className={style.rTextContainer}>
                                    <h2>{r.name}</h2>
                                    <p>{r.desc}</p>
                                </div>
                                <div className={style.rImageContainer}>
                                    <img src={r.imageUrl} alt="Preview"/>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className={style.rightDiv}>
                <Switch>
                    <Route path={`${path}/form`}>
                        <RecipeForm handleSubmit={handleSubmit} goBack={() => history.push(`${path}`)}/>
                    </Route>
                    <Route exact path={path}>
                        <h1>Please select a Recipe!</h1>
                    </Route>
                    <Route path={`${path}/:param`}>
                        <RecipeMenuWrapper recipes={recipes}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Recipe