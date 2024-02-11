import axios from 'axios'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Error from '../Error/Error'
import SheduleItem from '../SheduleItem/SheduleItem'
import './customCalendar.css'

const CalendarMain = () => {
	const [value, onChange] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState(null)
	const [showNavigation, setShowNavigation] = useState(false)
	const [group] = useState('ПЭ-2-21') // Группа задана статически
	const [scheduleData, setScheduleData] = useState(null)

	const handleCalendarChange = value => {
		onChange(value)
		setSelectedDate(value)
	}

	useEffect(() => {
		const formattedDate = formatDate(value)

		const fetchSchedule = async date => {
			try {
				const response = await axios.get(
					`https://kgeu.2d.su/api/schedule.php?group=${group}&date=${date}`
				)
				if (response.data && response.data.status === 'success') {
					setScheduleData(response.data.schedule)
				} else {
					setScheduleData(null)
				}
			} catch (error) {
				console.error('Error fetching schedule data: ', error)
				setScheduleData(null)
			}
		}

		fetchSchedule(formattedDate)
	}, [value, group]) // Include 'group' in the dependency array

	const formatDate = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	return (
		<div className='main'>
			<p>{selectedDate ? selectedDate.toDateString() : 'None'}</p>
			<div>
				<button
					onClick={() =>
						onChange(prev => {
							const previousMonth = new Date(prev)
							previousMonth.setMonth(previousMonth.getMonth() - 1)
							return previousMonth
						})
					}
				>
					Previous Month
				</button>
				<button
					onClick={() =>
						onChange(prev => {
							const nextMonth = new Date(prev)
							nextMonth.setMonth(nextMonth.getMonth() + 1)
							return nextMonth
						})
					}
				>
					Next Month
				</button>
			</div>
			<div>
				<button onClick={() => setShowNavigation(prev => !prev)}>
					Toggle Navigation
				</button>
			</div>

			<section className='main-content'>
				<div>
					<Calendar
						onChange={handleCalendarChange}
						value={value}
						maxDetail='month'
						className='custom-calendar'
						showNeighboringCentury={false}
						showNavigation={showNavigation}
					/>
				</div>
				<div>
					{scheduleData ? (
						Object.entries(scheduleData).map(([date, events]) => (
							<div key={date}>
								{events.map((event, index) => (
									<div key={index}>
										<SheduleItem
											timeStart={event.start_time}
											timeEnd={event.end_time}
											type={event.type}
											subject={event.subject}
											teacher={event.teacher}
											auditory={event.auditory}
										/>
									</div>
								))}
							</div>
						))
					) : (
						<Error />
					)}
				</div>
			</section>
		</div>
	)
}

export default CalendarMain
