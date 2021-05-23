import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Breadcrumbs from './Breadcrumbs'

export default {
  title: 'ui/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

const Template: Story = (args) => <Breadcrumbs {...args} />

export const Shop = Template.bind({})
