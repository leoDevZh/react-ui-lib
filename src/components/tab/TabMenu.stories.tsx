import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TabMenu } from './TabMenu'
import { tabItems, manyTabItems } from './__stories__/TabMenuContent'

const meta: Meta<typeof TabMenu> = {
    title: 'Components/TabMenu',
    component: TabMenu,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
}

export default meta
type Story = StoryObj<typeof TabMenu>

export const Default: Story = {
    args: {
        size: 'md',
        displayArrow: true,
    },
    render: (args) => (
        <div style={{ height: '240px', width: '100%' }}>
            <TabMenu {...args} items={tabItems} />
        </div>
    ),
}

export const ManyTabs: Story = {
    args: {
        size: 'md',
        displayArrow: true,
    },
    render: (args) => (
        <div style={{ height: '240px', width: '100%' }}>
            <TabMenu {...args} items={manyTabItems} />
        </div>
    ),
}

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size} style={{ height: '200px' }}>
                    <p style={{ margin: '0 0 8px', fontFamily: 'sans-serif', fontSize: '12px', opacity: 0.5 }}>{size}</p>
                    <TabMenu size={size} items={tabItems} />
                </div>
            ))}
        </div>
    ),
}