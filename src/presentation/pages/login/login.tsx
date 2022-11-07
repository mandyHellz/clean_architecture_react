import React from 'react'
import HeaderLogin from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-status'
import styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
       <HeaderLogin />

       <form className={styles.form} action="">
        <h2>Login</h2>

        <Input type="email" name='email' placeholder='Digite seu email'/>
        <Input type="password" name='password' placeholder='Digite sua senha' />

        <button className={styles.submit} type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <FormStatus />
       </form>

       <Footer />
    </div>
  )
}

export default Login
