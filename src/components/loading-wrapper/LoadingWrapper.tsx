import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const LoadingWrapper: React.FC<Props> = ({ children, loading }: Props) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ mb: 4 }}>
            data loading...
          </Typography>
          <CircularProgress
            size={80}
            thickness={4.5}
            sx={{ color: "#66bb6a" }}
          />
        </Box>
      )}
      {!loading && children}
    </>
  );
};

export default LoadingWrapper;
