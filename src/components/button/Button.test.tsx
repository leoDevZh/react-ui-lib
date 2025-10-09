import { render, screen } from '@testing-library/react'
import Button from "./button"

test('renders the button with label', () => {
    render(<Button/>)
    expect(screen.getByText('Awesome Button')).toBeDefined()
});
