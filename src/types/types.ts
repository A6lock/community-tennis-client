/*
	Типы для удобства тоже можно разделить по группам, но лучше конкретные типы создавать в конкретных папках, 
	чтобы типы относящиеся к юзеру, были в юзере и тд.
*/

export type listField = {
	date: string
	id: string
	level: string
	payment: string
	levelSelf: string
	sex: string
	city: string
	telegram: string
	cort: string
	name: string
}

export type User = {
	_id: string
	name: string
	login: string
	password: string
	city: string
	age: number
	telegram: string
}

export type UserReg = {
	login: string
	password: string
	name: string
	city: string
	age: number
	telegram: string
}

export type checkUser = {
	login: string
	password: string
}

export type Post = {
	_id: string
	id: string
	date: string
	name: string
	selfLevel: string
	payment: string
	levelOpp: string
	sexOpp: string
	city: string
	telegram: string
	cort: string
}

export type PostsState = {
	listPosts: Post[]
	toggle: boolean
}

export type UserState = {
	user: User[]
	succesfull: boolean
	updateUser: User[]
}
