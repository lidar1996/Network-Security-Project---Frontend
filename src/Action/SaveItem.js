import { SAVE_ITEM } from "../Constant/ActionTypes";
export function saveItem(payload) {
  return { type: SAVE_ITEM, payload};
}
