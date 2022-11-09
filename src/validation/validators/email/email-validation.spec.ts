import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import { faker } from '@faker-js/faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.internet.email())

describe('Email validation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
