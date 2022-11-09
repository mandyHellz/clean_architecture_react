import React from 'react'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'
import { faker } from '@faker-js/faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
        <Context.Provider value={ { state: {} }}>
            <Input name={fieldName} />
        </Context.Provider>
  )
}

describe('Input component', () => {
  test('Should begin with readOnly', () => {
    const fieldName = faker.database.column()
    makeSut(fieldName)
    const input: HTMLInputElement = screen.getByTestId(`${fieldName}-input`)

    expect(input.readOnly).toBe(true)
  })

  test('Should begin with readOnly', () => {
    const fieldName = faker.database.column()
    makeSut(fieldName)
    const input: HTMLInputElement = screen.getByTestId(`${fieldName}-input`)
    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
