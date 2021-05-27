import React from "react";
import { createPopper } from "@popperjs/core";
import { useSession, signOut } from 'next-auth/client'

export default function UserDropdown({ color, heading }) {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [ session, loading ] = useSession()  
    const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    if(session)  {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
    }
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "ml-2  flex items-center text-white font-bold uppercase text-xs px-3 py-2 text-xs leading-snug  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
              onMouseEnter={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
              onMouseLeave={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              { heading ?? "Heading"}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                My Profile
              </a>
              
              <button className="text-sm bg-transparent hover:bg-gray-200  font-normal py-2 px-4 rounded"
              onClick={() => signOut({redirect: false})}>
                  Logout
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
