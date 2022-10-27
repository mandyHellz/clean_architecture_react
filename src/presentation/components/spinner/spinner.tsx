import React from 'react'
import styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC = (props: Props) => {
  return (
    <div className={styles.spinner} {...props}>
        <div/><div/><div/><div/>
    </div>
  )
}

export default Spinner
