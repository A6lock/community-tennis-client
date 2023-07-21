import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchPosts, toggleFlag } from '../../store/postsSlice'
import { API_URL } from '../../store/usersSlice'
import { listField } from '../../types/types'
import styles from './new-search-form.module.css'

const NewSearchForm = () => {
	const dispatch = useAppDispatch()
	const [warning, setWarning] = useState<boolean>(false)
	const user = useAppSelector(state => state.user.user)
	const [date, setDate] = useState<string>('')
	const [level, setLevel] = useState<string>('')
	const [payment, setPayment] = useState<string>('')
	const [levelSelf, setLevelSelf] = useState<string>('')
	const post = useAppSelector(state => state.posts.listPosts)
	const [sex, setSex] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [telegram, setTelegram] = useState<string>('')
	const [cort, setCort] = useState<string>('')
	const list: listField = {
		date,
		id: user[0]?._id,
		level,
		name: user[0]?.login,
		payment,
		levelSelf,
		sex,
		city,
		telegram,
		cort,
	}

	const addFormHandler = async (list: listField) => {
		if (
			date.length < 6 ||
			level === 'выберите' ||
			payment === 'выберите' ||
			levelSelf === 'выберите' ||
			sex.length < 3 ||
			sex === 'выберите' ||
			city.length < 3 ||
			telegram.length < 2 ||
			cort === 'выберите'
		) {
			setWarning(true)
			return
		}

		try {
			axios.post(`http://${API_URL}/api/posts`, {
				id: list.id,
				date: list.date,
				selfLevel: list.levelSelf,
				payment: list.payment,
				levelOpp: list.level,
				sexOpp: list.sex,
				name: list.name,
				city: list.city,
				telegram: list.telegram,
				cort: list.cort,
			})
			setWarning(false)
			dispatch(toggleFlag())
			dispatch(fetchPosts())
		} catch (e) {
			console.log(e)
		}
	}

	const dateHanlder = (e: ChangeEvent<HTMLInputElement>): void => {
		const date = new Date(e.target.value)
		const currDate = new Date()
		if (date > currDate) {
			setDate(e.target.value)
		} else {
			setDate('')
		}
	}

	const cityHanlder = (e: ChangeEvent<HTMLInputElement>): void => {
		const text = e?.target?.value
		const firstSymbol = text[0]?.toUpperCase()
		const anotherSymbols = text?.slice(1).toLowerCase()
		const normalizeCity = firstSymbol?.concat(anotherSymbols)
		setCity(normalizeCity)
	}

	const telegramHanlder = (e: ChangeEvent<HTMLInputElement>): void => {
		setTelegram(e.target.value)
	}

	const levelHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setLevel(e.target.value)
	}

	const paymentHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setPayment(e.target.value)
	}

	const levelSelfHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setLevelSelf(e.target.value)
	}

	const sexHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setSex(e.target.value)
	}

	const cortHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setCort(e.target.value)
	}

	return (
		<>
			{user[0] ? (
				<>
					<div className={styles.card}>
						<div className={styles.title}>
							<p>заполните данные</p>
						</div>
						<div className={styles.infoCard}>
							<div className={styles.date}>
								<div className={styles.nameInput}>
									<p>Дата игры</p>
								</div>
								<input
									onChange={e => dateHanlder(e)}
									placeholder='заполните'
									type='date'
									className={styles.valueInput}
								/>
							</div>
							<div className={styles.level}>
								<div className={styles.nameInput}>
									<p>Уровень игры</p>
								</div>
								<select
									onChange={e => levelHandler(e)}
									className={styles.selectField}
								>
									<option>выберите</option>
									<option value='начинающий'>начинающий</option>
									<option value='продвинутый'>продвинутый</option>
									<option value='опытный'>опытный</option>
								</select>
							</div>
							<div className={styles.payment}>
								<div className={styles.nameInput}>
									<p>Оплата</p>
								</div>
								<select
									onChange={e => paymentHandler(e)}
									className={styles.selectField}
								>
									<option>выберите</option>
									<option value='оплата на мне'>оплата на мне</option>
									<option value='50 / 50'>50 / 50</option>
									<option value='оплата на партнере'>оплата на партнере</option>
								</select>
							</div>
							<div className={styles.selfLevel}>
								<div className={styles.nameInput}>
									<p>Свой уровень</p>
								</div>
								<select
									onChange={e => levelSelfHandler(e)}
									className={styles.selectField}
								>
									<option>выберите</option>
									<option value='начинающий'>начинающий</option>
									<option value='продвинутый'>продвинутый</option>
									<option value='опытный'>опытный</option>
								</select>
							</div>
							<div className={styles.sex}>
								<div className={styles.nameInput}>
									<p>Желаемый пол</p>
								</div>
								<select
									onChange={e => sexHandler(e)}
									className={styles.selectField}
								>
									<option>выберите</option>
									<option value='неважно'>неважно</option>
									<option value='мужской'>мужской</option>
									<option value='женский'>женский</option>
								</select>
							</div>
							<div className={styles.city}>
								<div className={styles.nameInput}>
									<p>Город</p>
								</div>
								<input
									onChange={e => cityHanlder(e)}
									placeholder='заполните'
									type='text'
									className={styles.valueInput}
								/>
							</div>
							<div className={styles.telegram}>
								<div className={styles.nameInput}>
									<p>Telegram</p>
								</div>
								<input
									onChange={e => telegramHanlder(e)}
									placeholder='заполните'
									type='text'
									className={styles.valueInput}
								/>
							</div>
							<div className={styles.cort}>
								<div className={styles.nameInput}>
									<p>Корт</p>
								</div>
								<select
									onChange={e => cortHandler(e)}
									className={styles.selectField}
								>
									<option>выберите</option>
									<option value='неважно'>неважно</option>
									<option value='хард'>хард</option>
									<option value='грунт'>грунт</option>
									<option value='трава'>трава</option>
								</select>
							</div>
						</div>

						<div className={styles.addForm}>
							{warning && (
								<p className={styles.war}>
									Заполните корректно все поля в том числе и дату
								</p>
							)}
							<button
								onClick={() => addFormHandler(list)}
								className={styles.submit}
								type='submit'
							>
								опубликовать
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={styles.card}>
						<div className={styles.title}>
							<p>зарегистрируйтесь или авторизуйтесь</p>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default NewSearchForm
