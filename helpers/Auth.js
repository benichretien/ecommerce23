import bcrypt from "bcrypt";
// pour crypter le password de l'user
export const hashpassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(12,(err, salt)=>{
            if (err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
};
// comparer le passw de l'user avec celui dans le database
export const comparePassword = (password, hashed)=>{
    return bcrypt.compare(password,hashed);
}