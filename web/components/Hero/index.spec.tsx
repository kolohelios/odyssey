import * as React from 'react'
import { render } from '@testing-library/react'
import { Hero } from '.'
import 'jest-dom/extend-expect'

it('renders welcome message', () => {
  const { getByText } = render(<Hero />)
  expect(getByText('Hello')).toBeInTheDocument()
});
