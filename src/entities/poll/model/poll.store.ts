import type {
	PollAnswers,
	PollAnswerType,
	PollConfig,
	PollResults,
	Question,
	QuestionType,
} from '@/shared/types/poll.types'
import { makeAutoObservable } from 'mobx'

class PollStore {
	static readonly UNSURE_VALUE = '__UNSURE__'
	static readonly DEFAULT_UNSURE_LABEL = 'Затрудняюсь ответить'

	config: PollConfig | null = null
	currentPageIndex = 0
	answers: PollAnswers = {}
	isSubmitting = false
	isCompleted = false

	constructor() {
		makeAutoObservable(this)
	}

	init(config: PollConfig) {
		this.config = config
		this.currentPageIndex = 0
		this.answers = {}
		this.isSubmitting = false
		this.isCompleted = false
	}

	get currentPage() {
		return this.config?.pollPages[this.currentPageIndex] || null
	}

	get totalPages() {
		return this.config?.pollPages.length || 0
	}

	get progress() {
		if (this.isCompleted) return 100
		return this.totalPages > 0 ? (this.currentPageIndex / this.totalPages) * 100 : 0
	}

	get isLastPage() {
		return this.currentPageIndex === this.totalPages - 1
	}

	get canProceed() {
		if (!this.currentPage) return false

		return this.currentPage.questions.every((question) => {
			if (!question.required) return true

			const answer = this.answers[question.id]

			if (answer === null || answer === undefined || answer === '') return false

			if (Array.isArray(answer) && answer.length === 0) return false

			return true
		})
	}

	setAnswer(questionId: string, answer: PollAnswerType) {
		this.answers[questionId] = answer
	}

	getAnswer(questionId: string): PollAnswerType {
		return this.answers[questionId] ?? null
	}

	isUnsureSelected(questionId: string): boolean {
		const answer = this.answers[questionId]

		if (answer === null || answer === undefined) return false

		if (typeof answer === 'string') {
			return answer === PollStore.UNSURE_VALUE
		}

		if (Array.isArray(answer)) {
			return answer.includes(PollStore.UNSURE_VALUE)
		}

		return false
	}

	toggleUnsureAnswer(questionId: string, questionType: QuestionType) {
		const isCurrentlyUnsure = this.isUnsureSelected(questionId)

		if (questionType === 'single') {
			// если уже выбрано - сбрасываем, если нет - устанавливаем
			this.setAnswer(questionId, isCurrentlyUnsure ? null : PollStore.UNSURE_VALUE)
		} else {
			// если уже выбрано - очищаем массив, если нет - устанавливаем массив с UNSURE
			this.setAnswer(questionId, isCurrentlyUnsure ? [] : [PollStore.UNSURE_VALUE])
		}
	}

	getUnsureLabel(questionId: string): string {
		const question = this.findQuestionById(questionId)
		return question?.unsureLabel || PollStore.DEFAULT_UNSURE_LABEL
	}

	nextPage() {
		if (!this.isLastPage) {
			this.currentPageIndex++
		}
	}

	previousPage() {
		if (this.currentPageIndex > 0) {
			this.currentPageIndex--
		}
	}

	async submitResults(): Promise<PollResults> {
		if (!this.config) {
			throw new Error('Poll not initialized')
		}

		this.isSubmitting = true

		// Если же тут будет отправка на бек, try catch обязательно, в данном случае это демка просто
		const results: PollResults = {
			pollId: this.config.id,
			completedAt: new Date().toISOString(),
			answers: Object.entries(this.answers).map(([questionId, answer]) => {
				const question = this.findQuestionById(questionId)
				return {
					questionId,
					questionTitle: question?.title || 'Unknown',
					answer,
				}
			}),
		}

		console.log('Sending results...')
		console.log('Poll Results:', results)

		await new Promise((resolve) => setTimeout(resolve, 1500))

		console.log('Sent succesfully')

		this.isSubmitting = false
		this.isCompleted = true

		return results
	}

	private findQuestionById(questionId: string): Question | undefined {
		if (!this.config) return undefined

		for (const page of this.config.pollPages) {
			const question = page.questions.find((q) => q.id === questionId)
			if (question) return question
		}

		return undefined
	}

	reset() {
		this.currentPageIndex = 0
		this.answers = {}
		this.isSubmitting = false
		this.isCompleted = false
	}
}

export const pollStore = new PollStore()
export const UNSURE_VALUE = PollStore.UNSURE_VALUE
export const DEFAULT_UNSURE_LABEL = PollStore.DEFAULT_UNSURE_LABEL
