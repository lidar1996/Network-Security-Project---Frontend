import { SAVE_ITEM } from "../Constant/ActionTypes";

const iniState ={
  isLoggedIn: true,
  item:{
    itemId:{
      space:"",
      id:""
    },
    type:"",
    name:"",
    active:"",
    createTimestamp:"",
    createdBy:{
        userId:{
            space:"",
            email:""
        }
    },
    location:{
        lat:"",
        lng:""
    }
  },
  itemAttributes:{
      key1:"",
      key2:"",
      key3:"",
      key4:""
  }
};
const ItemReducer = (state = iniState, action) => {
  if (action.type === SAVE_ITEM) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default ItemReducer;
