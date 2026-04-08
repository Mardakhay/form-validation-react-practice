import { useForm } from "react-hook-form";
import FormField from "./FormField";

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
    console.log("✅ Login:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Daxil ol</h2>

      <FormField label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register("email", {
            required: "Email daxil edin",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Düzgün email deyil",
            },
          })}
        />
      </FormField>

      <FormField label="Şifrə" error={errors.password?.message}>
        <input
          type="password"
          {...register("password", {
            required: "Şifrə daxil edin",
          })}
        />
      </FormField>

      <label>
        <input type="checkbox" {...register("rememberMe")} />
        Yadda saxla
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Göndərilir..." : "Daxil ol"}
      </button>
    </form>
  );
}

