import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'

describe('Input component', () => {
  test('Should begin with readOnly', () => {
    render(
    <Context.Provider value={ { state: {} }}>
        <Input name="field" />
    </Context.Provider>
    )
    const input: HTMLInputElement = screen.getByTestId('field-input')

    expect(input.readOnly).toBe(true)
  })
})
