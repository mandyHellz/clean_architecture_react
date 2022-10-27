import { RemoteAuthentication } from './remote.authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockAuthetication } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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
})

// sut: system under test - what object is in test
