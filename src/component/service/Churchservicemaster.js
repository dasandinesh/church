import React from "react";
import '../service/Churchservice.css'; // Import the CSS file

const ChurchServiceMaster = () => {
  return (
    <div className="church-services main">
      <div>
        <h4 className="main3"> ஆராதனை ஒழுங்குகள்</h4>
      </div>
      <h5 >காலை ஆராதனை:-</h5>
      <h6 className="main2">தினமும் காலை 5:30 மணிக்குஆராதனைநடைபெறும்.</h6>
  
      <br />
      <h5 >மாலை ஆராதனைகள்:-</h5>
     
            <h6 className="main2">தினமும் மாலை 7:00 மணிக்கு பின்வரும் முறைகளில் சிறப்பு ஆராதனையாக நடைபெறும்.</h6> 
      <br/>
      <hr/>
      {/* <hr/> */}
     <div  className="table-responsive">
        {/* <center><h3>Reguler day servies</h3></center> */}
        <table>
            {/* <tr><th>Day</th>  <th>Service</th> </tr> */}
            <tr><td>ஞாயிறு:-</td> <td>ஞாயிறு பாடசாலை சிறப்பு ஆராதனை</td></tr>
            <tr><td>திங்கள்</td> <td>மாலை ஆராதனை</td></tr><tr>
              <td>செய்வாய்</td> <td>மிஷ்னெரிகளுக்கான ஜெப ஆராதனை</td></tr>
              <tr><td>புதன்</td> <td>சுகமளிக்கும் ஆராதனை </td></tr>
              <tr><td>வியாழன்</td> <td>பெண்கள் ஐக்கியதினர் சிறப்புஆராதனை </td></tr>
            <tr><td>வெள்ளி</td> <td>ஆண்கள் ஐக்கியதினர் சிறப்புஆராதனை</td></tr>
            <tr><td>சனி</td> <td>வாலிபர்கள் ஐக்கியதினர் சிறப்புஆராதனை</td></tr>   
                </table> </div>
                <br></br>
                <div>
                <h5 >ஞாயிறு ஆராதனைகள்:-</h5>
                <h6 className="main2">
                   ஒவ்வொரு ஞாயிறு காலை 9:00 மணிக்குஆராதனைநடைபெறும்..
                </h6>
                <br/>
                <hr/>
                <div  className="table-responsive">
                <table>
                <br></br>
                <tr><td> இரண்டாம் ஞாயிறு</td> <td>பரிசுத்த திருவிருந்து ஆராதனை</td></tr>
            <tr><td> நான்காம்ஞாயிறு</td> <td>தூதி ஆராதனை</td></tr><tr></tr>
            </table>
            </div>
                </div>
    </div>
    
  );
};

export default ChurchServiceMaster;
