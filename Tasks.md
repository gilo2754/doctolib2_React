# Tasks

## JSX / TSX
1. Create a Book-Component which displays the author's name, title of the book and it's release date
2. Render the component in App.tsx

## Conditional Rendering
Render a list of Books. A book object should contain a property that says whether it is available or not. If not, render a label telling the user its currently unavailable

## Hooks and Databinding
### useState - hook
You're already rendering a list of books in your app. 
Use Material UI's slider (https://mui.com/material-ui/react-slider/) and the useState hook to determine how many books should be displayed in your list. The slider should provide as many options as the length of your list. Render the amount of books dependent on the user's choice.

### useEffect - hook
Let's get rid of our dummy data.
1) Fetch data from https://api.itbook.store/1.0/new
2) Refactor book-interface since the retrieved objectes slightly differ from our book type
3) Change the condition of labelling: If a book's price is less than 30$ label it as cheap, else as expensive
4) Add a Loading-Component to the app that should be displayed as long as the data is being fetched
5) Add an Error-Component that is displayed in case of no books

### useQuery - hook
1) Refactor the app a little bit: Move all the stuff we're currently rendering inside App.tsx to a sepearte component, e.g. BookList
2) Install react-query and initialize a new QueryClient
3) Replace our useEffect-hook with the the fetch function by react-query
4) Loading & error state should also be retrieved from useQuery hook now