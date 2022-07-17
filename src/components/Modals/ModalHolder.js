import { motion } from 'framer-motion'

import './ModalHolder.css'

const ModalHoder = (props) => {
	return (
		<motion.div
			className="modal-main-div"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			onKeyDown={(event) => {
				try {
					props.keyStrokeHandler(event)
				} catch {}
			}}
		>
			<div
				className="backdrop"
				onClick={() => {
					try {
						props.taskHandler(undefined)
					} catch {
						props.taskHandler(undefined, undefined)
					}
				}}
			></div>
			{props.children}
		</motion.div>
	)
}

export default ModalHoder
