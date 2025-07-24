// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_BASE = "http://localhost:7200";
const API_USERS = API_BASE + "/users";
const API_USERS_PUBLIC = API_USERS + "/public";
const API_USERS_ADMIN = API_USERS + "/admin";

export const environment = {
  production: false,
  API: {
    USERS: {
      LOGIN: API_USERS_PUBLIC + "/login",
      LOGOUT: API_USERS_PUBLIC + "/logout",
      SIGNUP: API_USERS_PUBLIC + "/register",
      GET_CURRENT_USER: API_USERS + "/user/current",
      FORGOT_PASSWORD: API_USERS_PUBLIC + "/forgotPassword",
      RESET_PASSWORD: API_USERS_PUBLIC + "/resetPassword",
      LIST_USER: API_USERS_ADMIN + "/userlist",
      DELETE_USER: API_USERS_ADMIN + "/deleteUser",
      ENABLE_DISABLE_USER: API_USERS_ADMIN + "/enableDisableUser",
      EDIT_PROFILE: API_USERS_PUBLIC + "/editProfile",
      CHANGE_PASSWORD: API_USERS_PUBLIC + "/changePassword",
      VERIFY_EMAIL:API_USERS_PUBLIC
    },

    ADMIN: {
      INVITE_USER: API_USERS_ADMIN + "/inviteUser",
    },

  }
}
