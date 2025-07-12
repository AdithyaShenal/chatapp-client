import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import type { User } from "../Auth/store";
import { useNavigate } from "react-router-dom";
import useActiveFriendStore from "../SideBar/store";

const SearchPeople = () => {
  const [query, setQuery] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const { setActiveFriend } = useActiveFriendStore();

  const handleSearch = (input: string) => {
    if (input.trim()) setQuery(input.trim());
  };

  const {
    data: Users,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["user-search", query],
    queryFn: () => {
      return axios
        .get<User[]>("https://chatapp-server-n84z.onrender.com/api/search", {
          params: { q: query },
        })
        .then((res) => res.data);
    },
    enabled: !!query,
  });

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Search input */}
          <div className="input-group mb-4 shadow-sm">
            <input
              type="text"
              className="form-control rounded-start-pill"
              placeholder="Search people by name or username..."
              style={{
                borderColor: "#E3DE61",
                fontSize: "0.9rem",
              }}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              className="btn btn-outline-secondary rounded-end-pill"
              style={{
                borderColor: "#E3DE61",
                color: "#000",
              }}
              type="button"
              onClick={() => handleSearch(input || "")}
            >
              Search
            </button>
          </div>

          {/* Results list */}
          <div className="list-group">
            {/* User card example */}

            {Users?.map((user, index) => (
              <div
                key={index}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  src="https://i.pravatar.cc/60?img=11"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  alt="avatar"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
                    {user.name}
                  </h6>
                  <small className="text-muted">{user.username}</small>
                </div>
                <button
                  className="btn btn-sm btn-outline-dark"
                  style={{
                    fontSize: "0.8rem",
                    borderRadius: "20px",
                    fontWeight: "500",
                  }}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-outline-dark"
                  style={{
                    fontSize: "0.8rem",
                    borderRadius: "20px",
                    fontWeight: "500",
                  }}
                  onClick={() => {
                    navigate("/app");
                    setActiveFriend(user.username);
                  }}
                >
                  Chat
                </button>
              </div>
            ))}

            {/* Duplicate and render other results as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
