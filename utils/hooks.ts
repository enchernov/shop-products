import { ComponentState } from "react";

export const useFieldChange = (setState: ComponentState) => (fieldName: string) => (fieldValue: string) => {
    setState((state: object) => ({
        ...state,
        [fieldName]: fieldValue,
    }));
};
