import React from 'react'
import Product from '../components/Products/Product'
import {useParams} from "react-router";
import useProductId from "../../hooks/useProductId.jsx";

export default function Prod() {

  return (
    <div className='prod'>
      <Product/>
    </div>
  )
}
