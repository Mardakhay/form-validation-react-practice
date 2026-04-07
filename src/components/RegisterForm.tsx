import { useForm } from "react-hook-form";

interface RegisterData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Qeydiyyat:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", {
          required: "Ad daxil edin",
          minLength: { value: 2, message: "Min 2 hərf" },
        })}
      />
      {errors.firstName && (
        <span>{errors.firstName.message}</span>
      )}

      <input
        {...register("email", {
          required: "Email daxil edin",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Email düzgün deyil",
          },
        })}
      />
      {errors.email && (
        <span>{errors.email.message}</span>
      )}

      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
        })}
      />

      <input
        type="password"
        {...register("confirmPassword", {
          validate: (v) =>
            v === password || "Uyğun deyil",
        })}
      />

      <button disabled={isSubmitting}>
        {isSubmitting ? "..." : "Qeydiyyat"}
      </button>
    </form>
  );
}