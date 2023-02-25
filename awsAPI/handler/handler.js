import mysql from 'mysql';

const HOST = "";
const USERNAME = "";
const PASSWORD = "";
const DATEBASE = "";

const connect = () => {
    let connection = mysql.createConnection({host:HOST, user:USERNAME, password:PASSWORD, database:DATEBASE});
    return connection;
}

const query = async (query) => {
    const con = connect();
    return new Promise((resolve,reject) =>{
        con.connect((err)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(con);
        })
    }).then(conn => 
        new Promise((resolve,reject) =>{
            conn.query(query,(err,result,fields)=>{
                if(err) {
                    reject(err);
                    return;
                }
                
                resolve(result);
            })
            conn.end()
        })).catch(err => console.log(err));
}

export default query;