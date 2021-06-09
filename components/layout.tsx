import React, {ReactNode} from "react";
import Alert from './alert'
import Footer from './footer'
import Navbar from './navbar'
import Searchbar from './searchbar'

export default function Layout({ preview, children}: { preview:boolean, children?:ReactNode}) {
  return (
    <>
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Navbar />
        <Searchbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
