import {
	Card,
	CardContent,
	Container,
	Grid,
	Stack,
	Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import styles from './SheduleItem.module.css' // Импортируем файл со стилями

const SheduleItem = ({
	timeStart,
	timeEnd,
	type,
	subject,
	teacher,
	auditory,
}) => {
	let circleColor = ''
	let typeText = ''
	switch (type) {
		case 'л.':
			circleColor = styles.redCircle
			typeText = 'Лекция'
			break
		case 'пр.':
			circleColor = styles.greenCircle
			typeText = 'Практика'
			break
		case 'лаб.':
			circleColor = styles.blueCircle
			typeText = 'Лабораторная работа'
			break
		default:
			break
	}

	return (
		<Container maxWidth='lg' className={styles.container}>
			<Card className={`${styles.card} flex-col`} variant='outlined'>
				<CardContent className={`${styles.cardContent} p-1`}>
					<Grid container alignItems='center' spacing={1}>
						<Grid item xs={12} md={19}>
							<Grid container alignItems='center' spacing={2}>
								<Grid item>
									<Stack direction='column' spacing={1}>
										<Typography variant='h6' fontWeight='bold'>
											{subject}
										</Typography>
										<Grid container alignItems='center'>
											<div className={`${styles.circle} ${circleColor}`}></div>
											<Typography
												variant='body2'
												color='text.secondary'
												className={styles.scheduleDetails}
											>
												{typeText}
											</Typography>
										</Grid>
										<Typography
											variant='body2'
											color='text.secondary'
											className={styles.scheduleDetails}
										>
											{timeStart} - {timeEnd}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{auditory}
										</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} md={17}>
							<Typography
								variant='body2'
								color='text.secondary'
								style={{ textAlign: 'right' }}
							>
								{teacher}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	)
}

SheduleItem.propTypes = {
	timeStart: PropTypes.string.isRequired,
	timeEnd: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	teacher: PropTypes.string.isRequired,
	auditory: PropTypes.string.isRequired,
}

export default SheduleItem
