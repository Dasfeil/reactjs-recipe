import React, {useState, useCallback} from 'react'
import { Formik, Form, FormikProps, FieldArray} from 'formik'
import { Button, ButtonGroup } from '@mui/material'
import style from './style.module.css'
import CustomTextField from '../../components/CustomTextField'
import { debounce } from 'lodash'
import * as Yup from 'yup'
import Divider from '../../components/Divider'
import Ingredient from '../../interfaces/Ingredient'
import Recipe from '../../interfaces/Recipe'

const FormikForm = () => {
  const [valid, setValid] = useState(false)
    
    function isImage(url: string) {
        let i = new Image()
        i.src = url
        i.onload = () => setValid(true)
        i.onerror = () => setValid(false)
    }

    const handler = useCallback(debounce(isImage, 2000), [])

    const YupSchema = Yup.object().shape({
        name: Yup.string()
        .required('Required'),
        imageUrl: Yup.string()
        .required('Required'),
        desc: Yup.string()
        .required('Required'),
        ingredients: Yup.array(Yup.object().shape({
            name: Yup.string()
            .required('Required'),
            qty: Yup.number()
            .positive('Must be positive')
            .required('Required')
        })).optional()
    })

    return (
        <div className={style.container}>
            <Formik 
            initialValues={{
                name: '',
                imageUrl: '',
                desc: '',
                ingredients: new Array<Ingredient>()
            }}
            validationSchema={YupSchema}
            onSubmit={(values) => {console.log(values)}}>
                {(props: FormikProps<Recipe>) => (
                    <Form>
                        <ButtonGroup>
                            <Button type='submit' variant='contained' color='success' 
                            disabled={!(valid && !props.errors.desc && !props.errors.imageUrl && !props.errors.ingredients && !props.errors.name)} 
                            className={style.rcpButton}>Save</Button>
                            <Button variant='contained' color='error' className={style.rcpButton}>Cancel</Button>
                        </ButtonGroup>
                        <CustomTextField name='name' type='text' label='Name' row={1}/>
                        <CustomTextField name='imageUrl' type='text' label='Image URL' row={1} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setValid(false)
                            handler(e.target.value)
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
                                                <CustomTextField name={`ingredients.${index}.name`} type='text' row={1}/>
                                            </div>
                                            <div className={style.d1}>
                                                <CustomTextField name={`ingredients.${index}.qty`} type='number'/>
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
                                <Button variant='contained' color='success' className={style.rcpButton} 
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

export default FormikForm