import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }]
        },
        {
          headers: {
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json"
          }
        }
      );

      const botMessage = { text: response.data.choices[0].message.content, sender: "bot" };

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, botMessage]);
      }, 1500); // Simulate 1.5 seconds of typing
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="p-4 bg-gray-800 text-center text-lg font-bold">Chatbot UI</header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
