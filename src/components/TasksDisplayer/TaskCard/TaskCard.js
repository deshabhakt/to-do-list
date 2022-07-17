import { motion } from 'framer-motion'
import { useState } from 'react'

import './TaskCard.css'

import editImage from '../../../utils/images/edit-button-favicon.png'
import deleteImage from '../../../utils/images/delete-button-favicon.png'

const TaskCard = ({
	task,
	editButtonClickHandler,
	index,
	taskCompletionToggleHandler,
}) => {
	const [animation, setAnimation] = useState({
		initialOpacity: 0,
		animateOpacity: 1,
		transitionDuration: index / 10,
	})

	return (
		<motion.div
			initial={{ opacity: animation.initialOpacity }}
			animate={{ opacity: animation.animateOpacity }}
			transition={{ duration: animation.transitionDuration }}
			className="task"
		>
			<div className="task-title">
				{task.title}
				<hr />
			</div>
			<div className="task-description">{task.description}</div>
			<div className="task-footer-div">
				<div className="task-timestamp">
					<p>Last Modified: {task.lastModifiedOn}</p>
				</div>
				<Buttons
					task={task}
					index={index}
					editButtonClickHandler={editButtonClickHandler}
					taskCompletionToggleHandler={taskCompletionToggleHandler}
				/>
			</div>
		</motion.div>
	)
}

const Checkbox = ({ task, taskCompletionToggleHandler }) => {
	return (
		<>
			{task.completed ? (
				<input
					type="checkbox"
					name={task.id}
					checked
					onChange={(e) => {
						taskCompletionToggleHandler(task.id, e.target.checked)
					}}
				/>
			) : (
				<input
					type="checkbox"
					name={task.id}
					onChange={(e) => {
						taskCompletionToggleHandler(task.id, e.target.checked)
					}}
				/>
			)}
		</>
	)
}

const Buttons = ({
	task,
	taskCompletionToggleHandler,
	editButtonClickHandler,
	index,
}) => {
	return (
		<div className="buttons-div">
			<span className="task-completed-task-edit-div">
				<Checkbox
					task={task}
					taskCompletionToggleHandler={taskCompletionToggleHandler}
				/>
			</span>
			<span
				onClick={() => {
					editButtonClickHandler(index, task.id)
				}}
			>
				<img src={editImage} alt="edit-button" />
			</span>

			<span
				onClick={() => {
					editButtonClickHandler(index, task.id)
				}}
			>
				<img src={deleteImage} alt="delete-button" />
			</span>
		</div>
	)
}

export default TaskCard
