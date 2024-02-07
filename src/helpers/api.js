import axios from "axios";

const API = axios.create({
  baseURL: "https://1f328971-2821-46b6-8f6e-5dce9a6927dd-00-2k4jv0hbdp7da.worf.repl.co",
});

export const executeCode = async (sourceCode) => {
    const response = await API.post("/eval", {
      "code": sourceCode,
      "sessionId": "aab9f3dsabasadd-746sad5-4319-820b-555b2e15433d"
    });

    return response
};
