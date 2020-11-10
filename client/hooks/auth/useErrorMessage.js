export const useErrorMessage = (error) => {
    // let errorMessage = "";

    // Object.entries(error).length !== 0 &&
    // error.constructor === Object &&
    // error.message.map((error) => {
    //     let message = error.messages[0].message;
    //     switch (message) {
    //         case "Username already taken": {
    //             errorMessage = "Пользователь с таким логином уже существует";
    //         } break;
    //         case "Email is already taken.": {
    //             errorMessage = "Пользователь с таким email уже существует";
    //         } break;
    //         case "Identifier or password invalid.": {
    //             errorMessage = "Пользователь или email неверные";
    //         } break;
    //         default: {
    //             errorMessage = message
    //         }
    //     }
    // });
    // return errorMessage;

    return error;
}
