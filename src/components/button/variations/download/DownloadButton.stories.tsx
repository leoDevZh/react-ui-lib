import type { Meta, StoryObj } from '@storybook/react'
import { DownloadButton } from './DownloadButton'

const meta: Meta<typeof DownloadButton> = {
  title: 'Components/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof DownloadButton>

export const Default: Story = {
  args: {
    label: 'Download',
    size: 'md',
    fileName: 'file.pdf',
    downloadLink: '#',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Download',
    size: 'md',
    fileName: 'file.pdf',
    downloadLink: '#',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <DownloadButton key={size} size={size} label={size} fileName="file.pdf" downloadLink="#" />
      ))}
    </div>
  ),
}