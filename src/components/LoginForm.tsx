import { useForm } from "react-hook-form";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ mode: "onBlur" });

  const onSubmit = async (data: LoginData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Login:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Daxil ol</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email daxil edin",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Düzgün email deyil",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Şifrə"
        {...register("password", {
          required: "Şifrə daxil edin",
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <label>
        <input type="checkbox" {...register("rememberMe")} />
        Yadda saxla
      </label>

      <button disabled={isSubmitting}>
        {isSubmitting ? "..." : "Daxil ol"}
      </button>
    </form>
  );
}

