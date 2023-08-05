import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, UserReg, UserState, checkUser } from '../types/types'

export const API_URL = 'localhost:5000'

const value = localStorage.getItem('user')

const initialState: UserState = {
	user: typeof value === 'string' ? JSON.parse(value) : [],
	succesfull: false,
	updateUser: typeof value === 'string' ? JSON.parse(value) : [],
}

export const fetchUserByLogin = createAsyncThunk<
	User[],
	checkUser,
	{ rejectValue: string }
>('user/fetchUserByLogin', async function (check, { rejectWithValue }) {
	const { login, password } = check
	const response = await axios.get(
		`http://${API_URL}/api/users/${login}/${password}`
	)

	if (response.status > 200) {
		return rejectWithValue('Server error')
	}

	return response.data
})

export const updateUser = createAsyncThunk<
	User[],
	User,
	{ rejectValue: string }
>('user/updateUser', async function (user, { rejectWithValue }) {
	const response = await axios.put(`http://${API_URL}/api/users`, {
		_id: user._id,
		name: user.name,
		login: user.login,
		password: user.password,
		city: user.city,
		age: user.age,
		telegram: user.telegram,
	})

	if (response.status > 200) {
		return rejectWithValue('Some error')
	}

	return response.data
})

export const registrationUser = createAsyncThunk<
	User[],
	UserReg,
	{ rejectValue: string }
>('user/registrationUser', async function (user, { rejectWithValue }) {
	const response = await axios.post(`http://${API_URL}/api/users`, {
		name: user.name,
		login: user.login,
		password: user.password,
		city: user.city,
		age: user.age,
		telegram: user.telegram,
	})

	if ((await response).status > 200) {
		return rejectWithValue('Some error')
	}

	return response.data
})

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		exitUser(state) {
			localStorage.removeItem('user')
			state.user = []
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserByLogin.fulfilled, (state, action) => {
				localStorage.setItem('user', JSON.stringify(action.payload))
				state.user = action.payload
				state.updateUser = action.payload
			})
			.addCase(registrationUser.fulfilled, (state, action) => {
				state.succesfull = true
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				localStorage.setItem('user', JSON.stringify(action.payload))
				state.updateUser = action.payload
				state.user = action.payload
			})
	},
})

export const { exitUser } = userSlice.actions

export default userSlice.reducer
