import api from './Api';

const getAvgDifficulty = async (courseNumber) => {
    return api.get(`https://cs-gmu-courses.onrender.com/CS/Courses/${courseNumber}/avgdifficulty`)
    .then(response => response.data)
    .catch(error => {
        console.log('Error getting average difficulty', error);
        return 0;
    });
};

export default getAvgDifficulty;