import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAuthetication } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote authentication', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth(mockAuthetication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call httpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const autheticationParams = mockAuthetication()
    await sut.auth(autheticationParams)

    expect(httpPostClientSpy.body).toEqual(autheticationParams)
  })

  test('Should call httpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const autheticationParams = mockAuthetication()
    await sut.auth(autheticationParams)

    expect(httpPostClientSpy.body).toEqual(autheticationParams)
  })

  test('Should throw invalid credential error if httpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthetication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw unexpected error if httpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthetication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw unexpected error if httpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthetication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw unexpected error if httpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthetication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an Account Model if httpPostClient returns 200', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const httpResult = mockAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthetication())

    await expect(account).toEqual(httpResult)
  })
})

// sut: system under test - what object is in test
