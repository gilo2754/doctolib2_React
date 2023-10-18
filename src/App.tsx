import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/menu/Sidebar";
import Content from "./components/content/Content";

const queryClient = new QueryClient();

  function App() {
    return (
      <div className="App">
      <Router>
      <div className="container">
        <Sidebar />
        <QueryClientProvider client={queryClient}>
          <Content/>
        </QueryClientProvider>
        </div>
      </Router>
    </div>
    );
  }
  
  export default App;