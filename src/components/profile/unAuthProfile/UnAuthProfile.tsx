import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import styles from './UnAuthProfile.module.css'

const UnAuthProfile = () => {
	const [reg, setReg] = useState<boolean>(false)
	const [log, setLog] = useState<boolean>(false)

	return (
		<>
			<div className={styles.container}>
				<p className={styles.text}>
					Для начала авторизуйтесь или зарегистрируйтесь
				</p>
				<div className={styles.choose}>
					<div onClick={() => setLog(true)} className={styles.auth}>
						<p className={styles.textA}>вход</p>
					</div>
					<div onClick={() => setReg(true)} className={styles.reg}>
						<p className={styles.textA}>регистрация</p>
					</div>
				</div>
			</div>
			{reg && <Navigate to='/registration' />}
			{log && <Navigate to='/login' />}
		</>
	)
}

export default UnAuthProfile
