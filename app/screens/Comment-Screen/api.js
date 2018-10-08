const API = "http://192.168.201.56:5000/newComment";

const API2 = "http://192.168.201.56:5000/getComments/data/page=0";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest"
};

export const get = async uri =>
  await fetch(`${API2}`, {
    method: "GET",
    headers
  });

export const put = async body =>
  await fetch(`${API}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });