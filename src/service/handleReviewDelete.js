
const handleDeleteReview = async (createdTime) => {
    try {
        const token = localStorage.getItem('jwt');

        return await fetch(`https://cs-gmu-courses.onrender.com/CS/Courses/Review/${encodeURIComponent(createdTime)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting review:', error.message);
    }
};

export default handleDeleteReview;
