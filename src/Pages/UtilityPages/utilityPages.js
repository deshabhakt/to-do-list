import Card from '../../UI/Card/Card'

const Error = (errorCode, errorMessage) => {
	return (
		<>
			<Card>
				<h1>
					Error:{errorCode}|Message:{errorMessage}
				</h1>
			</Card>
		</>
	)
}

const Verification = (message) => {
	return <Card>{message}</Card>
}

export { Error, Verification }
