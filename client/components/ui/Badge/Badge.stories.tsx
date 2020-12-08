import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Badge, { IBadgeProps } from './Badge'

export default {
  title: 'ui/Badge',
  component: Badge,
} as Meta

const Template: Story<IBadgeProps> = ({ children, badgeContent }) => (
  <Badge badgeContent={badgeContent}>{children}</Badge>
)

export const Default = Template.bind({})
Default.args = {
  badgeContent: '<Avatar>E<Avatar>',
  children: '<Avatar>E<Avatar>',
}
