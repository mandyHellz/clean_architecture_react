import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'

const makeSut = (): RenderResult => {
  return render(
        <Context.Provider value={ { state: {} }}>
            <Input name="field" />
        </Context.Provider>
  )
}

describe('Input component', () => {
  test('Should begin with readOnly', () => {
    makeSut()
    const input: HTMLInputElement = screen.getByTestId('field-input')

    expect(input.readOnly).toBe(true)
  })
})
