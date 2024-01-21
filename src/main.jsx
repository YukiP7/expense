import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import AuthLayout from './AuthLayout'
import Transcations from './transcations/Transcation.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter([
  {
    path: "/" ,
    element : <App/>,
    children: [
      {
        path : "/" ,
        element: <Sidebar/>
      },
      {
        path: "/login" ,
        element:(
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
      ),
      },
      {
        path : "/signup" ,
        element: (
          <AuthLayout authentication={false}>
              <Signup />
          </AuthLayout>
      ),
      },
      {
        path : "/transcations" ,
        element: (
          <AuthLayout authentication>
            { " "}
              <Transcations />
          </AuthLayout>
      ),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
