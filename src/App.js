import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemberAdd from "./component/member/MemberAdd";
import MemberList from "./component/member/MemberList";
import Home from "./component/Home";
import Navbar from "./component/Navbar/Navbar";
import FamilyAdd from "./component/family/FamilyAdd";
import FamilyList from "./component/family/FamilyList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MemberList" element={<MemberList />} />
          <Route path="/MemberAdd" element={<MemberAdd />} />
          <Route path="/FamilyAdd" element={<FamilyAdd />} />
          <Route path="/FamilyList" element={<FamilyList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
