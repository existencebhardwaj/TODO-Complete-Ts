import React, { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Signup.css";
function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function submit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (res.data === "exist") {
        alert("User already exists");
      } else if (res.data === "notexist") {
        history("/home", { state: { id: email } });
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <p className="header">Make account to see more</p>
        <form onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="detail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="detail"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <input
            type="submit"
            className="btn int"
            value="Register Account"
          />
        </form>
        <footer>
          <hr />
          <Link className="links" to="/">
            Already have an account? Login
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
