import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  //1. status for date

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    setIsLoading(true);

    try {
      //call route verify
      const response = await verifyService();

      console.log("el payload es:", response.data);

      setIsLoggedIn(true);

      if (response.data.adminRole === "admin") {
        setIsAdmin(true);
      }
      setUser(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsAdmin(false);
      setIsLoading(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    isAdmin,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  //wait while we verify the user before rendering to th app
  if (isLoading === true) {
    return (
      <div className="App">
        <h3>Verificando usuario</h3>
      </div>
    );
  }

  // this is all our application
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
