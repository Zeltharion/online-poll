import { Layout } from './layout'
import { createBrowserRouter } from 'react-router-dom'
import { MainPage, NotFoundPage } from '@/pages'

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				index: true,
				path: '/',
				element: <MainPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])
