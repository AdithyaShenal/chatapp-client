import { useQuery } from "@tanstack/react-query";
import useActiveFriendStore from "../SideBar/store";
import axios from "axios";
import { type User } from "../Auth/store";

const Profile = () => {
  const { activeFriend } = useActiveFriendStore();

  const {
    data: User_Details,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ["chat details", activeFriend],
    queryFn: () => {
      return axios
        .get(`http://localhost:3000/api/users/${activeFriend}`)
        .then((res) => res.data);
    },
    enabled: !!activeFriend,
  });

  return (
    <>
      <div
        className="p-3 h-100 d-flex flex-column text-dark"
        style={{ minWidth: "250px", backgroundColor: "#FAF7F3" }}
      >
        {/* Profile Picture and Name */}
        {isError && (
          <div className="text-danger mb-2">
            <small>{error.message}</small>
          </div>
        )}
        {isLoading && (
          <div className="text-muted mb-2">
            <small>Loading...</small>
          </div>
        )}
        <div className="text-center mb-3">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User Avatar"
            className="rounded-circle mb-2"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
          <h5
            className="fw-semibold mb-1"
            style={{ fontSize: "1rem", color: "#222" }}
          >
            {User_Details?.name}
          </h5>
          <p className="mb-1" style={{ fontSize: "0.85rem", color: "#555" }}>
            {User_Details?.email}
          </p>
          <span
            className="badge"
            style={{
              backgroundColor: "#E3DE61",
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Last Online: 2 hours ago
          </span>
        </div>

        {/* Username */}
        <div className="mb-2">
          <small
            className="text-uppercase"
            style={{ color: "#E3DE61", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Username
          </small>
          <p className="mb-1" style={{ fontSize: "0.85rem", color: "#333" }}>
            {User_Details?.username}
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-2">
          <small
            className="text-uppercase"
            style={{ color: "#E3DE61", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Full Name
          </small>
          <p className="mb-1" style={{ fontSize: "0.85rem", color: "#333" }}>
            {User_Details?.name}
          </p>
        </div>

        {/* Date of Birth */}
        <div className="mb-2">
          <small
            className="text-uppercase"
            style={{ color: "#E3DE61", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Date of Birth
          </small>
          <p style={{ fontSize: "0.85rem", color: "#333" }}>
            {User_Details?.dateOfBirth}
          </p>
        </div>

        {/* Status */}
        <div className="mb-2">
          <small
            className="text-uppercase"
            style={{ color: "#E3DE61", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Status
          </small>
          <p className="mb-1" style={{ fontSize: "0.85rem", color: "#333" }}>
            Living my best life 🌟
          </p>
        </div>

        {/* Joined At */}
        <div className="mb-4">
          <small
            className="text-uppercase"
            style={{ color: "#E3DE61", fontWeight: "600", fontSize: "0.7rem" }}
          >
            Joined
          </small>
          <p className="mb-0" style={{ fontSize: "0.85rem", color: "#333" }}>
            January 2024
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-row gap-2 justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-outline-danger"
            style={{
              fontWeight: "600",
              fontSize: "0.85rem",
              borderRadius: "20px",
              minWidth: "100px",
            }}
          >
            Block User
          </button>
          <button
            type="button"
            className="btn btn-outline-warning"
            disabled={true}
            style={{
              fontWeight: "600",
              fontSize: "0.85rem",
              borderRadius: "20px",
              minWidth: "100px",
            }}
          >
            Clear History
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{
              fontWeight: "600",
              fontSize: "0.85rem",
              borderRadius: "20px",
              minWidth: "100px",
            }}
          >
            Follow
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
