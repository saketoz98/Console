import React, { useState } from "react";
import { getShortHandOutput, isArrayType, isObjectType, parseResponse } from "../../helpers/utils";
import { useTheme } from "@emotion/react";

const NestedObjectViewer = ({ data, keyStore }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      {Object.entries(data).map(([key, value]) => {
        return <NestedItem key={key} label={key} value={value} keyStore={keyStore} />;
      })}
    </div>
  );
};

const NestedItem = ({ label, value, keyStore }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme()
  const keyColor = theme.palette.mode === 'light' ? 'blue' : 'cyan';


  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderKey = () => {
    const isObjOrArray = isObjectType(value) || isArrayType(value);
    let keyComponent = null;
    if (isObjOrArray) {
      keyComponent = (
        <span onClick={toggleExpand} style={{cursor: "pointer"}}>
          <span style={{marginRight: "5px"}}><strong>
            {expanded ? "- " : "+ "}
            </strong></span>
          <strong style={{color: keyColor}}>{label}:</strong>
        </span>
      );
    } else {
      keyComponent = <strong style={{color: keyColor}}>{label}:</strong>;
    }
    return keyComponent;
  };

  const renderValue = () => {
    if (isObjectType(value) || isArrayType(value)) {
      if (isObjectType(value) && value.hasOwnProperty("isCircular")) {
        const nextLevelData = parseResponse(value.nodeId, keyStore, new Set([value.nodeId]))
        return expanded ? <NestedObjectViewer data={nextLevelData} keyStore={keyStore}/> : "{...}"
      }
      return expanded ? <NestedObjectViewer data={value} keyStore={keyStore}/> : getShortHandOutput(value);
    } else {
      return <span>{JSON.stringify(value)}</span>;
    }
  };

  return (
    <div>
      {renderKey()}
      {renderValue()}
    </div>
  );
};

export default NestedObjectViewer;
