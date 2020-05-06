import {IUser} from "../interfaces";

export type Props = {
    item?: IUser
    errors?: string,
}

export type RegisterProps = {
    data: IUser;
}
