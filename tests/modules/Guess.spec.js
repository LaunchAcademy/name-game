import * as mod from '../../src/modules/Guess'
import { RECEIVE_IDENTITIES } from '../../src/modules/Identity'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('guessReceived', () => {
  let identity
  let name

  beforeEach(() => {
    identity = {}
    name = 'foo'
  })

  it('specifies a type RECEIVE_GUESS', () => {
    expect(mod.guessReceived(identity, name).type).to.eql(mod.RECEIVE_GUESS)
  })

  it('includes an identity', () => {
    expect(mod.guessReceived(identity, name).identity).to.eql(identity)
  })

  it('includes the guess as guessedName', () => {
    expect(mod.guessReceived(identity, name).guessedName).to.eql(name)
  })
})

describe('receiveGuess', () => {
  let identity
  let name
  let store

  beforeEach(() => {
    identity = {}
    name = 'foo'
    store = mockStore({})
  })

  it('triggers a RECEIVE_GUESS first', () => {
    store.dispatch(mod.receiveGuess({'name': name}, name))
    expect(store.getActions()[0].type).to.eq(mod.RECEIVE_GUESS)
  })

  it('triggers a CORRECT_GUESS when the guess is correct', () => {
    store.dispatch(mod.receiveGuess({'name': name}, name))
    expect(store.getActions()[1].type).to.eq(mod.CORRECT_GUESS)
  })


  it('triggers an INCORRECT_GUESS when the guess is incorrect', () => {
    store.dispatch(mod.receiveGuess({'name': name}, 'incorrect'))
    expect(store.getActions()[1].type).to.eq(mod.INCORRECT_GUESS)
  })
})

describe('receive identities reducer', () => {
  let action
  let identities

  beforeEach(() => {
    identities = [{
      name: 'foo',
      imageURL: '/bar'
    }]
    action = {
      type: RECEIVE_IDENTITIES,
      payload: identities
    }
  })

  it('populates identitiesToGuess', () => {
    expect(mod.guessReducer(mod.INITIAL_STATE, action).identitiesToGuess)
      .to.eql(identities)
  })
})

describe('correct guess reducer', () => {
  let action
  let identity
  beforeEach(() => {
    identity = {
      name: 'foo',
      imageURL: '/bar'
    }
    action = {
      'type': mod.CORRECT_GUESS,
      'identity': identity
    }
  })

  it('increments the correctCount', () => {
    expect(mod.guessReducer(mod.INITIAL_STATE, action).correctCount)
      .to.eq(mod.INITIAL_STATE.correctCount + 1)
  })

  it('appends the identity to the list of guessedIdentities', () => {
    expect(mod.guessReducer(mod.INITIAL_STATE, action).guessedIdentities)
      .to.include(identity)
  })

  it('removes the identity from the identitiesToGuess', () => {
    expect(mod.guessReducer({
      ...mod.INITIAL_STATE,
      identitiesToGuess: [identity]
    }, action).identitiesToGuess)
      .to.eql([])
  })
})

describe('incorrect guess reducer', () => {
  let action
  let name
  beforeEach(() => {
    name = 'foo'
    action = {
      'type': mod.INCORRECT_GUESS,
      'guessedName': name
    }
  })

  it('increments the incorrectCount', () => {
    expect(mod.guessReducer(mod.INITIAL_STATE, action).incorrectCount)
      .to.eq(mod.INITIAL_STATE.incorrectCount + 1)
  })

  it('does not affect the guessedIdentities', () => {
    expect(mod.guessReducer(mod.INITIAL_STATE, action).guessedIdentities)
      .to.eql([])
  })
})
