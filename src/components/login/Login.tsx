import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchUserByLogin } from '../../store/usersSlice'
import { checkUser } from '../../types/types'
import styles from './login.module.css'

const Login = () => {
	const [login, setLogin] = useState<string>('')
	const [confirm, setConfirm] = useState<boolean>(false)
	const [response, setResponse] = useState<number>(0)
	const [password, setPassword] = useState<string>('')
	const user = useAppSelector(state => state.user.user)
	const check = {
		login: login,
		password: password,
	}
	const dispatch = useAppDispatch()

	async function log(check: checkUser) {
		const a = await dispatch(fetchUserByLogin(check))
		if (a.payload?.length) {
			setConfirm(true)
		} else {
			setResponse(2)
		}
	}

	const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value)
	}

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.inputsLog}>
					<input
						onChange={e => loginHandler(e)}
						required
						className={styles.login}
						type='text'
						placeholder='логин'
					/>
				</div>
				<div className={styles.inputsPass}>
					<input
						onChange={e => passwordHandler(e)}
						required
						className={styles.password}
						type='password'
						placeholder='пароль'
					/>
				</div>
				<button onClick={() => log(check)} className={styles.enter}>
					войти
				</button>
				{confirm ? <Navigate to='/search' /> : ''}
				{response === 2 ? (
					<p className={styles.war}>Неверный логин или пароль</p>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default Login
