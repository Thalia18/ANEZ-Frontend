const INITIAL_STATE = {
  user: null,
  autocomplete: null,
};
const applySetUserType = (state, action) => ({
  ...state,
  user: action.payload,
});
const logoutUser = (state, action) => ({
  ...state,
  user: action.payload,
});
const applySetAutocomplete = (state, action) => ({
  ...state,
  autocomplete: action.payload,
});
function authTypeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER': {
      return applySetUserType(state, action);
    }
    case 'LOGOUT_USER': {
      return logoutUser(state, action);
    }
    case 'SET_AUTOCOMPLETE': {
      return applySetAutocomplete(state, action);
    }

    default:
      return state;
  }
}
export default authTypeReducer;
