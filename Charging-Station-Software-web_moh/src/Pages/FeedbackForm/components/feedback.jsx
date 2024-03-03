import React, { useState, useEffect, useContext } from "react";
import "./feedback.css";
import { ThemeContext } from "../../../ThemeContext";
import Feedbackemoji from "../../../assets/feedback.json";
import Happy from "../../../assets/happy.json";
import Lottie from "lottie-react";
import Sad from "../../../assets/sad.json";
import Noreaction from "../../../assets/noreaction.json";
import Angry from "../../../assets/angry2.json";
import url from "../../../services/url";
import APi from "../../../services/APi's";
import axios from "axios";
import Loader from "../../loader/loader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import Unauthenticated from "./unauthenticated";
import Aimmotors from "../../../assets/aimmotors.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { handleClear } from "../../../components/localStorageUtils/localStorageUtils"; // Update the path based on the actual file location

const Feedback = () => {
  const [isFeedback, setIsFeedback] = useState(true);
  const [complaint, setComplaint] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // Initialize selectedEmoji state
  const [message_1, setmessage_1] = useState(null);
  const [message_2, setmessage_2] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [authenticate, setAuthenticate] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(15); // Set the initial countdown value
  const decrementCountdown = () => {
    setRedirectCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      decrementCountdown();
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const navigate = useNavigate();
  const animations = [
    { id: 0, animationData: Happy, label: "Happy  " },
    { id: 1, animationData: Noreaction, label: "No Reaction" },
    { id: 2, animationData: Sad, label: "Sad" },
    { id: 3, animationData: Angry, label: "Angry" },
    // Add more animations as needed
  ];

  const onChangeResponse = async (emoji) => {
    setLoading(true); // Start loading before the API call
    setSelectedEmoji(emoji);

    setTimeout(async () => {
      try {
        const response = await submitFeedback(emoji);
        const { msg, message } = response.data;
        setmessage_1(msg);
        setmessage_2(message);
        setIsFeedback(false);
        handleClear();
        setTimeout(async () => {
          navigate("/battery");
        }, 11000);
      } catch (error) {
        console.error(error);
        setAuthenticate(true);
        console.log(authenticate);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    }, 3000); // 5000 milliseconds (5 seconds)
  };

  const submitFeedback = async (emoji) => {
    const access_token = localStorage.getItem("access_token");
    const swap_card = localStorage.getItem("swap_card_id");
    const feedbackData = {
      status: emoji.label,
      swap_card_Id: swap_card,
    };

    return axios.post(url.url + APi.APi_5, feedbackData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const originPage = () => (
    <Dialog open={open} onClose={() => { }} fullWidth maxWidth="md" >
        <DialogContent style={{ padding: '20px', overflowY: 'hidden' }}>
          <div style={{
            textAlign: 'center'
          }}>

            {/* <button className="myComplaint" onClick={() => setComplaint(true)}>
        Click here for Complaint
      </button> */}

            <div className="emojis-container" >
              <img src={Aimmotors} style={{ width: "200px", height: "200px" }}></img>
              <h1 style={{
                marginTop: "5px",
              }}> AIM-motors</h1>
              <h2>
                <div
                  style={{
                    fontFamily: "cursive",
                    fontSize: "2.5rem",
                    textAlign: "center",
                    padding: "0px",
                    marginBottom: "15px",
                    color: "#4682B4",
                  }}
                >
                  We value your feedback
                </div>
                Dear Customer
                <br />
                <br />
                Thank you For Visiting Us
              </h2>
              <h3>How was your overall experience?</h3>

              <ul className="emoji-container" >
                {animations.map((animation) => (
                  <li key={animation.id} className="list-container">
                    <button
                      type="button"
                      onClick={() => onChangeResponse(animation)} // Pass the selected emoji to the function
                      className="button"
                    >
                      <p style={{ color: "#000000" }}> {animation.label}</p>
                      <Lottie
                        animationData={animation.animationData}
                        alt={animation.name}
                        className="img"
                        // style={{ height: "103px", width: "100px" }}
                        loop={false}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );

  const Complaint = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [issues, setIssues] = useState([]);
    const [improvement, setImprovement] = useState("");

    const handleIssueChange = (event) => {
      const value = event.target.value;
      if (issues.includes(value)) {
        setIssues(issues.filter((issue) => issue !== value));
      } else {
        setIssues([...issues, value]);
      }
    };

    const handleSubmit = (e) => {
      const access_token = localStorage.getItem("access_token");
      e.preventDefault();
      const Values = {
        phoneNumber: phoneNumber,
        issues: issues,
        improvement: improvement,
      };
      console.log(Values);

      return axios.post(url.url + APi.APi_6, Values, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    };

    return (
      <div>
        <button
          variant="contained"
          color="primary"
          onClick={() => setComplaint(false)}
          className="myFeedback"
        >
          Click here for feedback
        </button>
        <div className="emojis-container">
          <img src={Aimmotors} style={{ width: "200px", height: "200px" }} />
          <h1> AIM-motors</h1>
          <header></header>
          <h2>
            <div
              style={{
                fontFamily: "cursive",
                fontSize: "2.2rem",
                textAlign: "center",
                padding: "0px",
                marginBottom: "15px",
                color: "#4682B4",
              }}
            >
              Please tell us about the problem you faced
            </div>
          </h2>
          <form
            style={{ textAlign: "left", marginLeft: "2px", marginRight: "2px" }}
          >
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <p style={{ textAlign: "left", fontWeight: "bold" }}>
              What was the issue you faced?
            </p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={issues.includes("Staff Service")}
                  onChange={handleIssueChange}
                  value="Staff Service"
                />
              }
              label="Staff Service"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={issues.includes("Product Quality")}
                  onChange={handleIssueChange}
                  value="Product Quality"
                />
              }
              label="Product Quality"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={issues.includes("Product Authenticity")}
                  onChange={handleIssueChange}
                  value="Product Authenticity"
                />
              }
              label="Product Authenticity"
            />

            <p style={{ textAlign: "left", fontWeight: "bold" }}>
              Tell us how we can improve:
            </p>
            <TextField
              id="improvement"
              variant="outlined"
              multiline
              rows={4}
              label="Tell us how we can improve"
              fullWidth
              type="text"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  };

  const feedBackPage = () => (
    <Dialog open={open} onClose={() => { }} fullWidth maxWidth="md">
        <DialogContent style={{ padding: '20px', overflowX: 'hidden', overflowY: 'hidden' }}>
          <div className="tq-container" >
            <img src={Aimmotors} style={{ width: "200px", height: "200px" }}></img>
            <h1> AIM-motors</h1>
            <Lottie
              animationData={Feedbackemoji}
              style={{ height: "153px", width: "250px" }}
              loop={false}
            />
            <h1>{message_1}</h1>
            <p>{message_2}</p>
            <p>Redirecting to Main Page in {redirectCountdown} seconds</p>
          </div>
        </DialogContent>
      </Dialog>
  );

  return (
    <div className="bg-container">
      <div className="sub-container">
        {loading ? (
          <Loader />
        ) : authenticate ? (
          <Unauthenticated />
        ) : complaint ? (
          <Complaint />
        ) : isFeedback ? (
          originPage()
        ) : (
          feedBackPage()
        )}
      </div>
    </div>
  );
};

export default Feedback;
