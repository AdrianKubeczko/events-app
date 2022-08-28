import React from "react";
import modulesMap from "../../util/modulesMap.js";
import moduleDescriptions from "../../descriptions/modules/index.js";

const RenderModules = ({ modules }) => {
  return modules.map((moduleId) => {
    const { moduleType, ...props } = moduleDescriptions[moduleId];
    const Module = modulesMap[moduleType];
    return <Module key={moduleId} {...props} />;
  });
};

export default RenderModules;
