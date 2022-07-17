import TaskCard from './TaskCard/TaskCard'
import './TabbedLayout.css'

const TabbedLayout = ({
	tasksList,
	editButtonClickHandler,
	taskCompletionToggleHandler,
}) => {
	return (
		<div>
			<div className="tabbed-layout">
				{tasksList?.map((task, index) => {
					return (
						<TaskCard
							key={task.id}
							task={task}
							index={index}
							editButtonClickHandler={editButtonClickHandler}
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
