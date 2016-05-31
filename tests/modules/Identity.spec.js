import manageIdentities, * as mod from '../../src/modules/Identity';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('requestIdentities action', () => {
  it('creates an action creator', () => {
    expect(mod.requestIdentities()).to.eql({
      'type': mod.REQUEST_IDENTITIES
    })
  })
})

describe('receiveIdentities action', () => {
  it('has the argument as the payload', () => {
    const emptyList = []
    const identities = mod.receiveIdentities(emptyList)
    expect(identities.payload).to.eql(emptyList)
  })

  it('shuffles the argument as a payload', () => {
    const list = [
      {
        'name': 'a',
        'imageURL': '/1'
      },
      {
        'name': 'b',
        'imageURL': '/2'
      }
    ]
    const identities = mod.receiveIdentities(list)
    expect(identities.payload).to.contain(list[0])
    expect(identities.payload).to.contain(list[1])
  })
})


describe('fetch identities action', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('dispatches a request action', () => {
    fetchMock.mock(/PresidentList\.json/, 'GET', [])
    const store = mockStore([])

    return store.dispatch(mod.fetchIdentities())
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).to.eq(mod.REQUEST_IDENTITIES)
      })
  })

  it('dispatches a receive action', () => {
    fetchMock.mock(/PresidentList\.json/, 'GET', [])
    const store = mockStore([])

    return store.dispatch(mod.fetchIdentities())
      .then(() => {
        expect(store.getActions()[1].type).to.eq(mod.RECEIVE_IDENTITIES)
      })
  })
})

describe('manageIdentities reducer', () => {
  it('returns initialState if the type is not RECEIVE', () => {
    const bunkAction = {'type': 'SOMETHING_WACKY' }
    const emptyState = []
    const result = manageIdentities(emptyState, bunkAction)
    expect(result).to.eql(emptyState)
  })

  it('returns the payload list if the action is RECEIVE', () => {
    const identities = [];
    const rightAction = {
      'type': mod.RECEIVE_IDENTITIES,
      'payload': identities
    }
    const result = manageIdentities([], rightAction)
    expect(result).to.eql(rightAction.payload)
  })
})
