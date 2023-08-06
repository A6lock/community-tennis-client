import { useRegistation } from './hooks/useRegistration';

import styles from './registration.module.css'

import '../search/motion.css'

const Registration = () => {

	/* 
		можно написать кастомный хук useRegistration, чтобы изолировать логику и сделать компонент максимально 
		тупеньким, чтобы он просто получал какие-то данные и рендерил. Везде пишут, что кастомные хуки используются
		чтобы переиспользовать логику и не копипастить код, однако на практике часто прибегают к кастомным хукам, 
		чтобы изолировать логику. Например мне надо что-то доработать в логике - я иду в кастомный хук. Надо поправить
		то, что рендерится, тупо работаю с компонентом. Четкое разделение и нет большого колва-кода в компоненте сле-
		довательно легче читать, масштабировать, поддерживать.

		Почитай про архитектуру фича слайс дизайн (Именно про построение структур папок). Это не мастхев, от нее можно отходить, но за основу взять стоит.
	*/
	const { succesfull, 
			setLog, 
			log, 
			pass, 
			setPass, 
			repass, 
			setRepass, 
			telegram, 
			setTelegram, 
			warning, 
			user,
			name,
			setName,
			city,
			setCity,
			setAge,
			send,  
		} = useRegistation()

	/*
		Еще заметил, что у тебя повторятся импуты. Не думал сделать компонент Input или более узконаправленный
		RegistrationInput,  в который  ты будешь передавать например
		<RegistrationInput 
			onChange
			required
			className
			value
			placeholder
		/>

		Возможно это избыточная хуйня, с которой не стоит заморачиваться, но все равно можно рассмотреть этот пожход 
		для опыта)

		Также, на работе, ты не будешь сам реализовывать логику форм, в плане валидации и тд. Чекни реактХукФорм
		или формик. 100 проц столкнешься на работе
	*/

	return (
		<>
			{succesfull 
				? (
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
