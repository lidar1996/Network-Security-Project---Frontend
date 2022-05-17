import { SAVE_USER } from "../Constant/ActionTypes";

const iniState ={
  isLoggedIn: true,
  user:{email: '', password: ''
  }
};


const UserReducer = (state = iniState, action) => {
  if (action.type === SAVE_USER) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default UserReducer;
