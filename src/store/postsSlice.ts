import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Post, PostsState, listField } from '../types/types'
import { API_URL } from './usersSlice'

const initialState: PostsState = {
	listPosts: [],
	toggle: false,
}

export const fetchPosts = createAsyncThunk<
	Post[],
	undefined,
	{ rejectValue: string }
>('posts/fetchPosts', async function (_, { rejectWithValue }) {
	try {
		const req = await axios.get(`http://${API_URL}/api/posts`)

		if (req.status > 200) {
			return rejectWithValue('Some error')
		}

		return req.data
	} catch (e) {
		console.log(e)
	}
})

export const addPosts = createAsyncThunk<
	Post[],
	listField,
	{ rejectValue: string }
>('posts/addPosts', async function (post, { rejectWithValue }) {
	try {
		const req = await axios.post(`http://${API_URL}/api/posts`, {
			id: post.id,
			date: post.date,
			selfLevel: post.levelSelf,
			payment: post.payment,
			levelOpp: post.level,
			sexOpp: post.sex,
			name: post.name,
			city: post.city,
			telegram: post.telegram,
			cort: post.cort,
		})

		if (req.status > 200) {
			rejectWithValue('Some error')
		}

		return req.data
	} catch (e) {
		console.log(e)
	}
})

export const deletePost = createAsyncThunk<
	Post[],
	string,
	{ rejectValue: string }
>('posts/deletePost', async function (id, { rejectWithValue }) {
	try {
		const req = await axios.delete(`http://${API_URL}/api/posts/${id}`)

		if (req.status > 200) {
			rejectWithValue('Some error')
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
			.addCase(addPosts.fulfilled, (state, action) => {})
	},
})
export const { toggleFlag } = postSlice.actions

export default postSlice.reducer
