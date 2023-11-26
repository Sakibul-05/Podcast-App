import React, { memo } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.gradient}></div>
      <div className={styles.links}>
        <NavLink
          to="/"
          style={({ isActive }) => ({ color: isActive ? "var(--white)" : "" })}
        >
          Signup
        </NavLink>
        <NavLink
          to="/podcasts"
          style={({ isActive }) => ({ color: isActive ? "var(--white)" : "" })}
        >
          Podcasts
        </NavLink>
        <NavLink
          to="/create-podcast"
          style={({ isActive }) => ({ color: isActive ? "var(--white)" : "" })}
        >
          Create Podcast
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({ color: isActive ? "var(--white)" : "" })}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Navbar);
