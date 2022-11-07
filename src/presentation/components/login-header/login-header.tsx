import React, { memo } from 'react'
import Logo from '../logo/logo'
import styles from './login-header-styles.scss'

const HeaderLogin: React.FC = () => {
  return (
    <header className={styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(HeaderLogin)
