
import { Navbar, Footer } from './index'

interface LayoutProps {
    children: React.ReactNode
}

function Layout ({ children } : LayoutProps) : JSX.Element {
  return (
    <>
        <Navbar/>
            <main className='min-h-screen container mx-auto px-4 md:px-0'>
                {children}
            </main>
        <Footer/>
    </>
  )
}

export default Layout