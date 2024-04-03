import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookForm from "./pages/BookForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="add" element={<BookForm />} />
          <Route path="update/:id" element={<BookForm />} />
        </Route>
      </Routes>
      ;
    </>
  );
}

export default App;
