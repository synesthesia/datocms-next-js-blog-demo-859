import UserDropdown from "./user-dropdown"

import { useSession } from 'next-auth/client'

export default function Login() {
  const [ session, loading ] = useSession()
  
  if(session) {
    /*return (
      
    <span 
        className="px-3 py-2 flex items-center content-center text-xs font-bold leading-snug text-white hover:opacity-75 ml-2">
            Hi {(session.user.name.split(' '))[0]}!
    </span>)
    )*/

    let firstName = "";
    if (Array.isArray(session.user.name)){
      firstName = (session.user.name[0]).split(' ')[0];
    } else  {
      firstName  = session.user.name.split(' ')[0];
    }
        
    return (
        <UserDropdown color="white" heading={firstName} />
    )
  }
  
  return <span>
      <a 
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2" 
        href="/api/auth/signin">
        <span className="ml-2">Sign in</span>
    </a>
  </span>
}