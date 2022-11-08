import React from 'react'
import { faker } from '@faker-js/faker'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

  return {
    sut,
    authenticationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if validation succeeds', () => {
    makeSut()
    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Ok')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if validation succeeds', () => {
    makeSut()
    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Ok')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeEnabled()
  })

  test('Should show spinner on submit', () => {
    makeSut()
    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
