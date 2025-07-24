const API_BASE = "http://localhost:7200";
const API_USERS = API_BASE + "/users";
const API_USERS_PUBLIC = API_USERS + "/public";

export const environment = {
  production: false,
  API: {
    USERS: {
      LOGIN: API_USERS_PUBLIC + "/login",
      FORGET_PASSWORD: API_USERS_PUBLIC + "/forgetPassword",
    }
  }
}
