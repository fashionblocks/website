

import { Action } from './actions';

import moment, { Moment } from 'moment';

export interface State {
  member?: any;
  tick: Moment;
}

export default function rootReducer(state: State = { tick: moment() }, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      return ({ ...state, member: action.member });

    case 'TICK':
      return ({ ...state, tick: action.tick });

    default:
      return state;
  }
}
