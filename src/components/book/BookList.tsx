import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Book } from "../../App";
import BookItem from "./Book";
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

const BookList: React.FC = () => {
  const { isLoading, error, data } = useQuery("books", () =>
    fetch("https://api.itbook.store/1.0/new").then((response) =>
      response.json()
    )
  );
  const [selectedNumberOfBooks, setSelectedNumberOfBooks] = useState<number>();
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
        Booklist
      </Typography>
      <LoadingWrapper loading={isLoading}>
        <>
          {error ||
            (!data && (
              <Box>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Sorry, we couldn't find any books to display! 😞
                </Typography>
              </Box>
            ))}
          {data && (
            <>
              <Box sx={{ mt: 2 }}>
                {displayNumbers.map((num) => (
                  <NumberButton
                    displayNumber={num}
                    onClick={(val: number) => setSelectedNumberOfBooks(val)}
                    active={num === selectedNumberOfBooks}
                  />
                ))}
                <button
                  className="numberButton"
                  onClick={() => setSelectedNumberOfBooks(undefined)}
                >
                  ⇠
                </button>
              </Box>
              <Box sx={{ mt: 4 }}>
                {(data.books as Book[])
                  .slice(0, selectedNumberOfBooks)
                  .map((book, index) => (
                    <BookItem book={book} key={index} />
                  ))}
              </Box>
            </>
          )}
        </>
      </LoadingWrapper>
    </Box>
  );
};

export default BookList;
