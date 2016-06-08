import GuessFeedback from '../../src/containers/GuessFeedback'

import { mount } from 'enzyme'
import React from 'react'

describe('Guess Feedback', () => {
  let guess
  let component

  describe('correct guesses', () => {
    beforeEach(() => {
      guess = {
        correct: true,
        identity: {
          name: 'Foo'
        }
      }

      component = mount(
        <GuessFeedback guess={guess} />
      )
    })

    it('affirms the guess was right', () => {
      expect(component.text()).to.contain('Yes')
    })

    it('sets the "correct" class name', () => {
      expect(component.find("p.correct")).to.be.present()
    })
  })


  describe('incorrect guesses', () => {
    beforeEach(() => {
      guess = {
        correct: false,
        identity: {
          name: 'Foo'
        }
      }

      component = mount(
        <GuessFeedback guess={guess} />
      )
    })

    it('affirms the guess was right', () => {
      expect(component.text()).to.contain('Nope')
    })

    it('sets the "correct" class name', () => {
      expect(component.find("p.incorrect")).to.be.present()
    })
  })



  it('indicates when an guess is incorrect', () => {
  })
})
