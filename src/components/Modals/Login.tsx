import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [input, setInput] = React.useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password)
      return alert("Please fill all the fields");
    try {
      const newUser = await signInWithEmailAndPassword(
        input.email,
        input.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <form className="space-y-6 px-6 py-6" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Sign In to Leet Clone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-lg font-medium mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus: ring-blue-700
                    focus:border-blue-700 block w-full p-2.5 bg-gray-600
                    border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-lg font-medium mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus: ring-blue-700
                    focus:border-blue-700 block w-full p-2.5 bg-gray-600
                    border-gray-500 placeholder-gray-400 text-white"
          placeholder="******"
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-700 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        Login
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgotPassword")}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-500">
        Not Resgistered?
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          {" "}
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
