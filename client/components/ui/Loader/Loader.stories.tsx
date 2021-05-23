import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Loader from './Loader'

export default {
  title: 'ui/Loader',
  component: Loader,
} as Meta

const Template: Story = (args) => <Loader {...args} />

export const Default = Template.bind({})
