import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import getDummyData from '../../utils/DummyData'
import getDateTimeStamp from '../../utils/GetTimeDate'

import MenuBar from '../MenuBar/MenuBar'
import Tabs from '../TasksDisplayer/Tabs'
import TabbedLayout from '../TasksDisplayer/TabbedLayout'
import EditTaskModal from '../Modals/EditTaskModal'
import CreateTaskModal from '../Modals/CreateTaskModal'

import './App.css'

function App() {
	const [toEdit, setToEdit] = useState(false)
	const [taskToBeEdited, setTaskToBeEdited] = useState({})

	const [createTask, setCreateTask] = useState(false)

	const [completeTasks, setCompleteTasks] = useState()
	const [inCompleteTasks, setInCompleteTasks] = useState()

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
		if (createdTask.completed) {
			setCompleteTasks((prev) => {
				return [newTask, ...prev]
			})
		} else {
			setInCompleteTasks((prev) => {
				return [newTask, ...prev]
			})
		}
	}

	const selectedTabHandler = (tab) => {
		if (tab.toLowerCase() === 'complete') {
			setSelectedTab('complete')
		} else {
			setSelectedTab('ongoing')
		}
	}

	const editButtonClickHandler = (index = 0, id) => {
		setToEdit(true)
		if (selectedTab === 'complete') {
			setTaskToBeEdited({ taskData: completeTasks[index], index: index })
		} else {
			setTaskToBeEdited({
				taskData: inCompleteTasks[index],
				index: index,
			})
		}
	}

	const taskCompletionToggleHandler = (id, toggledState) => {
		const date = new Date()
		const newTimeStamp =
			date.toLocaleDateString() +
			' ' +
			date.toLocaleTimeString().toUpperCase()
		if (toggledState) {
			const ele = inCompleteTasks.filter((e, idx) => {
				if (e.id === id) {
					e.completed = toggledState
					e.lastModifiedOn = newTimeStamp
					return true
				}
				return false
			})[0]
			setInCompleteTasks((prev) => {
				return prev.filter((e, idx) => {
					return e.id === id ? false : e
				})
			})
			setCompleteTasks((prev) => {
				return [ele, ...prev]
			})
		} else {
			const ele = completeTasks.filter((e, idx) => {
				if (e.id === id) {
					e.completed = toggledState
					e.lastModifiedOn = newTimeStamp
					return true
				}
				return false
			})[0]
			setCompleteTasks((prev) => {
				return prev.filter((e, idx) => {
					return e.id === id ? false : e
				})
			})
			setInCompleteTasks((prev) => {
				return [ele, ...prev]
			})
		}
	}

	const taskEditDoneHandler = (editedTask, index) => {
		setToEdit(false)
		if (editedTask === undefined && index === undefined) {
			return
		}
		const date = new Date()
		editedTask.lastModifiedOn =
			date.toLocaleDateString() +
			' ' +
			date.toLocaleTimeString().toUpperCase()

		if (selectedTab === 'ongoing') {
			const prevTask = inCompleteTasks[index]
			if (prevTask.completed !== editedTask.completed) {
				setCompleteTasks((prev) => {
					return [editedTask, ...prev]
				})
				setInCompleteTasks((prev) => {
					return prev.filter((ele, idx) => {
						return ele.id !== editedTask.id
					})
				})
			} else {
				setInCompleteTasks((prev) => {
					return prev.map((ele, idx) => {
						if (ele.id === editedTask.id) {
							return editedTask
						}
						return ele
					})
				})
			}
		}
		if (selectedTab === 'complete') {
			const prevTask = completeTasks[index]
			if (prevTask.completed !== editedTask.completed) {
				setInCompleteTasks((prev) => {
					return [editedTask, ...prev]
				})
				setCompleteTasks((prev) => {
					return prev.filter((ele, idx) => {
						return ele.id !== editedTask.id
					})
				})
			} else {
				setCompleteTasks((prev) => {
					return prev.filter((ele, idx) => {
						if (ele.id === editedTask.id) {
							return editedTask
						}
						return ele
					})
				})
			}
		}
	}

	useEffect(() => {
		const dummyData = getDummyData()
		setCompleteTasks((prev) => {
			return dummyData.filter((ele) => {
				return ele.completed === true && ele
			})
		})
		setInCompleteTasks((prev) => {
			return dummyData.filter((ele) => {
				return ele.completed === false && ele
			})
		})
	}, [])
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
				tasksList={
					selectedTab !== 'ongoing' ? completeTasks : inCompleteTasks
				}
				editButtonClickHandler={editButtonClickHandler}
				taskCompletionToggleHandler={taskCompletionToggleHandler}
			/>
			<motion.button
				// initial={{ rotate: '90deg' }}
				// animate={{ rotate: '0deg' }}
				// transition={{ duration: 1 }}
				// whileHover={{
				// 	scale: 1.05,
				// }}
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
					// modalToggleOff={() => {
					// 	setToEdit(false)
					// }}
				/>
			)}
		</div>
	)
}

export default App
