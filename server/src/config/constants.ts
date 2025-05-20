import dotenv from 'dotenv';
dotenv.config();

export const envvars = Object.freeze({
    PORT: 4040,
    JWT_SECRET: process.env.JWT_SECRET as string,
}); 