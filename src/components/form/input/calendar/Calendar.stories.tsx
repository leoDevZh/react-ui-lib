import {useForm} from 'react-hook-form'
import type {Meta, StoryObj} from '@storybook/react'
import {CalendarInput} from './Calendar'
import {CalendarWrapper} from '../../__stories__/InputWrappers'
import {noop} from '../../__stories__/formFixtures'
import type {FieldConfig} from '../../Form'

type F = Record<string, any>

const meta: Meta<typeof CalendarInput> = {
    title: 'Form/Inputs/Calendar',
    component: CalendarInput,
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
type Story = StoryObj<typeof CalendarInput>

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '360px' }}>
            <CalendarWrapper />
        </div>
    ),
}

export const RestrictedYears: Story = {
    render: () => {
        const { register, watch, setValue } = useForm<F>()
        const field: FieldConfig<F> = {
            name: 'date', label: 'Appointment Date (2024–2027)', type: 'calendar',
            required: false, validationFn: noop,
            inputConfig: { calendar: { yearsToSelect: [2024, 2025, 2026, 2027] } },
        }
        return (
            <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '360px' }}>
                <CalendarInput field={field} registerFn={register} currentValue={watch('date')} setValueFn={setValue} errorMsg={null} />
            </div>
        )
    },
}

export const WithDefaultValue: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '360px' }}>
            <CalendarWrapper defaultValue="2025-06-15T00:00:00.000Z" />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', padding: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <p style={{ margin: '0 0 4px', fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.5 }}>{size}</p>
                    <CalendarWrapper size={size} />
                </div>
            ))}
        </div>
    ),
}
