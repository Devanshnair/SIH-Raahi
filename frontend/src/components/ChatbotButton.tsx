import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";


const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <Link to={"/chatbot"}>
        <div
          onClick={toggleChatbot}
          className="rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600"
        >
          <MessageCircle size={24} />
        </div>
      </Link>
    </div>
  );
};

export default ChatbotButton;
