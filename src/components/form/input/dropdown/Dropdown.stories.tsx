import type {Meta, StoryObj} from '@storybook/react'
import {Dropdown} from './Dropdown'
import {DropdownWrapper} from '../../__stories__/InputWrappers'
import type {SelectionNode} from '../../Form'

const meta: Meta<typeof Dropdown> = {
    title: 'Form/Inputs/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    argTypes: {
        field:       { table: { disable: true } },
        registerFn:  { table: { disable: true } },
        setValueFn:  { table: { disable: true } },
        currentValue:{ table: { disable: true } },
        errorMsg:    { table: { disable: true } },
    },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '260px' }}>
            <DropdownWrapper />
        </div>
    ),
}

export const WithPlaceholder: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '260px' }}>
            <DropdownWrapper placeholder="Select a department…" />
        </div>
    ),
}

const customOptions: SelectionNode[] = [
    {
        label: 'Red',
        value: 'red',
        option: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />Red</span>,
        placeholderOption: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />Red</span>,
    },
    {
        label: 'Blue',
        value: 'blue',
        option: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />Blue</span>,
        placeholderOption: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />Blue</span>,
    },
    {
        label: 'Green',
        value: 'green',
        option: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />Green</span>,
        placeholderOption: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />Green</span>,
    },
    {
        label: 'Purple',
        value: 'purple',
        option: <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} />Purple</span>,
        placeholderOption: <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} />Purple</span>,
    },
]

export const CustomOptions: Story = {
    render: () => (
        <div style={{ padding: '1rem', maxWidth: '400px', minHeight: '260px' }}>
            <DropdownWrapper selection={customOptions} placeholder="Pick a colour…" />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', padding: '1rem', minHeight: '600px' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size}>
                    <p style={{ margin: '0 0 4px', fontFamily: 'sans-serif', fontSize: '11px', opacity: 0.5 }}>{size}</p>
                    <DropdownWrapper size={size} />
                </div>
            ))}
        </div>
    ),
}
