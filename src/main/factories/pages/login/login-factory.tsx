import React from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token'
import { Login } from '@/presentation/pages'

export const MakeLogin: React.FC = () => {
  return (
    <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
    saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
