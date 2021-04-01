import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import Accordion from './index'

export default {
  title: 'ui/Accordion',
  component: Accordion,
} as Meta

const Template: Story = (args) => (
  <Accordion title={args.title}>{args.children}</Accordion>
)
export const Default = Template.bind({})
Default.args = {
  title: 'TITLE',
  children: <h1>Settings</h1>,
}

export const General = Template.bind({})
General.args = {
  title: 'General',
  children: <h1>General settings</h1>,
}
