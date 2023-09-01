import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Clinic } from "../../App";
import AppointmentForm from "../appointments/AppointmentForm";
import "./clinic.css";

interface Props {
  clinic: Clinic;
}

const ClinicItem: React.FC<Props> = ({ clinic }: Props) => {
  return (<div>
    <Card variant="outlined">
      <CardContent>
        <div className="box">      
        <Typography variant="h6">{clinic.clinic_name}</Typography>
        <Typography variant="body1">{clinic.clinic_description}</Typography>
        <Typography variant="body2">Address: {clinic.clinic_address}</Typography>
        <Typography variant="body2">Phone: {clinic.clinic_phone_number}</Typography>
        <Typography variant="body2">Speciality: {clinic.speciality}</Typography>
        <Typography variant="body2">Opening Time: {clinic.openingTime}</Typography>
        <Typography variant="body2">Closing Time: {clinic.closingTime}</Typography>
        </div>
        <div className="box">
        <AppointmentForm/>
        </div>
      </CardContent>
    </Card>
    
    
    </div>
    );
};

export default ClinicItem;
