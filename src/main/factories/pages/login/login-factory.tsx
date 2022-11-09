import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'

export const MakeLogin: React.FC = () => {
  return (
    <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
    />
  )
}
