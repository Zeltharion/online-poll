import { memo } from 'react'
import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { SingleChoice, MultipleChoice } from '@/features/answer-question'
import type { Question } from '@/shared/types/poll.types'

const QuestionRenderer = memo(({ question }: { question: Question }) => {
	switch (question.type) {
		case 'single':
			return <SingleChoice question={question} />
		case 'multiple':
			return <MultipleChoice question={question} />
		default:
			return <div>Неизвестный тип вопроса</div>
	}
})

export const QuestionList = observer(() => {
	const currentPage = pollStore.currentPage

	if (!currentPage) {
		return <div>Загрузка...</div>
	}

	return currentPage.questions.map((question) => (
		<div key={question.id} className='flex flex-col gap-2'>
			<h3 className='text-2xl font-semibold'>
				{question.title}
				{question.required && <span className='text-red-500 ml-1'>*</span>}
			</h3>
			<p className='text-sm text-muted-foreground'>
				{question.type === 'single'
					? `Один вариант ответа`
					: `Выберите один или несколько вариантов ответа`}
			</p>
			<QuestionRenderer question={question} />
		</div>
	))
})
