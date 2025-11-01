import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { Button } from '@/shared/ui'

export const NavigationButtons = observer(() => {
	const { isSubmitting, canProceed, isLastPage } = pollStore

	const handleNext = () => {
		pollStore.nextPage()
	}

	const handleSubmit = async () => {
		await pollStore.submitResults()
	}

	return (
		<Button
			onClick={isLastPage ? handleSubmit : handleNext}
			disabled={!canProceed || isSubmitting}>
			{isSubmitting ? 'Отправка...' : isLastPage ? <>Завершить</> : <>Далее</>}
		</Button>
	)
})
