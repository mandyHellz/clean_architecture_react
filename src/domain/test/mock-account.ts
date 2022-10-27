import { AuthenticationParams } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { AccountModel } from '../models/account-model'

export const mockAuthetication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
  }
}
