import z from "zod";

// Schema para create expediente
export const expedienteSchema = z.object({
  nombre: z.string().nonempty("El título es obligatorio"),
  descripcion: z.string().nonempty("La descripción es obligatoria"),
});

// Schema para editar expediente
export const estadoOptions = ["PENDIENTE", "APROBADO", "RECHAZADO"] as const;
export const editSchema = z.object({
  nombre: z.string().nonempty("El título es obligatorio"),
  descripcion: z.string().nonempty("La descripción es obligatoria"),
  estado: z.enum(estadoOptions),
});

// Definicion de shemas zod como tipos en TypeScript
export type ExpedienteForm = z.infer<typeof expedienteSchema>;
export type EditForm = z.infer<typeof editSchema>;