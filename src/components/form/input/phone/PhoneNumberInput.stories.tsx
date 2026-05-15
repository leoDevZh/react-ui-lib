import type {Meta, StoryObj} from '@storybook/react'
import {PhoneNumberInput} from './PhoneNumberInput'
import {PhoneWrapper} from '../../__stories__/InputWrappers'

const meta: Meta<typeof PhoneNumberInput> = {
    title: 'Form/Inputs/PhoneNumberInput',
    component: PhoneNumberInput,
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
type Story = StoryObj<typeof PhoneNumberInput>

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px' }}>
            <PhoneWrapper />
        </div>
    ),
}

export const WithDefaultValue: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px' }}>
            <PhoneWrapper defaultValue="+41791234567" />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', padding: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <p style={{ margin: '0 0 4px', fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.5 }}>{size}</p>
                    <PhoneWrapper size={size} />
                </div>
            ))}
        </div>
    ),
}
