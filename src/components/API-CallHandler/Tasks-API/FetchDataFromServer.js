import axios from 'axios'
import { SERVER_URL, HEADERS, TOKENS } from '../config'
const fetchDataFromServer = async (
	isCompleted,
	limit = undefined,
	skip = 10
) => {
	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
	let queryURL =
		SERVER_URL +
		'tasks?completed=' +
		(isCompleted === 'ongoing' ? 'False' : 'True')
	if (limit) {
		queryURL += '&limit=' + limit + '&skip' + skip
	}
	try {
		const data = await axios.get(queryURL, {
			headers: HEADERS(TOKENS.deshabhakt),
		})
		return data
	} catch (e) {
		console.log(e)
		return undefined
	}
}

export default fetchDataFromServer
