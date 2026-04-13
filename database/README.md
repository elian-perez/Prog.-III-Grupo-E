# Base de Datos

## 📌 Requisitos
- Tener instalado XAMPP, Laragon o similar
- Tener MySQL y phpMyAdmin funcionando

## 🚀 Creación de la base de datos

1. Abrir phpMyAdmin (http://localhost/phpmyadmin)
2. Ir a la pestaña **Importar**
3. Seleccionar el archivo:

   script_creación.bd.sql

4. Ejecutar

✔️ El script se encarga de:
- Crear la base de datos `IDW_Pro3`
- Crear todas las tablas necesarias
- Definir relaciones entre tablas

## ⚠️ Importante
- Ejecutar este script **una sola vez**
- Si ya existe la base, eliminarla antes o verificar conflictos

## 🧪 Verificación
Luego de ejecutar:
- Verificar que exista la base `IDW_Pro3`
- Verificar que las tablas estén creadas correctamente

## 🛠️ Problemas comunes
- Error de claves foráneas → revisar orden de ejecución
- Base existente → eliminar y volver a importar