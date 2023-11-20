import SideBar from './components/SideBar'
import HomeContent from './components/MainContent/HomeContent'
import '../app/globals.css'
import Header from './components/Header'

export default function Home() {
  return (
    <main className="flex flex-row justify-start" >
      <SideBar />
      <div className='mainContainer border-l'>
        <Header />
        <HomeContent />
      </div>
    </main>
  )
}
