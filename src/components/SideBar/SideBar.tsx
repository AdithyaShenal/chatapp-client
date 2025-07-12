import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useActiveFriendStore from "./store";
import useAuthStore from "../Auth/store";

interface FriendProp {
  _id: string;
  username: string;
  name: string;
  email: string;
}

const SideBar = () => {
  const { setActiveFriend, activeFriend } = useActiveFriendStore();
  const { authState } = useAuthStore();

  const fetchFriends = () => {
    return axios
      .get<FriendProp[]>(
        `https://chatapp-server-n84z.onrender.com/api/messages/conversations/${authState?.username}`
      )
      .then((res) => res.data);
  };

  const { data: Friends } = useQuery<FriendProp[], Error>({
    queryKey: ["friends"],
    queryFn: fetchFriends,
    enabled: !!authState?._id,
  });

  return (
    <div className="h-100 overflow-auto" style={{ backgroundColor: "#FAF7F3" }}>
      <ul className="list-group list-group-flush">
        {Friends?.map((friend, index) => (
          <li
            key={index}
            onClick={() => setActiveFriend(friend.username)}
            className={`list-group-item rounded-3 my-1 mx-2 py-2 px-3 ${
              activeFriend === friend.username ? "fw-bold" : ""
            }`}
            style={{
              backgroundColor:
                activeFriend === friend.username ? "#E3DE61" : "transparent",
              cursor: "pointer",
              border: "1px solid #ddd", // subtle border
              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E3DE61";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                activeFriend === friend.username ? "#E3DE61" : "#ddd";
            }}
          >
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
