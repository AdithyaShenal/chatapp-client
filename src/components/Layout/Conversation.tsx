import useAuthStore from "../Auth/store";
import ChatBody from "../ChatBody";
import SideBar from "../SideBar/SideBar";
import Profile from "../Profile/ProfileDetails"; // You'll create this component

const Conversation = () => {
  const { authState } = useAuthStore();

  return (
    <div className="row h-100 w-100 m-0">
      {/* Sidebar - Left */}
      <div className="col-12 col-lg-3 border-end p-0 d-none d-lg-block">
        <SideBar />
      </div>

      {/* Chat Body - Center */}
      <div className="col-12 col-lg-6 p-0 border-end h-100 overflow-auto">
        <ChatBody username={authState?.username || ""} />
      </div>

      {/* Profile - Right */}
      <div className="col-12 col-lg-3 p-0 d-none d-lg-block">
        <Profile />
      </div>
    </div>
  );
};

export default Conversation;
