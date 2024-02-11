import PropTypes from 'prop-types'

const NavButtonPrev = ({ onClick }) => (
	<button className='nav-month-btn' onClick={onClick}>
		Previous Month
	</button>
)

NavButtonPrev.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export default NavButtonPrev
