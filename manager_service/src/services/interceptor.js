import axios from "axios";

export default class Interceptor {
  intercept() {
    axios.interceptors.request.use(
      function (config) {
        // const loggedIn = token.isTokenLogged();
        const loggedIn =
          localStorage.getItem("token") !== ""
            ? localStorage.getItem("token")
            : "";
        if (loggedIn) {
          config.headers = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          };
          config.headers.Authorization = `Bearer ${loggedIn}`;
          console.log(config);
          return config;
        } else {
          console.log("There is no token yet...");
          return config;
        }
      },
      function (err) {
        return Promise.reject(err);
      }
    );
  }

  interceptResponse() {
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log("Capture Response >>>> ", error.response.status)
        // if (error?.response?.status === 401) {
        //   token.logout();
        //   location.reload();
        // }

        return Promise.reject(error);
      }
    );
  }
}
