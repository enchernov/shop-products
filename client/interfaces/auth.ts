export interface IOrderProps {
  id: string
  total: number
  products: string
}

type IAvatarProps = {
  url: string | undefined
  id: string | undefined
}

export interface IProfileDataProps {
  id: string
  username: string
  email: string
  avatar: IAvatarProps
}

export interface IUserDataProps {
  id: string
  username: string
  email: string
  avatar: IAvatarProps | null
  confirmed: boolean
  orders: any
  addresses: any
  email_subscriber: any
}

export interface IAppProps {
  isAuthenticated: boolean
  user: IUserDataProps | null
  loading: boolean
  token: string | null
  avatar: IAvatarProps
}

export interface IRegisterProps {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export interface IUserDataMutationProps {
  jwt: string
  user: IUserDataProps
}

export interface IRegisterMutationProps {
  register: IUserDataMutationProps
}

export interface ILoginProps {
  identifier: string
  password: string
}

export interface ILoginMutationProps {
  login: IUserDataMutationProps
}

export interface IForgotProps {
  setEmailData: (value: boolean) => void
  setFormikEmailData: (value: string) => void
}

export interface IForgotPasswordProps {
  email: string
}

export interface IForgotPasswordMutationProps {
  ok: boolean
}

export interface IResetPasswordProps {
  password: string
  passwordConfirmation: string
  code: string
}

export interface IUpdateProps {
  username: string
  email: string
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export interface IUpdateMutationProps {
  updateUser: IUserDataProps
}

export interface IUploadFileMutationProps {
  url: string
}
