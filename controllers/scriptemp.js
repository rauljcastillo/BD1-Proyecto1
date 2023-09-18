export const tablesTemp=`
    CREATE TEMPORARY TABLE Tempcandidatos (
        id INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        fecha DATE,
        partido INT NOT NULL,
        cargo INT NOT NULL
    );

    CREATE TEMPORARY TABLE Tempcargos(
        id INT(11) NOT NULL,
        cargo TEXT NOT NULL
    );

    CREATE TEMPORARY TABLE Tempciudadanos(
        dpi CHAR(13) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        direccion TEXT NOT NULL,
        telefono CHAR(10) NOT NULL,
        edad SMALLINT NOT NULL,
        genero CHAR(1) NOT NULL
    );

    CREATE TEMPORARY TABLE Tempdepartamentos(
        id INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL
    );

    CREATE TEMPORARY TABLE Tempmesa(
        idMesa INT(11) NOT NULL,
        idDep INT(11) NOT NULL
    );

    CREATE TEMPORARY TABLE Temppartidos(
        id_partido INT(11) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        siglas VARCHAR(50) NOT NULL,
        fundacion DATE
    );

    CREATE TEMPORARY TABLE Tempvotaciones (
        id_voto INT(11) NOT NULL,
        id_Cand INT(11) NOT NULL,
        fecha DATETIME,
        dpi CHAR(13) NOT NULL,
        mesa_id INT(11) NOT NULL
        
    );


`