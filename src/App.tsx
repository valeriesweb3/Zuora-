import { Routes, Route } from 'react-router-dom';

import './globals.css'
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import RootLayout from './_root/RootLayout';
import { Home, CreatePost, Profile, UpdateProfile, AllUsers } from './_root/pages';
import { Toaster } from '@/components/ui/toaster'

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/** public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                
            </Route>


            {/** private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/all-users" element={<AllUsers />} />
                {/** <Route path="/explore" element={<Explore />} />
            
                <Route path="/posts/:id" element={<PostDetails />} />
                
                
                    */}
            </Route>
        </Routes> 

        <Toaster />
    </main>
  )
}

export default App