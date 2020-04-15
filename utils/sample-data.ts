import { User } from '../interfaces'
import {IUser} from "../components/Auth/Register/Register";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
];

export const initialData: IUser = {
  username: '',
  email: '',
  password: ''
};
