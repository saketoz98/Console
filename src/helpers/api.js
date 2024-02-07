import axios from "axios";

const API = axios.create({
  baseURL: "https://1f328971-2821-46b6-8f6e-5dce9a6927dd-00-2k4jv0hbdp7da.worf.repl.co",
});

export const executeCode = async (sourceCode) => {
    const response = await API.post("/eval", {
      "code": "alice",
      "sessionId": "aab9f3bad-7465-4319-820b-555b2e15433d"
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
  const visitedNodes = new Set([rootKey])
  const data = parseResponse(rootKey, keyStore, visitedNodes)
  console.table(data)
}

const parseResponse = (key, keyStore, visitedNodes) => {
 
  const objNode = keyStore[key]

  if(objNode.type === "object"){
    const tmpObj = {}
    for(const {key, value} of objNode.value){
      const keyNode = keyStore[key]
      if(visitedNodes.has(value)){
        tmpObj[keyNode.value] = "[Circular Reference]"
      }else{
        visitedNodes.add(value)
        tmpObj[keyNode.value] = parseResponse(value, keyStore, visitedNodes)
      }
    }
    return tmpObj
  }else if(objNode.type === "array"){
    const arr = []
    for(const value of objNode.value){
      if(visitedNodes.has(value)){
        arr.push("[Circular Reference]")
      }
      visitedNodes.add(value)
      arr.push(parseResponse(value, keyStore, visitedNodes))
    }
    return arr
  }else{
    return objNode.value
  }

}

await getExecutionResponseData("abc")