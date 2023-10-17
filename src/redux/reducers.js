import {GET_USER_LIST} from './action';

const initialState = {
  userList: [],
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {...state, userList: action.payload};
    default:
      return state;
  }
};
export default UserReducer;
