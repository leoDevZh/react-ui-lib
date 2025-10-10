import {fireEvent, render, screen} from '@testing-library/react'
import { Button } from "./button";

describe('renders the button with label', () => {
    test('renders the button with default label', () => {
        render(<Button />)
        expect(screen.getByText('Click me')).toBeDefined()
    })
    test('renders the button with label', () => {
        const label = 'Hello World'
        render(<Button label={label}/>)
        expect(screen.getByText(label)).toBeDefined()
    })
})

describe('calls onClick function', () => {
    test('renders the button with default label', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}/>)

        const button = screen.getByText('Click me')
        fireEvent.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})

