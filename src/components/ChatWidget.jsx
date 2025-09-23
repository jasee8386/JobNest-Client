// src/components/ChatWidget.jsx
import { useState } from "react";
import { Send } from "lucide-react";

const ChatWidget = ({ messages, onSend }) => {
  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (newMsg.trim()) {
      onSend(newMsg);
      setNewMsg("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-base-200 rounded-2xl shadow-lg flex flex-col">
      <div className="p-3 bg-primary text-white font-semibold rounded-t-2xl">
        Chat
      </div>
      <div className="flex-1 p-3 overflow-y-auto h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${
              msg.sender === "me" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-2 border-t">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered input-sm flex-1"
        />
        <button onClick={handleSend} className="btn btn-primary btn-sm ml-2">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
