import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import React from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };
 
  const [input, setInput] = React.useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!input.email || !input.password || !input.displayName) 
    return toast.error("Please fill all the fields", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });;
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(input.email, input.password);
      if(!newUser) return;
      router.push("/");
      
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 py-6" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Signup to Leet Clone</h3>
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
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-lg font-medium mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus: ring-blue-700
                    focus:border-blue-700 block w-full p-2.5 bg-gray-600
                    border-gray-500 placeholder-gray-400 text-white"
          placeholder="John Doe"
          onChange={handleChangeInput}
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
          onChange={handleChangeInput}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-700 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange
            hover:bg-brand-orange-s"
            
      >
        {loading ? "Registering..." : "Signup"}
      </button>
      <div className="text-sm font-medium text-gray-500">
        Already Resgistered?
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          {" "}
          Login
        </a>
      </div>
    </form>
  );
};
export default Signup;
