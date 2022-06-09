import React from "react";

function PreOrder(props) {
  const { preProducts, preMenus } = props;
  console.log(preProducts, preMenus)

  return (
    <div>
      {preProducts !== undefined &&
        preProducts.map((eachProduct) => {
          return <div key={eachProduct.id}>{eachProduct.name}</div>;
        })}

      {preMenus!== undefined &&
        preMenus.map((eachMenu) => {
          return <div key={eachMenu._id}>{eachMenu.name}</div>;
        })}


        
    </div>
  );
}

export default PreOrder;
