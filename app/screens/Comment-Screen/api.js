import { iam_access_id, iam_secret, ip_address } from "../keys";

const API = ip_address+"/newComment";

const API2 = ip_address+"/getComments/data/page=0";

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