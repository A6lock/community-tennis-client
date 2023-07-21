import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { registrationUser } from '../../store/usersSlice'
import { User } from '../../types/types'
import '../search/motion.css'
import styles from './registration.module.css'

const Registration = () => {
	const [warning, setWarning] = useState<boolean>(false)
	const answer = useAppSelector(state => state.user.succesfull)
	const [succesfull, setSuccesfull] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const [log, setLog] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	const [repass, setRepass] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [telegram, setTelegram] = useState<string>('')

	const user = {
		login: log,
		password: pass,
		name: name,
		city: city,
		age: age,
		telegram: telegram,
	}

	async function send(user: User) {
		if (pass !== repass) {
			setWarning(true)
			return
		}
		if (log.length <= 2) {
			setWarning(true)
			return
		}
		if (name.length <= 2) {
			setWarning(true)
			return
		}
		if (city.length < 2) {
			setWarning(true)
			return
		}
		if (age <= 5 || age >= 70) {
			setWarning(true)
			return
		}
		if (telegram.length <= 2) {
			setWarning(true)
			return
		}
		dispatch(registrationUser(user))
		setLog('')
		setPass('')
		setRepass('')
		setName('')
		setCity('')
		setTelegram('')
		setSuccesfull(true)
	}

	return (
		<>
			{succesfull ? (
				<>
					<div className={styles.container}>
						<div className={styles.wrapper}>
							<p className={styles.succes}>Вы успешно зарегистрировались!</p>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={styles.container}>
						<div className={styles.wrapper}>
							<div>
								<input
									onChange={e => setLog(e.target.value)}
									required
									className={styles.login}
									type='text'
									value={log}
									placeholder='логин'
								/>
							</div>
							<div>
								<input
									value={pass}
									onChange={e => setPass(e.target.value)}
									required
									className={styles.password}
									type='password'
									placeholder='пароль'
								/>
							</div>
							<div>
								<input
									value={repass}
									onChange={e => setRepass(e.target.value)}
									required
									className={styles.login}
									type='password'
									placeholder='повторите пароль'
								/>
								{pass === repass ? (
									''
								) : (
									<p className={styles.war}>пароли не совпадают</p>
								)}
							</div>

							<div>
								<input
									value={name}
									onChange={e => setName(e.target.value)}
									required
									className={styles.login}
									type='text'
									placeholder='имя'
								/>
							</div>

							<div>
								<input
									value={city}
									onChange={e => setCity(e.target.value)}
									required
									className={styles.login}
									type='text'
									placeholder='город'
								/>
							</div>

							<div>
								<input
									onChange={e => setAge(Number(e.target.value))}
									required
									className={styles.login}
									type='number'
									placeholder='возраст'
								/>
							</div>
							<div>
								<input
									value={telegram}
									onChange={e => setTelegram(e.target.value)}
									required
									className={styles.login}
									type='text'
									placeholder='Telegram'
								/>
							</div>
							{warning && <p className={styles.war}>заполните все поля</p>}
							<button
								onClick={() => send(user)}
								id='send'
								className={styles.enter}
							>
								зарегистрироваться
							</button>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Registration
