import React from "react";

export const SocList = ({ title, href }) => {
  return (
    <>
      <li>
        <a target="_blank" href={href}>
          <img
            src={`https://www.sensata.kz/img/${title}.svg`}
            width={23}
            height={23}
            alt={title}
          />
        </a>
      </li>
    </>
  );
};
