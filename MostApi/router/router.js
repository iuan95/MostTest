const router = require("express").Router()
const user = require('../models/user');
const at = require('../auth/generateAccessToken')
const rt = require('../auth/generateRefreshToken') 
const uVer = require('../auth/userverify') 
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')


router.post('/signup', async (req, res, next)=>{
    const {email, password} = req.body
    console.log(email)
    console.log(password)
    const mail0 = email.split('@')[1]
    const mail1 = email.split('@')[1]
    const mail2 = email.split('.')[1]
    const passlenght = password.length
    if (!email || !password || !mail1 || !mail2 || !mail0 ||passlenght < 8){
        return res
            .status(401)
            .send({mess: "Не корректные данные"})
    }
    try{
        const IsUser = await user.findOne({email:email})
        if (IsUser){
            res.status(401).json({message: "Такой пользователь уже есть!"})
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10)
            const result =  await user.create({email: email, password: hashedPassword})
            await result.save()
            res.status(201).send({mess: "Вы зарегестрированы на сайте!"})
        }



    }
    catch (err){
        console.log(err)
        res.status(401).send({mess: "Ошибка при регистрации!"})
    }
})

router.post('/login',async (req, res, next)=>{
    const {email, password} = req.body;
    const user1 =  await user.findOne({email: email})
    const hashedPass = await bcrypt.compare(password, user1.password);

    if(!user1){
        return res.send("Пользователь не найден")
    }
    if (!hashedPass){
        return res.send("Пароль не верный")
    }
    const accessToken = at(user1)
    const refreshToken = rt(user1)
    user1.refreshToken = refreshToken
    user1.save()
    res.send({
        user: email,
        accessToken: accessToken,
        refreshToken: refreshToken
    })
})

router.post('/refresh', async (req, res)=>{
    const refTok = req.body.token
    console.log(refTok)
    if(!refTok){
        res.send("Вы не...")
    }
    jwt.verify(refTok, "222222222222222222222222", async (err, user1)=>{
        if (err){
            console.log(err)
        }
        try{
            const findedUser = await user.findOne({email: user1.email})
            if (!findedUser) {return res.send("Такого пользователя нет")}
            if (refTok !== findedUser.refreshToken){
                return res.send("Токены не подходят")
            }
            const accessToken = at(findedUser)
            const refreshToken = rt(findedUser)
            findedUser.refreshToken = refreshToken
            await findedUser.save()
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err){
            console.log(err)
        }
    })

})


router.post('/logout', uVer,  async (req, res, next)=>{
    const person = req.body.email;
    const delRefresh = await user.findOne({email:person})
    delRefresh.refreshToken = null;
    // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("Вы вышли из аккаунта.");
})
router.get('/home', uVer, (req, res)=>{
    res.send('Home')
})
router.get('/about', uVer, (req, res)=>{
    res.send(req.user)
})
module.exports = router;