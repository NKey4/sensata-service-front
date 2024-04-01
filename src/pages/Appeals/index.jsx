import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppeals } from "../../redux/slices/appeal";

export const Appeals = () => {
  const appeals = useSelector(selectAppeals);
  return <div>index</div>;
};
