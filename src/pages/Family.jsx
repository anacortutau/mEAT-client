import React from 'react'
import { useNavigate } from 'react-router-dom'

function Family() {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        navigate("/signup")
    }

    const handleSubmitHome = async (e) => {
        e.preventDefault()

        navigate("/")
    }
    return (
        <div>
            
                <h2> Welcome Family mEAT</h2>
                

                    <div class="container">
                    <p>At mEAT we know that and take advantage of the benefits
                        Eat and receive mEATkoins to redeem for more ÑAM!
                    </p>

                    </div>
               
                
            



               

            <form onSubmit={handleSubmit}>
                <button class="home-main-button-family" type="submit">Sign Up</button>
            </form>
            <br />
            <br />
            <form onSubmit={handleSubmitHome}>
                <button class="home-main-button-family-home" type="submit">Home</button>
            </form>
            

        </div>
    )
}

export default Family