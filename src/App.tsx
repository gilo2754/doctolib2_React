import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import BookList from "./components/book/BookList";
import ClinicList from "./components/clinic/ClinicList";
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
      <QueryClientProvider client={queryClient}>
        <ClinicList />
     
      
      </QueryClientProvider>
    </div>
  );
}

export default App;
