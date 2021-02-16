import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ProductCard from './index'
import { IProductProps } from '@interfaces/shop'

export default {
  title: 'shop/ProductCard',
  component: ProductCard,
  argTypes: {
    id: {
      control: {
        type: 'text',
      },
      defaultValue: '0',
    },
    name: {
      control: {
        type: 'text',
      },
      defaultValue: 'Белый лук',
    },
    image: {
      control: {
        type: 'text',
      },
      defaultValue:
        'https://food-market.cmsmasters.net/wp-content/uploads/2015/05/16.jpg',
    },
    categories: {
      control: {
        type: 'array',
      },
      defaultValue: ['Продукты', 'Овощи'],
    },
    price: {
      control: {
        type: 'number',
        min: 1,
      },
      defaultValue: 150,
    },
    rating: {
      control: {
        type: 'number',
        min: 0,
        max: 5,
        step: 0.5,
      },
      defaultValue: 3,
    },
  },
} as Meta

const Template: Story<IProductProps> = (args) => <ProductCard hit={args} />
export const Default = Template.bind({})
Default.args = {}
