import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Headers from "./Header1";
import Register from "./Register";
import './styles.css';

export default function Login() {

    const [users, setUsers] = useState([]);
  const [newUser, setNewUsers] = useState({});

  function getUsers() {
    fetch("https://609e2a5c33eed80017957ddb.mockapi.io/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }

  useEffect(() => {
    getUsers();
  }, [newUser]);

  return (
    <div>
      {/* <AddUser refreshUsers={getUsers} /> */}
      <AddUser refreshUsers={setNewUsers} />
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <img
            src={user.avatar}
            style={{ height: "100px" }}
            alt="Sometimes profile must be blank"
          />
        </div>
      ))}
    </div>
  );
}

    function AddUser({ refreshUsers }) {
        const validationSchema = Yup.object().shape({
          name: Yup.string()
            .required("Please enter you Username/Email")
            .min(3, "Tell me your full name")
            .max(8, "Keep it short buddy"),
         
          password: Yup.string().min(8, "Please enter you Password"),
        //   confrimPassword: Yup.string().oneOf(
        //     [Yup.ref("password"), null],
        //     "Password must match"
        //   )
        });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    function addUser(data) {
        fetch("https://609e2a5c33eed80017957ddb.mockapi.io/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...data, createdAt: new Date().toISOString() })
        })
          .then((res) => res.json())
          .then((res) => refreshUsers(res));
      }

    const onSubmit = (data) => {
        console.log(data);
        addUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Headers />
           
            <input name ="email"
               
                placeholder="Username/Email" type="email" 
                // ref={register}
            />
            <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
            />
            {errors.password && (
                <span style={{ color: "crimson" }}> {errors.password.message} </span>
            )}

                        
            <input type="submit" value="Log-In" onClick="App"/> <span>
            <input type="button" id="button" value="Sign-Up" onClick="Register()"/> </span>
            {/* <label id="button">Sign-in</label> */}
            {/* </input> */}
        </form>
    );
}