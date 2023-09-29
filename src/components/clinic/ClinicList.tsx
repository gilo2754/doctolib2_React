import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import { useQuery } from "react-query";
import { Clinic } from "../../App";
import ClinicItem from "./Clinic";
import LoadingWrapper from "../loading-wrapper/LoadingWrapper";
import { useAuth } from "../Auth/AuthContext";

const ClinicList: React.FC = () => {
  const { isLoading, error, data } = useQuery("clinics", () =>
    fetch("http://localhost:8081/api/v1/clinic").then((response) =>
      response.json()
    )
  );
  const { isLoggedIn, userRoles, jwtToken, logout } = useAuth();

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
        Clínicas
      </Typography>
      <LoadingWrapper loading={isLoading}>
        <>
          {error || (!data && <p>No hay clínicas aún 😞</p>)}
          {data && (
            <>
              {(data as Clinic[])
                .slice(0, 8)
                .map((clinic, index) => (
                  <ClinicItem clinic={clinic} key={index} />
                ))}
            </>
          )}
        </>
      </LoadingWrapper>
    </Box>
  );
};

export default ClinicList;
