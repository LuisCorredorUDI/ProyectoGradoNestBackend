

--Esquema proyecto de grado  creacion de usuario
/* Los siguientes Scripts deben ser ejecutados una unica vez,
   y deben ser ejecutados desde un usuario administrador de Oracle
*/

--Ejecutar antes de crear usuarios
alter session set _ORACLE_SCRIPT=true;

CREATE USER PROYECTOGRADO IDENTIFIED BY Bucaramanga2024
DEFAULT TABLESPACE SYSAUX
TEMPORARY TABLESPACE temp;
-- QUOTAS
ALTER USER PROYECTOGRADO QUOTA UNLIMITED ON SYSAUX;
-- PERMISOS
GRANT CREATE SESSION TO PROYECTOGRADO;
GRANT CREATE TABLE, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE TO PROYECTOGRADO;
GRANT CONNECT, RESOURCE TO PROYECTOGRADO;



/* Los siguientes Scripts se ejecutan una unica vez en el orden que estan
    y deben realizarse con el usuario creado anteriormente: PROYECTOGRADO 
*/
--Las consultas de creacion de tablas, estan en orden

CREATE TABLE TIPOUSUARIO (
    CODIGO NUMBER CONSTRAINT TIPOUSUARIO_PK PRIMARY KEY,
    NOMBRE VARCHAR2(250) NOT NULL
);


CREATE TABLE USUARIO 
(	ID NUMBER, 
    NOMBRES VARCHAR2(250 BYTE), 
    APELLIDOS VARCHAR2(250 BYTE), 
    DOCUMENTO NUMBER, 
    CLAVEINGRESO VARCHAR2(500 BYTE), 
    FECHANACIMIENTO DATE, 
    NUMEROTELEFONO NUMBER, 
    NUMEROMOVIL NUMBER, 
    CORREO VARCHAR2(100 BYTE), 
    DIRECCION VARCHAR2(100 BYTE), 
    ESTADO NUMBER DEFAULT 1, 
    CODIGOTIPOUSUARIO NUMBER, 
    TOKEN VARCHAR2(250 BYTE), 
     CONSTRAINT USUARIO_PK PRIMARY KEY (ID), 
     CONSTRAINT USUARIO_TIPOUSUARIO_FK FOREIGN KEY (CODIGOTIPOUSUARIO)
      REFERENCES TIPOUSUARIO (CODIGO) ENABLE
);

COMMENT ON COLUMN PROYECTOGRADO.USUARIO.ESTADO IS '1 = Activo, 0 = Inactivo';
COMMENT ON COLUMN PROYECTOGRADO.USUARIO.TOKEN IS 'El TOKEN es un elemento necesario para notificar correctamente a los usuarios.';


CREATE TABLE EVENTO 
(	CODIGO NUMBER, 
    NOMBRE VARCHAR2(100 BYTE), 
    DETALLE VARCHAR2(250 BYTE), 
    FECHAINICIO DATE, 
    FECHAFIN DATE, 
    IDUSUARIOCREACION NUMBER, 
    RUTAIMAGEN VARCHAR2(250 BYTE), 
    CONSTRAINT EVENTO_PK PRIMARY KEY (CODIGO),
    CONSTRAINT EVENTO_USUARIO_FK FOREIGN KEY (IDUSUARIOCREACION)
    REFERENCES USUARIO (ID) ENABLE
);


CREATE TABLE CITACION 
(	CODIGO NUMBER, 
    DETALLE VARCHAR2(250 BYTE), 
    FECHAINICIO DATE, 
    FECHAFIN DATE, 
    USUARIOCITACION NUMBER, 
     CONSTRAINT CITACIONES_PK PRIMARY KEY (CODIGO), 
     CONSTRAINT CITACIONES_USUARIO_FK FOREIGN KEY (USUARIOCITACION)
      REFERENCES USUARIO (ID) ENABLE
);


  CREATE TABLE OBSERVADOR 
(	CODIGO NUMBER, 
    TITULO VARCHAR2(100 BYTE), 
    DETALLE VARCHAR2(500 BYTE), 
    USUARIOOBSERVACION NUMBER, 
    CONSTRAINT OBSERVADOR_PK PRIMARY KEY (CODIGO), 
    CONSTRAINT OBSERVADOR_USUARIO_FK FOREIGN KEY (USUARIOOBSERVACION)
    REFERENCES USUARIO (ID) ENABLE
);


CREATE TABLE ACUDIENTE 
(	ID NUMBER, 
    IDACUDIENTE NUMBER, 
    IDESTUDIANTE NUMBER, 
    CONSTRAINT ACUDIENTES_PK PRIMARY KEY (ID), 
    CONSTRAINT ACUDIENTES_IDACUDIENTE_FK FOREIGN KEY (IDACUDIENTE)
    REFERENCES USUARIO (ID) ENABLE, 
    CONSTRAINT ACUDIENTES_IDESTUDIANTE_FK FOREIGN KEY (IDESTUDIANTE)
    REFERENCES USUARIO (ID) ENABLE
);
  
  
CREATE TABLE DERECHO (
    CODIGO NUMBER CONSTRAINT DERECHOS_PK PRIMARY KEY,
    DETALLE VARCHAR2(500),
    TIPOUSUARIO NUMBER,
    CONSTRAINT DERECHOS_TIPOUSUARIO_FK FOREIGN KEY (TIPOUSUARIO)
    REFERENCES TIPOUSUARIO(CODIGO)
);


