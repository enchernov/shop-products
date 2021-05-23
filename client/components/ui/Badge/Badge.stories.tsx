import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Badge, { IBadgeProps } from './Badge'
import { Avatar, IconButton } from '@ui/index'
import LinkIcon from '@material-ui/icons/Link'

export default {
  title: 'ui/Badge',
  component: Badge,
} as Meta

const Template: Story<IBadgeProps> = ({ children, badgeContent }) => (
  <Badge badgeContent={badgeContent}>{children}</Badge>
)

export const Default = Template.bind({})
Default.args = {
  badgeContent: (
    <IconButton
      aria-label="upload picture"
      icon="photo"
      style={{ padding: 4, color: 'rgba(0, 0, 0, 0.26)' }}
    >
      <LinkIcon />
    </IconButton>
  ),
  children: <Avatar>E</Avatar>,
}
