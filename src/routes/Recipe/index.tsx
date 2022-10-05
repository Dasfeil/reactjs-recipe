import React, { useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import style from './style.module.css'
import Divider from '../../components/Divider'
import { Route, RouteProps } from 'react-router-dom'

interface RProps {
    match: RouteProps
}

const Recipe = ({match} : RProps) => {
    return (
        <div className={style.container}>
            <div className={style.leftDiv}>
                <Button 
                color='success' variant="contained" 
                className={style.rcpButton}>
                    New Recipe
                </Button>
                <Divider color='whitesmoke'/>
                <div>
                    {}
                </div>
            </div>
            <div className={style.rightDiv}>
                <Route path={`${match}/form`}></Route>
            </div>
        </div>
    )
}

export default Recipe