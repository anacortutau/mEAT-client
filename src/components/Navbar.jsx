import { Link, Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";

function Navbar() {

    const { isLoggedIn, user, authenticateUser, setLoggedIn } = useContext(AuthContext)
    const toggleStyles = (navInfo) => {
        return navInfo.isActive === true ? activeStyles : inActiveStyles;
    };

    const activeStyles = {
        textDecoration: "underline",
    };

    const inActiveStyles = {
        textDecoration: "none",
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        authenticateUser()
    }

    return (

        <div>
           
            <header>
                <section class= "header-icons-container">
                <section class="icons">
                

                    
            {user !== null}
            {isLoggedIn === true ? (
                <nav>
                    
                    <NavLink to="/product" end={true} style={toggleStyles}>Products</NavLink>
                    <NavLink to="/menu" end={true} style={toggleStyles}>Menus</NavLink>
                    <NavLink to="/order"  style={toggleStyles}> Basket</NavLink>
                    <NavLink to="/opinion"  style={toggleStyles}> Your opinion is important</NavLink>
                     <Link to="/"><button onClick={handleLogout}>Cerrar sesión</button></Link>
                    
                </nav>
                ) : (
                

                
                <nav>
                    
                    <NavLink to="/" style={toggleStyles}>Welcome</NavLink>
                    <NavLink to="/product"  style={toggleStyles}> Products</NavLink>
                    <NavLink to="/menu"   style={toggleStyles}> Menus</NavLink>
                    <NavLink to="/family"   style={toggleStyles}> Family mEAT</NavLink>
                    <NavLink to="/about"   style={toggleStyles}> About mEAT</NavLink>
                    <NavLink to="/signup" style={toggleStyles}> Signup </NavLink>
                    <NavLink to="/login" style={toggleStyles}> Login </NavLink>
                    
                    
                </nav>

            )}
                </section>
            </section>
        </header>

            
        </div>



    )


}

export default Navbar;
