import React from 'react'
import styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import HeaderLogin from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
       <HeaderLogin />

       <form className={styles.form} action="">
        <h2>Login</h2>

        <div className={styles.inputWrap}>
          <input type="email" name='email' placeholder='Digite seu email' />
          <span className={styles.status}>🔴</span>
        </div>

        <div className={styles.inputWrap}>
          <input type="password" name='password' placeholder='Digite sua senha' />
          <span className={styles.status}>🔴</span>
        </div>

        <button className={styles.submit} type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <div className={styles.errorWrap}>
          <div className={styles.spinner}>
            <Spinner />
          </div>
          <span className={styles.error}>Erro</span>
        </div>
       </form>

       <Footer />
    </div>
  )
}

export default Login
