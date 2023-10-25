import { ActionType } from "./action";

function authUserReducer(authUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser || null;
    case ActionType.REMOVE_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}

export default authUserReducer;
