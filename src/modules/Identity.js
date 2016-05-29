import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const RECEIVE_IDENTITIES = 'RECEIVE_IDENTITIES'
export const REQUEST_IDENTITIES = 'REQUEST_IDENTITIES'

export function requestIdentities () {
  return {
    'type': REQUEST_IDENTITIES
  }
}

export function receiveIdentities (identities) {
  return {
    'type': RECEIVE_IDENTITIES,
    'payload': _.shuffle(identities)
  }
}

export function fetchIdentities () {
  const req = fetch('/PresidentList.json')

  return function (dispatch) {
    dispatch(requestIdentities())
    return req
      .then(response => {
        console.log(response); response.json()
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
    return initialState
  }
}
