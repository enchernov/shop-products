export const useFieldChange = (setState) => (fieldName) => (fieldValue) => {
  setState((state) => ({
    ...state,
    [fieldName]: fieldValue,
  }))
}
