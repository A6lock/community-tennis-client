import { useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { registrationUser } from '../../../store/usersSlice'
import { UserReg } from '../../../types/types'

export const useRegistation = () => {
    const [warning, setWarning] = useState<boolean>(false)
	const [succesfull, setSuccesfull] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const [log, setLog] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	const [repass, setRepass] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [age, setAge] = useState<number>(0)
	const [telegram, setTelegram] = useState<string>('')

	const user = {
		login: log,
		password: pass,
		name: name,
		city: city,
		age: age,
		telegram: telegram,
	}

	async function send(user: UserReg) {
		if (pass !== repass) {
			setWarning(true)
			return
		}
		if (log.length <= 2) {
			setWarning(true)
			return
		}
		if (name.length <= 2) {
			setWarning(true)
			return
		}
		if (city.length < 2) {
			setWarning(true)
			return
		}
		if (age <= 5 || age >= 70) {
			setWarning(true)
			return
		}
		if (telegram.length <= 2) {
			setWarning(true)
			return
		}

		dispatch(registrationUser(user))
		setLog('')
		setPass('')
		setRepass('')
		setName('')
		setCity('')
		setTelegram('')
		setSuccesfull(true)
	}
    
    return {
        succesfull, 
        setLog, 
        log, 
        pass, 
        setPass, 
        repass, 
        setRepass, 
        telegram, 
        setTelegram, 
        warning, 
        user,
        name,
        setName,
        city,
        setCity,
        setAge,
        send, 
	};
}