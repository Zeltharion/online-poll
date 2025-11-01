export interface BaseQuestion {
	id: string
	title: string
	required?: boolean
	allowUnsure?: boolean
	unsureLabel?: string
}

export type QuestionType = 'single' | 'multiple'

export interface SingleChoiceQuestion extends BaseQuestion {
	type: 'single'
	options: string[]
}

export interface MultipleChoiceQuestion extends BaseQuestion {
	type: 'multiple'
	options: string[]
}

export type Question = SingleChoiceQuestion | MultipleChoiceQuestion

export interface PollPage {
	id: string
	questions: Question[]
}

export type PollAnswerType = string | string[] | number | null

export interface PollAnswers {
	[questionId: string]: PollAnswerType
}

export interface PollConfig {
	id: string
	title: string
	description?: string
	pollPages: PollPage[]
}

export interface PollResults {
	pollId: string
	completedAt: string
	answers: Array<{
		questionId: string
		questionTitle: string
		answer: PollAnswerType
	}>
}
