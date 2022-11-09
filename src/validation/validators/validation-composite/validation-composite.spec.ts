import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

describe('Validation composite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('error_message')

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('error_message')
  })
})
