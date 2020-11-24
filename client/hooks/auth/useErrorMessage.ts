import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { ApolloLink } from '@apollo/client'

export const useErrorMessage: ApolloLink = onError(
  ({ graphQLErrors, networkError }: any) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message }: GraphQLError) => {
        switch (message) {
          case 'Username already taken': {
            return 'Пользователь с таким логином уже существует'
          }
          case 'Email is already taken.': {
            return 'Пользователь с таким email уже существует'
          }
          case 'Identifier or password invalid.': {
            return 'Пользователь или email неверные'
          }
          default: {
            return message
          }
        }
      })
    if (networkError) {
      switch (networkError.status) {
        case 403:
          return 'У вас нет прав доступа'
        case 404:
          return 'Такой страницы нет'
        case 500:
          return 'Ошибка сервера'
        case 502:
          return 'Неверный ответ сервера'
        case 503:
          return 'Сервис недоступен'
        default:
          return networkError.message
      }
    }
  }
)
