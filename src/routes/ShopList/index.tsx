import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import ListingForm from '../../components/ListingForm'
import style from './style.module.css'
import Divider from '../../components/Divider'

const ShopList = () => {
    const listing = useSelector((state: RootState) => state.shopListing.value)
    const [selected, setSelected] = React.useState<number>(-1)
    return (
        <div className={style.container}>
            <div>
                <ListingForm selected={selected} setSelected={setSelected}/>
            </div>
            <Divider color='whitesmoke'/>
            {listing.length > 0 && <div className={style.listingContainer}>
                {listing.map((listing, index) => (
                    <div onClick={() => setSelected(index)} className={style.ingredient}>
                        {`${listing.name}  (${listing.qty})`}
                    </div>
                ))}        
            </div>}
        </div>
    )
}

export default ShopList