-- Crear base de datos
CREATE DATABASE IF NOT EXISTS IDW_Pro3;
USE IDW_Pro3;

-- =========================
-- Tabla: especialidades
-- =========================
CREATE TABLE especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    activo TINYINT(1) DEFAULT 1
);

-- =========================
-- Tabla: usuarios
-- =========================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) NOT NULL,
    apellido VARCHAR(100),
    nombres VARCHAR(100),
    email VARCHAR(255),
    contrasena VARCHAR(255),
    foto_path VARCHAR(255),
    rol TINYINT,
    activo TINYINT(1) DEFAULT 1
);

-- =========================
-- Tabla: obras_sociales
-- =========================
CREATE TABLE obras_sociales (
    id_obra_social INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion VARCHAR(255),
    porcentaje_descuento DECIMAL(9,2),
    es_particular TINYINT(1),
    activo TINYINT(1) DEFAULT 1
);

-- =========================
-- Tabla: medicos
-- =========================
CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_especialidad INT NOT NULL,
    matricula INT,
    descripcion TEXT,
    valor_consulta DECIMAL(10,2),
    activo TINYINT(1) DEFAULT 1,

    CONSTRAINT fk_medico_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),

    CONSTRAINT fk_medico_especialidad
        FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

-- =========================
-- Tabla: pacientes
-- =========================
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_obra_social INT,

    CONSTRAINT fk_paciente_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),

    CONSTRAINT fk_paciente_obra
        FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

-- =========================
-- Tabla: medicos_obras_sociales (relación N:M)
-- =========================
CREATE TABLE medicos_obras_sociales (
    id_medico_obra_social INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    id_obra_social INT NOT NULL,
    activo TINYINT(1) DEFAULT 1,

    CONSTRAINT fk_mos_medico
        FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),

    CONSTRAINT fk_mos_obra
        FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

-- =========================
-- Tabla: turnos_reservas
-- =========================
CREATE TABLE turnos_reservas (
    id_turno_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    id_obra_social INT,
    fecha_hora DATETIME NOT NULL,
    valor_total DECIMAL(10,2),
    atendido TINYINT(1) DEFAULT 0,
    activo TINYINT(1) DEFAULT 1,

    CONSTRAINT fk_turno_medico
        FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),

    CONSTRAINT fk_turno_paciente
        FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),

    CONSTRAINT fk_turno_obra
        FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

CREATE INDEX idx_medico_usuario ON medicos(id_usuario);
CREATE INDEX idx_paciente_usuario ON pacientes(id_usuario);
CREATE INDEX idx_turno_fecha ON turnos_reservas(fecha_hora);

ALTER TABLE medicos
ADD CONSTRAINT fk_medico_usuario
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

ALTER TABLE medicos
ADD CONSTRAINT fk_medico_especialidad
FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad);

ALTER TABLE pacientes
ADD CONSTRAINT fk_paciente_usuario
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

ALTER TABLE pacientes
ADD CONSTRAINT fk_paciente_obra
FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social);

ALTER TABLE medicos_obras_sociales
ADD CONSTRAINT fk_mos_medico
FOREIGN KEY (id_medico) REFERENCES medicos(id_medico);

ALTER TABLE medicos_obras_sociales
ADD CONSTRAINT fk_mos_obra
FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social);

ALTER TABLE turnos_reservas
ADD CONSTRAINT fk_turno_medico
FOREIGN KEY (id_medico) REFERENCES medicos(id_medico);

ALTER TABLE turnos_reservas
ADD CONSTRAINT fk_turno_paciente
FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente);

ALTER TABLE turnos_reservas
ADD CONSTRAINT fk_turno_obra
FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social);