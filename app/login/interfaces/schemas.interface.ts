import z from "zod";

//schema zod para formulario de login
export const loginSchema = z.object({
  email: z.email("Email inválido").nonempty("El correo es obligatorio"),
  password: z.string().nonempty("La contraseña es obligatoria").min(8, "La contraseña debe tener mínimo 8 caracteres"),
});

//definicion de schemas como interfaces typescript
export type LoginForm = z.infer<typeof loginSchema>;