import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/presentation/pages'
import { MakeLogin } from './factories/pages/login/login-factory'
import '@/presentation/styles/global.scss'

ReactDOM.render(
    <App MakeLogin={MakeLogin} />,
    document.getElementById('main')
)
