import { SAVE_USER } from "../Constant/ActionTypes";
export function saveUser(payload) {
  return { 
    type: SAVE_USER, payload 
  };
}
