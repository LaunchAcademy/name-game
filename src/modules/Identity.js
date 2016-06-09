require('isomorphic-fetch')
// unused
// import _ from 'lodash'

// unused
// import { CORRECT_GUESS } from './Guess'

export const RECEIVE_IDENTITIES = 'nameGame/identities/RECEIVE_IDENTITIES'
export const REQUEST_IDENTITIES = 'nameGame/identities/REQUEST_IDENTITIES'

// can clean up ACreators using ES6 => funcs. If you don't need to do
// any logic within them it saves a little typing.
export const requestIdentities = () => ({ type: REQUEST_IDENTITIES })
export const receiveIdentities = (identities) => ({
  type: RECEIVE_IDENTITIES,
  payload: identities,
})

export function fetchIdentities () {
  const req = fetch('/PresidentList.json')

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
export default function (state = initialState, action) {
  if (action.type === RECEIVE_IDENTITIES) {
    return action.payload
  }
  else {
    return state
  }
}
