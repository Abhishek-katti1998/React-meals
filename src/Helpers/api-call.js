export const apiCall = async () => {
  const promise = await fetch(
    "https://react-http-3d0d9-default-rtdb.firebaseio.com/users.json"
  );
  console.log("SENDING.............");
  const res = await promise.json();
  return res;
};
export const compare = (data, emailId) => {
  return Object.values(data).filter((data) => data.email === emailId);
};
