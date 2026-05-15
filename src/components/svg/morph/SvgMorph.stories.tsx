import React, { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SvgMorph } from './SvgMorph'
import type { SvgMorphRef } from './SvgMorph'
import {
    StarSvgForMorph,
    CircleSvgForMorph,
    CIRCLE_PATH,
    STAR_PATH,
} from '../__stories__/SvgMorphDemo'

const btnStyle: React.CSSProperties = {
    padding: '6px 16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '13px',
    background: '#fff',
}

const meta: Meta<typeof SvgMorph> = {
    title: 'Components/SvgMorph',
    component: SvgMorph,
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
        type: {
            control: 'select',
            options: ['linear', 'rotational'],
        },
        map: {
            control: 'select',
            options: [undefined, 'size', 'position', 'complexity'],
        },
    },
}

export default meta
type Story = StoryObj<typeof SvgMorph>

export const Default: Story = {
    args: {
        triggerMode: 'manual',
        duration: 1.5,
        ease: 'power2.inOut',
        endPath: CIRCLE_PATH,
        type: 'linear',
        shapeIdx: 'auto',
    },
    render: (args) => {
        const ref = useRef<SvgMorphRef>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '2rem' }}>
                <SvgMorph ref={ref} {...args}>
                    <StarSvgForMorph />
                </SvgMorph>
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

export const CircleToStar: Story = {
    args: {
        triggerMode: 'manual',
        duration: 1.5,
        ease: 'elastic.out(1, 0.3)',
        endPath: STAR_PATH,
        type: 'rotational',
        shapeIdx: 'auto',
    },
    render: (args) => {
        const ref = useRef<SvgMorphRef>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '2rem' }}>
                <SvgMorph ref={ref} {...args}>
                    <CircleSvgForMorph />
                </SvgMorph>
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