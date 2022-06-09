import service from "./config.services";

// are the routes called to th backend

//type get
const getAllMenuService = () => {
  return service.get("/menu");
};

//type post
const addNewMenuService = (newMenu) => {
  return service.post("/menu", newMenu);
};

//type get
const getMenuDetailsService = (id) => {
  return service.get(`/menu/${id}`);
};

// type delete
const deleteMenuService = (id) => {
  return service.delete(`/menu/${id}`);
};

//type patch
const patchMenuService = (id, editMenu) => {
  return service.patch(`/menu/${id}`, editMenu);
};

export {
  getAllMenuService,
  addNewMenuService,
  getMenuDetailsService,
  deleteMenuService,
  patchMenuService,
};
