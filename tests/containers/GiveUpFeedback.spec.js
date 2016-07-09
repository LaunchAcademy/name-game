import GiveUpFeedback, { GiveUpFeedback as PureGiveUpFeedback } from '../../src/containers/GiveUpFeedback'

import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../src/store/createStore'
import { purgeSkippedIdentity } from '../../src/modules/Guess'

describe('give up feedback', () => {
  let wrapper
  let identity
  let store

  beforeEach(() => {
    identity = {
      name: 'Bar',
      imageURL: 'https://example.com/bar.jpg'
    }

    wrapper = mount(
      <PureGiveUpFeedback skippedIdentity={identity} />
    )
  })

  it('reveals the identity name', () => {
    expect(wrapper.text()).to.contain(identity.name)
  })

  it('correlates the revealed name to an image', () => {
    expect(wrapper.find("img")).to.have.attr('src', identity.imageURL)
  })

  it('purges the skippedIdentity when closed', () =>{
    let spy = sinon.spy(purgeSkippedIdentity)
    wrapper = mount(
      <PureGiveUpFeedback skippedIdentity={identity}
        purgeSkippedIdentity={spy} />
    )
    wrapper.find("button").simulate("click")
    expect(spy).called
  })
})
