const ORM = require('orange-dragonfly-orm');
const mysql = require('mysql');

class MySQLDriver extends ORM.AbstractDB {

  connect (){
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: this.config.host,
        port: this.config.port || 3306,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        connectTimeout: this.config.connect_timeout || 5000
      });
      connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          this.connection = connection;
          resolve(connection)
        }
      });
    })
  }

  disconnect () {
    if (this.connection) {
      try {
        this.connection.destroy()
      } catch (e) {} finally {
        this.connection = null;
      }
    }
  }

}

module.exports = MySQLDriver
