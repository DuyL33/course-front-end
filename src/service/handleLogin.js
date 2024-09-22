

  const handleLogin = async ({username, password}) => {
    try {
      return await fetch('https://cs-gmu-courses.onrender.com/CS/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

    } catch (error) {
      console.log("Error logging in.", error);
    }
  };

export default handleLogin;