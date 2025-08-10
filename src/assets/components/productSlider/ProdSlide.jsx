import React from 'react'
import '../../scss/prodslide.scss'

export default function Slide({ setSel, selected, func, img, index }) {
    return (
        <div onClick={() => {
            func(img)
            setSel(index)
        }} className={selected === index ? 'prodslide prodslide__active' : 'prodslide'}>

            <img src={img} className='prodslide__img' />

        </div>
    )
}
