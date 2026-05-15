import React, { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SvgDraw } from './SvgDraw'
import type { SvgDrawRef } from './SvgDraw'
import { StarSvg, LightningBoltSvg } from '../__stories__/SvgDrawDemo'

const btnStyle: React.CSSProperties = {
    padding: '6px 16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '13px',
    background: '#fff',
}

const meta: Meta<typeof SvgDraw> = {
    title: 'Components/SvgDraw',
    component: SvgDraw,
    tags: ['autodocs'],
    argTypes: {
        ease: {
            control: 'select',
            options: [
                'none',
                'power1.inOut',
                'power2.inOut',
                'power3.inOut',
                'elastic.out(1, 0.3)',
                'back.inOut(1.7)',
            ],
        },
    },
}

export default meta
type Story = StoryObj<typeof SvgDraw>

export const Default: Story = {
    args: {
        triggerMode: 'manual',
        duration: 1.5,
        ease: 'none',
    },
    render: (args) => {
        const ref = useRef<SvgDrawRef>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '2rem' }}>
                <SvgDraw ref={ref} {...args}>
                    <StarSvg />
                </SvgDraw>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={btnStyle} onClick={() => ref.current?.play()}>Play</button>
                    <button style={btnStyle} onClick={() => ref.current?.pause()}>Pause</button>
                    <button style={btnStyle} onClick={() => ref.current?.restart()}>Restart</button>
                    <button style={btnStyle} onClick={() => ref.current?.reverse()}>Reverse</button>
                </div>
            </div>
        )
    },
}

export const LightningBolt: Story = {
    args: {
        triggerMode: 'manual',
        duration: 1.5,
        ease: 'power2.inOut',
    },
    render: (args) => {
        const ref = useRef<SvgDrawRef>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '2rem' }}>
                <SvgDraw ref={ref} {...args}>
                    <LightningBoltSvg />
                </SvgDraw>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={btnStyle} onClick={() => ref.current?.play()}>Play</button>
                    <button style={btnStyle} onClick={() => ref.current?.pause()}>Pause</button>
                    <button style={btnStyle} onClick={() => ref.current?.restart()}>Restart</button>
                    <button style={btnStyle} onClick={() => ref.current?.reverse()}>Reverse</button>
                </div>
            </div>
        )
    },
}