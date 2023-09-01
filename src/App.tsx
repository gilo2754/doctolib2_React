import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import BookList from "./components/book/BookList";
import ClinicList from "./components/clinic/ClinicList";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateAppointment from "./components/appointments/CreateAppointment";

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface Clinic {
    clinic_id: number;
    clinic_name: string;
    clinic_description: string;
    clinic_address: string;
    clinic_phone_number: string;
    clinic_state: string;
    speciality: string;
    openingTime: string;
    closingTime: string;
  }

  const queryClient = new QueryClient();

  function App() {
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Clinic List</Link>
              </li>
            </ul>
          </nav>
  
          <QueryClientProvider client={queryClient}>
          <Routes>

            <Route path="/" Component={ClinicList} />
            <Route path="/create-appointment/:date" Component={CreateAppointment} />
            </Routes>

          </QueryClientProvider>
        </Router>
      </div>
    );
  }
  
  export default App;