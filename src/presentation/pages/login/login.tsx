import React, { useState } from 'react'
import { Footer, FormStatus, HeaderLogin, Input } from '@/presentation/components'
import FormContext from '@/presentation/context/form/form-context'
import styles from './login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={styles.login}>
       <HeaderLogin />

      <FormContext.Provider value={state}>
       <form className={styles.form} action="">
        <h2>Login</h2>

        <Input type="email" name='email' placeholder='Digite seu email'/>
        <Input type="password" name='password' placeholder='Digite sua senha' />

        <button className={styles.submit} type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <FormStatus />
       </form>
      </FormContext.Provider>

       <Footer />
    </div>
  )
}
export default Login
