import React, { useEffect, useState } from 'react'
import { Footer, FormStatus, HeaderLogin, Input } from '@/presentation/components'
import FormContext from '@/presentation/context/form/form-context'
import styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={styles.login}>
       <HeaderLogin />

      <FormContext.Provider value={{ state, setState }}>
       <form className={styles.form} action="">
        <h2>Login</h2>

        <Input type="email" name='email' placeholder='Digite seu email'/>
        <Input type="password" name='password' placeholder='Digite sua senha' />

        <button
        data-testid='submit-button'
        disabled={!!state.emailError || !!state.passwordError}
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
