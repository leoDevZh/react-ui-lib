import type {Meta, StoryObj} from '@storybook/react'
import {ProgressInput} from './ProgressInput'
import {ProgressWrapper} from '../../__stories__/InputWrappers'
import {longSteps, shortSteps} from '../../__stories__/formFixtures'

const meta: Meta<typeof ProgressInput> = {
    title: 'Form/Inputs/ProgressInput',
    component: ProgressInput,
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
type Story = StoryObj<typeof ProgressInput>

export const ThreeSteps: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <ProgressWrapper steps={shortSteps} showAllSteps={true} />
        </div>
    ),
}

export const FiveSteps: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <ProgressWrapper steps={longSteps} showAllSteps={true} />
        </div>
    ),
}

export const EndLabelsOnly: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <ProgressWrapper steps={longSteps} showAllSteps={false} />
        </div>
    ),
}

export const WithDefaultValue: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <ProgressWrapper steps={longSteps} showAllSteps={true} defaultValue="pro" />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '480px', padding: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <p style={{ margin: '0 0 4px', fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.5 }}>{size}</p>
                    <ProgressWrapper size={size} steps={shortSteps} showAllSteps={true} />
                </div>
            ))}
        </div>
    ),
}
