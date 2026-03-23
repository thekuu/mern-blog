import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./Style.scss";


const Layout = () =>{
  return(
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/write",
        element: <Write/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ]
  },
]);

function App() {
  return (
  <div className="bg-gray-50 min-h-screen">
    <RouterProvider router={router} />
  </div>
  );
}

export default App;

