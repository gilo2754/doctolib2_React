import { Box, Typography } from "@mui/material";
import { Book } from "../../App";

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({ book }: Props) => {
  const isCheap = parseFloat(book.price.substring(1, book.price.length)) < 30;
  return (
    <Box
      sx={{
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          m: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "start" }}>
          {book.title}
        </Typography>
        <Typography variant="body1">Subtitle: {book.subtitle}</Typography>
        <Typography variant="body1">Price: {book.price}</Typography>
        <Typography variant="caption" sx={{ mb: 2, color: "#757575" }}>
          url: {book.url}
        </Typography>
      </Box>
      {!isCheap ? (
        <Box
          sx={{
            bgcolor: "#ef5350",
            p: 2,
            height: 5,
            mt: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#fff" }}>
            expensive
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: "#66bb6a",
            p: 2,
            height: 5,
            mt: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#fff" }}>
            cheap
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookItem;
