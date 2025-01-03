import React, { useState } from "react";
import { Input, Button, Avatar, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./ChatBox.scss";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { user: "Bot", text: "Xin chào bạn cần tôi giúp gì" },
  ]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() === "") {
      message.warning("Please enter a message.");
      return;
    }

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "User", text: messageText },
    ]);

    // Simulate bot response after 1 second
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "Bot", text: "Vui lòng liên hệ Admin tại trang liên hệ" },
      ]);
    }, 1000);

    // Clear input field
    setMessageText("");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.user === "User" ? "justify-end" : ""
            }`}
          >
            {message.user !== "User" && (
              <Avatar className="bg-blue-500 text-white">
                {message.user[0]}
              </Avatar>
            )}
            <div
              className={`p-2 rounded-lg ${
                message.user === "User" ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              <span className="font-semibold">{message.user}:</span>{" "}
              {message.text}
            </div>
            {message.user === "User" && (
              <Avatar className="bg-green-500 text-white">
                {message.user[0]}
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onPressEnter={handleSendMessage}
          className="flex-1"
          placeholder="Type a message"
        />
        <Button
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          className="bg-blue-500 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
