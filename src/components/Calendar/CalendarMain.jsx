import Button from '@mui/material-next/Button'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { MdNavigateNext } from 'react-icons/md'
import Error from '../Error/Error'
import SheduleItem from '../SheduleItem/SheduleItem'
import './customCalendar.css'

const CalendarMain = ({ selectedGroup }) => {
	const [value, onChange] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState(null)
	const [activeStartDate, setActiveStartDate] = useState(new Date())
	const [scheduleData, setScheduleData] = useState(null)

	CalendarMain.propTypes = {
		selectedGroup: PropTypes.object.isRequired,
	}

	const handleCalendarChange = value => {
		onChange(value)
		setSelectedDate(value)
		setActiveStartDate(value)
	}

	const handlePrevMonthClick = () => {
		setActiveStartDate(prev => {
			const previousMonth = new Date(prev)
			previousMonth.setMonth(previousMonth.getMonth() - 1)
			onChange(previousMonth)
			return previousMonth
		})
	}

	const handleNextMonthClick = () => {
		setActiveStartDate(prev => {
			const nextMonth = new Date(prev)
			nextMonth.setMonth(nextMonth.getMonth() + 1)
			onChange(nextMonth)
			return nextMonth
		})
	}

	useEffect(() => {
		const formattedDate = formatDate(value)

		const fetchSchedule = async (date, group) => {
			try {
				const response = await axios.get(
					`http://kgeu.2d.su/api/schedule.php?group=${group.title}&date=${date}`
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

		fetchSchedule(formattedDate, selectedGroup)
	}, [value, selectedGroup])

	const formatDate = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	return (
		<div className='main'>
			<section className='main-content'>
				<div>
					<div className='buttons-container'>
						<Button
							style={{
								fontSize: '2rem',
								transform: 'rotate(180deg)',
								zIndex: 1,
							}}
							className='button-1'
							onClick={handlePrevMonthClick}
						>
							<MdNavigateNext />
						</Button>
						<p className='text-button'>
							{selectedDate
								? new Intl.DateTimeFormat('ru-RU', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
								  }).format(selectedDate)
								: 'None'}
						</p>
						<Button
							style={{ fontSize: '2rem' }}
							className='button-2'
							onClick={handleNextMonthClick}
						>
							<MdNavigateNext />
						</Button>
					</div>
					<Calendar
						onChange={handleCalendarChange}
						value={value}
						activeStartDate={activeStartDate}
						maxDetail='month'
						className='custom-calendar'
						showNeighboringCentury={false}
						showNavigation={false}
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
											currentDate={value}
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
