import {tablesTemp} from './scriptemp.js'
import {connect} from '../connection.js'
import {readFileSync} from 'fs'
import { Tablas } from './Tablas.js'

export const cargarTemp=async(req,res)=>{
    /*Crear tablas*/
    let TablasG= Tablas.split(";")
    for(let i=0;i<8;i++){
        await connect.query(TablasG[i].trim())
    }

    
    /*Crear tablas temporales */
    let tablas= tablesTemp.split(";")
    for (let index = 0; index < 7; index++) {
        await connect.query(tablas[index].trim())
    }
    console.log("Hice tablas temp")


    //Llenar tabla partidos
    let texto=readFileSync("./Archivos/partidos.csv",'utf-8')
    let temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            let fecha=Formato(comas[3])
            await connect.query('INSERT INTO Temppartidos (id_partido,nombre,siglas,fundacion) VALUES (?,?,?,?);',
            [comas[0],comas[1],comas[2],fecha])
            continue
        }
        break
    }
    await connect.query('INSERT INTO partidos (id_partido,nombre,siglas,fundacion) SELECT * FROM Temppartidos;')
    console.log("Sali de partidos")

    
    //Llenar tabla cargos 
    texto=readFileSync("./Archivos/cargos.csv",'utf-8')
    temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            await connect.query('INSERT INTO Tempcargos (id,cargo) VALUES (?,?);',[comas[0],comas[1].trim()])
            continue
        }
        break
    }
    await connect.query('INSERT INTO cargos (id_cargo,cargo) SELECT * FROM Tempcargos;')
    console.log("Sali de cargos")

    //Llenar tabla de candidato
    texto=readFileSync("./Archivos/candidatos.csv",'utf-8')
    temp=texto.split("\n")
    console.log(temp.length)
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            let fecha=Formato(comas[2].trim())
            await connect.query('INSERT INTO Tempcandidatos (id,nombre,fecha,partido,cargo) VALUES (?,?,?,?,?);',
            [comas[0],comas[1],fecha,comas[3],comas[4]])
            continue
        }
        break
    }

    await connect.query('INSERT INTO candidatos (id_candidato,nombre,fecha,partido,cargo) SELECT * FROM Tempcandidatos;')
    console.log("Sali de candidato")


    //Llenar tabla de ciudadanos 
    texto=readFileSync("./Archivos/ciudadanos.csv",'utf-8')
    temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            await connect.query('INSERT INTO Tempciudadanos (dpi,nombre,apellido,direccion,telefono,edad,genero) VALUES (?,?,?,?,?,?,?);',
            [comas[0],comas[1],comas[2],comas[3],comas[4],comas[5],comas[6]]
            )
            continue
        }
        break
    }
    await connect.query('INSERT INTO ciudadanos (dpi,nombre,apellido,direccion,telefono,edad,genero) SELECT * FROM Tempciudadanos;')
    console.log("Sali de ciudadanos")

    //Llenar tabla departamentos
    texto=readFileSync("./Archivos/departamentos.csv",'utf-8')
    temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            await connect.query('INSERT INTO Tempdepartamentos (id,nombre) VALUES (?,?);',
            [comas[0],comas[1].trim()])
            continue
        }
        break
    }
    await connect.query('INSERT INTO departamentos (id_departamento,nombre) SELECT * FROM Tempdepartamentos;')
    console.log("Sali de departamentos")

    //Llenar tabla de mesas 
    texto=readFileSync("./Archivos/mesas.csv",'utf-8')
    temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            await connect.query('INSERT INTO Tempmesa (idMesa,idDep) VALUES (?,?);',
            [comas[0],comas[1]])
            continue
        }
        break
    }
    await connect.query('INSERT INTO mesa (id_mesa,id_dep) SELECT * FROM Tempmesa;')
    console.log("Sali de mesa")
    

    //Llenar tabla votaciones
    texto=readFileSync("./Archivos/votaciones.csv",'utf-8')
    temp=texto.split("\n")
    for (let i = 1; i< temp.length; i++) {
        if(temp[i]!=""){
            let comas=temp[i].split(",")
            let fecha=FormatoHF(comas[4])
            await connect.query('INSERT INTO Tempvotaciones (id_voto,id_Cand,dpi ,mesa_id,fecha) VALUES (?,?,?,?,?);',
            [comas[0],comas[1],comas[2],comas[3],fecha])
            continue
        }
        break
    }
    await connect.query('INSERT INTO voto (id_voto,fecha,id_dpi,mesa_id) SELECT DISTINCT id_voto,fecha,dpi,mesa_id FROM Tempvotaciones;')
    await connect.query('INSERT INTO voto_detail (voto_id,candidato_id) SELECT id_voto,id_Cand FROM Tempvotaciones;')
    console.log("Sali de votos")
    res.send({mess: "Exito"})

    
}

