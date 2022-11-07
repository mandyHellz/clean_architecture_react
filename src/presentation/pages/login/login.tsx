import React, { useState } from 'react'
import { Footer, FormStatus, HeaderLogin, Input } from '@/presentation/components'
import FormContext from '@/presentation/context/form/form-context'
import styles from './login-styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={styles.login}>
       <HeaderLogin />

      <FormContext.Provider value={{ state, errorState }}>
       <form className={styles.form} action="">
        <h2>Login</h2>

        <Input type="email" name='email' placeholder='Digite seu email'/>
        <Input type="password" name='password' placeholder='Digite sua senha' />

        <button
        data-testid='submit-button'
        disabled
        className={styles.submit}
        type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <FormStatus />
       </form>
      </FormContext.Provider>

       <Footer />
    </div>
  )
}
export default Login