CREATE TABLE TIPOPQR 
(	CODIGO NUMBER, 
    NOMBRE VARCHAR2(100 BYTE), 
    GRAVEDAD NUMBER, 
    CONSTRAINT TIPOPQR_PK PRIMARY KEY (CODIGO)
);
  

CREATE TABLE PQR 
(	CODIGO NUMBER, 
    DETALLE VARCHAR2(500 BYTE), 
    RESPUESTA VARCHAR2(500 BYTE), 
    TIPOPQR NUMBER, 
    USUARIOGENERA NUMBER, 
    FECHACREACION DATE DEFAULT SYSDATE, 
    FECHARESPUESTA DATE, 
    ESTADOPQR NUMBER DEFAULT 0, 
    CODIGODERECHO NUMBER, 
    NUMEROREFERENCIA NUMBER, 
     CONSTRAINT PQR_PK PRIMARY KEY (CODIGO), 
     CONSTRAINT PQR_TIPOPQR_FK FOREIGN KEY (TIPOPQR)
      REFERENCES TIPOPQR (CODIGO) ENABLE, 
     CONSTRAINT PQR_USUARIOGENERA_FK FOREIGN KEY (USUARIOGENERA)
      REFERENCES USUARIO (ID) ENABLE, 
     CONSTRAINT PQR_DERECHO_FK FOREIGN KEY (CODIGODERECHO)
      REFERENCES DERECHO (CODIGO) ENABLE
);

COMMENT ON COLUMN PQR.ESTADOPQR IS '1 = REVISADA, 0 = SIN REVISAR, 2 = CANCELADA POR EL USUARIO';
  
  
CREATE TABLE CITACION_OBSERVADOR
(
    CODIGOCITACIONOBSERVADOR NUMBER CONSTRAINT CITACION_OBSERVADOR_PK PRIMARY KEY,
    CODIGOCITACION NUMBER,
    CODIGOOBSERVADOR NUMBER,
    CONSTRAINT CO_CITACION_FK FOREIGN KEY (CODIGOCITACION) 
        REFERENCES CITACION(CODIGO),
    CONSTRAINT CO_OBSERVADOR_FK FOREIGN KEY (CODIGOOBSERVADOR) 
        REFERENCES OBSERVADOR(CODIGO)
);
  
  

--Procedimiento para eliminar citaciones
CREATE OR REPLACE PROCEDURE PR_ELIMINA_CITACION(p_codigo_citacion IN NUMBER) 
IS
    -- Cursor para obtener los codigos de observadores asociados a la citación
    CURSOR c_observadores IS
        SELECT CODIGOOBSERVADOR 
        FROM CITACION_OBSERVADOR
        WHERE CODIGOCITACION = p_codigo_citacion;

    v_codigo_observador NUMBER;
BEGIN
    
    -- Paso 2: Eliminar registros de la tabla OBSERVADOR
    -- Para esto, primero obtenemos los codigos de observadores relacionados
    FOR rec IN c_observadores LOOP
        v_codigo_observador := rec.CODIGOOBSERVADOR;
        -- Paso 1: Eliminar registros de la tabla CITACION_OBSERVADOR
        DELETE FROM CITACION_OBSERVADOR 
        WHERE CODIGOCITACION = p_codigo_citacion;
        -- Eliminar de OBSERVADOR donde el codigo sea el obtenido del cursor
        DELETE FROM OBSERVADOR 
        WHERE CODIGO = v_codigo_observador;
    END LOOP;

    -- Paso 3: Eliminar registro de la tabla CITACION
    DELETE FROM CITACION 
    WHERE CODIGO = p_codigo_citacion;

    -- Mensaje de confirmación
    DBMS_OUTPUT.PUT_LINE('Citación y registros asociados eliminados exitosamente.');
    
EXCEPTION
    -- Manejo de excepciones para capturar posibles errores
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al eliminar los registros: ' || SQLERRM);
END;




--INICIO DATOS INICIALES
--Tipos de usuario
INSERT INTO TIPOUSUARIO VALUES(1,'Coordinador');
INSERT INTO TIPOUSUARIO VALUES(2,'Acudiente');
INSERT INTO TIPOUSUARIO VALUES(3,'Estudiante');

--Usuario de prueba tipo coordinador (Usuario inicial)
INSERT INTO USUARIO 
VALUES(1,'USUARIO','PRUEBA',12345,'12345',TO_DATE('2000/01/01 10:00:00','YYYY/MM/DD HH24:MI:SS'),NULL,12345,'usuarioprueba@gmail.com','cra 1 calle 1',1,1);

