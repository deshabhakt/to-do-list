import TaskCard from './TaskCard/TaskCard'
import './TabbedLayout.css'

const TabbedLayout = ({
	tasksList,
	editButtonClickHandler,
	deleteButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	return (
		<div>
			<div className="tabbed-layout">
				{tasksList?.map((task, index) => {
					return (
						<TaskCard
							key={task._id}
							task={task}
							index={index}
							editButtonClickHandler={editButtonClickHandler}
							deleteButtonClickHandler={deleteButtonClickHandler}
							taskCompletionToggleHandler={
								taskCompletionToggleHandler
							}
						/>
					)
				})}
			</div>
		</div>
	)
}
export default TabbedLayout
