import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
    try {
        // Si ya existen documentos guardar el numero
        const count = await Role.estimatedDocumentCount();

        // Comprobar si existen roles
        if (count > 0) return;

        // Crear roles por defecto
        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdmin = async () => {
    // Comprobar si existe un usuario administrador
    const user = await User.findOne({ email: "admin@localhost" });
    // Obtener roles mediante _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
        // Crear un nuevo usuario administrador
        await User.create({
            username: "admin",
            email: "admin@localhost",
            password: await bcrypt.hash("admin", 10),
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!')
    }
};