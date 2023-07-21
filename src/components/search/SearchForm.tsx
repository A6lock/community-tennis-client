import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook'
import { deletePost } from '../../store/postsSlice'
import styles from './search-form.module.css'

interface SearchFormProps {
	city: string
	cort: string
	date: string
	id: string
	levelOpp: string
	payment: string
	selfLevel: string
	sexOpp: string
	telegram: string
	_id: string
	name: string
}

const SearchForm: React.FC<SearchFormProps> = ({
	city,
	cort,
	date,
	name,
	id,
	levelOpp,
	payment,
	selfLevel,
	sexOpp,
	telegram,
	_id,
}) => {
	const [removed, setRemoved] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.user)

	const deleteHandler = (id: string) => {
		dispatch(deletePost(id))
		setRemoved(true)
	}

	return (
		<div className={styles.card}>
			<div className={styles.title}>
				<p>@{name} ищет спарринг партнера</p>
				{id === user[0]?._id && (
					<>
						<div onClick={() => deleteHandler(_id)} className={styles.delete}>
							{removed ? 'удалено' : 'удалить'}
						</div>
					</>
				)}
			</div>
			<div className={styles.infoCard}>
				<div className={styles.date}>
					<div className={styles.nameField}>
						<p>Дата игры</p>
					</div>
					<div className={styles.valueField}>{date}</div>
				</div>
				<div className={styles.level}>
					<div className={styles.nameField}>
						<p>Уровень игры</p>
					</div>
					<div className={styles.valueField}>{levelOpp}</div>
				</div>
				<div className={styles.payment}>
					<div className={styles.nameField}>
						<p>Оплата</p>
					</div>
					<div className={styles.valueField}>{payment}</div>
				</div>
				<div className={styles.selfLevel}>
					<div className={styles.nameField}>
						<p>Свой уровень</p>
					</div>
					<div className={styles.valueField}>{selfLevel}</div>
				</div>
				<div className={styles.sex}>
					<div className={styles.nameField}>
						<p>Желаемый пол</p>
					</div>
					<div className={styles.valueField}>{sexOpp}</div>
				</div>
				<div className={styles.city}>
					<div className={styles.nameField}>
						<p>Город</p>
					</div>
					<div className={styles.valueField}>{city}</div>
				</div>
				<div className={styles.telegram}>
					<div className={styles.nameField}>
						<p>Telegram</p>
					</div>
					<div className={styles.valueField}>
						<a
							className={styles.a}
							href={`https://t.me/${telegram}`}
							target='_blank'
						>
							{telegram}
						</a>
					</div>
				</div>
				<div className={styles.cort}>
					<div className={styles.nameField}>
						<p>Корт</p>
					</div>
					<div className={styles.valueField}>{cort}</div>
				</div>
			</div>
		</div>
	)
}

export default SearchForm
