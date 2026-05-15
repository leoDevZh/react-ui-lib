import type { Meta, StoryObj } from '@storybook/react'
import { FlippingCard } from './FlippingCard'
import { CardFront, CardBack } from '../__stories__/FlippingCardContent'

const meta: Meta<typeof FlippingCard> = {
    title: 'Components/FlippingCard',
    component: FlippingCard,
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
type Story = StoryObj<typeof FlippingCard>

export const Default: Story = {
    args: {
        duration: 1,
        ease: 'none',
        horizontal: false,
        pin: false,
        start: 'top center',
        end: 'bottom 30%',
        toggleActions: 'play reverse play reverse',
        scrub: false,
        markers: false,
    },
    render: (args) => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <FlippingCard {...args}>
                <CardFront />
                <CardBack />
            </FlippingCard>
        </div>
    ),
}