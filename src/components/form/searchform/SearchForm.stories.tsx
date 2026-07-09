import type { Meta, StoryObj } from '@storybook/react'
import { SearchForm } from './SearchForm'
import type { SearchFormProps } from './SearchForm'

const noop = (): boolean => true
const noopSubmit = async (_data: unknown): Promise<void> => {}

const meta: Meta<SearchFormProps> = {
    title: 'Form/SearchForm',
    component: SearchForm,
    tags: ['autodocs'],
    argTypes: {
        componentSize: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        validationFn:   { table: { disable: true } },
        onSubmitFn:     { table: { disable: true } },
        defaultValues:  { table: { disable: true } },
        onValuesChange: { table: { disable: true } },
        setErrorMsg:    { table: { disable: true } },
        submitIndicator:{ table: { disable: true } },
    },
}

export default meta
type Story = StoryObj<SearchFormProps>

export const Default: Story = {
    args: { componentSize: 'md', placeholder: 'Search...', required: false, validationFn: noop, onSubmitFn: noopSubmit },
    render: (args) => (
        <div style={{ maxWidth: '400px', padding: '1rem' }}>
            <SearchForm {...args} />
        </div>
    ),
}

export const Submitting: Story = {
    args: { componentSize: 'md', placeholder: 'Search...', required: false, validationFn: noop, onSubmitFn: noopSubmit, submitting: true },
    render: (args) => (
        <div style={{ maxWidth: '400px', padding: '1rem' }}>
            <SearchForm {...args} />
        </div>
    ),
}
