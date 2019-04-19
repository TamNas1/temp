const query = require('./sqlquery.js')

const select = (table, id, cb) => query.select(`SELECT * from '${table}' where id = ${id}`, cb)

const checkPassword = (username, password, cb) => query.select(`SELECT count(id) from users where username = '${username}' AND password = '${password}'`, cb)

const addUser = (username, password, email, cb) => query.insert(`INSERT INTO users (username,password,email) VALUES ($1,$2,$3)`, [username, password, email], cb)

const getQuestions = (cb) => query.select(`SELECT * from qa`, cb)

const getPass = (username, cb) => query.select(`SELECT password from users where username = '${username}'`, cb);

const getScore = (username, cb) => query.select(`SELECT score from users where username='${username}'`, cb);

const addScore = (username, score, cb) => query.update(`UPDATE users SET score = (SELECT score from users where username='$1')+$2 where username='$1'`, [username, score], cb)

module.exports = {
    userExist,
    checkPassword,
    addUser,
    getQuestions,
    addScore,
    getPass,
    getScore
