import guessReducer, * as mod from '../../src/modules/Guess'
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

  it('triggers a PRELOAD_NEXT_GUESS when the guess is correct', () => {
    store.dispatch(mod.receiveGuess({'name': name}, name))
    expect(store.getActions()[1].type).to.eq(mod.PRELOAD_NEXT_GUESS)
  })
  it('triggers a CORRECT_GUESS when the guess is correct', () => {
    store.dispatch(mod.receiveGuess({'name': name}, name))
    expect(store.getActions()[2].type).to.eq(mod.CORRECT_GUESS)
  })


  it('triggers an INCORRECT_GUESS when the guess is incorrect', () => {
    store.dispatch(mod.receiveGuess({'name': name}, 'incorrect'))
    expect(store.getActions()[1].type).to.eq(mod.INCORRECT_GUESS)
  })
})

describe('skip guess action creator', () => {
  it('sends a type of SKIP_GUESS', () => {
    expect(mod.skipGuess().type).to.eq(mod.SKIP_GUESS)
  })
})

describe('reset game action creator', () => {
  it('sends a type of GAME_RESET', () => {
    expect(mod.signalReset().type).to.eq(mod.GAME_RESET)
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
    expect(guessReducer(mod.INITIAL_STATE, action).identitiesToGuess)
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
    expect(guessReducer(mod.INITIAL_STATE, action).correctCount)
      .to.eq(mod.INITIAL_STATE.correctCount + 1)
  })

  it('appends the identity to the list of guessedIdentities', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).guessedIdentities)
      .to.include(identity)
  })

  it('removes the identity from the identitiesToGuess', () => {
    expect(guessReducer({
      ...mod.INITIAL_STATE,
      identitiesToGuess: [identity]
    }, action).identitiesToGuess)
      .to.eql([])
  })

  it('adds the guess to the lastGuess', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).lastGuess.name)
      .to.eql(action.identity.name)
  })

  it('indicates that the last guess was incorrect', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).lastGuess.correct)
      .to.be.truthy
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
    expect(guessReducer(mod.INITIAL_STATE, action).incorrectCount)
      .to.eq(mod.INITIAL_STATE.incorrectCount + 1)
  })

  it('does not affect the guessedIdentities', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).guessedIdentities)
      .to.eql([])
  })

  it('adds the guess to the lastGuess', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).lastGuess.name)
      .to.eql(action.guessedName)
  })

  it('indicates that the last guess was incorrect', () => {
    expect(guessReducer(mod.INITIAL_STATE, action).lastGuess.correct)
      .to.be.falsy
  })
})

describe('preload next image reducer', () => {
  let oldImage
  let state = {}
  beforeEach(() => {
    oldImage = window.Image
    window.Image = sinon.spy()

    state.identitiesToGuess = [
      {
        'imageURL': '/foo.jpg'
      },
      {
        'imageURL': '/bar.jpg'
      },
      {
        'imageURL': '/baz.jpg'
      }
    ]
  })

  afterEach(() => {
    window.Image = oldImage
  })

  it('preloads an the next to image to guess', () => {
    guessReducer(state, { 'type': mod.PRELOAD_NEXT_GUESS })
    expect(window.Image).to.have.been.called
  })

  it('does not attempt to preload an image if on last guess', () => {
    state.identitiesToGuess = [state.identitiesToGuess[0]]
    expect(window.Image).to.not.have.been.called
  })

  it('does not attempt to preload an image if on 2nd to last guess', () => {
    state.identitiesToGuess = [state.identitiesToGuess[0], state.identitiesToGuess[1]]
    expect(window.Image).to.not.have.been.called
  })
})

describe('skip guess reducer', () => {
  let state = {}

  beforeEach(() => {
    state.identitiesToGuess = [
      { 'name': 'foo' }
    ]

    state.lastGuess = { 'name': 'bar' }
  })
  it('removes the first item in the list', () => {
    expect(guessReducer(state, { type: mod.SKIP_GUESS }).identitiesToGuess).to.be.empty
  })

  it('populates the skippedIdentity', () => {
    expect(guessReducer(state, { type: mod.SKIP_GUESS }).skippedIdentity)
      .to.eq(state.identitiesToGuess[0])
  })

  it('clears out lastGuess', () => {
    expect(guessReducer(state, { type: mod.SKIP_GUESS }).lastGuess).to.eq(null)
  })
})

describe('game reset reducer', () => {
  let state = {}
  it('resets the game to initial state', () => {
    expect(guessReducer(state, { type: mod.GAME_RESET }).correctCount).to.eq(0)
  })

  it('sets the last game ended at', () => {
    expect(guessReducer(state, { type: mod.GAME_RESET }).lastGameEndedAt).to.not.eq(null)
  })

  it('increments the games played', () => {
    expect(guessReducer(state, { type: mod.GAME_RESET }).gamesPlayed).to.eq(1)
  })
})
