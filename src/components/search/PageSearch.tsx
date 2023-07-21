import axios from 'axios'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../hook'
import { fetchPosts, toggleFlag } from '../../store/postsSlice'
import { API_URL } from '../../store/usersSlice'
import { Post } from '../../types/types'
import NewSearchForm from './NewSearchForm'
import SearchForm from './SearchForm'
import './motion.css'
import styles from './search.module.css'

const PageSearch = () => {
	const [list, setList] = useState<Post[]>()
	const toggle = useAppSelector(state => state.posts.toggle)
	const [newForm, setNewForm] = useState<boolean>(false)
	const [city, setCity] = useState<string>('')
	const user = useAppSelector(state => state.user.user)
	const dispatch = useAppDispatch()
	const posts = useAppSelector(state => state.posts.listPosts)

	list?.sort((a, b) => (a.date > b.date ? 1 : -1))

	const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e?.target?.value
		const firstSymbol = text[0]?.toUpperCase()
		const anotherSymbols = text?.slice(1).toLowerCase()
		const noramlizeCity = firstSymbol?.concat(anotherSymbols)
		if (noramlizeCity !== undefined) {
			setCity(noramlizeCity)
		} else {
			setCity('')
		}
	}

	const toggleHandler = () => {
		dispatch(toggleFlag())
	}
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`http://${API_URL}/api/posts`)
				setList(response.data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [toggle])

	useEffect(() => {
		dispatch(fetchPosts())
	}, [dispatch])

	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<div className={styles.searchOnCity}>
					<input
						onChange={e => cityHandler(e)}
						className={styles.searchOnCityInput}
						placeholder='поиск по городу...'
						type='text'
					/>
				</div>
				<div>
					<button onClick={() => toggleHandler()} className={styles.addForm}>
						{toggle ? 'отменить' : 'найти партнера'}
					</button>
				</div>
			</div>
			<CSSTransition in={toggle} classNames='alert' timeout={300} unmountOnExit>
				<NewSearchForm />
			</CSSTransition>

			{city?.length < 1
				? list?.map(post => (
						<SearchForm
							key={post._id}
							city={post.city}
							id={post.id}
							name={post.name}
							levelOpp={post.levelOpp}
							payment={post.payment}
							selfLevel={post.selfLevel}
							sexOpp={post.sexOpp}
							telegram={post.telegram}
							cort={post.cort}
							date={post.date}
							_id={post._id}
						/>
				  ))
				: list
						?.filter(post => post.city.includes(city))
						.map(post => (
							<SearchForm
								name={post.name}
								key={post._id}
								city={post.city}
								id={post.id}
								levelOpp={post.levelOpp}
								payment={post.payment}
								selfLevel={post.selfLevel}
								sexOpp={post.sexOpp}
								telegram={post.telegram}
								cort={post.cort}
								date={post.date}
								_id={post._id}
							/>
						))}
		</div>
	)
}

export default PageSearch
