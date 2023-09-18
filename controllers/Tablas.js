export const Tablas=`
    CREATE TABLE IF NOT EXISTS partidos (
        id_partido INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        siglas VARCHAR(50) NOT NULL,
        fundacion DATE,
        PRIMARY KEY(id_partido)
    );

    CREATE TABLE IF NOT EXISTS cargos (
        id_cargo INT(11) NOT NULL,
        cargo TEXT NOT NULL,
        PRIMARY KEY(id_cargo)
    );

    CREATE TABLE IF NOT EXISTS candidatos (
        id_candidato INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        fecha DATE NOT NULL,
        partido INT(11) NOT NULL,
        cargo INT(11) NOT NULL,
        PRIMARY KEY(id_candidato),
        FOREIGN KEY(partido) REFERENCES partidos (id_partido),
        FOREIGN KEY(cargo) REFERENCES cargos (id_cargo)
    );

    CREATE TABLE IF NOT EXISTS ciudadanos(
        dpi CHAR(13) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        direccion TEXT NOT NULL,
        telefono CHAR(10) NOT NULL,
        edad SMALLINT NOT NULL,
        genero CHAR(1) NOT NULL,
        PRIMARY KEY(dpi)
    );

    CREATE TABLE IF NOT EXISTS departamentos(
        id_departamento INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        PRIMARY KEY(id_departamento)
    );

    CREATE TABLE IF NOT EXISTS mesa(
        id_mesa INT(11) NOT NULL,
        id_dep INT(11) NOT NULL,
        PRIMARY KEY(id_mesa),
        FOREIGN KEY(id_dep) REFERENCES departamentos (id_departamento)
    );
    
    CREATE TABLE IF NOT EXISTS voto (
        id_voto INT(11) NOT NULL,
        fecha DATETIME,
        dpi CHAR(13) NOT NULL,
        mesa_id INT(11) NOT NULL,
        PRIMARY KEY(id_voto),
        FOREIGN KEY(dpi) REFERENCES ciudadanos(dpi),
        FOREIGN KEY(mesa_id) REFERENCES mesa(id_mesa)
    );

    CREATE TABLE IF NOT EXISTS voto_detail (
        id_detail INT(11) NOT NULL AUTO_INCREMENT,
        voto_id INT(11) NOT NULL,
        candidato_id INT(11) NOT NULL,
        PRIMARY KEY (id_detail),
        FOREIGN KEY(voto_id) REFERENCES voto(id_voto),
        FOREIGN KEY(candidato_id) REFERENCES candidatos(id_candidato)
    );

`