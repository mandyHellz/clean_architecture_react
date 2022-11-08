import React from 'react'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import Login from './login'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { validationStub } = makeSut()

    const errorWrap = screen.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show email error if validation fails', () => {
    const { validationStub } = makeSut()

    const emailInput = screen.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if validation fails', () => {
    const { validationStub } = makeSut()

    const passwordInput = screen.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
