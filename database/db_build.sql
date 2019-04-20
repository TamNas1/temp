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
   id SERIAL PRIMARY KEY,
   name VARCHAR,
   modules INTEGER NOT NULL
 );

INSERT INTO subjects (name,modules) VALUES
('Mathmatics',3),
('Mathmatics',4),
('Mathmatics',5),
('Subject 1',3),
('Subject 2 ',4),
('Subject 3',5);


CREATE TABLE IF NOT EXISTS sub_subjects(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subject_id INTEGER NOT NULL,
  data TEXT NOT NULL
);

INSERT INTO sub_subjects(name, subject_id, data) VALUES
('Functions1',1,'this is this but this is not this1'),
('Functions2',2,'this is this but this is not this2'),
('Functions2',2,'this is this but this is not this3'),
('Functions3',3,'this is this but this is not this4'),
('Functions4',4,'this is this but this is not this5');


CREATE TABLE IF NOT EXISTS home_works(
    id SERIAL PRIMARY KEY,
    school_id INTEGER NOT NULL,
    sub_subject_id INTEGER NOT NULL,
    data TEXT NOT NULL
  );

INSERT INTO home_works(school_id, sub_subject_id, data) VALUES
(1,1,'homework11'),
(2,2,'homework22'),
(2,1,'homework33'),
(2,2,'homework44'),
(3,1,'homework55'),
(3,2,'homework33');


COMMIT;
