import { GraphQLError } from 'graphql'

export const errorMessage = ({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    return graphQLErrors.map((err: GraphQLError) => {
      const message =
        err?.extensions?.exception?.data?.message[0]?.messages[0]?.message
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
        case 'Your account email is not confirmed': {
          return 'Ваш email не подтвержден'
        }
        default: {
          return message
        }
      }
    })
  }
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
