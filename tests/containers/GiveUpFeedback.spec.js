import GiveUpFeedback from '../../src/containers/GiveUpFeedback'

import { mount } from 'enzyme'
import React from 'react'

describe('give up feedback', () => {
  let wrapper
  let identity

  beforeEach(() => {
    identity = {
      name: 'Bar',
      imageURL: 'https://example.com/bar.jpg'
    }

    wrapper = mount(
      <GiveUpFeedback skippedIdentity={identity} />
    )
  })

  it('reveals the identity name', () => {
    expect(wrapper.text()).to.contain(identity.name)
  })

  it('correlates the revealed name to an image', () => {
    expect(wrapper.find("img")).to.have.attr('src', identity.imageURL)
  })
})
