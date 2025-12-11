import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import { isAuthenticated, getUserEmail } from "../../../api/AuthAPI";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUserEmail(getUserEmail());
    }
  }, []);

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="w-full h-16 bg-white flex items-center shadow-sm sticky top-0 z-50 px-4 md:px-12 justify-between font-['Inter']">
      {popupVisible && (
        <div className="absolute right-4 top-16 z-50">
          <ProfilePopup />
        </div>
      )}

      <img className="h-9 w-auto object-contain cursor-pointer" src={LinkedinLogo} alt="LinkedinLogo" onClick={() => goToRoute("/home")} />

      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="flex items-center justify-center gap-8 md:gap-14 text-2xl text-gray-500">
          <AiOutlineSearch
            className="cursor-pointer hover:text-black transition-colors md:hidden"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcase className="cursor-pointer hover:text-black transition-colors" />
          <AiOutlineMessage className="cursor-pointer hover:text-black transition-colors" />
          <AiOutlineBell className="cursor-pointer hover:text-black transition-colors" />
        </div>
      )}

      {isLoggedIn || currentUser?.name ? (
        <div className="flex items-center gap-3">
          {currentUser?.imageLink ? (
            <img
              className="h-9 w-9 rounded-full object-cover cursor-pointer border border-gray-200"
              src={currentUser.imageLink}
              alt="user"
              onClick={displayPopup}
            />
          ) : (
            <div
              className="h-9 w-9 rounded-full bg-gradient-to-br from-[#0a66c2] to-[#004182] flex items-center justify-center cursor-pointer border border-gray-200"
              onClick={displayPopup}
            >
              <span className="text-white text-sm font-bold">
                {userEmail?.charAt(0).toUpperCase() || currentUser?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => goToRoute("/login")}
          className="px-6 py-2 rounded-full border-2 border-[#0a66c2] text-[#0a66c2] font-semibold hover:bg-[#0a66c2] hover:text-white transition-all duration-200"
        >
          Sign In
        </button>
      )}

      {searchInput.length > 0 && (
        <div className="absolute left-24 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-40">
          {filteredUsers.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                onClick={() => openUser(user)}
              >
                <img src={user.imageLink} className="h-8 w-8 rounded-full object-cover" />
                <p className="font-semibold text-sm text-gray-800">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
