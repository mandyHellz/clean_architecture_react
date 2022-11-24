/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer, FormStatus, HeaderLogin, Input } from '@/presentation/components'
import FormContext from '@/presentation/context/form/form-context'
import styles from './signup-styles.scss'

const Signup: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.signup}>
      <HeaderLogin />

      <FormContext.Provider value={{ state: {} }}>
       <form className={styles.form}>
        <h2>Criar conta</h2>

        <Input type="text" name='name' placeholder='Digite seu nome'/>
        <Input type="email" name='email' placeholder='Digite seu email'/>
        <Input type="password" name='password' placeholder='Digite sua senha' />
        <Input type="password" name='passwordConfirmation' placeholder='Digite novamente sua senha' />

        <button
        className={styles.submit}
        type="submit"
        >
          Entrar
        </button>

        <span
        onClick={() => navigate('/login')}
        className={styles.link}
        >
          Voltar para o Login
        </span>

        <FormStatus />
       </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
export default Signup
