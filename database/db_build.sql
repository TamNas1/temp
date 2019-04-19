BEGIN;

DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS sub_subjects CASCADE;
DROP TABLE IF EXISTS home_works CASCADE;

CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  username VARCHAR(60) NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  active INTEGER DEFAULT 0,
  phone TEXT NOT NULL);


INSERT INTO schools (name,username,password,email,active,phone) VALUES
 ('Tamer sa3ed as3d ms3od', 'ttt33', 'tt33', 't33@t33.com', 1, '052125458'),
 ('Karam bn 5tab', 'a2', 'a2', 'a2@a2.com', 1, '055185258'),
 ('Shadi sef lshosmo', 's5', 's5', 's5@s5.com', 0, '052125458'),
 ('Majd mjdl majd', 'asd', 'dee', '3t@g4.com', 1, '052125458');


 CREATE TABLE IF NOT EXISTS subjects (
   idSERIAL PRIMARY KEY,
   name VARCHAR,
   moduels INTEGER NOT NULL
 );



COMMIT;
