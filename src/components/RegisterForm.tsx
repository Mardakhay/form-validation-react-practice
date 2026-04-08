import { useForm } from "react-hook-form";
import FormField from "./FormField";

interface RegisterData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
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
    await new Promise((r) => setTimeout(r, 1000));
    console.log("✅ Qeydiyyat:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Qeydiyyat</h2>

      <FormField label="Ad" error={errors.firstName?.message}>
        <input
          {...register("firstName", {
            required: "Ad daxil edin",
            minLength: { value: 2, message: "Min 2 hərf" },
          })}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register("email", {
            required: "Email daxil edin",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email düzgün deyil",
            },
          })}
        />
      </FormField>

      <FormField label="Şifrə" error={errors.password?.message}>
        <input
          type="password"
          {...register("password", {
            required: "Şifrə daxil edin",
            minLength: {
              value: 8,
              message: "Minimum 8 simvol",
            },
          })}
        />
      </FormField>

      <FormField
        label="Şifrəni təsdiqlə"
        error={errors.confirmPassword?.message}
      >
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (v) =>
              v === password || "Uyğun deyil",
          })}
        />
      </FormField>

      <label>
        <input
          type="checkbox"
          {...register("terms", {
            required: "Şərtləri qəbul edin",
          })}
        />
        Şərtləri qəbul edirəm
      </label>
      {errors.terms && <span>{errors.terms.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Göndərilir..." : "Qeydiyyat"}
      </button>
    </form>
  );
}

