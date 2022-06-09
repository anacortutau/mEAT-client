import service from "./config.services";

const signupService = (user) => {
  return service.post("/auth/signup", user);
};

const loginService = (user) => {
  return service.post("/auth/login", user);
};

//will need to configure the sending of the token
const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
