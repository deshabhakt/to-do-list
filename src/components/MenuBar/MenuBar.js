import ReactDOM from 'react-dom'

import './MenuBar.css'

const MenuBar = () => {
	return (
		<div className="menu-bar">
			<span className="menu-bar-spans">Home</span>
			<span className="menu-bar-spans">About</span>
			<span className="menu-bar-spans">Contact</span>
			<span className="menu-bar-spans menu-bar-log-in-span">
				Sign In/Up
			</span>
		</div>
	)
}

export default MenuBar
