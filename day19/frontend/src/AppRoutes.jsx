import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Welcome to App</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes