export type User = {
  id: number
  name: string
}

export interface IUser{
  username: string;
  email: string;
  password: string;
}

export interface IInputField {
  type: string;
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: (fieldValue: string) => void;
}
