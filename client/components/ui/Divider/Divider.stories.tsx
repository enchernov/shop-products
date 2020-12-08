import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Divider, { IDividerProps } from './Divider'

export default {
  title: 'ui/Divider',
  component: Divider,
} as Meta

const Template: Story<IDividerProps> = () => <Divider />

export const Default = Template.bind({})
