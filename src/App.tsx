import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Main from './components/main/Main'
import Menu from './components/menu/Menu'
import Profile from './components/profile/Profile'
import Registration from './components/registration/Registration'
import PageSearch from './components/search/PageSearch'
import store from './store'

/*
	У тебя Main PageSearch Login Registration Profile - отдельные страницы. Ты тянешь их из компонентов
*/

function App() {
	return (
		<Provider store={store}>
			<>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Menu />}>
							<Route path='/' element={<Main />} />
							<Route path='search' element={<PageSearch />} />
							<Route path='login' element={<Login />} />
							<Route path='registration' element={<Registration />} />
						</Route>
						<Route path='profile' element={<Profile />} />
						<Route path='profile/:login' element={<Profile />} />
					</Routes>
				</div>
			</>
		</Provider>
	)
}

export default App
