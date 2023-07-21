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
	login: string
	password: string
	name: string
	city: string
	age: number
	telegram: string
}

export type FullUser = {
	_id: string
	name: string
	login: string
	password: string
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
