export const RECEIVE_GUESS = 'RECEIVE_GUESS'

export function receiveGuess(identity, name) {
  return {
    'type': RECEIVE_GUESS,
    'identity': identity,
    'guessedName': name
  }
}
