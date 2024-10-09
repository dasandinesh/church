import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemberAdd from "./component/member/MemberAdd";
import MemberList from "./component/member/MemberList";
import Home from "./component/Home";
import Navbar from "./component/Navbar/Navbar";
import FamilyAdd from "./component/family/FamilyAdd";
import FamilyList from "./component/family/FamilyList";
import Magazinemaster from "./component/Magazine/Magazinemaster";
import Getallmagazine from "./component/Magazine/Getallmagazine";
import Schedule from "./component/Shedule/Shedule";
import Header from "./component/header";
import Churchservicemaster from "./component/service/Churchservicemaster";
function App() {
  return (
    <div className="App">
     <Header />
      <Navbar />
      <br />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MemberList" element={<MemberList />} />
          <Route path="/MemberAdd" element={<MemberAdd />} />
          <Route path="/FamilyAdd" element={<FamilyAdd />} />
          <Route path="/FamilyList" element={<FamilyList />} />
          <Route path="/Magazinemaster" element={<Magazinemaster />} />
          <Route path="/Magazine" element={<Getallmagazine />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Churchservicemaster" element={<Churchservicemaster />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
