export interface UserPublicacion {
    id:string;
    nombre:string;
    contenido:string;
    imagenUrl:string | null;
    likes: number;
    comments: number;
    comentarios: any[];
    fecha: string;
}