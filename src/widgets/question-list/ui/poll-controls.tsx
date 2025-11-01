import { ProgressBar, NavigationButtons } from '@/features/poll-navigate'

export const PollControls = () => {
	return (
		<div className='flex gap-2'>
			<ProgressBar />
			<NavigationButtons />
		</div>
	)
}
