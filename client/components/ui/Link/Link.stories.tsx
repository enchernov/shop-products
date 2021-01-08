import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Link from './index'
import { ILinkProps } from './Link'

export default {
  title: 'ui/Link',
  component: Link,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'Link',
    },
    href: {
      control: {
        type: 'text',
      },
      defaultValue: '/',
    },
    as: {
      control: {
        type: 'text',
      },
      defaultValue: '/',
    },
  },
} as Meta

const Template: Story<ILinkProps> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Link',
  href: '/',
  as: '/',
}
