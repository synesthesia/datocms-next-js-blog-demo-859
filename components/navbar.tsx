import Link from "next/link";
import React from "react";
import Login from "./login"

export default function Navbar({ fixed} : {fixed?:boolean}) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link  href="/">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
             
            >
              Test Site
            </a>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:mr-auto">
            <li className="nav-item">
                <Link href="/blog">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <span className="ml-2">Blog</span>
                </a>
                </Link>
              </li>
              <li className="nav-item">
              <Link href="/articles/test-article">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    <span className="ml-2">An Article</span>
                  </a>
                  </Link>
                </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            
              
              <li className="nav-item">
                 <Login />
              </li>
              
            </ul>
          </div>
         </div>
      </nav>
    </>
  );
}