function Formato(cadena){
    let date=cadena.trim().split("/")
    let temp=date.reverse().join("-")
    return temp
}

function FormatoHF(cadena){
    let arr=cadena.split(" ");
    arr[0]=arr[0].split("/").reverse().join("-")
    arr[1]=arr[1]+":00"
    return arr.join(" ")
}

export const consulta1=async(req,res)=>{
    let [rec]=await connect.query(`SELECT can.nombre as 'Presidente',can2.nombre as 'Vicepresidente',partidos.nombre as 'Partido' FROM candidatos as can 
    inner join partidos on can.partido=partidos.id_partido and can.cargo=1
    inner join candidatos as can2 on can2.cargo=2 and can2.partido=partidos.id_partido;`)
    res.json(rec)
}

export const consulta2=async(req,res)=>{
    let [rec]=await connect.query(`SELECT partidos.nombre as 'Partido', COUNT(*) as 'Cantidad diputados' FROM candidatos as c1
    inner join partidos on c1.partido=partidos.id_partido and (c1.cargo=3 or c1.cargo=4 or c1.cargo=5)
    group by partido order by 'Cantidad diputados' desc;`)
    res.json(rec)
}

export const consulta3=async(req,res)=>{
    let [rec]=await connect.query(`SELECT partidos.nombre as 'Partido', c1.nombre as 'Alcalde' FROM candidatos as c1
    inner join partidos on c1.partido=partidos.id_partido and c1.cargo=6;`)
    res.json(rec)
}

export const consulta4=async(req,res)=>{
    let [rec]=await connect.query(`SELECT partidos.nombre as 'Partido', COUNT(*) as "Cantidad candidatos" FROM candidatos as c1
    inner join partidos on c1.partido=partidos.id_partido and partidos.nombre!='NULO'
    group by partido order by COUNT(*) asc;`)
    res.json(rec)
}

export const consulta5=async(req,res)=>{
    let [rec]=await connect.query(`SELECT departamentos.nombre as 'Departamento',COUNT(*) as 'Votos' FROM voto as c1
    inner join mesa on c1.mesa_id=mesa.id_mesa
    inner join departamentos on mesa.id_dep=departamentos.id_departamento
    group by mesa.id_dep;`)
    res.json(rec)
}

export const consulta6=async(req,res)=>{
    let [rec]=await connect.query(`SELECT COUNT(DISTINCT voto_detail.voto_id) as 'Cantidad votos nulos' FROM voto_detail
    WHERE voto_detail.candidato_id=-1;`)
    res.json(rec)
}

export const consulta7=async(req,res)=>{
    let [rec]=await connect.query(`SELECT  ciudadanos.edad as 'Edad',COUNT(*) as Cantidad FROM voto 
    inner join ciudadanos on voto.dpi=ciudadanos.dpi
    group by edad order by Cantidad desc LIMIT 10;`)
    res.json(rec)
}

export const consulta8=async(req,res)=>{
    let [rec]=await connect.query(`SELECT c.nombre as 'Candidato',COUNT(*) as Votos FROM voto_detail as v
    inner join candidatos as c on v.candidato_id=c.id_candidato and (c.cargo=1 or c.cargo=2)
    inner join partidos on c.partido=partidos.id_partido
    group by c.nombre order by Votos desc LIMIT 10;`)
    res.json(rec)
}

export const consulta9=async(req,res)=>{
    let [rec]=await connect.query(`SELECT mesa.id_mesa as 'No. Mesa', departamentos.nombre as 'Departamento',COUNT(*) as Votos FROM voto 
    inner join mesa on voto.mesa_id=mesa.id_mesa
    inner join departamentos on mesa.id_dep=departamentos.id_departamento
    group by mesa.id_mesa order by Votos desc LIMIT 5;`)
    res.json(rec)
}

export const consulta10=async(req,res)=>{
    let [rec]=await connect.query(`SELECT date_format(voto.fecha,"%H:%i:%s") as 'Hora',COUNT(*) as Votos FROM voto  
    group by voto.fecha order by Votos desc LIMIT 5;`)
    res.json(rec)
}

export const consulta11=async(req,res)=>{
    let [rec]=await connect.query(`SELECT c2.genero,COUNT(*) as Cantidad FROM voto as c1
    inner join ciudadanos as c2 on c1.dpi=c2.dpi
    group by c2.genero;`)
    res.json(rec)
}
