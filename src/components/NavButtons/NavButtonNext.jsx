import PropTypes from 'prop-types'

const NavButtonNext = ({ onClick }) => (
	<button className='nav-month-btn' onClick={onClick}>
		Next Month
	</button>
)

NavButtonNext.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export default NavButtonNext
