import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { updateUser } from '../../store/usersSlice'
import { FullUser } from '../../types/types'
import styles from './editProfile.module.css'

const EditProfile = () => {
	const dispatch = useAppDispatch()
	async function fetchUpdateUser(user: FullUser) {
		dispatch(updateUser(user))
	}

	const user = useAppSelector(state => state.user.updateUser)
	const [name, setName] = useState<string>(user[0]?.name)
	const [login, setLogin] = useState<string>(user[0]?.login)
	const [telegram, setTelegram] = useState<string>(user[0]?.telegram)
	const [age, setAge] = useState<number>(user[0]?.age)
	const [city, setCity] = useState<string>(user[0]?.city)

	const newUser = {
		_id: user[0]?._id,
		name: name,
		login: login,
		password: user[0]?.password,
		city: city,
		age: age,
		telegram: telegram,
	}

	return (
		<>
			<div className={styles.info}>
				<input
					className={styles.valueField}
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					className={styles.valueField}
					value={city}
					onChange={e => setCity(e.target.value)}
				/>
				<input
					className={styles.valueField}
					value={age}
					onChange={e => setAge(Number(e.target.value))}
				/>
				<input
					className={styles.valueField}
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<input
					className={styles.valueField}
					value={telegram}
					onChange={e => setTelegram(e.target.value)}
				/>
				<button
					onClick={() => fetchUpdateUser(newUser)}
					className={styles.edit}
				>
					сохранить
				</button>
			</div>
		</>
	)
}

export default EditProfile
