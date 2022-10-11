import React, {useState, useCallback, useEffect} from 'react'
import { Formik, Form, FormikProps, FieldArray } from 'formik'
import { Button, ButtonGroup } from '@mui/material'
import style from './style.module.css'
import CustomTextField from '../CustomTextField'
import { debounce } from 'lodash'
import * as Yup from 'yup'
import Divider from '../Divider'
import Ingredient from '../../interfaces/Ingredient'
import Recipe from '../../interfaces/Recipe'

interface fProps {
    handleSubmit: Function,
    goBack: Function,
    initial?: Recipe
}

const RecipeForm = ({handleSubmit, goBack, initial}: fProps) => {
    const [valid, setValid] = useState(false)
    useEffect(() => {
        if (initial) {
            setValid(true)
        }
    }, [initial])
    
    async function isImage(url: string, props: FormikProps<Recipe>) {
        try {
            new URL(url)
        }
        catch {
            return false
        }
        let i = new Image()
        i.src = url
        await new Promise((resolve) => {
            i.onload = () => {
                setValid(true)
                resolve(true)
            }
            i.onerror = () => {
                setValid(false)
                resolve(false)
            }
        })
        setTimeout(() => {props.validateField('imageUrl')})
    }

    const handler = useCallback(debounce(isImage, 1000), [])

    const YupSchema = Yup.object().shape({
        name: Yup.string()
        .required('Required'),
        imageUrl: Yup.string()
        .required('Required')
        .url('Invalid URL')
        .test('valid-url', 'Invalid Image URL', () => valid),
        desc: Yup.string()
        .required('Required'),
        ingredients: Yup.array(Yup.object().shape({
            name: Yup.string()
            .required('Required'),
            qty: Yup.number()
            .typeError('Quantity must be a number')
            .positive('Must be positive')
            .required('Required')
        })).optional()
    })

    return (
        <div>
            <Formik 
            initialValues={initial? initial : {
                name: '',
                imageUrl: '',
                desc: '',
                ingredients: new Array<Ingredient>()
            }}
            validationSchema={YupSchema}
            onSubmit={(values) => {handleSubmit(values)}}>
                {(props: FormikProps<Recipe>) => (
                    <Form>
                        <ButtonGroup>
                            <Button type='submit' variant='contained' color='success' 
                            disabled={!(valid && props.isValid)} 
                            className='noTextTransform'>Save</Button>
                            <Button variant='contained' color='error' className='noTextTransform'
                            onClick={() => goBack()}>Cancel</Button>
                        </ButtonGroup>
                        <CustomTextField name='name' type='text' label='Name' row={1}/>
                        <CustomTextField name='imageUrl' type='url' label='Image URL' row={1} onChange={async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setValid(false)
                            handler(e.target.value, props)
                            props.handleChange(e)
                        }}/>
                        {valid && <img src={props.values.imageUrl} alt="Preview" className={style.previewImage}/>}
                        <CustomTextField name='desc' type='text' label='Description' row={5}/>
                        <FieldArray name="ingredients">
                            {({remove, push}) => (
                                <div>
                                    {props.values.ingredients.length > 0 && 
                                    props.values.ingredients.map((i : Ingredient, index : number) => (
                                        <div key={index} className={style.dFlex}>
                                            <div className={style.d4}>
                                                <CustomTextField name={`ingredients.${index}.name`} type='text'/>
                                            </div>
                                            <div className={style.d1}>
                                                <CustomTextField name={`ingredients.${index}.qty`} type='text'
                                                onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => {
                                                    props.setFieldValue(
                                                        `ingredients.${index}.qty`,
                                                        parseInt(e.target.value))
                                                }}/>
                                            </div>
                                            <Button type='button' variant='contained' color='error'
                                            sx={{
                                                '&.MuiButton-root': {
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    aspectRatio: '1',
                                                    margin: 'auto 0 37px'
                                                }
                                            }}
                                            onClick={() => remove(index)}>X</Button>
                                        </div>
                                    ))}
                                <Divider color='whitesmoke'/>
                                <Button variant='contained' color='success' className='noTextTransform'
                                onClick={() => push({name: '', qty: 1})}>Add Ingredients</Button>
                                </div>
                            )}
                        </FieldArray>
                    </Form>   
                )}
            </Formik>
        </div>
    )
}

export default RecipeForm