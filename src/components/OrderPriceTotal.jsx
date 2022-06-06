import React from 'react'

function OrderPriceTotal(props) {

    const {price} = props.allOrder
  return (
    <div>
        {price}$
        
    </div>
  )
}

export default OrderPriceTotal