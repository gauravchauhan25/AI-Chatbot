import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY =
    "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";
  //   const API_URL = "https://api.openai.com/v1/chat/completions";

  const API_URL = "http://localhost:5000/chat";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        messages: [...messages, userMessage],
      });

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-3xl font-bold">Chatbot</h2>
        <p className="text-sm md:text-xl text-gray-400 mt-3">
          How can I help you with?
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            "Tell me about the internet.",
            "How does a car engine work?",
            "Best way to cook pasta?",
            "Rules of chess.",
          ].map((prompt, index) => (
            <button
              key={index}
              className="p-3 text-sm md:text-base bg-gray-800 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-3 p-4 bg-gray-900 rounded-lg overflow-y-auto h-80">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <p className="text-gray-400">Thinking...</p>}
        </div>
      )}

      <div className="mt-auto flex items-center p-3 sm:p-4 bg-gray-800 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 px-2 sm:px-4"
        />
        <button
          className="text-gray-400 hover:text-white cursor-pointer ml-2"
          onClick={sendMessage}
          disabled={loading}
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
