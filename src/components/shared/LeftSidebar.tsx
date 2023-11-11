import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import React, { useEffect, useState } from 'react';

import { signInUser, getAccount } from '../../contracts/web3connect';
import axios from 'axios';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const [wallet, getWallet] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState(''); 
  const [fileUrl, getFileUrl] = useState(null);







  useEffect(() => {
    getNftsIds()
    getUser()
  },[wallet])


  async function getNftsIds() {
    const output = await signInUser();
    getWallet(output.walletaddr);
  }




  async function getUser() {
    const output = await signInUser();
    getWallet(output.walletaddr);
    const userdata = await getAccount();
    const userurl = userdata.userurl;
    if (userurl == undefined) {
      return;
    } else {
      const header = {
        "Content-Type": "application/json",
      };
      const userinfo = await axios.get(userurl, header);
      const first = userinfo.data.getfirst;
      const user = userinfo.data.getuser;

      // Update state with first name and user name
      setFirstName(first);
      setUserName(user);
      const picurl = userdata.picurl;
      if (picurl == 'http://127.0.0.1:8080/ipfs/'){
        getFileUrl("../../images/0nft.png")
      }
      else {
        getFileUrl(picurl);
      }
    }
  }


  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        

        
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={fileUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold" id="first">{firstName}</p>
              <p className="small-regular text-light-3" id="user">@{userName}</p>
            </div>
          </Link>
        

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-green-700"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4  invert-white">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost invert-white"
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
