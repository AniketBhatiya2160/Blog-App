
import { Post } from "./components/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import DetailPage from "./components/DetailPage";
const App = () => {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
