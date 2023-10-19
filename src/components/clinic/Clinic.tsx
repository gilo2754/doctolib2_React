import { Card, CardContent, Typography } from "@mui/material";
import "./clinic.css";
import CreateAppointment from "../appointments/CreateAppointment";
import { IAppointmentWithoutDetails } from "../appointments/interfaces/IAppointmentWithoutDetails";
import { IClinic } from "./IClinic";
import AddressComponent from "../others/AddressComponent";

interface Props {
  clinic: IClinic;
}

const Clinic: React.FC<Props> = ({ clinic }: Props) => {

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <div className="box">
          <div>clinic_id: {clinic.clinic_id}</div>
            <Typography variant="h6">Nombre: {clinic.clinic_name}</Typography>
            <Typography variant="body1">{clinic.clinic_description}</Typography>
            <Typography variant="body2">Address: {clinic.clinic_address}</Typography>
            <Typography variant="body2">Phone: {clinic.clinic_phone_number}</Typography>
            <Typography variant="body2">Speciality: {clinic.speciality}</Typography>
            <Typography variant="body2">Opening Time: {clinic.openingTime}</Typography>
            <Typography variant="body2">Closing Time: {clinic.closingTime}</Typography>
          </div>
          
          <CreateAppointment clinicIdFromClinic={clinic.clinic_id} />
          <AddressComponent />
        </CardContent>
      </Card>
    </div>
  );
};

export default Clinic;
