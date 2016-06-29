import { mount } from 'enzyme'
import React from 'react'

import { Provider } from 'react-redux'
import createStore from '../../src/store/createStore'

import GiveUpButton, { GiveUpButton as PureGiveUpButton } from '../../src/containers/GiveUpButton'
import { skipGuess } from '../../src/modules/Guess'

describe('GiveUp Button', () => {
  let component
  let store
  let spy

  beforeEach(() => {
    store = createStore({})
    component = mount(
      <Provider store={store}>
        <GiveUpButton />
      </Provider>
    )
  })

  it('is a button', () => {
    expect(component.find('button')).to.be.present()
  })

  it('triggers an action creator when clicked', () => {
    spy = sinon.spy(skipGuess)
    component = mount(
      <PureGiveUpButton skipGuess={spy} />
    )
    component.find('button').simulate('click')
    expect(spy).called
  })

})
