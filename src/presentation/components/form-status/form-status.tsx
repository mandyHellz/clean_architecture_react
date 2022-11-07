import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import FormContext from '@/presentation/context/form/form-context'
import styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      {errorState.main && <span className={styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
