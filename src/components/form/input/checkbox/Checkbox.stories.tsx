import {useForm} from 'react-hook-form'
import type {Meta, StoryObj} from '@storybook/react'
import {CheckboxInput} from './Checkbox'
import {CheckboxWrapper} from '../../__stories__/InputWrappers'
import {noop} from '../../__stories__/formFixtures'
import type {FieldConfig, SelectionNode} from '../../Form'

type F = Record<string, any>

const meta: Meta<typeof CheckboxInput> = {
    title: 'Form/Inputs/Checkbox',
    component: CheckboxInput,
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
type Story = StoryObj<typeof CheckboxInput>

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <CheckboxWrapper />
        </div>
    ),
}

export const PreSelected: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '480px' }}>
            <CheckboxWrapper defaultValues={['hiking', 'photography']} />
        </div>
    ),
}

const manyOptions: SelectionNode[] = [
    { label: 'Hiking', value: 'hiking' },
    { label: 'Reading', value: 'reading' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Photography', value: 'photography' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Travel', value: 'travel' },
    { label: 'Music', value: 'music' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Running', value: 'running' },
]

export const ManyOptions: Story = {
    render: () => {
        const { register, watch, setValue } = useForm<F>()
        const field: FieldConfig<F> = {
            name: 'hobbies', label: 'Interests (9 options)', type: 'checkbox',
            required: false, validationFn: noop,
            inputConfig: { checkbox: { selection: manyOptions } },
        }
        return (
            <div style={{ padding: '1rem', maxWidth: '600px' }}>
                <CheckboxInput field={field} registerFn={register} currentValue={watch('hobbies') ?? []} setValueFn={setValue} errorMsg={null} />
            </div>
        )
    },
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <p style={{ margin: '0 0 4px', fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.5 }}>{size}</p>
                    <CheckboxWrapper size={size} />
                </div>
            ))}
        </div>
    ),
}
