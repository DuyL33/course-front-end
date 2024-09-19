import api from './Api';

const getCourse = async (courseNumber) => {
    return api.get(`https://cs-gmu-courses.onrender.com/CS/Courses/${courseNumber}`)
        .then(response => response.data)
        .catch(error => {
            console.log('Error fetching course data', error);
            return null;
        });
};

export default getCourse;