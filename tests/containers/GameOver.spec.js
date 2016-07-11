import { mount } from 'enzyme'
import React from 'react'

import { GameOver as PureGameOver } from '../../src/containers/GameOver'

import { resetGame } from '../../src/modules/Guess'

describe('GameOver', () => {
  let component
  let spy

  it('has a button that resets the game', () => {
    spy = sinon.spy(resetGame)
    component = mount(
      <PureGameOver resetGame={spy} />
    )
    component.find('button').simulate('click')
    expect(spy).called
  })
})
