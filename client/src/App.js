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
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 40%, #ecfeff 100%)" }}>
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none fixed top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, #99f6e4, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="pointer-events-none fixed top-[40%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #67e8f9, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="pointer-events-none fixed bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #5eead4, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="relative" style={{ zIndex: 1 }}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
