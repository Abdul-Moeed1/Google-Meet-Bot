import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./components/UI/Home";
import { Navbar } from "./components/Layout/Navbar";
import { Layout } from "./components/Layout/Layout";
import { Start } from "./components/UI/Start";
import { Developer } from "./components/UI/Developer";
import { Price } from "./components/UI/Price";

const App = () => {

  const router = createBrowserRouter([
      {
        path : "/",
        element: <Layout/>,
        children:[
          {
            path:"/",
            element: <Home/>
          },
          {
            path:"/start",
            element: <Start/>
          },
          {
            path:"/developer",
            element: <Developer/>
          },
          {
            path:"/pricing",
            element: <Price/>
          },
          // {
          //   path:"/about",
          //   element: <Home/>
          // },
          // {
          //   path:"*",
          //   element: <NotFoundPage/>
          // },
          
        ]
      }
  ])

  return (
    <>
    
        <RouterProvider router={router} ></RouterProvider>
    </>
  )
}


export default App
