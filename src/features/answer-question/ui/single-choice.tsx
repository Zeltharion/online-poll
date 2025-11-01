import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { RadioGroup, RadioGroupItem, Label } from '@/shared/ui'
import { UnsureButton } from './unsure-button'
import type { SingleChoiceQuestion } from '@/shared/types/poll.types'

interface SingleChoiceProps {
	question: SingleChoiceQuestion
}

export const SingleChoice = observer(({ question }: SingleChoiceProps) => {
	const answer = pollStore.getAnswer(question.id) as string | null
	const isUnsureSelected = pollStore.isUnsureSelected(question.id)

	const handleChange = (value: string) => {
		pollStore.setAnswer(question.id, value)
	}

	return (
		<div className='flex flex-col gap-2'>
			<RadioGroup value={answer} onValueChange={handleChange} disabled={isUnsureSelected}>
				{question.options.map((option, index) => (
					<Label
						key={`${question.id}-${index}`}
						htmlFor={`${question.id}-${index}`}
						className='flex items-center gap-2 border p-2 rounded cursor-pointer w-full'>
						<RadioGroupItem value={option} id={`${question.id}-${index}`} />
						{option}
					</Label>
				))}
			</RadioGroup>

			<UnsureButton
				questionId={question.id}
				questionType='single'
				allowUnsure={question.allowUnsure}
			/>
		</div>
	)
})
