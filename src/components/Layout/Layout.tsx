import socket from "../../service/socket-client";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import useAuthStore from "../Auth/store";
import { useEffect } from "react";

const Layout = () => {
  const { authState } = useAuthStore();

  // useEffect(() => {
  //   socket.emit("register_user", authState?.username);
  // }, [authState]);

  useEffect(() => {
    if (authState?.username) {
      console.log("✅ Emitting register_user", authState.username); // <-- Add for debug
      socket.emit("register_user", authState.username);
    }
  }, [authState?.username]);

  return (
    <div className="d-flex flex-column vh-100 ">
      <div className="flex-shrink-0 p-1">
        <NavBar />
      </div>

      {/* Main row: Sidebar + Chat */}

      <div className="flex-grow-1 d-flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
