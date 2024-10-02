import React from "react";
import { NuevaDivision } from "./division-new-division";

export const ActionButtons = () => {
  return (
    <div className="relative flex w-full items-center justify-between space-y-3 md:flex-row md:justify-end">
      <NuevaDivision />
    </div>
  );
};
