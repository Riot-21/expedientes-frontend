export interface ExpedienteResponse {
    id:          string;
    nombre:      string;
    descripcion: string;
    estado:      Estado;
}

type Estado = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';


