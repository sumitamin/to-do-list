const db = require("../config/dbConnection");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const globalConfig = require("../config/config");

module.exports = {
  async signUp(req, res) {
    try {
        const failedMessage = {
            message:'Something went wrong',
            status: false
        }
        const {email, password} = req.body
        db.query(`SELECT * FROM user WHERE email='${email}';`, async (error, results, fields) => {
            if (error) return res.json(failedMessage)

            if (results && results[0]){
                return res.json({
                    message: 'User already registered',
                    status: false
                })
            }

            const rounds = 10;
            const hash = await bcrypt.hash(password, rounds);
    
            db.query(`INSERT INTO user (email, password) values ('${email}', '${hash}');`, async (err, r, f) => {
                if (err) return res.json(failedMessage)

                db.query(`SELECT id from user WHERE email='${email}';`, async (e, r, f) => {

                    if (e) return res.json(failedMessage)
                    const token = jwt.sign({
                        id: r[0].id,
                        email: email},
                        globalConfig.jwtSecretKey,
                      { expiresIn: globalConfig.jwtExpireToken }
                  );
  
                  db.query(`UPDATE user SET token='${token}' WHERE email='${email}';`, async (e, r, f) => {
    
                      if (e) return res.json(failedMessage)

                      return res.json({
                          message:'User Registered Successfully',
                          token,
                          status: true,
                      })
                    })
                })
            
            });
    
        });
        
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
  },
  async logIn(req, res) {
    try {
        const failedMessage = {
            message:'Something went wrong',
            status: false
        }

        const {email, password} = req.body

        db.query(`SELECT * FROM user WHERE email='${email}';`, async (e, r, f) => {
            if (e) return res.json(failedMessage)

            if (!r || !r[0]){
                return res.json({
                    message: 'User Not Found',
                    status: false
                })
            }

        if (bcrypt.compareSync(password, r[0].password)) {
            returnData = {
                message: 'success',
                status: true,
                token: r[0].token
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }

        return res.json(returnData)

        })

    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async addTask(req, res) {
    const failedMessage = {
        message:'Something went wrong',
        status: false
    }
    try {
        const {name, bucket} = req.body
        const {id} = req.user
        db.query(`SELECT * from bucket where id = '${bucket}';`, async (e, r, f) => {
            if (e) return res.json(failedMessage)

            if (!r || !r[0]){
            db.query(`INSERT INTO bucket (name) values ('${bucket}');`, async (e, r, f) => {

                if (e) return res.json(failedMessage)
                db.query(`SELECT * from bucket where name = '${bucket}';`, async (e, r, f) => {
                    if (e || !f || !f[0]) return res.json(failedMessage)
                    
                    db.query(`INSERT INTO toDo (bucket, name, userid, complete, isDelete) values (${r[0].id},'${name}',${id}, false, false);`, async (e, re, fe) => {
                    
                            if (e) return {
                                message: 'Could not add to do',
                                status: false,
                            }
                    
                            return res.json({
                                message: 'Task added',
                                status: true,
                                bucket:r[0].id,
                                task:name,
                                complete:false,
                                isDelete:false,
                                newBucket:{
                                    id:r[0].id,
                                    name:bucket
                                }
                            })
                        })

                })
            })
        }else{

            db.query(`INSERT INTO toDo (bucket, name, userid, complete, isDelete) values (${r[0].id},'${name}',${id}, false, false);`, async (e, r, f) => {
            
                if (e) return {
                    message: 'Could not add to do',
                    status: false,
                }
        
                return res.json({
                    message: 'Task added',
                    status: true,
                    bucket,
                    task:name,
                    complete:false,
                    isDelete:false
                })
            })
        }
    })

    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async deleteTask(req, res) {
      
    try {
        const {task} = req.body
        db.query(`DELETE FROM toDo WHERE id=${task};`, async (e, r, f) => {
            if (e) return res.json(failedMessage)

            return res.json({
                message: 'success',
                status: true,
            })
        })
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async updateTask(req, res) {
    const failedMessage = {
        message:'Something went wrong',
        status: false
    }
    try {

        const {complete, name, id, bucket} = req.body

        db.query(`UPDATE toDo set complete = ${complete}, name = '${name}', bucket = '${bucket}' WHERE id=${id};`, async (e, r, f) => {
            if (e) return res.json(failedMessage)

            return res.json({
                message: 'success',
                status: true,
            })
        })
        
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async fetchTask(req, res) {
    const failedMessage = {
        message:'Something went wrong',
        status: false
    }
    try {
        const {id} = req.user
        
        db.query(`SELECT * FROM toDo WHERE userid=${id};`, async (e, r, f) => {
            if (e) return res.json(failedMessage)
            let result = {task:[...r]}

            db.query(`SELECT * FROM bucket;`, async (e, r, f) => {
                if (e) return res.json(failedMessage)

                result = {...result, bucket:[...r]}

                return res.json({...result, status: true, message:'success'})

            })
        })
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
}
