import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Book, Clinic } from "../../App";
import BookItem from "../book/Book";
import ClinicItem from "./Clinic";
import LoadingWrapper from "../loading-wrapper/LoadingWrapper";

const ClinicList: React.FC = () => {
  const { isLoading, error, data } = useQuery("clinics", () =>
    fetch("http://localhost:8081/api/v1/clinic").then((response) =>
      response.json()
    )
  );

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
