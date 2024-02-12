"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/contents/Url";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, Setusernmae] = useState("");
  const [password, Setpassword] = useState("");

  return (
    <div className="min-w-2/4   bg-white border border-gray-200 rounded-lg flex flex-wrap shadow items-center justify-center  p-12 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-5  ">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@gmail.com"
            required
            onChange={(e) => {
              Setusernmae(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            id="password"
            placeholder="••••••••"
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          onClick={() => {
            submitData();
          }}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a
            href="/signup/"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </a>
        </div>
      </form>
    </div>
  );

  async function submitData() {
    const res = await axios.post(BACKEND_URL + "/api/login", {
      username: username,
      password: password,
    });
    if (res.status !== 200) {
      console.log("error");
    } else {
      const { _id, CustomerID: id } = res.data[0];
      localStorage.setItem("CustomerID", id);
      router.push("/shop/");
    }
  }
}