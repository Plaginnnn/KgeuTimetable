import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import './Navbar.css'

import { SidebarData } from './SidebarData'

function Navbar({ onSelectGroup, selectedGroup, setSelectedGroup }) {
	Navbar.propTypes = {
		onSelectGroup: PropTypes.func.isRequired,
		selectedGroup: PropTypes.object, // Тип данных можете настроить в соответствии с вашим приложением
		setSelectedGroup: PropTypes.func,
	}

	const [sidebar, setSidebar] = useState(false)

	const [groups, setGroups] = useState([])

	const showSidebar = () => setSidebar(!sidebar)

	useEffect(() => {
		const cachedGroup = localStorage.getItem('selectedGroup')
		if (cachedGroup) {
			setSelectedGroup(JSON.parse(cachedGroup))
		}
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://kgeu.2d.su/api/groups_list.php'
				)
				const data = response.data
				const formattedData = data.map(item => ({ title: item }))
				setGroups(formattedData)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchData()
	}, [])

	const handleGroupChange = (event, value) => {
		setSelectedGroup(value)
		localStorage.setItem('selectedGroup', JSON.stringify(value))
		onSelectGroup(value)
	}

	return (
		<>
			<div className='navbar'>
				<a to='/' className='menu-bars'>
					<FaIcons.FaBars onClick={showSidebar} />
				</a>
				<div className='autocomplete-container'>
					<Autocomplete
						className='autocomplete'
						disablePortal
						id='combo-box-demo'
						options={groups}
						getOptionLabel={option => option.title}
						value={selectedGroup}
						onChange={handleGroupChange}
						sx={{ width: 200 }}
						renderInput={params => (
							<TextField {...params} label='Выбрать группу' />
						)}
					/>
				</div>
			</div>

			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className='nav-menu-items' onClick={showSidebar}>
					<li className='navbar-toggle'>
						<a to='#' className='menu-bars'>
							<AiIcons.AiOutlineClose />
						</a>
					</li>
					{SidebarData.map((item, index) => {
						return (
							<li key={index} className={item.cName}>
								<a to={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</a>
							</li>
						)
					})}
				</ul>
			</nav>
		</>
	)
}

export default Navbar
