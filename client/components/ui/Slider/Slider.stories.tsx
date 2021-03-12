import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Slider from './index'

export default {
  title: 'ui/Slider',
  component: Slider,
  argTypes: {},
} as Meta

const Template: Story = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {
  min: 100,
  max: 200,
}
