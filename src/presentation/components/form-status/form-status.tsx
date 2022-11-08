import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import FormContext from '@/presentation/context/form/form-context'
import styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {state.mainError && <span className={styles.error}>{state.mainError}</span>}
    </div>
  )
}

export default FormStatus
