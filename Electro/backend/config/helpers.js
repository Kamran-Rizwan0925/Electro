let  Mysqli  =  require ( 'mysqli' )

let  conn  =  new  Mysqli ( { 
    host : process.env.DB_HOST ,  // IP/domain name 
    post : process.env.DB_PORT ,  //port, default 3306 
    user : process.env.DB_USER ,  //user name 
    passwd : process.env.DB_PASS ,  //password 
    charset : '' ,  // Database encoding, default utf8mb4 [Optional] 
    db : process.env.DB_NAME  // You can specify the database or not [Optional] 
  } )

let db = conn.emit(false, '' )

module.exports = {
    database: db
};