import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote.aythentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote authentication', () => {
  test('Should call httpPostClient with correct URL', async () => {
    const url = 'another_url'
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})

// sut: system under test - what object is in test
