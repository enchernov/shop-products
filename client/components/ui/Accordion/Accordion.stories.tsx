import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'
import Accordion from './index'
import { Typography } from '@material-ui/core'

export default {
  title: 'ui/Accordion',
  component: Accordion,
} as Meta

const Template: Story = (args) => (
  <Accordion title={args.title}>{args.children}</Accordion>
)
export const Default = Template.bind({})
Default.args = {
  title: 'Заголовок',
  children: <Typography variant={'body2'}>Содержание аккордиона</Typography>,
}
//
// export const General = Template.bind({})
// General.args = {
//   title: 'General',
//   children: <Typography variant={'body2'}>General settings</Typography>,
// }
