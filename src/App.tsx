import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { getCookie } from './utils/storage/cookie-storage'
import Loader from './common/Loader'
import NotFound from './pages/404page'
import SignIn from './pages/Authentication/SignIn'
import DefaultLayout from './layout/DefaultLayout'
import ECommerce from './pages/Dashboard/ECommerce'
import coreRoutes from './routes'
function App() {
  const navigate = useNavigate()
  const token = getCookie('token')

  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
    }
  }, [token, navigate])

  return (
    <Suspense fallback={<Loader />}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-in" element={<SignIn />} />
        {token && (
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {coreRoutes.map((route, index) => {
              const Component = route.component
              return Component && <Route key={index} path={route.path} element={<Component />} />
            })}
          </Route>
        )}
      </Routes>
    </Suspense>
  )
}

export default App
