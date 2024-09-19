import api from './Api';

// Function to get the list of courses
// export const getCourses = async () => {
//     try {
//         const response = await api.get('https://cs-gmu-courses.onrender.com/CS/Courses');
//         console.log(response.data);
//         setCourses(response.data);
//     } catch (err) {
//         console.log(err);
//     }
// };


const getCourses = async () => {
    return api.get('https://cs-gmu-courses.onrender.com/CS/Courses')
        .then(response => response.data)
        .catch(error => {
            console.log('Error fetching course data', error);
            return null;
        });
};

export default getCourses;

