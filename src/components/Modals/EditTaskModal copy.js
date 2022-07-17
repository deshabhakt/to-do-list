import { useState } from 'react'
import { motion } from 'framer-motion'

import './Modal.css'

const EditTaskModal = ({ taskToBeEdited, taskEditDoneHandler }) => {
	const [task, setTask] = useState(taskToBeEdited.taskData)
	const [taskCompleted, setTaskCompleted] = useState(task.completed)

	const taskEditHandler = (e) => {
		const target = e.target.name
		const value = e.target.value

		setTask((prev) => {
			return {
				...prev,
				[target]: value,
			}
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="error-modal-main-div"
		>
			<div
				className="backdrop"
				onClick={() => {
					taskEditDoneHandler(undefined, undefined)
				}}
			/>
			<div className="edit-modal-div">
				<label htmlFor="title">Title:</label>
				<input
					name="title"
					type="text"
					value={task.title}
					onChange={taskEditHandler}
				/>
				<label htmlFor="description">Description:</label>
				<textarea
					name="description"
					className="textarea-edit-modal"
					row={30}
					cols={30}
					value={task.description}
					onChange={taskEditHandler}
				/>
				<div className="task-completed-button">
					<button
						onClick={() => {
							setTask((prev) => {
								return {
									...prev,
									completed: !prev.completed,
								}
							})
							setTaskCompleted((prev) => !prev)
						}}
					>
						{taskCompleted ? 'Completed?' : 'Not Complete?'}
					</button>
					<button
						onClick={() => {
							taskEditDoneHandler(task, taskToBeEdited.index)
						}}
					>
						Done
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default EditTaskModal
