import axios from "axios";

// TODO @SONIA

export const ajax = (url, data = {}, method = "GET", upload = false) => {
  let result;
  return new Promise((resolve, reject) => {
    if (method === "GET") {
      result = axios.get(url, { params: data });
    } else if (method === "POST") {
      result = axios.post(url, data, {
        headers: upload && { 'Content-Type': 'multipart/form-data' }
      });
    } else if (method === "PUT") {
      result = axios.put(url, data);
    }
    // result.then(res => resolve(res.data)).catch(err => alert(err));
    result.then(res => { resolve(res); }).catch(err => { reject(err) });

  });
};
