import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiShareForward2Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { closeIcon, skipIcon } from "../../../helpers/Icons";
import './feedbackstyles.css'; // Make sure this path is correct
import StarRating from "./StarRatingFeedback";



const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('job_id');

  const userId = localStorage.getItem('user_id');

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ratings, setRatings] = useState({
    overallSatisfaction: null,
    serviceQuality: null,
    professionalism: null,
    communication: null,
  });
  const [timelinesSelection, setTimelinesSelection] = useState(null);
  const [problemResolutionSelection, setProblemResolutionSelection] = useState(null);
  const [errors, setErrors] = useState({
    overallSatisfaction: "",
    serviceQuality: "",
    professionalism: "",
    communication: "",
    timelinesSelection: "",
    problemResolutionSelection: "",
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleSelection = (type, selection) => {
    if (type === "problemResolution") {
      setProblemResolutionSelection(selection);
    } else if (type === "timelines") {
      setTimelinesSelection(selection);
    }
  };

  useEffect(() => {
    const checkFeedbackStatus = async () => {
      try {
        const response = await fetch(
          "https://devextension.origa.market/api/getjobfeedbackstatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ job_id: jobId, user_id: userId }),
          }
        );

        const data = await response.json();

        if (data.status === "Success") {
          if (data.job_status === "submitted") {
            setShowPopup(true);
          }
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching feedback status:", error);
        alert("An error occurred while checking the feedback status. Please try again later.");
      }
    };

    if (userId && jobId) {
      checkFeedbackStatus();
    }
  }, [userId, jobId]);



  const handleSubmit = async () => {
    const newErrors = {
      overallSatisfaction: ratings.overallSatisfaction === null ? "Overall Satisfaction rating is required." : "",
      serviceQuality: ratings.serviceQuality === null ? "Service Quality rating is required." : "",
      professionalism: ratings.professionalism === null ? "Professionalism rating is required." : "",
      communication: ratings.communication === null ? "Communication rating is required." : "",
      timelinesSelection: timelinesSelection === null ? "Timelines selection (Yes/No) is required." : "",
      problemResolutionSelection: problemResolutionSelection === null ? "Problem Resolution selection (Yes/No) is required." : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      console.log("Please fill all required fields.");
    } else {
      try {
        const response = await fetch('https://devextension.origa.market/api/savefeedbackrequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_id: jobId,
            user_id: userId,
            feedback: {
              "Overall Satisfaction": ratings.overallSatisfaction,
              "Service Quality": ratings.serviceQuality,
              "Timelines": timelinesSelection,
              "Professionalism": ratings.professionalism,
              "Communication": ratings.communication,
              "Problem Resolution": problemResolutionSelection,
            },
          }),
        });

        if (response.ok) {
          setShowPopup(true);
        } else {
          console.error("Error submitting feedback:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

   // Redirect to home if redirectToHome is true
   if (redirectToHome) {
    navigate('/');
  }

  return (
    <>
      <div className="totalpage">
        <div className="unique-feedback-heading-text mt-5">
          <h1 className="unique-HelpUs">Help Us Improve! Share Your Feedback with Us</h1>
        </div>

        <div className="unique-mt-3">
  <hr className="unique-new5" />
</div>


          {!showPopup && (
        <div className="unique-firstdivcolumn dv container text-center mt-5">
          <div className="row align-items-center gap-4">
            <div className="col unique-bordered sbffb unique-coled">
              <h4 className="unique-custom-color">Overall Satisfaction</h4>
              <p className="unique-para">How are you satisfied with the maintenance service you received?</p>
              <div className="unique-ratingsbfx unique-srhhr gap-1 mt-3">
              <StarRating
               className="star"
               ratingstars={ratings.overallSatisfaction}
                onClick={(rating) => setRatings({ ...ratings, overallSatisfaction: rating })}
              />
              </div>
              {errors.overallSatisfaction && <p className="unique-error-message mt-4" style={{ color: "red" }}>{errors.overallSatisfaction}</p>}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Service Quality</h4>
              <p className="unique-para">How would you rate the quality of the maintenance work performed?</p>
              <div className="unique-ratingsbfx gap-1 mt-3 jdb">
              <StarRating
              className="star"
              ratingstars={ratings.serviceQuality}
                onClick={(rating) => setRatings({ ...ratings, serviceQuality: rating })}
              />
              </div>
              {errors.serviceQuality && <p className="unique-error-message mt-4" style={{ color: "red" }}>{errors.serviceQuality}</p>}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Timelines</h4>
              <p className="unique-para">Was the service completed within the expected timeframe?</p>
              <div className="unique-buttons gap-2">
                <button
                  className={`unique-btn12 ${timelinesSelection === "Yes" ? "unique-selected" : ""}`}
                  onClick={() => handleSelection("timelines", "Yes")}
                >
                  Yes
                </button>{" "}
                <button
                  className={`unique-btn22 ${timelinesSelection === "No" ? "unique-selected" : ""}`}
                  onClick={() => handleSelection("timelines", "No")}
                >
                  No
                </button>
              </div>
              {errors.timelinesSelection && <p className="unique-error-message mt-3" style={{ color: "red" }}>{errors.timelinesSelection}</p>}
              <div className="unique-empty"></div>
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="unique-firstdivcolumn container text-center mt-5">
          <div className="unique-dkb row align-items-center gap-4">
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Professionalism</h4>
              <p className="unique-para">How would you rate the professionalism of our service personnel?</p>
              <div className="unique-ratingsbfx gap-1 mt-3">
              <StarRating
               className="star"
               ratingstars={ratings.professionalism}
                onClick={(rating) => setRatings({ ...ratings, professionalism: rating })}
              />
              </div>
              {errors.professionalism && <p className="unique-error-message mt-4" style={{ color: "red" }}>{errors.professionalism}</p>}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Communication</h4>
              <p className="unique-para">How satisfied are you with the communication throughout the service process?</p>
              <div className="unique-ratingsbfx gap-1 mt-3">
              <StarRating
              className="star"
              ratingstars={ratings.communication}
                onClick={(rating) => setRatings({ ...ratings, communication: rating })}
              />
              </div>
              {errors.communication && <p className="unique-error-message mt-4" style={{ color: "red" }}>{errors.communication}</p>}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Problem Resolution</h4>
              <p className="unique-para">Did the service effectively and successfully resolve your issue?</p>
              <div className="unique-buttons gap-2 mt-1">
                <button
                  className={`unique-btn12 ${problemResolutionSelection === "Yes" ? "unique-selected" : ""}`}
                  onClick={() => handleSelection("problemResolution", "Yes")}
                >
                  Yes
                </button>{" "}
                <button
                  className={`unique-btn22 ${problemResolutionSelection === "No" ? "unique-selected" : ""}`}
                  onClick={() => handleSelection("problemResolution", "No")}
                >
                  No
                </button>
              </div>
              {errors.problemResolutionSelection && <p className="unique-error-message mt-4" style={{ color: "red" }}>{errors.problemResolutionSelection}</p>}
            </div>
          </div>
        </div>
      )}
 
          <div className="unique-btn-container mt-3">
            <button className="unique-submitbtn gap-2 mb-3" onClick={handleSubmit}>
             Submit
            </button>
          </div>
        

        {/* Modal */}
        {showPopup && (
          <div className="unique-popup-banner">
            <div className="unique-popup-content">
              <h3 className="unique-thanks">Thank you for providing your valuable feedback.</h3>
              <div className="unique-mobile-icon">{skipIcon({ width: 189, height: 189 })}</div>
              <h3 className="unique-thanks">We appreciate your response and will respond shortly</h3>
              <div className="unique-close-popup" onClick={closePopup}>
                {closeIcon({ width: 14, height: 14 })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackPage;
