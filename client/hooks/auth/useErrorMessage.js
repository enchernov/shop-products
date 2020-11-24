export const useErrorMessage = (error) => {
  let errorMessage = ''
  let field = ['']
  // if (Object.entries(error).length !== 0 && error.constructor === Object) {
  error = JSON.stringify(error)
  if (error.indexOf('Email is already taken') > -1) {
    errorMessage = 'Пользователь с таким email уже существует'
    field = ['email']
  } else if (error.indexOf('Username is already taken') > -1) {
    errorMessage = 'Пользователь с таким логином уже существует'
    field = ['username']
  } else if (error.indexOf('Identifier or password invalid.') > -1) {
    errorMessage = 'Пользователь или пароль указаны неверно'
    field = ['email', 'password']
  } else {
    errorMessage = 'Неизвестная ошибка'
  }
  // }

  // error.message.map((error) => {
  //   let message = error.messages[0].message
  //   switch (message) {
  //     case 'Username already taken':
  //       {
  //         errorMessage = 'Пользователь с таким логином уже существует'
  //       }
  //       break
  //     case 'Email is already taken.':
  //       {
  //         errorMessage = 'Пользователь с таким email уже существует'
  //       }
  //       break
  //     case 'Identifier or password invalid.':
  //       {
  //         errorMessage = 'Пользователь или email неверные'
  //       }
  //       break
  //     default: {
  //       errorMessage = message
  //     }
  //   }
  // })
  return {
    message: errorMessage,
    field,
  }
  // return errorMessage
  // return error
}
