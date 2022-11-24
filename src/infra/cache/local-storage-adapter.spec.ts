import { LocalStorageAdapter } from './local-storage-adapter'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.word()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})