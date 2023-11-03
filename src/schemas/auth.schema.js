import {z} from 'zod';
export const registerClientSchema = z.object({
    name: z.string({required_error:"El nombre es requerido"}).min(3, "El nombre debe tener al menos 3 caracteres"),
    last_names: z.string({required_error:"Los apellidos son requeridos"}).min(3, "Los apellidos deben tener al menos 3 caracteres"),
    ci: z.string({required_error:"El ci es requerido"}).min(5, "El ci debe tener al menos 7 caracteres"),
    user: z.string({required_error:"El usuario es requerido"}).min(3, "El usuario debe tener al menos 3 caracteres"),
    password: z.string({required_error:"La contraseña es requerida"}).min(6, "La contraseña debe tener al menos 6 caracteres"),
    date_birth: z.string({required_error:"La fecha de nacimiento es requerida"}),
    departament: z.string({required_error:"El departamento es requerido"}),
    province: z.string({required_error:"La provincia es requerida"}),
    address: z.string({required_error:"La direccion es requerida"}),
    phone: z.string({required_error:"El telefono es requerido"}),
    email: z.string({required_error:"El email es requerido"}).email("El email no es valido")
});

export const loginSchema = z.object({
    user: z.string({required_error:"El usuario es requerido"}),
    password: z.string({required_error:"La contraseña es requerida"})
});

