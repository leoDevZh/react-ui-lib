import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    label: 'Click me',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
}