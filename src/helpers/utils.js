import NestedObjectViewer from "../component/NestedObjectViewer/NestedObjectViewer";

export const isObjectType = (value) => {
  return value !== null && typeof value === "object";
};

export const isArrayType = (value) => {
  return value !== null && Array.isArray(value);
};

export const getShortHandOutput = (value) => {
  if (isArrayType(value)) {
    return " [...]";
  } else if (isObjectType(value)) {
    return " {...}";
  }
  return value;
};

export const getShortHandResult = (value) => {
  const { data } = processExecutionResult(value);

  if (isArrayType(data)) {
    return " [...]";
  } else if (isObjectType(data)) {
    return " {...}";
  }else if(data === null || data === undefined){
    return data
  }
  
  return truncateString(data.toString(),20);
};


function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str; 
  } else {
    return str.slice(0, maxLength) + `...`;
  }
}

export const getConsoleOutputDetailsComponent = (output) => {
  const parsedOutput = processExecutionResult(output);
  const { data, keyStore } = parsedOutput;

  if (isArrayType(data) || isObjectType(data)) {
    return <NestedObjectViewer data={data} keyStore={keyStore} />;
  }else if(data === null || data === undefined){
    return data
  }
  return <div>{data.toString()}</div>;
};

export const processExecutionResult = (res) => {
  const rootKey = res.root;
  const keyStore = res.serialized;
  const visitedNodes = new Set([rootKey]);
  const data = parseResponse(rootKey, keyStore, visitedNodes);

  return { data, keyStore };
};

export const parseResponse = (key, keyStore, visitedNodes) => {
  const objNode = keyStore[key];

  if (objNode.type === "object") {
    const tmpObj = {};
    for (const { key, value } of objNode.value) {
      const keyNode = keyStore[key];
      const valNode = keyStore[value];
      if (visitedNodes.has(value)) {
        tmpObj[keyNode.value] = { isCircular: true, nodeId: value };
      } else {
        if (valNode.type === "object") {
          visitedNodes.add(value);
        }
        tmpObj[keyNode.value] = parseResponse(value, keyStore, visitedNodes);
      }
    }
    return tmpObj;
  } else if (objNode.type === "array") {
    const arr = [];
    for (const value of objNode.value) {
      const valNode = keyStore[value];
      if (visitedNodes.has(value)) {
        arr.push({ isCircular: true, nodeId: value });
      } else {
        if (valNode.type === "object") {
          visitedNodes.add(value);
        }
        arr.push(parseResponse(value, keyStore, visitedNodes));
      }
    }
    return arr;
  } else if (objNode.type === "error") {
    return {
      type: "error",
      message: `${objNode.value.name} - ${objNode.value.message}`,
      stack: objNode.value.stack,
    }
  } else if(objNode.type === "null"){
    return null
  } else {
    return objNode.value;
  }
};
