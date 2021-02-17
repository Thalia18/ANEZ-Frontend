const INITIAL_STATE = {
  user: null,
};
const applySetUserType = (state, action) => ({
  ...state,
  user: action.payload,
});
const logoutUser = (state, action) => ({
  ...state,
  user: action.payload,
});
function authTypeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER': {
      return applySetUserType(state, action);
    }
    case 'LOGOUT_USER': {
      return logoutUser(state, action);
    }

    default:
      return state;
  }
}
export default authTypeReducer;