--Tipos de PQR
INSERT INTO TIPOPQR VALUES(1,'Queja',3);
INSERT INTO TIPOPQR VALUES(2,'Reclamo',3);
INSERT INTO TIPOPQR VALUES(3,'Sugerencia',2);
INSERT INTO TIPOPQR VALUES(4,'Felicitacion',1);


--DERECHOS. TIPO USU 2=ACUDIENTE, 3=ESTUDIANTE
INSERT INTO DERECHO VALUES(1,'Conocer desde el comienzo el cronograma de actividades que va a desarrollar el colegio',2);
INSERT INTO DERECHO VALUES(2,'Ser atendidos y escuchados por Directivos, Docentes, Personal Administrativo o de Servicios, al presentar sugerencias y reclamos sobre sus hijos o acudidos',2);
INSERT INTO DERECHO VALUES(3,'Conocer con anticipación o en el momento de la matrícula, las características de nuestra Institución, los Principios que orientan el Proyecto Educativo Institucional, el Manual de Convivencia, el Plan de Estudios, las Estratégicas Pedagógicas, el Sistema de Evaluación Escolar y el Plan de Mejoramiento Institucional',2);
INSERT INTO DERECHO VALUES(4,'Recibir periódicamente los informes académicos y de comportamiento social de sus hijos o acudidos, siempre que estén a paz y salvo con el Colegio',2);
INSERT INTO DERECHO VALUES(5,'Expresar de manera respetuosa y por el conducto regular sus opiniones respecto del proceso educativo de sus hijos',2);
INSERT INTO DERECHO VALUES(6,'Participar en el Proyecto Educativo Institucional que desarrolle el Colegio y de manera especial, en la construcción, ejecución y modificación del mismo',2);
INSERT INTO DERECHO VALUES(7,'Participar en la asociación de padres de familia y consejo directivo, atendiendo a los estatutos',2);

INSERT INTO DERECHO VALUES(8,'Que respeten y se cumplan los derechos fundamentales del niño(a) y del ciudadano(a)',3);
INSERT INTO DERECHO VALUES(9,'Conocer oportunamente la filosófica y el Manual de Convivencia que orientan la institución',3);
INSERT INTO DERECHO VALUES(10,'Ser respetado y amado como persona y como estudiante sin importar religión, raza, sexo, nacionalidad',3);
INSERT INTO DERECHO VALUES(11,'Recibir una educación integral tanto académica como personal',3);
INSERT INTO DERECHO VALUES(12,'Hacer reclamaciones de tipo académico o disciplinario, siguiendo el conducto regular y dentro del debido respeto',3);
INSERT INTO DERECHO VALUES(13,'Participar en la creación de los proyectos pedagógicos – institucionales',3);
INSERT INTO DERECHO VALUES(14,'Enmendar los errores y ser estimulado para el cambio cuando presente dificultades',3);
INSERT INTO DERECHO VALUES(15,'Ser escuchado en caso de reclamo presentado de manera respetuosa',3);
INSERT INTO DERECHO VALUES(16,'Descansar, jugar, hacer deporte y participar de la vida educativa, de la cultura y de las artes',3);
INSERT INTO DERECHO VALUES(17,'Disfrutar del apoyo y la compañía de los padres de familia en las diferentes actividades institucionales',3);
INSERT INTO DERECHO VALUES(18,'Elegir y ser elegido para participar como representante de grado, mediador de conflictos, representante al consejo directivo o personero de los estudiantes según normas establecidas (cumplir con el perfil del estudiante Colperpetuo y tener antigüedad mínima de dos años en la institución para aspirar a personería y de un año para ser representante de grado, cumpliendo con los requisitos establecidos y el perfil para aspirar a dicho cargo.)',3);
INSERT INTO DERECHO VALUES(19,'Representar al colegio en actividades deportivas, recreativas, culturales, artísticas y académicas mediante selección previa',3);
INSERT INTO DERECHO VALUES(20,'Aprovechar responsablemente los equipos materiales y demás elementos puestos al su servicio',3);
INSERT INTO DERECHO VALUES(21,'Usar con responsabilidad las instalaciones bienes y servicios de la institución, y únicamente para actividades propias de la vida escolar',3);
INSERT INTO DERECHO VALUES(22,'Ser respetado por la diferencia y la individualidad sexual',3);
INSERT INTO DERECHO VALUES(23,'Recibir la correcta asistencia por parte de la institución, a la hora de aplicar los protocolos, en caso de presentar investigación de las situaciones tipo I, II y III del decreto 1965 de 2013',3);
INSERT INTO DERECHO VALUES(24,'Conformar y participar del comité de convivencia según lo establecido por la ley 1620 de marzo de 2013',3);
INSERT INTO DERECHO VALUES(25,'Derecho a ser elegido como representante de los estudiantes para conformar el comité Escolar de convivencia',3);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  