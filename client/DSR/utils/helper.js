export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@vit\.edu\.in$/;
    return regex.test(email); 
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()_+\[\]{};':"\\|,.<>/?]).{8,}$/;
    return passwordRegex.test(password);
  };