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
						На данный момент расписание отсутствует.
					</Typography>
				</CardContent>
			</Card>
		</Container>
	)
}

export default Error
