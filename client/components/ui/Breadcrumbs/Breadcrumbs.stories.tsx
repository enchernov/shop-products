import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Breadcrumbs from './index'

export default {
  title: 'ui/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

const Template: Story = () => <Breadcrumbs />
export const Default = Template.bind({})
