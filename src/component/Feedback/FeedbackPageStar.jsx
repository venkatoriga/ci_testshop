import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FeedbackStarStyles.css';
import RatingStars from './RatingStars';
import { closeIcon, skipIcon } from '../../helpers/Icons';

const FeedbackPageStar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const jobIdParam = new URLSearchParams(location.search).get('job_id');


/*   const jobIdParam = '1999999'; */
  
  const [showPopup, setShowPopup] = useState(false);
  const[showPopup2,setShowPopup2] = useState(false);
  const [ratings, setRatings] = useState({
    overallSatisfaction: null,
    serviceQuality: null,
    professionalism: null,
    communication: null,
  });
  const [timelinesSelection, setTimelinesSelection] = useState(null);
  const [problemResolutionSelection, setProblemResolutionSelection] = useState(null);
  const [errors, setErrors] = useState({
    overallSatisfaction: '',
    serviceQuality: '',
    professionalism: '',
    communication: '',
    timelinesSelection: '',
    problemResolutionSelection: '',
  });

  const handleSelection = (type, selection) => {
    if (type === 'problemResolution') {
      setProblemResolutionSelection(selection);
    } else if (type === 'timelines') {
      setTimelinesSelection(selection);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const closePopup2 = () => {
    setShowPopup2(false);
    navigate('/');
  };



  useEffect(() => {
    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted === 'true' && !jobIdParam) {
      navigate('/');
      return;
    }

    const checkFeedbackStatus = async () => {
      if (!jobIdParam) {
        navigate('/');
        return; // Redirect to / if job_id is not present
      }

      try {
        const response = await fetch('https://devextension.origa.market/api/getjobfeedbackstatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job_id: jobIdParam }),
        });

        const data = await response.json();

        if (data.status === 'Success') {
          if (data.job_status === 'submitted') {
            setShowPopup2(true); // Show the popup if feedback is already submitted
          } else if (data.job_status === 'not submitted') {
            navigate(`/servicefeedback?job_id=${jobIdParam}`); // Redirect to /feedbackstars with job_id if feedback is not submitted
          }
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching feedback status:', error);
        alert('An error occurred while checking the feedback status. Please try again later.');
      }
    };

    // Check if jobIdParam is present and handle redirection or feedback status check accordingly
    if (jobIdParam) {
      checkFeedbackStatus();
    } else {
      navigate('/');
    }

    // Manually set localStorage to 'true' after the logic is executed
    localStorage.setItem('formSubmitted', 'true');

  }, [jobIdParam, navigate]);

  const handleSubmit = async () => {
    const newErrors = {
      overallSatisfaction: ratings.overallSatisfaction === null ? 'Overall Satisfaction rating is required.' : '',
      serviceQuality: ratings.serviceQuality === null ? 'Service Quality rating is required.' : '',
      professionalism: ratings.professionalism === null ? 'Professionalism rating is required.' : '',
      communication: ratings.communication === null ? 'Communication rating is required.' : '',
      timelinesSelection: timelinesSelection === null ? 'Timelines selection (Yes/No) is required.' : '',
      problemResolutionSelection: problemResolutionSelection === null ? 'Problem Resolution selection (Yes/No) is required.' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      console.log('Please fill all required fields.');
    } else {
      try {
        const response = await fetch('https://devextension.origa.market/api/savefeedbackrequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_id: jobIdParam, // Use the jobIdParam retrieved from URL query parameter
            feedback: {
              'Overall Satisfaction': ratings.overallSatisfaction,
              'Service Quality': ratings.serviceQuality,
              'Timelines': timelinesSelection,
              'Professionalism': ratings.professionalism,
              'Communication': ratings.communication,
              'Problem Resolution': problemResolutionSelection,
            },
          }),
        });

        if (response.ok) {
          setShowPopup(true);
        } else {
          console.error('Error submitting feedback:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };

  return (
    <>
      <div className="unique-feedback-heading-text ">
        <h1 className="unique-HelpUs">Help Us Improve! Share Your Feedback with Us</h1>
      </div>

      <div className="unique-mt-1">
        <hr className="unique-new5" />
      </div>

      {!showPopup && (
        <div className="unique-firstdivcolumn dv container text-center ">
          <div className="row align-items-center gap-4">
            <div className="col unique-bordered sbffb unique-coled">
              <h4 className="unique-custom-color">Overall Satisfaction</h4>
              <p className="unique-para">
                How are you satisfied with the maintenance service you received?
              </p>
              <div className="unique-ratingsbfx unique-srhhr gap-1 mt-3">
                <RatingStars
                  className="star"
                  ratingstars={ratings.overallSatisfaction}
                  onClick={(rating) =>
                    setRatings({ ...ratings, overallSatisfaction: rating })
                  }
                />
              </div>
              {errors.overallSatisfaction && (
                <p className="unique-error-message mt-4" style={{ color: 'red' }}>
                  {errors.overallSatisfaction}
                </p>
              )}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Service Quality</h4>
              <p className="unique-para">
                How would you rate the quality of the maintenance work performed?
              </p>
              <div className="unique-ratingsbfx gap-1 mt-3 jdb">
                <RatingStars
                  className="star"
                  ratingstars={ratings.serviceQuality}
                  onClick={(rating) =>
                    setRatings({ ...ratings, serviceQuality: rating })
                  }
                />
              </div>
              {errors.serviceQuality && (
                <p className="unique-error-message mt-4" style={{ color: 'red' }}>
                  {errors.serviceQuality}
                </p>
              )}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Timelines</h4>
              <p className="unique-para">
                Was the service completed within the expected timeframe?
              </p>
              <div className="unique-buttons gap-2">
                <button
                  className={`unique-btn12 ${
                    timelinesSelection === 'Yes' ? 'unique-selected' : ''
                  }`}
                  onClick={() => handleSelection('timelines', 'Yes')}
                >
                  Yes
                </button>{' '}
                <button
                  className={`unique-btn22 ${
                    timelinesSelection === 'No' ? 'unique-selected' : ''
                  }`}
                  onClick={() => handleSelection('timelines', 'No')}
                >
                  No
                </button>
              </div>
              {errors.timelinesSelection && (
                <p className="unique-error-message mt-3" style={{ color: 'red' }}>
                  {errors.timelinesSelection}
                </p>
              )}
              <div className="unique-empty"></div>
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="unique-firstdivcolumn container text-center rge ">
          <div className="unique-dkb row align-items-center gap-4">
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Professionalism</h4>
              <p className="unique-para">
                How would you rate the professionalism of our service personnel?
              </p>
              <div className="unique-ratingsbfx gap-1 mt-3">
                <RatingStars
                  className="star"
                  ratingstars={ratings.professionalism}
                  onClick={(rating) =>
                    setRatings({ ...ratings, professionalism: rating })
                  }
                />
              </div>
              {errors.professionalism && (
                <p className="unique-error-message mt-4" style={{ color: 'red' }}>
                  {errors.professionalism}
                </p>
              )}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Communication</h4>
              <p className="unique-para">
                How satisfied are you with the communication throughout the process?
              </p>
              <div className="unique-ratingsbfx gap-1 mt-3">
                <RatingStars
                  className="star"
                  ratingstars={ratings.communication}
                  onClick={(rating) =>
                    setRatings({ ...ratings, communication: rating })
                  }
                />
              </div>
              {errors.communication && (
                <p className="unique-error-message mt-4" style={{ color: 'red' }}>
                  {errors.communication}
                </p>
              )}
            </div>
            <div className="col unique-bordered unique-coled">
              <h4 className="unique-custom-color">Problem Resolution</h4>
              <p className="unique-para">
                Did the service effectively and successfully resolve your issue?
              </p>
              <div className="unique-buttons gap-2 mt-1">
                <button
                  className={`unique-btn12 ${
                    problemResolutionSelection === 'Yes' ? 'unique-selected' : ''
                  }`}
                  onClick={() => handleSelection('problemResolution', 'Yes')}
                >
                  Yes
                </button>{' '}
                <button
                  className={`unique-btn22 ${
                    problemResolutionSelection === 'No' ? 'unique-selected' : ''
                  }`}
                  onClick={() => handleSelection('problemResolution', 'No')}
                >
                  No
                </button>
              </div>
              {errors.problemResolutionSelection && (
                <p className="unique-error-message mt-4" style={{ color: 'red' }}>
                  {errors.problemResolutionSelection}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="unique-btn-container ">
          <button className="unique-submitbtn gap-2 mb-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup-banner">
          <div className="popup-content">
            <h3 className="thanks">
              Thank you for providing your valuable feedback.
            </h3>
            <div className="mobile-icon">
              {skipIcon({ width: 189, height: 189 })}
            </div>
            <h3 className="thanks">
              We appreciate your response and will respond shortly
            </h3>
            <div className="close-popup" onClick={closePopup}>
              {closeIcon({ width: 14, height: 14 })}
            </div>
          </div>
        </div>
      )}

{showPopup2 && (
    
    <div className="popup-overlay">
    <div className="popup-banner">
      <div className="popup-content">
        <h3 className="thanks">
          You have already given your valuable feedback.
        </h3>
        <div className="mobile-icon">{skipIcon({ width: 189, height: 189 })}</div>
        <h3 className="thanks">Thanks for your response</h3>
        <div className="close-popup" onClick={closePopup2}>
          {closeIcon({ width: 14, height: 14 })}
        </div>
      </div>
    </div>
  </div>
      )}
    </>
  );
};

export default FeedbackPageStar;
