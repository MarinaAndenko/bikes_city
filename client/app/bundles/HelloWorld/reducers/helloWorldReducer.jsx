import { combineReducers } from 'redux';
import { HELLO_WORLD_NAME_UPDATE } from '../constants/helloWorldConstants';


const name = (state = '', action) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return {
        ...state,
        text: action.text,
      }
    default:
      return state;
  }
};

const helloWorldReducer = combineReducers({ name });

export default helloWorldReducer;

// function(first, second) {

// }

// arguments = {
//   a: 20,
//   b: 30,
// }

// function(...arguments)