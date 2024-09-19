import api from './Api';


const handleReviewSubmit = async (newReview) => {

    try {
        return api.post(`https://cs-gmu-courses.onrender.com/CS/Courses/Review`, newReview);
    } catch (error) {
        console.log('Error submitting course review', error);
        return null;
    }
};

export default handleReviewSubmit;
