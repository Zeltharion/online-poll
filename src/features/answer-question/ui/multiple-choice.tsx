import { observer } from 'mobx-react-lite'
import { pollStore, UNSURE_VALUE } from '@/entities/poll'
import { Checkbox, Label } from '@/shared/ui'
import { UnsureButton } from './unsure-button'
import type { MultipleChoiceQuestion } from '@/shared/types/poll.types'

interface MultipleChoiceProps {
	question: MultipleChoiceQuestion
}

export const MultipleChoice = observer(({ question }: MultipleChoiceProps) => {
	const answer = pollStore.getAnswer(question.id) as string[] | null
	const selectedOptions = answer || []
	const isUnsureSelected = pollStore.isUnsureSelected(question.id)

	const handleChange = (option: string, checked: boolean) => {
		const optionsWithoutUnsure = selectedOptions.filter((o) => o !== UNSURE_VALUE)
		let newAnswer: string[]

		if (checked) {
			newAnswer = [...optionsWithoutUnsure, option]
		} else {
			newAnswer = optionsWithoutUnsure.filter((o) => o !== option)
		}

		pollStore.setAnswer(question.id, newAnswer)
	}

	return (
		<div className='flex flex-col gap-2'>
			{question.options.map((option, index) => (
				<Label
					key={index}
					htmlFor={`${question.id}-${index}`}
					className='cursor-pointer w-full flex items-center gap-2 border p-2 rounded'>
					<Checkbox
						id={`${question.id}-${index}`}
						checked={selectedOptions.includes(option)}
						onCheckedChange={(checked) => handleChange(option, checked as boolean)}
						disabled={isUnsureSelected}
					/>
					{option}
				</Label>
			))}

			<UnsureButton
				questionId={question.id}
				questionType='multiple'
				allowUnsure={question.allowUnsure}
			/>
		</div>
	)
})
