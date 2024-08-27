import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/Api';
import './CourseDetails.css'; // Import your CSS file

const CourseDetail = ({ course, getCourse }) => {
  const [newReview, setNewReview] = useState({
    difficulty: '',
    body: '',
    number: ''
  });

  const handleReviewSubmit = async () => {
    try {
      // Send the new review data to the server
      await api.post(`https://cs-gmu-courses.onrender.com/CS/Courses/Review`, newReview);
      // After submitting the review, fetch the updated course details
      getCourse(course.number);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDeleteReview = async (createdTime) => {
    try {
      // Send the delete request to the server using the createdTime directly
      await api.delete(`https://cs-gmu-courses.onrender.com/CS/Courses/Review/${encodeURIComponent(createdTime)}`);
  
      // After deleting the review, fetch the updated course details
      getCourse(course.number);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="course-detail-container">
      <h2>Course Detail</h2>
      {course && (
        <div className="course-info">
          <h3>{course.name}</h3>
          <p>Course Number: {course.number}</p>
          <p>Course Description: {course.description}</p>

          {/* Display Reviews */}
          <h4>Reviews:</h4>
          {course.review_ids && course.review_ids.length > 0 ? (
            <ul className="review-list">
              {course.review_ids.map((review, index) => (
                <li key={index} className="review-item">
                  <p>Difficulty : {review.difficulty}/10</p>
                  <p>Comment: {review.body}</p>
                  {/* Delete button for each review */}
                  <button className="del-btn" onClick={() => handleDeleteReview(review.created)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this course.</p>
          )}

          {/* Form to add a new review */}
          <h4>Add a Review:</h4>
          <form className="review-form">
          <label>
          <h4>Difficulty:</h4>
              <input type="number"
                value={newReview.difficulty}
                onChange={(e) => setNewReview({ ...newReview, difficulty: e.target.value, number: course.number })}
              />
            </label>
          <h4>Comment:</h4>
            <label>
              <textarea
                className="text-box"
                value={newReview.body}
                onChange={(e) => setNewReview({ ...newReview, body: e.target.value, number: course.number })}
              />
            </label>
            <button 
            className="submit-btn"
            type="button" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </form>

          {/* Link back to the list of courses */}
          <Link to="/course-front-end" className="back-link">
            Back to Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
