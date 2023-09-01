import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Book, Clinic } from "../../App";
import BookItem from "../book/Book";
import ClinicItem from "./Clinic";
import LoadingWrapper from "../loading-wrapper/LoadingWrapper";

interface ButtonProps {
  displayNumber: number;
  onClick: (val: number) => void;
  active: boolean;
}

const NumberButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={`numberButton ${props.active ? "active" : ""}`}
      onClick={() => props.onClick(props.displayNumber)}
    >
      {props.displayNumber}
    </button>
  );
};

const ClinicList: React.FC = () => {
  const { isLoading, error, data } = useQuery("clinics", () =>
    fetch("http://localhost:8081/api/v1/clinic").then((response) =>
      response.json()
    )
  );
  const [selectedNumberOfClinics, setSelectedNumberOfClinics] = useState<number>();
  const displayNumbers = [0, 1, 3];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: 750,
        m: "0 auto",
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        Clinicas
      </Typography>
      <LoadingWrapper loading={isLoading}>
        <>
          {error ||
            (!data && (
              <Box>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  No hay clinicas aún 😞
                </Typography>
              </Box>
            ))}
          {data && (
            <>
              <Box sx={{ mt: 2 }}>
                {displayNumbers.map((num) => (
                  <NumberButton
                    displayNumber={num}
                    onClick={(val: number) => setSelectedNumberOfClinics(val)}
                    active={num === selectedNumberOfClinics}
                  />
                ))}
                <button
                  className="numberButton"
                  onClick={() => setSelectedNumberOfClinics(undefined)}
                >
                  ⇠
                </button>
              </Box>
              <Box sx={{ mt: 4 }}>
                {(data as Clinic[])
                  .slice(0, selectedNumberOfClinics)
                  .map((clinic, index) => (
                    <ClinicItem clinic={clinic} key={index} />
                  ))}
              </Box>
            </>
          )}
        </>
      </LoadingWrapper>
    </Box>
  );
};

export default ClinicList;
