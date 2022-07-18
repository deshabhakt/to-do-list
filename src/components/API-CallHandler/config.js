export const SERVER_URL = 'http://127.0.0.1:5000/'

export const HEADERS = (token) => {
	const headers = {
		Authorization: `Bearer ${token}`,
	}
	return headers
}

export const TOKENS = {
	deshabhakt:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1NzA3MTNmMTIxODI0ZTk2MmFjYjciLCJpYXQiOjE2NTgxNjMyMDl9.PxWt50y1kMySOT7uL03WkcKUIFIa3R6KTpb0AcmQF9M',
	vinod: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1NzA3MTNmMTIxODI0ZTk2MmFjYjciLCJpYXQiOjE2NTgxNTUxMjF9.xN9ni0hDJvpfw3TnTqrCsyikb0k_HRThOX5wbwqfnOo',
	ssagar: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1NzA3NjNmMTIxODI0ZTk2MmFjYmIiLCJpYXQiOjE2NTgxNTUxMjZ9.H2vuBNMFhqo1MtvqCswRaaER6ENI_mbguEaEciMAA2s',
}
