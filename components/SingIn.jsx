"use client";
import { authContext } from "@/context/UserCredential";
import { showTost } from "@utils/tost";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import github_logo from "../public/github.svg";
import google_logo from "../public/google.svg";
import Tost from "./Tost";

const SingIn = () => {
  // email and password state
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();

  // resume context method via contextAPI
  const {
    sinInWithEmail,
    createUserWithGoogleAuthProvider,
    createUserWithGithubAuthProvider,
  } = useContext(authContext);

  //handel email on Blur
  const handelEmailOnBlur = (e) => {
    setUserEmail(e.target.value);
  };

  // handel password on change
  const handelPasswordOnChange = (e) => {
    setUserPassword(e.target.value);
    console.log(e.target.value);
  };

  //handel from submit
  const handelFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // create user with email and password
    sinInWithEmail(userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        form.reset();
        showTost();
      })
      .catch((error) => console.log(error));
  };

  // handel google auth provider
  const handelGoogleAuthProvider = () => {
    createUserWithGoogleAuthProvider()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        showTost();
      })
      .catch((error) => console.log(error));
  };

  // handel github auth provider
  const handelGithubAuthProvider = () => {
    createUserWithGithubAuthProvider()
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        showTost("Login Successful");
      })
      .catch((error) => console.log(error));
  };

  const handelPasswordShow = () => {
    const passwordfill = document.getElementById("singin_password");
    passwordfill.setAttribute("type", "text");
  };
  const handelPasswordHide = () => {
    const passwordfill = document.getElementById("singin_password");
    passwordfill.setAttribute("type", "password");
  };

  return (
    <>
      <div className="flex h-screen items-center">
        <div className="container">
          <section className="relative w-full flex flex-wrap lg:h-[80vh] lg:items-center">
            <div className="flex flex-col item-center lg:items-start w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 ">
              <div>
                <div className="max-w-xl text-start">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Get started today!
                  </h1>

                  <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    libero nulla eaque error neque ipsa culpa autem, at itaque
                    nostrum!
                  </p>
                </div>
                <div className="mt-8 flex justify-between md:max-w-sm md:mx-auto space-x-1 ">
                  <button
                    className="btn md:w-[150px] xl:w-[200px] capitalize"
                    onClick={() => handelGoogleAuthProvider()}
                  >
                    <Image
                      src={google_logo}
                      weidth={24}
                      height={24}
                      alt="google logo"
                    />
                    Google
                  </button>

                  <button
                    className="btn md:w-[150px] xl:w-[200px] capitalize"
                    onClick={() => handelGithubAuthProvider()}
                  >
                    <Image
                      src={github_logo}
                      weidth={24}
                      height={24}
                      alt="google logo"
                    />
                    GitHub
                  </button>
                </div>
                <form
                  action=""
                  className=" mb-0 mt-5 w-full space-y-4"
                  onSubmit={() => handelFormSubmit(event)}
                >
                  <div className="divider">OR</div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>

                    <div className="relative">
                      <input
                        onBlur={() => handelEmailOnBlur(event)}
                        name="email"
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                      />

                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        onChange={() => handelPasswordOnChange(event)}
                        type="password"
                        autocomplete="current-password"
                        id="singin_password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                      />

                      <span
                        onMouseDown={() => handelPasswordShow()}
                        onMouseUp={() => handelPasswordHide()}
                        className="absolute inset-y-0 end-0 grid place-content-center px-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      No account?
                      <Link className="underline" href="/register">
                        Sign up
                      </Link>
                    </p>

                    <button
                      type="submit"
                      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
              <img
                alt="Welcome"
                src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </section>
        </div>
      </div>
      <Tost />
    </>
  );
};

export default SingIn;
