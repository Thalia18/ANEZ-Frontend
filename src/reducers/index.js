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
const applySetConsultorio = (state, action) => ({
  ...state,
  consultorio: action.payload,
});
const applySetCategorias = (state, action) => ({
  ...state,
  categorias: action.payload,
});

function authTypeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER': {
      return applySetUserType(state, action);
    }
    case 'LOGOUT_USER': {
      return logoutUser(state, action);
    }
    case 'SET_CONSULTORIO': {
      return applySetConsultorio(state, action);
    }
    case 'SET_CATEGORIAS': {
      return applySetCategorias(state, action);
    }
    default:
      return state;
  }
}
export default authTypeReducer;
