import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";

import { useRouter } from "next/router";

import InputGroup from "../components/InputGroup";
import { error } from "console";
import { Router } from "express";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        { withCredentials: true }
      );

      router.push("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover "
        style={{ backgroundImage: "url('/images/woman-flower.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6 w-70">
        <h1 className="w-full mb-2 text-lg font-medium">Login</h1>
        <p className="w-full mb-5 text-xs">
          By continuing, you agree to our{" "}
          <a className="text-blue-600">User Agreement</a> and{" "}
          <a className="text-blue-600">Privacy Policy</a>.
        </p>
        <form onSubmit={submitForm}>
          <InputGroup
            className="mb-2"
            value={username}
            setValue={setUsername}
            placeholder="Username"
            error={errors.username}
            type="text"
          />
          <InputGroup
            className="mb-4"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            error={errors.password}
            type="password"
          />
          <button className="w-full p-2 mb-4 text-xs text-center text-white uppercase bg-blue-600 border-blue-700 rounded">
            Log In
          </button>
        </form>
        <small>
          New User?
          <Link href="register">
            <a className="ml-1 text-blue-500 uppercase">Sign Up</a>
          </Link>
        </small>
      </div>
    </div>
  );
}
