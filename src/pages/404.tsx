import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
	return (
		<section className='flex flex-col gap-2 items-center justify-center h-screen'>
			<h1 className='text-4xl font-bold'>404</h1>
			<p className='text-2xl font-bold'>Страница не найдена</p>
			<Link to='/' className='text-primary'>
				Перейти на главную страницу
			</Link>
		</section>
	)
}
