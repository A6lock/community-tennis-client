import { Link, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { exitUser } from '../../store/usersSlice'
import styles from './menu.module.css'

const Menu = () => {
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()

	const exitUserHandler = () => {
		dispatch(exitUser())
	}

	return (
		<>
			{user[0] ? (
				<>
					<div className={styles.containerNav}>
						<div className={styles.profile}>
							<Link className={styles.a} to='/profile'>
								{user[0].login}
							</Link>
						</div>
						<div className={styles.search}>
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
					<Outlet />
				</>
			) : (
				<>
					<div className={styles.containerNav}>
						<div className={styles.profile}>
							<Link className={styles.a} to='/profile'>
								профиль
							</Link>
						</div>
						<div className={styles.search}>
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
					<Outlet />
				</>
			)}
		</>
	)
}

export default Menu
