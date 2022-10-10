import React from 'react'
import {useField} from 'formik'
import { OutlinedInput } from '@mui/material'
import style from './style.module.css'

interface CTFProps {
    label?: string,
    name: string,
    type: string,
    onChange?: React.ChangeEventHandler,
    row?: number
}

const CustomTextField = ({label, row, ...props}: CTFProps ) => {
    const [field, meta] = useField(props)
    return (
        <div className={style.container} data-content={meta.touched? meta.error : ''}>
            {label && <label htmlFor={label}>
                {label}
            </label>}
            <OutlinedInput id={label} minRows={row} multiline={row? true : false} {...field} {...props} fullWidth className={style.Input} 
            sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }}} />
        </div>
    )
}

export default CustomTextField