import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import SortingSelector from './index'

export default {
  title: 'shop/SortingSelector',
  component: SortingSelector,
} as Meta

const Template: Story = (args) => <SortingSelector {...args} />
export const Default = Template.bind({})
Default.args = {}
