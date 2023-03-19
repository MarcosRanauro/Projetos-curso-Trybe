import { USER_LOGIN, PLAYER_SCORE, PLAYER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  nameInput: '',
  emailInput: '',
  score: 0,
  assertions: 0,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      nameInput: action.payload.nameInput,
      emailInput: action.payload.emailInput,
    };
  case PLAYER_SCORE:
    return { ...state,
      score: action.payload,
    };
  case PLAYER_ASSERTIONS:
    return { ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
}

export default user;
