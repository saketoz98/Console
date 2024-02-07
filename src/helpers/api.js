import axios from "axios";

const API = axios.create({
  baseURL: "https://1f328971-2821-46b6-8f6e-5dce9a6927dd-00-2k4jv0hbdp7da.worf.repl.co",
});

export const executeCode = async (sourceCode) => {
    const response = await API.post("/eval", {
      "code": "let obj = {a:1, b:[1,2,3], c:{d:1}}; obj",
      "sessionId": "aab9f3b-7465-4319-820b-555b2e15433d"
    });

    return response.data
};

export const getExecutionResponseData = async (code) => {
  try {
    const res = await executeCode("src")
    const data = processExecutionResult(res)
  } catch (error) {
    console.log(error)
  }
}

const processExecutionResult = (res) => {
  const rootKey = res.root
  const keyStore = res.serialized
  const data = parseResponse(rootKey, keyStore)
  console.log(data)
}

const parseResponse = (key, keyStore) => {
  const objNode = keyStore[key]

  if(objNode.type === "object"){
    const tmpObj = {}
    for(const {key, value} of objNode.value){
      const keyNode = keyStore[key]
      tmpObj[keyNode.value] = parseResponse(value, keyStore)
    }
    return tmpObj
  }else if(objNode.type === "array"){
    const arr = []
    for(const value of objNode.value){
      arr.push(parseResponse(value, keyStore))
    }
    return arr
  }else{
    return objNode.value
  }

}

await getExecutionResponseData("abc")