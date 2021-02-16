export interface IUserDataProps {
  id: string
  username: string
  email: string
  avatar: any
  confirmed: boolean
}

type IAvatarProps = {
  url: string
  id: string
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
