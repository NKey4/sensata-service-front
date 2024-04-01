import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddAddress, selectIsAuth } from "../../redux/slices/auth";

export const Appeals = () => {
  const appeals = useSelector((state) => state.auth.data?.appeals);
  return <div>index</div>;
};
