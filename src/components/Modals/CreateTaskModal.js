import { useState } from 'react'

import ModalHoder from './ModalHolder'

import './Modal.css'

import getDateTimeStamp from '../../utils/GetTimeDate'

const CreateTaskModal = ({ taskCreateHandler }) => {
	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		lastModifiedOn: getDateTimeStamp(),
		createdOn: getDateTimeStamp(),
		completed: false,
	})
	const keyStrokeHandler = (event) => {
		console.log(event.key)
		if (event.key === 'Escape') {
			taskCreateHandler(undefined)
		}
	}
	const taskInputHandler = (e) => {
		const target = e.target.name
		const value = e.target.value

		setNewTask((prev) => {
			return {
				...prev,
				[target]: value,
			}
		})
	}

	return (
		<ModalHoder
			keyStrokeHandler={keyStrokeHandler}
			taskHandler={taskCreateHandler}
		>
			<form
				className="modal-main"
				onSubmit={(event) => {
					event.preventDefault()

					if (newTask.title.length === 0) {
						return
					}
					taskCreateHandler(newTask)
				}}
			>
				<label htmlFor="title">Title:</label>
				<input
					name="title"
					type="text"
					value={newTask.title}
					onChange={taskInputHandler}
					autoFocus
					required
				/>
				<label htmlFor="description">Description:</label>
				<textarea
					name="description"
					className="textarea-edit-modal"
					row={30}
					cols={30}
					value={newTask.description}
					onChange={taskInputHandler}
				/>
				<div className="task-completed-button">
					<button type="submit">Done</button>
					<button
						onClick={() => {
							taskCreateHandler(undefined)
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</ModalHoder>
	)
}

export default CreateTaskModal
