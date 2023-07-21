import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from './usersSlice'

type Post = {
	_id: string
	id: string
	name: string
	date: string
	selfLevel: string
	payment: string
	levelOpp: string
	sexOpp: string
	city: string
	telegram: string
	cort: string
}

type PostsState = {
	listPosts: Post[]
	toggle: boolean
}

const initialState: PostsState = {
	listPosts: [],
	toggle: false,
}

export const fetchPosts = createAsyncThunk<
	Post[],
	undefined,
	{ rejectValue: string }
>('posts/fetchPosts', async function (_, { rejectWithValue }) {
	const response = await fetch(`http://${API_URL}/api/posts`)

	if (!response.ok) {
		return rejectWithValue('Serve error')
	}

	const data = await response.json()

	return data
})

export const deletePost = createAsyncThunk<
	Post[],
	string,
	{ rejectValue: string }
>('posts/deletePost', async function (id, { rejectWithValue }) {
	try {
		const req = await axios.delete(`http://${API_URL}/api/posts/${id}`)

		if (req.status > 200) {
			rejectWithValue('Server error')
		}

		return req.data
	} catch (e) {
		console.log(e)
	}
})

const postSlice = createSlice({
	name: 'posts',
	initialState: initialState,
	reducers: {
		toggleFlag(state) {
			state.toggle = !state.toggle
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.listPosts = action.payload
			})
			.addCase(deletePost.fulfilled, (state, action) => {})
	},
})
export const { toggleFlag } = postSlice.actions

export default postSlice.reducer
