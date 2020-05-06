export interface IUser{
  id: string;
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
