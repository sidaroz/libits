const db = require('../db_config/config');

class User {
    constructor(data) {
        this.username = data.username
        this.email = data.email
        this.password_set = data.password_set
    }


    static createUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const {username, email, password_set} = data
                // console.log(data)
                let userData = await db.query(`INSERT INTO users (username, email, password_set) VALUES ($1, $2, $3) RETURNING *;`, [ username, email, password_set] )
                let user = new User(userData.rows[0])
                // console.log(user)
                resolve(user)
            } catch (err) {
                reject(`Error making user`)
                
            }

        })
    
    }

    static findByEmail (email) {
        return new Promise(async (resolve, reject) => {
            try{
                let userData = await db.query('SELECT * FROM users WHERE email = $1;', [ email ])
                let user = new User(userData.rows[0])
                resolve(user)
            } catch (err) {
                reject('Error retrieving user')
            }
        })
    }
}

module.exports = User