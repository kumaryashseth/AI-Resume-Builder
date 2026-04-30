

export const isLoggedIn = () => {
  const data = localStorage.getItem("auth");
  
  return data ? true : false;
};


export const getUser = () => {
const data=localStorage.getItem("auth");

  return data ? JSON.parse(data).user : null;
};

export const getToken = () => {
  const data = localStorage.getItem("auth");
  
  return data ? JSON.parse(data).token : null;
};