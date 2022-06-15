import React from "react";

function PreOrder(props) {
  const { preProducts, preMenus } = props;
  console.log(preProducts, preMenus);

  return (
    <div>
      {preProducts !== undefined &&
        preProducts.map((eachProduct) => {
          return <div key={eachProduct.id}>{eachProduct.name} <span>Price: {eachProduct.price}€</span></div>;
        })}

      {preMenus !== undefined &&
        preMenus.map((eachMenu) => {
          return <div key={eachMenu._id}>{eachMenu.name} <span>Price: {eachMenu.price}€</span></div>;
        })}
    </div>
  );
}

export default PreOrder;
