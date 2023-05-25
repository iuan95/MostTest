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
    if (!email || !password || !mail1 || !mail2 || !mail0 ||passlenght < 6){
        return res
            .status(401)
            .send({message: "Не корректные данные"})
    }
    try{
        const IsUser = await user.findOne({email:email})
        if (IsUser){
            console.log("Такой пользователь уже есть!")
            return res.send({message: "Такой пользователь уже есть!"})
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
    const hashedPass = bcrypt.compare(password, user1.password);

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
        email: email,
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
            res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err){
            console.log(err)
        }
    })

})

router.post('/editprofile', uVer, async (req, res)=>{
    try{
        const {name, surname, age, phone} = req.body
        console.log(req.user.email)
        const editData = await user.findOne({email: req.user.email})
        editData.surname = surname
        editData.name = name
        editData.phone = phone
        editData.age = age
        await editData.save()

        console.log(name)
        console.log(surname)
        console.log(phone)
        console.log(age)
        res.status(201)
        .send({name: name, surname:surname, phone: phone,age: age, message: "Изменения сохранены"})
    }
    catch(err){
        console.log(err)
        res.status(402)
        .send({message: "Произошло ошибка"})
    }

})
router.get('/getuserdata', uVer, (req, res)=>{
    const person = req.user.email;
    user.findOne({email:person})
    .then((user)=>{
        console.log(user.email)
        res.status(200).send({
            surname: user.surname,
            name: user.name,
            phone: user.phone,
            age: user.age,
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(400)
        .send({message: "Произошло ошибка"})
    })
})

router.post('/logout', uVer,  async (req, res, next)=>{
    const person = req.body.email;
    const delRefresh = await user.findOne({email:person})
    delRefresh.refreshToken = null;
    await delRefresh.save()
    res.status(200).json("Вы вышли из аккаунта.");
})

router.get('/home', uVer, (req, res)=>{
    res.send('Home')
})
router.get('/about', uVer, (req, res)=>{
    res.send(req.user)
})
module.exports = router;