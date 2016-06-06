import { PuzzleStatistics } from '../../src/containers/PuzzleStatistics'
import { mount } from 'enzyme'
import React from 'react'

describe('puzzle statistics', () => {
  let props
  let component

  beforeEach(() => {
    props = {
      correctCount: 1,
      incorrectCount: 2,
      leftToGuessCount: 4
    }

    component = mount(
      <PuzzleStatistics {...props} />
    )
  })
  it('shows the correctCount', () => {
    expect(component.text()).to.contain(props.correctCount)
  })

  it('shows the incorrectCount', () => {
    expect(component.text()).to.contain(props.incorrectCount)
  })

  it('shows the leftToGuessCount', () => {
    expect(component.text()).to.contain(props.leftToGuessCount)
  })

  it('shows the total guesses', () => {
    const totalCount = props.correctCount + props.incorrectCount
    expect(component.text()).to.contain(totalCount)
  })
})
