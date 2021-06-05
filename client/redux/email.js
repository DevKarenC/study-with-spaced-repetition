import axios from 'axios';

// ACTION TYPE
const ADD_EMAIL = 'ADD_EMAIL';

// ACTION CREATOR
const addEmail = (email) => {
  return {
    type: ADD_EMAIL,
    email,
  };
};

// THUNK CREATOR
export const createEmail = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/emails', email);
      dispatch(addEmail(data));
    } catch (error) {
      console.log(
        'Error in the emails reducer while trying to create a new email!',
        error
      );
    }
  };
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default function emailReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMAIL:
      return [...state, action.email];
    default:
      return state;
  }
}
