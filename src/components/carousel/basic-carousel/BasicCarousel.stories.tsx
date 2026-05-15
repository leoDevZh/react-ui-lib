import type {Meta, StoryObj} from '@storybook/react'
import {BasicCarousel} from './BasicCarousel'
import {FeatureCard, featureSlides} from '../__stories__/FeatureCard'

const slides = featureSlides.map((d) => <FeatureCard key={d.number} {...d} />)

const meta: Meta<typeof BasicCarousel> = {
  title: 'Components/BasicCarousel',
  component: BasicCarousel,
  tags: ['autodocs'],
  argTypes: {
    carouselToggleBtnType: {
      control: 'select',
      options: [undefined, 'Basic'],
    },
    carouselIndexIndicatorType: {
      control: 'select',
      options: [undefined, 'Basic', 'Numbers'],
    },
  },
}

export default meta
type Story = StoryObj<typeof BasicCarousel>

export const Default: Story = {
  args: {
    itemGap: '15px',
    padding: true,
    initialIdx: 0,
    hideCTA: false,
    carouselToggleBtnType: 'Basic',
    carouselIndexIndicatorType: 'Basic',
  },
  render: (args) => (
    <div style={{ height: '220px', width: '100%' }}>
      <BasicCarousel {...args}>
        {slides}
      </BasicCarousel>
    </div>
  ),
}

export const NumberIndicator: Story = {
  render: () => (
    <div style={{ height: '220px', width: '100%' }}>
      <BasicCarousel carouselToggleBtnType="Basic" carouselIndexIndicatorType="Numbers" hideCTA={false} padding>
        {slides}
      </BasicCarousel>
    </div>
  ),
}

export const HideCTA: Story = {
  render: () => (
    <div style={{ height: '220px', width: '100%' }}>
      <BasicCarousel carouselToggleBtnType="Basic" carouselIndexIndicatorType="Basic" hideCTA={true}>
        {slides}
      </BasicCarousel>
    </div>
  ),
}