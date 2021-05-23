import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Divider, { DividerPropsType } from './Divider'

export default {
  title: 'ui/Divider',
  component: Divider,
} as Meta

const Template: Story<DividerPropsType> = (args) => <Divider {...args} />

export const Regular = Template.bind({
  type: 'regular',
})

export const Thin = Template.bind({
  type: 'thin',
})

export const Wide = Template.bind({
  type: 'wide',
})
