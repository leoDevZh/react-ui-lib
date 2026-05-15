import type { Meta, StoryObj } from '@storybook/react'
import { LightButton } from './LightButton'

const meta: Meta<typeof LightButton> = {
  title: 'Components/LightButton',
  component: LightButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof LightButton>

export const Default: Story = {
  args: {
    label: 'Light Button',
    size: 'md',
  },
}

export const Inverted: Story = {
  args: {
    label: 'Inverted',
    size: 'md',
    invert: true,
  },
}

export const SimpleColor: Story = {
  args: {
    label: 'Simple Color',
    size: 'md',
    simpleColor: true,
  },
}

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="1em" height="1em">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
)

export const WithIcon: Story = {
  render: () => <LightButton label="With Icon" size="md" icon={<ArrowIcon />} />,
}

export const WithIconOnHover: Story = {
  render: () => <LightButton label="Hover me" size="md" icon={<ArrowIcon />} drawIcon />,
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <LightButton key={size} size={size} label={size} />
      ))}
    </div>
  ),
}