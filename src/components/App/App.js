import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import getDateTimeStamp from '../../utils/GetTimeDate'

import MenuBar from '../MenuBar/MenuBar'
import Tabs from '../TasksDisplayer/Tabs'
import TabbedLayout from '../TasksDisplayer/TabbedLayout'
import EditTaskModal from '../Modals/EditTaskModal'
import CreateTaskModal from '../Modals/CreateTaskModal'

import './App.css'
import fetchDataFromServer from '../API-CallHandler/Tasks-API/FetchDataFromServer'
import deleteTask from '../API-CallHandler/Tasks-API/deleteTask'
import editTask from '../API-CallHandler/Tasks-API/editTask'

function App() {
	const [toEdit, setToEdit] = useState(false)
	const [taskToBeEdited, setTaskToBeEdited] = useState({})

	const [createTask, setCreateTask] = useState(false)

	const [tasks, setTasks] = useState()

	const [selectedTab, setSelectedTab] = useState('ongoing')

	const taskCreateHandler = (createdTask) => {
		setCreateTask(false)
		if (createdTask === undefined) {
			return
		}
		const newTask = {
			...createdTask,
			lastModifiedOn: getDateTimeStamp(),
			createdOn: getDateTimeStamp(),
			id: Math.random(),
		}
		setTasks((prev) => {
			return [newTask, ...prev]
		})
	}

	const selectedTabHandler = (tab) => {
		if (tab.toLowerCase() === 'complete') {
			setSelectedTab('complete')
		} else {
			setSelectedTab('ongoing')
		}
	}

	const editButtonClickHandler = (id) => {
		setToEdit(true)
		const taskData = tasks.filter((ele, idx) => {
			return ele._id === id
		})[0]
		console.log(taskData)
		setTaskToBeEdited({ taskData })
	}

	const taskCompletionToggleHandler = (id, toggledState) => {
		const newTimeStamp = getDateTimeStamp()
		editTask({ _id: id, completed: toggledState }).then(() => {
			const ele = tasks.filter((e, idx) => {
				return e._id === id
			})
			ele.completed = toggledState
			ele.lastModifiedOn = newTimeStamp

			setTasks((prev) => {
				return prev.filter((e, idx) => {
					return e._id !== id
				})
			})
		})
	}

	const taskEditDoneHandler = (editedTask) => {
		setToEdit(false)
		if (editedTask === undefined) {
			return
		}
		editedTask.lastModifiedOn = getDateTimeStamp()

		editTask(editedTask).then(() => {
			setTasks((prev) => {
				const newArr = prev.filter((ele, idx) => {
					if (ele._id === editedTask._id) {
						return ele.completed === editedTask.completed
					}
					return ele
				})

				return newArr.filter((ele, idx) => {
					if (ele._id === editedTask._id) {
						return editedTask
					}
					return ele
				})
			})
		})
	}

	const deleteButtonClickHandler = (id) => {
		deleteTask(id)
			.then(() => {
				setTasks((prev) => {
					return prev.filter((ele, idx) => {
						return ele._id !== id
					})
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}

	useEffect(() => {
		fetchDataFromServer(selectedTab)
			.then((res) => {
				setTasks((prev) => res?.data)
			})
			.catch((e) => {
				console.log(e)
			})
	}, [selectedTab])

	return (
		<div className="App">
			<div className="fixed-top-bar-items">
				<MenuBar />
				<Tabs
					selectedTabHandler={selectedTabHandler}
					selectedTab={selectedTab}
				/>
			</div>
			<TabbedLayout
				tasksList={tasks}
				editButtonClickHandler={editButtonClickHandler}
				deleteButtonClickHandler={deleteButtonClickHandler}
				taskCompletionToggleHandler={taskCompletionToggleHandler}
			/>
			<motion.button
				initial={{ rotate: '45deg' }}
				animate={{ rotate: '0deg' }}
				transition={{ duration: 1 }}
				whileHover={{
					scale: 1.05,
				}}
				className="add-note-btn"
				onClick={() => {
					setCreateTask(true)
				}}
			>
				+
			</motion.button>
			{createTask && (
				<CreateTaskModal taskCreateHandler={taskCreateHandler} />
			)}

			{toEdit && (
				<EditTaskModal
					taskToBeEdited={taskToBeEdited}
					taskEditDoneHandler={taskEditDoneHandler}
				/>
			)}
		</div>
	)
}

export default App
