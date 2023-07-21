import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { exitUser } from '../../store/usersSlice'
import styles from './profile.module.css'

const ProfileMenu = () => {
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()

	const exitUserHandler = () => {
		dispatch(exitUser())
	}

	return (
		<>
			{user[0] ? (
				<>
					<div className={styles.container}>
						<div className={styles.profile}>
							<Link className={styles.a} to='/search'>
								поиск
							</Link>
						</div>
						<div className={styles.loginOrRegistration}>
							<div className={styles.login}>
								<Link
									onClick={() => exitUserHandler()}
									className={styles.a}
									to='/'
								>
									выйти
								</Link>
							</div>
						</div>
					</div>
					<hr />
				</>
			) : (
				<>
					<div className={styles.container}>
						<div className={styles.profile}>
							<Link className={styles.a} to='/search'>
								поиск
							</Link>
						</div>
						<div className={styles.loginOrRegistration}>
							<div className={styles.login}>
								<Link className={styles.a} to='/login'>
									вход
								</Link>
							</div>
							<div className={styles.registration}>
								<Link className={styles.a} to='/registration'>
									регистрация
								</Link>
							</div>
						</div>
					</div>
					<hr />
				</>
			)}
		</>
	)
}

export default ProfileMenu
