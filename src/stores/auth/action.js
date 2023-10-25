import Cookies from "js-cookie";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  REMOVE_AUTH_USER: "REMOVE_AUTH_USER",
  RECEIVE_REGISTER_USER: "RECEIVE_REGISTER_USER",
};

function setAuthUserCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function removeAuthUserCreator() {
  return {
    type: ActionType.REMOVE_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncAuthUserCreator(authUser) {
  return (dispatch) => {
    dispatch(setAuthUserCreator(authUser));
    Cookies.set("authUser", JSON.stringify(authUser), { expires: 7 });
  };
}

function loadAuthUserCreator() {
  return (dispatch) => {
    const authUser = Cookies.get("authUser");
    if (authUser) {
      dispatch(setAuthUserCreator(JSON.parse(authUser)));
    }
  };
}

function logoutAuthUserCreator() {
  return (dispatch) => {
    dispatch(removeAuthUserCreator());
    Cookies.remove("authUser");
  };
}

export {
  ActionType,
  asyncAuthUserCreator,
  loadAuthUserCreator, logoutAuthUserCreator, removeAuthUserCreator
};

