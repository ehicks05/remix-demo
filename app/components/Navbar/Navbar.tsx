import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "~/contexts/UserContext";
import authFetch from "~/utils/authFetch";
import Container from "../Container";
import T from "../T";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function logout() {
    authFetch("/logout", undefined, false).then(() => {
      setUser(undefined);
      navigate("/");
    });
  }

  const links = [
    {
      label: "My Account",
      render: !!user,
      to: "/my-account",
    },
    {
      label: "Create a Recipe",
      render: !!user,
      to: "/create-recipe",
    },
    {
      label: "Log in",
      render: !user,
      to: "/login",
    },
    {
      label: "Log out",
      render: !!user,
      onClick: logout,
    },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/">
            <img className="h-8" src="/logo.png" alt="logo" />
          </Link>

          <div
            role="button"
            tabIndex={0}
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>

          <div className="flex gap-4">
            {links
              .filter((link) => link.render)
              .map((link) => (
                <Link to={link.to || ""} onClick={link.onClick}>
                  <T>{link.label}</T>
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
