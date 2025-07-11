import { useEffect, useState, useRef } from "react";
import socket from "../service/socket-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useActiveFriendStore from "./SideBar/store";
import bg from "../assets/bg-chat.svg";

interface MessageProps {
  sender: string;
  receiver: string;
  text: string;
}

interface Props {
  username: string;
}

const ChatBody = ({ username }: Props) => {
  const { activeFriend } = useActiveFriendStore();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = () => {
    return axios
      .get<MessageProps[]>(
        `https://chatapp-server-n84z.onrender.com/api/messages/${username}/${activeFriend}`
      )
      .then((res) => res.data);
  };

  const { data: Messages } = useQuery<MessageProps[], Error>({
    queryKey: ["messages", username, activeFriend],
    queryFn: fetchMessages,
    enabled: !!activeFriend,
  });

  useEffect(() => {
    if (Messages) setMessageList(Messages);
  }, [Messages]);

  socket.on("receive_private_message", (data: MessageProps) => {
    setMessageList([...messageList, data]);
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const message = {
      sender: username,
      receiver: activeFriend,
      text: currentMessage.trim(),
    };

    setMessageList((prev) => [...prev, message]);
    socket.emit("send_private_message", message);
    setCurrentMessage("");
  };

  return (
    <>
      <div
        className="d-flex flex-column h-100"
        style={{
          backgroundColor: "#FAF7F3",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Messages Container */}
        <div
          ref={scrollRef}
          className="flex-grow-1 overflow-auto p-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#E3DE61 transparent",
          }}
        >
          {messageList.map((data, index) => {
            const isMe = data.sender === username;
            return (
              <div
                key={index}
                className={`d-flex mb-3 ${
                  isMe ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-3 rounded-3 shadow-sm ${
                    isMe ? "bg-light text-dark" : "text-white"
                  }`}
                  style={{
                    maxWidth: "75%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    backgroundColor: "#E3DE61",
                  }}
                >
                  <div style={{ fontSize: "1rem", lineHeight: "1.3" }}>
                    {data.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="border-top p-3 bg-white">
          <div className="input-group">
            <input
              value={currentMessage}
              type="text"
              className="form-control rounded-pill"
              placeholder="Type a message..."
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{ borderColor: "#E3DE61" }}
            />

            <button
              className="btn rounded-pill ms-2"
              onClick={sendMessage}
              disabled={!currentMessage.trim()}
              style={{ backgroundColor: "#E3DE61" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
