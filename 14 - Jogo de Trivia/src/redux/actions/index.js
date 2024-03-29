export const USER_LOGIN = 'USER_LOGIN';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export const userLogin = (state) => ({
  type: USER_LOGIN,
  payload: state,
});

export const actionScore = (state) => ({
  type: PLAYER_SCORE,
  payload: state,
});

export const actionAssertions = (state) => ({
  type: PLAYER_ASSERTIONS,
  payload: state,
});
