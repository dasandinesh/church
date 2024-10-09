import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar.css"; // Make sure this file has the necessary float-right CSS

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" style={{ backgroundColor: "#1995AD" }}>
      <Container>
        <div>
          <center><h3 style={{color:"#ECECEC"}}>St.John's Church</h3></center>
        <center style={{color:"#ECECEC"}}>Alangulam</center>
</div>
        <Navbar.Toggle
          className="custom-toggle"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="/MemberList" className="nav-link">
              Member List
            </Nav.Link>
            <Nav.Link href="/FamilyAdd" className="nav-link">
              Family Add
            </Nav.Link>
            <Nav.Link href="/FamilyList" className="nav-link">
              Family List
            </Nav.Link>
            <Nav.Link href="/Magazine" className="nav-link">
              Magazine
            </Nav.Link>
            <Nav.Link href="/Schedule" className="nav-link">
              Schedule
            </Nav.Link>
            <Nav.Link href="/Churchservicemaster" className="nav-link">
            Churchservice
            </Nav.Link>
          </Nav>
          {/* Right-corner aligned Login button */}
          <Nav className="float-right">
            <Button variant="outline-primary" href="/login" style={{color:"#ECECEC"}}>
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
