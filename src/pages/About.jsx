import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {

    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        navigate("/")
    }
  return (
    <div>
        <h2>
            About mEAT
        </h2>
        <div class="container">
        <p>mEAT is here to stay. With the best meat we make our hamburgers.
            Come and live the experience that eat the best hamburger
        </p>
        </div>

        <form onSubmit={handleSubmit}>

            <button class="home-main-button-about" type="submit">Home</button>
        </form>
    </div>




  )
}

export default About