import React from "react";

export default function SelectBox() {
  return (
    <select required id="select-job">
      <option value="select" disabled selected>
        선택
      </option>
      <option value="job">직업1</option>
    </select>
  );
}
