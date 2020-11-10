import React from 'react'
import Button from '../Button'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Button>Some Text</Button>).toJSON()
  expect(tree).toMatchSnapshot()
})

// import { render, fireEvent } from '@testing-library/react';
// it('should respond to click events', () => {
//   const handleClick = jest.fn()
//   const instance = render(<Button {...Text.args} onClick={handleClick} />)
//   fireEvent.click(instance.container.firstChild)
//   expect(handleClick).toHaveBeenCalled()
// })
