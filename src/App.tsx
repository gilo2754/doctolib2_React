import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import BookList from "./components/book/BookList";
import ClinicList from "./components/clinic/ClinicList";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateAppointment from "./components/appointments/CreateAppointment";
import MyAppointmentList from "./components/appointments/MyAppointmentList";
import Account from "./components/user/Account";
import Sidebar from "./components/menu/Sidebar";
import Content from "./components/content/Content";

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