import { useState } from 'react'
import CalendarMain from './components/Calendar/CalendarMain'
import Navbar from './components/Navbar/Navbar'

export const App = () => {
	const [selectedGroup, setSelectedGroup] = useState(null)

	const handleGroupSelect = selectedGroup => {
		setSelectedGroup(selectedGroup)
	}
	return (
		<div>
			<Navbar
				onSelectGroup={handleGroupSelect}
				selectedGroup={selectedGroup}
				setSelectedGroup={setSelectedGroup}
			/>
			<CalendarMain selectedGroup={selectedGroup} />
		</div>
	)
}

export default App
