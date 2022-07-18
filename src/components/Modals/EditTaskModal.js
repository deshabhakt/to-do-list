import { useState } from 'react'
import './Modal.css'
import ModalHoder from './ModalHolder'

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
		<ModalHoder taskHandler={taskEditDoneHandler}>
			<div className="modal-main">
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
							taskEditDoneHandler(task)
						}}
					>
						Done
					</button>
				</div>
			</div>
		</ModalHoder>
	)
}

export default EditTaskModal
