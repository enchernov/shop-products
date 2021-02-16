export type SortingType = string

export type CategoryType =
  | 'Продукты'
  | 'Овощи'
  | 'Сладости'
  | 'Напитки'
  | 'Выпечка'

export interface ICategoryProps {
  name: CategoryType
  link: string
}

export interface IProductProps {
  name: string
  image: {
    url: string
  }
  categories: Array<ICategoryProps>
  price: number
  rating: number
  id: string
  published_at: string
  count?: number
}

export interface IProductCardProps {
  hit: IProductProps
}

export interface IShopProps {
  categories: Array<ICategoryProps>
  products: Array<IProductProps>
  sorting: SortingType
  cart: Array<any>
  wishlist: Array<any>
}

export interface ICartItem {
  id: string
  count: number
}
