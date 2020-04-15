import {IUser} from "../components/Auth/Register/Register";

export const useFieldChange = (setState: any) => (fieldName: string) => (fieldValue: string) => {
    setState((state: object) => ({
        ...state,
        [fieldName]: fieldValue,
    }));
};

export const useFormRegisterSubmit = (registerData: IUser) => {
    console.log(registerData);
};
