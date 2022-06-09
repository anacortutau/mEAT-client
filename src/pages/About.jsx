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
        <form onSubmit={handleSubmit}>

        <button class="home-main-button-about" type="submit">Home</button>
        </form>
        <div class="container">
        <p>mEAT is here to stay. With the best meat we make our hamburgers.
            Come and live the experience that eat the best hamburger
        </p>
        </div>
  
        <div class="logoAbout">
          <img
            src={
              "https://images.vexels.com/media/users/3/158441/isolated/preview/2ed7291a879206dc054cdfd8fdfd8200-logotipo-de-la-hamburguesa-logotipo.png"
            }
            alt="foto"
            style={{ width: "350px" }}
          />
        </div>
    </div>




  )
}

export default About