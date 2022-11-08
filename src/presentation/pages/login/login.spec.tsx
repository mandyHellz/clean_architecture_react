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

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email-input')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password-input')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(email)
  populatePasswordField(password)

  const submitButton = screen.getByTestId('submit-button')
  fireEvent.click(submitButton)
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Ok')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()

    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()

    simulateStatusForField('email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()

    simulateStatusForField('password', validationError)
  })

  test('Should show valid email state if validation succeeds', () => {
    makeSut()
    populateEmailField()

    simulateStatusForField('email')
  })

  test('Should show valid password state if validation succeeds', () => {
    makeSut()
    populatePasswordField()

    simulateStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeEnabled()
  })

  test('Should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
