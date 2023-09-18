SELECT c.nombre as presidente,carg.cargo FROM candidatos as c
inner join cargos as carg on c.cargo=carg.id_cargo
WHERE carg.cargo='vicepresidente' or carg.cargo='presidente';

/*COnsulta 1*/
    SELECT can.nombre as 'Presidente',can2.nombre as 'Vicepresidente',partidos.nombre as 'Partido' FROM candidatos as can 
    inner join partidos on can.partido=partidos.id_partido and can.cargo=1
    inner join candidatos as can2 on can2.cargo=2 and can2.partido=partidos.id_partido;

/*Consulta 2*/
SELECT partidos.nombre as 'Partido', COUNT(*) as 'Cantidad diputados' FROM candidatos as c1
inner join partidos on c1.partido=partidos.id_partido and (c1.cargo=3 or c1.cargo=4 or c1.cargo=5)
group by partido order by 'Cantidad diputados' desc;   

/*Consulta 3*/
SELECT partidos.nombre as 'Partido', c1.nombre as 'Alcalde' FROM candidatos as c1
inner join partidos on c1.partido=partidos.id_partido and c1.cargo=6;

/*Consulta 4*/
SELECT partidos.nombre as 'Partido', COUNT(*) as "Cantidad candidatos" FROM candidatos as c1
inner join partidos on c1.partido=partidos.id_partido and partidos.nombre!='NULO'
group by partido order by COUNT(*) desc;   

/*Consulta 5*/
SELECT departamentos.nombre as 'Departamento',COUNT(*) as 'Votos' FROM voto as c1
inner join mesa on c1.mesa_id=mesa.id_mesa
inner join departamentos on mesa.id_dep=departamentos.id_departamento
group by mesa.id_dep;

/*Consulta 6*/
SELECT COUNT(DISTINCT voto_detail.voto_id) as 'Cantidad votos nulos' FROM voto_detail
WHERE voto_detail.candidato_id=-1;

/*Consulta 7*/
SELECT  ciudadanos.edad,COUNT(*) as Cantidad FROM voto 
inner join ciudadanos on voto.dpi=ciudadanos.dpi
group by edad order by Cantidad desc LIMIT 10;

/*Consulta 8*/
SELECT c.nombre as 'Candidato',COUNT(*) as Votos FROM voto_detail as v
inner join candidatos as c on v.candidato_id=c.id_candidato and (c.cargo=1 or c.cargo=2)
inner join partidos on c.partido=partidos.id_partido
group by c.nombre order by Votos desc LIMIT 10;

/*Consulta 9*/
SELECT mesa.id_mesa as 'No. Mesa', departamentos.nombre as 'Departamento',COUNT(*) as Votos FROM voto 
inner join mesa on voto.mesa_id=mesa.id_mesa
inner join departamentos on mesa.id_dep=departamentos.id_departamento
group by mesa.id_mesa order by Votos desc LIMIT 5;

/*Consulta 10*/
SELECT date_format(voto.fecha,"%Y-%m-%d %H:%i:%s"),COUNT(*) as Votos FROM voto  
group by voto.fecha order by Votos desc LIMIT 5;

/*Consulta 11*/
SELECT c2.genero,COUNT(*) as Cantidad FROM voto as c1
inner join ciudadanos as c2 on c1.dpi=c2.dpi
group by c2.genero;