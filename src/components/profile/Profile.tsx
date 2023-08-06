import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { exitUser } from '../../store/usersSlice'
// 
import EditProfile from './editProfile/EditProfile'
import ProfileMenu from './profileMenu/ProfileMenu'
import UnAuthProfile from './unAuthProfile/UnAuthProfile'
import styles from './profile.module.css'

const Profile = () => {
	const [edit, setEdit] = useState<boolean>(false)
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()

	// Не используется
	const exitUserHandler = () => {
		dispatch(exitUser())
	}
	// Не используется
	const changeDataHandler = () => {}

	// Посмотри, что тут можно разбить на компоненты

	return (
		<>
			{user[0] ? (
				<>
					<ProfileMenu />

					<div className={styles.about}>
						<div className={styles.info}>
							<p className={styles.nameField}>
								Имя: <span className={styles.valueField}>{user[0]?.name}</span>
							</p>

							<p className={styles.nameField}>
								Город:{' '}
								<span className={styles.valueField}>{user[0]?.city}</span>
							</p>
							<p className={styles.nameField}>
								Возраст:{' '}
								<span className={styles.valueField}>{user[0]?.age}</span>
							</p>
							<p className={styles.nameField}>
								Логин:{' '}
								<span className={styles.valueField}>{user[0]?.login}</span>
							</p>
							<p className={styles.nameField}>
								Telegram:{' '}
								<span className={styles.valueField}>{user[0]?.telegram}</span>
							</p>
							
							<button onClick={() => setEdit(!edit)} className={styles.edit}>
								{edit ? 'отменить' : 'редактировать'}
							</button>
						</div>
						{edit && <EditProfile />}
					</div>
				</>
			) : (
				<>
					<ProfileMenu />
					<UnAuthProfile />
				</>
			)}
		</>
	)
}

export default Profile
