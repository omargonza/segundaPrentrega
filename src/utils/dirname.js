//configuracion para poder tener la variable dirname (variable que guarda la direccion excata del proyecto)

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const sourceDirname = path.join(__dirname, "..");