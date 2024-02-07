import axios from "axios";

const API = axios.create({
  baseURL: "https://1f328971-2821-46b6-8f6e-5dce9a6927dd-00-2k4jv0hbdp7da.worf.repl.co",
});

export const executeCode = async (sourceCode) => {
  try {
    const response = await API.post("/eval", {
      "code": "var alice = { name: 'Alice', follows: [] };\nvar bob = { name: 'Bob', follows: [alice] };\nalice.follows.push(bob); alice;",
      "sessionId": "aab9f3ba-7465-4319-820b-555b2e15433d"
    });

    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
};

executeCode("abc")