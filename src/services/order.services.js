import service from "./config.services";

// are the routes called to th backend

//type get
const getAllOrderService = () => {
  return service.get("/order");
};
//type post
const addNewOrderService = (newOrder) => {
  return service.post("/order", newOrder);
};
//type get
const getOrderDetailsService = (id) => {
  return service.get(`/order/${id}`);
};
//type delete
const deleteOrderService = (id) => {
  return service.delete(`/order/${id}`);
};
//type patch
const patchOrderService = (id, editOrder) => {
  return service.patch(`/order/${id}`, editOrder);
};

export {
  getAllOrderService,
  getOrderDetailsService,
  deleteOrderService,
  patchOrderService,
  addNewOrderService,
};
