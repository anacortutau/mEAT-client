import service from "./config.services";

// are the routes called to th backend

//type get
const getAllProductService = () => {
  return service.get("/product");
};

//type post
const addNewProductService = (newProduct) => {
  return service.post("/product", newProduct);
};
//type get
const getProductDetailsService = (id) => {
  return service.get(`/product/${id}`);
};
//type delete
const deleteProductService = (id) => {
  return service.delete(`/product/${id}`);
};
//type patch
const patchProductService = (id, editProduct) => {
  return service.patch(`/product/${id}`, editProduct);
};

export {
  getAllProductService,
  addNewProductService,
  getProductDetailsService,
  deleteProductService,
  patchProductService,
};
