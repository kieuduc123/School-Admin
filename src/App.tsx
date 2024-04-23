import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Loader from './common/Loader'
import routes from './routes'
import { getCookie } from './utils/storage/cookie-storage'
import { Storage } from './constants/storage'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))
const NotFound = lazy(() => import('./pages/404page'))
const SignIn = lazy(() => import('./pages/Authentication/SignIn'))
const ECommerce = lazy(() => import('./pages/Dashboard/ECommerce'))

function App() {
  const navigate = useNavigate()
  const token = getCookie(Storage.token)
  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
    }
  }, [token, navigate])

  return (
    <Suspense fallback={<Loader />}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/sign-in" element={<SignIn />} />
        {token ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {routes.map((route, index) => {
              const { path, component: Component } = route
              return <Route key={index} path={path} element={<Component />} />
            })}
          </Route>
        ) : null}
      </Routes>
    </Suspense>
  )
}

export default App
