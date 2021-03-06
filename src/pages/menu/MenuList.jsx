import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddFormMenu from "../../components/AddFormMenu";
import { AuthContext } from "../../context/auth.context";
import { getAllMenuService } from "../../services/menu.services";

function MenuList(props) {
  //1. status for the date
  const [allMenu, setAllMenu] = useState(null);
  const [buscando, setBuscando] = useState(true);
  const { isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  //component did mount

  useEffect(() => {
    getAllMenus();
  }, []);

  //function finds the date

  const getAllMenus = async () => {
    try {
      const response = await getAllMenuService();
      console.log(response.data);
      setAllMenu(response.data);
      setBuscando(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //4 el loading

  if (buscando === true) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <main class="home-main">
        <h3 class="home-main-tex">List Menu</h3>
        {allMenu === null && <h3>...Loading</h3>}

        {allMenu !== null &&
          allMenu.map((eachMenu) => {
            return (
              <div key={eachMenu._id}>
                <section class="menus">
                  <Link to={`/menu/${eachMenu._id}/details`}>
                    <button className="home-main-button-menus">
                      {eachMenu.name}
                    </button>
                  </Link>
                </section>
              </div>
            );
          })}

        {isAdmin ? <AddFormMenu getAllMenus={getAllMenus} /> : ""}
        <form onSubmit={handleSubmit}>
          <button class="home-main-button" type="submit">
            Home
          </button>
        </form>
      </main>
    </div>
  );
}

export default MenuList;
