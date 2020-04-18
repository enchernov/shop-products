export const useFieldChange = (setState: any) => (fieldName: string) => (fieldValue: string) => {
    setState((state: object) => ({
        ...state,
        [fieldName]: fieldValue,
    }));
};
