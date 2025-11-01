import type { PollConfig } from '@/shared/types/poll.types'

export const demopollConfig: PollConfig = {
	id: 'demo-poll-2025',
	title: 'Опрос разработчиков',
	pollPages: [
		{
			id: 'page-1',
			questions: [
				{
					id: 'q1',
					title: 'Какой ваш любимый язык программирования?',
					type: 'single',
					options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
					required: true,
					allowUnsure: true,
					unsureLabel: 'Затрудняюсь ответить',
				},
			],
		},
		{
			id: 'page-2',
			questions: [
				{
					id: 'q2',
					title: 'Какие фреймворки вы используете?',
					type: 'multiple',
					options: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
					required: true,
					allowUnsure: true,
					unsureLabel: 'Затрудняюсь ответить',
				},
			],
		},
		{
			id: 'page-3',
			questions: [
				{
					id: 'q3',
					title: 'Как часто вы пишете код?',
					type: 'single',
					options: ['Каждый день', 'Несколько раз в неделю', 'Раз в неделю', 'Реже'],
					required: true,
					allowUnsure: true,
				},
			],
		},
	],
}

export const multiQuestionpollConfig: PollConfig = {
	id: 'multi-question-poll',
	title: 'Расширенный опрос',
	pollPages: [
		{
			id: 'page-1',
			questions: [
				{
					id: 'q1',
					title: 'Ваш возраст',
					type: 'single',
					options: ['18-25', '26-35', '36-45', '46+'],
					required: true,
					allowUnsure: true,
				},
				{
					id: 'q2',
					title: 'Как часто вы пишете код?',
					type: 'single',
					options: ['Каждый день', 'Несколько раз в неделю', 'Раз в неделю', 'Реже'],
					required: true,
					allowUnsure: true,
				},
				{
					id: 'q3',
					title: 'Ваши интересы',
					type: 'multiple',
					options: ['Программирование', 'Дизайн', 'Маркетинг', 'Аналитика'],
					required: true,
					allowUnsure: true,
				},
			],
		},
	],
}
