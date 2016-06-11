import Puzzle, { Puzzle as PurePuzzle } from '../../src/containers/puzzle'
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux'
import createStore from '../../src/store/createStore'
import { RECEIVE_GUESS, receiveGuess } from '../../src/modules/Guess'

import _debug from 'debug'

const debug = _debug('app:puzzle')

describe('puzzle', () => {
  let wrapper,
    identity,
    store

  beforeEach(() => {
    store = createStore({})
    identity = {
      "name": 'Foo',
      "imageURL": 'Bar'
    }
    wrapper = mount(
      <Provider store={store}>
        <Puzzle identity={identity} store={createStore({})} />
      </Provider>
    )
  })

  it('has an image', () => {
    expect(wrapper.find('img')).to.be.present()
  })

  it('has a select input', () => {
    expect(wrapper.find("input")).
      to.be.present()
  })

  it('has a button', () => {
    expect(wrapper.find("input[type='submit']")).
      to.be.present()
  })

  it('triggers an action creator when a correct guess occurs', () => {
    let spy = sinon.spy(receiveGuess)
    let handleSubmit = fn => fn
    let fields = {
      "guess": {}
    }
    let wrapper = mount(
      <Provider store={store}>
        <PurePuzzle fields={fields}
          handleSubmit={handleSubmit}
          identity={identity}
          receiveGuess={spy} />
      </Provider>
    )

    let thePuzzle = wrapper.find(PurePuzzle)
    expect(thePuzzle).
      to.be.present()

    thePuzzle.find('form').simulate('submit')
    expect(spy).called
  })
})

