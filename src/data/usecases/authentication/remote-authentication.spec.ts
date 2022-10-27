import { RemoteAuthentication } from './remote.aythentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuthetication } from '@/domain/test/mock-authentication'
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
})

// sut: system under test - what object is in test
