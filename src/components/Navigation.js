import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

export const Navigation = () => {
  const { id } = useParams();
  const location = useLocation();

  return (
    <nav className="navigation">
      <NavLink
        to={`/users/${id}/posts`}
        className={`
          navigation__item 
          ${!location.pathname.includes("albums") ? "active" : ""}`
        }
      >
        Posts
      </NavLink>

      <NavLink
        to={`/users/${id}/albums`}
        className={`
          navigation__item 
          ${location.pathname.includes("albums") ? "active" : ""}`
        }
      >
        Albums
      </NavLink>
    </nav>
  );

};