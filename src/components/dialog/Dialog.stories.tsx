import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Dialog } from './Dialog'
import { SampleContent } from './__stories__/SampleContent'

const meta: Meta<typeof Dialog> = {
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
    args: {
        title: 'Confirm Action',
        text: 'Are you sure you want to continue with this operation?',
        acceptText: 'Confirm',
        rejectText: 'Cancel',
        size: 'md',
        closeDialog: fn(),
        onAccept: fn(),
        onReject: fn(),
    },
}

export const AcceptOnly: Story = {
    args: {
        title: 'Success',
        text: 'Your changes have been saved successfully.',
        acceptText: 'OK',
        size: 'sm',
        closeDialog: fn(),
        onAccept: fn(),
    },
}

export const WithChildren: Story = {
    args: {
        acceptText: 'Got it',
        rejectText: 'Dismiss',
        size: 'md',
        closeDialog: fn(),
        onAccept: fn(),
        onReject: fn(),
    },
    render: (args) => (
        <Dialog {...args}>
            <SampleContent />
        </Dialog>
    ),
}

const sizeWrapperDimensions: Record<string, { width: string; height: string }> = {
    xs: { width: '290px', height: '160px' },
    sm: { width: '370px', height: '220px' },
    md: { width: '470px', height: '380px' },
    lg: { width: '610px', height: '490px' },
    xl: { width: '770px', height: '610px' },
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div
                    key={size}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        ...sizeWrapperDimensions[size],
                    }}
                >
                    <Dialog
                        size={size}
                        title={size.toUpperCase()}
                        text="Sample dialog content"
                        acceptText="OK"
                        closeDialog={() => {}}
                    />
                </div>
            ))}
        </div>
    ),
}
