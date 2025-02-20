import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;
