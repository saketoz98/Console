import React, { useState } from "react";
import ConsoleElement from "../ConsoleElement/ConsoleElement";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import ConsoleOutput from "../ConsoleOutput/ConsoleOutput";
import { getConsoleOutputDetailsComponent } from "../../helpers/utils";
import { OUTPUT_FAILED, OUTPUT_SUCCESS } from "../../constants/enums";
import ConsoleError from "../ConsoleError/ConsoleError";

const ConsoleElementWrapper = ({ element }) => {
  const { id, output } = element;
  const [isMultilineInput, setIsMultilineInput] = useState(false)

  const toggleMultilineInput = () => {
    setIsMultilineInput(!isMultilineInput)
  }

  let detailsComponent=null;
  if(output && output.status === OUTPUT_FAILED){
    detailsComponent = <ConsoleError error={output.errors} />
  }else if(output && output.status === OUTPUT_SUCCESS){
    detailsComponent = getConsoleOutputDetailsComponent(output.output) 
  }

  return (
    <div>
      <ConsoleElement
        isExpandIconVisible={false}
        summaryComponent={<ConsoleInput inputId={id} isMultilineInput={isMultilineInput} toggleMultilineInput={toggleMultilineInput}/>}
      />
      {output != null ? (
        <ConsoleElement
          isExpandIconVisible={true}
          summaryComponent={<ConsoleOutput status={output.status} result={output.output} errors={output.errors} />}
          detailsComponent={detailsComponent}
        />
      ) : null}
    </div>
  );
};

export default ConsoleElementWrapper;
