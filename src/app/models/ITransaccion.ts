export interface ITransaccion {
    id?: number;
    cliente?: string;
    fecha?: string;
    estado?: string;
    archivo? :string;
    intentos? : number;
}