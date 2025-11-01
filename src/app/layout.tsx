import { Outlet } from 'react-router-dom'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<main className='container mx-auto p-4 min-h-screen flex items-center justify-center'>
			<Outlet />
			{children}
		</main>
	)
}
