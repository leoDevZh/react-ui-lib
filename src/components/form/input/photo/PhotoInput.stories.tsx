import type {Meta, StoryObj} from '@storybook/react'
import {PhotoInput} from './PhotoInput'
import {PhotoWrapper} from '../../__stories__/InputWrappers'
import {PLACEHOLDER_IMG} from '../../__stories__/formFixtures'

const meta: Meta<typeof PhotoInput> = {
    title: 'Form/Inputs/PhotoInput',
    component: PhotoInput,
    tags: ['autodocs'],
    argTypes: {
        field:        { table: { disable: true } },
        registerFn:   { table: { disable: true } },
        setValueFn:   { table: { disable: true } },
        currentValue: { table: { disable: true } },
        errorMsg:     { table: { disable: true } },
    },
}

export default meta
type Story = StoryObj<typeof PhotoInput>

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem' }}>
            <PhotoWrapper />
        </div>
    ),
}

export const WithInitialImage: Story = {
    render: () => (
        <div style={{ padding: '1rem' }}>
            <PhotoWrapper initialImg={PLACEHOLDER_IMG} />
        </div>
    ),
}

export const WithDelete: Story = {
    render: () => (
        <div style={{ padding: '1rem' }}>
            <PhotoWrapper initialImg={PLACEHOLDER_IMG} onDelete={() => {}} />
        </div>
    ),
}
