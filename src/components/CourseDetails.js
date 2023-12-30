import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/Api'; // Adjust this import based on your API service

const CourseDetail = ({ course, getCourse }) => {
  const [newReview, setNewReview] = useState({
    body: '',
    number: ''
  });

  const handleReviewSubmit = async () => {
    try {
      // Send the new review data to the server
      await api.post(`http://localhost:8080/CS/Courses/Review`, newReview);
        console.log(newReview);
      // After submitting the review, fetch the updated course details
      getCourse(course.number);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2>Course Detail</h2>
      {course && (
        <div>
          <h3>{course.name}</h3>
          <p>Course Number: {course.number}</p>
          <p>Course Description: {course.description}</p>

          {/* Display Reviews */}
          <h4>Reviews:</h4>
          {course.review_ids && course.review_ids.length > 0 ? (
            <ul>
              {course.review_ids.map((review, index) => (
                <li key={index}>
                  <p>Comment: {review.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this course.</p>
          )}

          {/* Form to add a new review */}
          <h4>Add a Review:</h4>
          <form>
            <label>
              Comment:
              <textarea
                value={newReview.body}
                onChange={(e) => setNewReview({ ...newReview, body: e.target.value, number: course.number })}
              />
            </label>
            <button type="button" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </form>

          {/* Link back to the list of courses */}
          <Link to="/">Back to Courses</Link>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
