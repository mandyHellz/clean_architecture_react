import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

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
