import React from 'react'
import '../scss/slide.scss'
import API_BASE_URL from "../../apiConfig.js";

export default function Slide({img}) {
    return (
        <div className='slide'>
            <img className='slide__bg' src={API_BASE_URL + img} alt="News"/>
        </div>
    )
}
