import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { Button } from '@/shared/ui'
import type { QuestionType } from '@/shared/types/poll.types'

interface UnsureButtonProps {
	questionId: string
	questionType: QuestionType
	allowUnsure?: boolean
}

export const UnsureButton = observer(
	({ questionId, questionType, allowUnsure }: UnsureButtonProps) => {
		if (!allowUnsure) return null

		const isUnsureSelected = pollStore.isUnsureSelected(questionId)

		const handleUnsure = () => {
			pollStore.toggleUnsureAnswer(questionId, questionType)
		}

		return (
			<Button
				type='button'
				variant={isUnsureSelected ? 'secondary' : 'outline'}
				className='w-full'
				onClick={handleUnsure}>
				{pollStore.getUnsureLabel(questionId)}
			</Button>
		)
	}
)
