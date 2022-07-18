import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'

const deleteTask = async (id) => {
	const url = SERVER_URL + 'tasks/' + id
	console.log(url)
	try {
		const data = await axios.delete(url, {
			headers: {
				...HEADERS(TOKENS.deshabhakt),
			},
			data: {},
		})
		return data
	} catch (e) {
		throw new Error(e)
	}
}

export default deleteTask
