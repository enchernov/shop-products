import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ListItem, { IListItemProps } from './ListItem'

export default {
  title: 'ui/ListItem',
  component: ListItem,
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
      defaultValue: 'ListItem',
    },
    icon: {
      control: {
        type: 'select',
        options: ['cloud', 'save', 'favorite'],
      },
    },
  },
} as Meta

const Template: Story<IListItemProps> = (args) => <ListItem {...args} />

export const NotIcon = Template.bind({})
NotIcon.args = {
  text: 'ListItem',
}

export const Icon = Template.bind({})
Icon.args = {
  ...NotIcon.args,
  icon: 'save',
}

export const Selected = Template.bind({})
Selected.args = {
  ...Icon.args,
  selected: true,
}
