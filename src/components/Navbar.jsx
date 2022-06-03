import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";

function Navbar() {

    const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)
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
            {user !== null && <p>Bienvenido a mEAT: {user.username}</p>}
            {isLoggedIn === true ? (
                <nav>
                    <NavLink to="/" style={toggleStyles}> Home </NavLink>
                    <button onClick={handleLogout}>Cerrar sesión</button>

                </nav>
                ) : (
                <nav>
                    <NavLink to="/" style={toggleStyles}> Home </NavLink>
                    <NavLink to="/signup" style={toggleStyles}> Signup </NavLink>
                    <NavLink to="/login" style={toggleStyles}> Login </NavLink>

                </nav>

            )}

        </div>



    )


}

export default Navbar;
