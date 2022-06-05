import React from 'react'
import { useNavigate } from 'react-router-dom'

function Family() {

    const navigate = useNavigate()

    const handleSubmit= async(e) =>{
        e.preventDefault()

        navigate("/signup")
    }

    const handleSubmitHome = async(e) =>{
        e.preventDefault()

        navigate("/")
    }
  return (
    <div> 
       <h2> Welcome Family mEAT</h2>

       <p>At mEAT we know that and take advantage of the benefits
           Eat and receive mEATkoins to redeem for more ÑAM!
       </p>
        
        <form onSubmit={handleSubmit}>

            <button type="submit">Sign Up</button>
        </form>
        <form onSubmit={handleSubmitHome}>

            <button type="submit">Home</button>
        </form>
        
        </div>
  )
}

export default Family