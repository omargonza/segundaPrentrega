import bcrypt from 'bcrypt';
export const createHashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);