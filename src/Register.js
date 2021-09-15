import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Headers from "./Headers";
import './styles.css';

export default function Register() {

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
            .required("Name is awesome why leave it blank!?")
            .min(3, "Tell me your full name")
            .max(8, "Keep it short buddy"),
          
          password: Yup.string().min(8, "Password at least 8 chars"),
          confrimPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match"
          )
        });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    function addUser(data) {
        fetch("https://609e2a5c33eed80017957ddb.mockapi.io/users", {
          method: "POST",
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

            <input
                {...register("firstName", { required: true, minLength: 3 })}
                placeholder="First name"
            />
            {errors.firstName && errors.firstName.type === "required" && (
                <span> First Name is required </span>
            )}
            {errors.firstName && errors.firstName.type === "minLength" && (
                <span> First Name min 3 chars must be given </span>
            )}
            <input
                {...register("lastName", {
                    minLength: {
                        value: 4,
                        message: "Last Name min 4 chars must be given"
                    },
                    maxLength: {
                        value: 15,
                        message: "Last name max 10 chars must be given"
                    }
                })}
                placeholder="Last name"
            />
            {errors.email && <span> {errors.email.message} </span>}
            <input name ="email"
                // {...register("email", {
                //     minLength: {
                //         value: 4,
                //         message: "Last Name min 4 chars must be given"
                //     },
                //     maxLength: {
                //         value: 15,
                //         message: "Last name max 10 chars must be given"
                //     }
                // })}
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

            <input
                {...register("confrimPassword")}
                type="password"
                placeholder="Confirm password"
            />
            {errors.confrimPassword && (
                <span style={{ color: "crimson" }}>
                    {errors.confrimPassword.message}
                </span>
            )}

            
            <input type="submit" value="Register" />
        </form>
    );
}


