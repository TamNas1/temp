/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */

const query = require('./queries.js');

const selectAll = (table, cb) => query.select(`SELECT * from '${table}';`, cb);

const selectById = (table, id, cb) => query.select(`SELECT * from '${table}' where id = ${id};`, cb);

const selectByName = (table, name, cb) =>
  query.select(`SELECT * from '${table}' where name = '${name}';`, cb);

const deleteById = (table, id, cb) =>
  query.select(`DELETE FROM ${table} WHERE id = ${id};`, cb);

const deleteByName = (table, name, cb) =>
  query.select(`DELETE FROM ${table} WHERE name = '${name}';`, cb);

const addSubject = (name, mod, cb) =>
  query.insert('INSERT INTO Subject (name,modules) VALUES ($1,$2);',
    [name, mod], cb);

const addSubSubject = (name, subjectId, data, cb) =>
  query.insert('INSERT INTO Subject (name, subject_id, data) VALUES ($1,$2,$3);',
    [name, subjectId, data], cb);

const addHomework = (schoolId, subSubjectId, data, cb) =>
  query.insert('INSERT INTO Subject (name, subject_id, data) VALUES ($1,$2,$3);',
    [schoolId, subSubjectId, data], cb);

const addSchool = (name, userName, password, active, email, phone, cb) =>
  query.insert('INSERT INTO Subject (name, user_name, password,active,email,phone) VALUES ($1,$2,$3,$4,$5,$6);',
    [name, userName, password, active, email, phone], cb);

const updateActivation = (status, cb) =>
  query.insert('UPDATE school (name, user_name, password,active,email,phone) VALUES ($1,$2,$3,$4,$5,$6);',
    [status], cb);

const checkPassword = (username, cb) => query.insert(`SELECT password from schools where username = $1`,[username], cb);

module.exports = {
  selectAll,
  selectById,
  selectByName,
  deleteById,
  deleteByName,
  addSubject,
  addSubSubject,
  addHomework,
  addSchool,
  updateActivation,
  checkPassword,
}
