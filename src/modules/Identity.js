require('isomorphic-fetch')

export const ACTION_PREFIX = 'nameGame/identities'
export const RECEIVE_IDENTITIES = `${ACTION_PREFIX}/RECEIVE_IDENTITIES`
export const REQUEST_IDENTITIES = `${ACTION_PREFIX}/REQUEST_IDENTITIES`

import { config } from './config'

export function requestIdentities () {
  return {
    'type': REQUEST_IDENTITIES
  }
}

export function receiveIdentities (identities) {
  return {
    'type': RECEIVE_IDENTITIES,
    'payload': identities
  }
}

export function fetchIdentities () {
  const req = fetch(config.identity_json_path)

  return function (dispatch) {
    dispatch(requestIdentities())
    return req
      .then(response => {
        return response.json()
      })
      .then(response => dispatch(receiveIdentities(response)))
  }
};

const initialState = []
export default function manageIdentities (state = initialState, action) {
  if (action.type === RECEIVE_IDENTITIES) {
    return action.payload
  }
  else {
    return state
  }
}
