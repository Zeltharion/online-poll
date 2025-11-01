import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { QuestionList, PollControls } from '@/widgets/question-list'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'
import { demopollConfig } from '@/shared/config/demo'

export const MainPage = observer(() => {
	const { currentPage, isCompleted } = pollStore

	useEffect(() => {
		pollStore.init(demopollConfig)
	}, [demopollConfig])

	if (!currentPage) {
		return (
			<Card className='w-full max-w-2xl'>
				<CardContent className='p-8'>
					<p className='text-center text-muted-foreground'>Загрузка опроса...</p>
				</CardContent>
			</Card>
		)
	}

	if (isCompleted) {
		return (
			<Card className='w-full max-w-2xl'>
				<CardHeader>
					<CardTitle className='text-2xl'>Ваши ответы успешно отправлены.</CardTitle>
					<CardDescription>Благодарим за участие в опросе!</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => pollStore.reset()}>Пройти заного</Button>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className='w-full max-w-2xl'>
			<CardContent className='flex flex-col gap-4'>
				<QuestionList />
				<PollControls />
			</CardContent>
		</Card>
	)
})
