
import moment, { Moment } from 'moment';

export interface LoginAction {
  type: 'LOGIN';
  member?: any;
}

export function login(member?: any) {
  return ({
    type: 'LOGIN',
    member,
  });
}

export interface TickAction {
  type: 'TICK';
  tick: Moment;
}

export function tick() {
  return ({
    type: 'TICK',
    tick: moment(),
  });
}

export type Action =
  LoginAction |
  TickAction
;
