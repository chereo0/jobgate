import React, { useEffect, useState } from "react";
// Using JobGate logo instead of LinkedIn logo
const LinkedinLogo = "/b528c485-1cc6-41f6-8521-404788fdef37.jpg";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase, BsPeople } from "react-icons/bs";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import { isAuthenticated, getUserEmail } from "../../../api/AuthAPI";
import { getNotificationsAPI, markNotificationAsReadAPI } from "../../../api/NotificationAPI";
import { acceptConnectionRequestAPI, rejectConnectionRequestAPI } from "../../../api/ConnectionAPI";
import { toast } from "react-toastify";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const loggedIn = isAuthenticated();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUserEmail(getUserEmail());
      fetchNotifications();

      // Auto-refresh notifications every 30 seconds
      const interval = setInterval(() => {
        fetchNotifications();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotificationsAPI();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await markNotificationAsReadAPI(notification._id);
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleAcceptConnection = async (connectionId, notificationId) => {
    try {
      // Extract ID if connectionId is an object
      const id = typeof connectionId === 'object' ? connectionId._id : connectionId;
      await acceptConnectionRequestAPI(id);
      await markNotificationAsReadAPI(notificationId);
      await fetchNotifications();
      toast.success("Connection request accepted");
    } catch (error) {
      console.error("Error accepting connection:", error);
      toast.error("Failed to accept connection");
    }
  };

  const handleRejectConnection = async (connectionId, notificationId) => {
    try {
      // Extract ID if connectionId is an object
      const id = typeof connectionId === 'object' ? connectionId._id : connectionId;
      await rejectConnectionRequestAPI(id);
      await markNotificationAsReadAPI(notificationId);
      await fetchNotifications();
      toast.success("Connection request rejected");
    } catch (error) {
      console.error("Error rejecting connection:", error);
      toast.error("Failed to reject connection");
    }
  };

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
    setNotificationVisible(false);
  };

  const toggleNotifications = () => {
    setNotificationVisible(!notificationVisible);
    setPopupVisible(false);
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

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full h-16 bg-white flex items-center shadow-sm sticky top-0 z-50 px-4 md:px-12 justify-between font-['Inter']">
      {popupVisible && (
        <div className="absolute right-4 top-16 z-50">
          <ProfilePopup />
        </div>
      )}

      {notificationVisible && (
        <div className="absolute right-4 top-16 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <AiOutlineBell className="text-4xl mx-auto mb-2 text-gray-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-[#AEE3E6] bg-opacity-30" : ""
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <p className={`text-sm ${!notification.read ? "font-semibold" : ""}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(notification.createdAt)}
                  </p>

                  {notification.type === "connection_request" && notification.connectionId && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptConnection(notification.connectionId, notification._id);
                        }}
                        className="flex-1 px-3 py-1.5 bg-[#2FA4A9] text-white rounded-md text-sm font-medium hover:bg-[#258A8E] transition-colors flex items-center justify-center gap-1"
                      >
                        <AiOutlineCheck /> Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectConnection(notification.connectionId, notification._id);
                        }}
                        className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <AiOutlineClose /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <img className="h-12 w-auto object-contain cursor-pointer" src={LinkedinLogo} alt="JobGate Logo" onClick={() => goToRoute("/home")} />

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
          <BsPeople
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => goToRoute("/friends")}
          />
          <BsBriefcase
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => goToRoute("/jobs")}
          />
          <AiOutlineMessage className="cursor-pointer hover:text-black transition-colors" />
          <div className="relative">
            <AiOutlineBell
              className="cursor-pointer hover:text-black transition-colors"
              onClick={() => goToRoute("/notifications")}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2FA4A9] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
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
