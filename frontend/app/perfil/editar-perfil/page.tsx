import SideBar from '@/app/components/SideBar'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import '@/app/layout'
import '@/app/globals.css'
import { EditUserForm } from '@/app/components/EditUserForm'

const ProfileEdit = () => {

    return (
        <div>
            <div className="flex min-h-screen flex-row justify-start">
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={0} />
                    <main>
                        <EditUserForm />
                    </main>
                </div>
            </div >
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
export default ProfileEdit;