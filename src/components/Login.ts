import React, { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function submit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (res.data === "exist") {
        history("/home", { state: { id: email } });
      } else if (res.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <p className="header">Login account to see more</p>
        <form onSubmit={submit}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Email"
            className="detail"
          />
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name="password"
            className="detail"
          />
          <input
            type="submit"
            className="btn int"
            value="Login"
          />
        </form>
        <footer>
          <hr />
          <Link className="links" to="/signup">
            Don't have an account? Sign up
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
