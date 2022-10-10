import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import CustomTextField from '../CustomTextField'
import { Button } from '@mui/material'
import { push, remove, update } from '../../store/features/shopList/shopSlice'
import { useDispatch, useSelector } from 'react-redux'
import Ingredient from '../../interfaces/Ingredient'
import style from './style.module.css'
import * as Yup from 'yup'
import { RootState } from '../../store'
interface Prop {
    selected: number,
    setSelected: Function
}

const ListingForm = ({selected, setSelected}: Prop) => {
    const dispatch = useDispatch()

    const updateIngredient = (i: Ingredient) => {
        dispatch(update({target: selected, ingredient: i}))
    }

    const deleteIngredient = () => {
        dispatch(remove(selected))
        setSelected(-1)
    }

    const addIngredient = (i: Ingredient) => {
        dispatch(push(i))
    }

    const formatValues = (values: {name: string, amount: string}): Ingredient => {
        return {
            name: values.name, qty: parseInt(values.amount)
        }
    }

    const YupSchema = Yup.object().shape({
        name: Yup.string()
        .required('Required'),
        amount: Yup.number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Required')
    })

    const listing = useSelector((state: RootState) => state.shopListing.value)
    const initial = selected !== -1? {name: listing[selected].name, amount: listing[selected].qty.toString()} : {name: '', amount: ''}

    return (
        <div>
            <Formik
            initialValues={initial}
            validationSchema={YupSchema}
            enableReinitialize = {true}
            onSubmit={(values) => {
                const formattedValues = formatValues(values)
                if (selected === -1) {
                    addIngredient(formattedValues)
                }
                else {
                    updateIngredient(formattedValues)
                }
            }}>
                {(props: FormikProps<{name: string, amount: string}>) => (
                    <Form>
                        <div className={style.formContainer}>
                            <div className={style.nameField}>
                                <CustomTextField name='name' label='Name' type='text'/>
                            </div>
                            <div className={style.amountField}>
                                <CustomTextField name='amount' label='Amount' type='text'/>
                            </div>
                        </div>
                        {selected !== -1? 
                            <>
                                <Button variant='contained' color='success' type='submit'>Update</Button>
                                <Button variant='contained' color='error' onClick={deleteIngredient}>Delete</Button>
                            </> : <Button variant='contained' color='success' type='submit' disabled={!(props.isValid && props.dirty)}>Add</Button>    
                        }
                        <Button variant='contained' color='primary' onClick={() => props.resetForm({values: {name: props.values.name, amount: ''}})}>Clear</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ListingForm