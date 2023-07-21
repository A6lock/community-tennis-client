import { Outlet } from 'react-router-dom'
import Menu from './menu/Menu'

const Home = () => {
	return (
		<>
			<Menu />
			<Outlet />
		</>
	)
}

export default Home
