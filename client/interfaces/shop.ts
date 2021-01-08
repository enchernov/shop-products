export type SortingType = 'rating' | 'lowToHigh' | 'highToLow' | 'newest'

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
}

export interface IShopProps {
  categories: Array<ICategoryProps>
  products: Array<IProductProps>
  sorting: SortingType
  cart: Array<any>
}
