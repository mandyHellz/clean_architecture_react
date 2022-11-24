import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from '@/presentation/pages'

type Props = {
  MakeLogin: React.FC
}

const App: React.FC<Props> = ({ MakeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<MakeLogin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
