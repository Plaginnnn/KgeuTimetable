import { Card, CardContent, Container, Typography } from '@mui/material'

const Error = () => {
	return (
		<Container maxWidth='xs'>
			<Card variant='outlined'>
				<CardContent>
					<Typography variant='h6' gutterBottom>
						Расписание отсутствует
					</Typography>
					<Typography variant='body1'>
						На данный момент расписание отсутствует. Пожалуйста, свяжитесь с
						администрацией для получения дополнительной информации.
					</Typography>
				</CardContent>
			</Card>
		</Container>
	)
}

export default Error
