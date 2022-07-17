const getDateTimeStamp = () => {
	const date = new Date()
	return (
		date.toLocaleDateString() +
		' ' +
		date.toLocaleTimeString().toUpperCase()
	)
}

export default getDateTimeStamp
