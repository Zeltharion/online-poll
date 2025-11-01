import { observer } from 'mobx-react-lite'
import { pollStore } from '@/entities/poll'
import { Progress } from '@/shared/ui'

export const ProgressBar = observer(() => {
	return <Progress value={pollStore.progress} />
})
