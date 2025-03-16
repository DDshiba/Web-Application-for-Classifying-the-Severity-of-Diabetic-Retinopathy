import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Nav from "./component/Nav/Nav";
import Home from "./layout/Home";
import Steps from "./layout/Steps";
import MoreInfo from "./layout/MoreInfo";
import Process from "./layout/Process"; 
import ScrollToTop from "./component/ScrollToTop/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/more-info" element={<MoreInfo />} />
        <Route path="/process" element={<Process />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
