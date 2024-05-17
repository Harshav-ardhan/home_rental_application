const express = require('express');
const cors = require('cors');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose');
const cookieparser = require('cookie-parser')
const app = express();
const User = require('./models/User.js')
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const place = require('./models/Places.js');
const Booking =require('./models/booking.js');

require('dotenv').config();

const jwtsecret = 'rkbbbfguijkbsdfaweuodfhiew';
app.use(express.json());
app.use(cookieparser());
app.use('/uploads', express.static(__dirname+'/uploads'));
const bcryptSalt = bycrpt.genSaltSync(10);

function getUserDataFromToken(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token,jwtsecret,{},async(err,userdata)=>{
            if(err)throw err;
            resolve(userdata);
        })
    })
}


app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

app.get('/test',(req,res)=>{
    res.json('ok')
})

mongoose.connect(process.env.MONGO_URL)

app.post('/register', async(req,res)=>{
    const {name,email,password}= req.body;

    try{
        const userdoc = await User.create({
            name,
            email,
            password:bycrpt.hashSync(password, bcryptSalt),
        });
        res.json(userdoc)
    }
    catch(e){
        res.status(422).json(e)
    }
});

app.post('/login', async(req,res)=>{
    const {email,password} = req.body
    const userdoc = await User.findOne({email});
    console.log(userdoc);
    if(userdoc){
        const passlock = bycrpt.compareSync(password,userdoc.password);
        if(passlock){
            jwt.sign({email:userdoc.email, id:userdoc._id,},jwtsecret,{},(err,token)=>{
                if(err){
                    throw err;
                }
                console.log('hi')
                res.cookie('token',token).json(userdoc);
            })
           
        }
        else{
            res.status(422).json("pass not ok")
        }
    }
    else{

        res.json('not found');
    }
})
app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtsecret,{},async(err,userdata)=>{
            if(err){
                throw(err);
            }
            const {name,email,_id} = await User.findById(userdata.id);
            res.json({name,email,_id})
        })
    }
    else{
        res.json(null);
    }
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async(req,res)=>{
    const {link} = req.body;
    //console.log(link);
    const newName = 'photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url: link,
        dest:  __dirname + '/uploads/' +newName,
    });
    res.json(newName)
})
const photosmiddleware = multer({dest:'uploads'})
 
app.post('/upload', photosmiddleware.array('photos',100), (req,res)=>{
const uploadedfiles = [];
   for(let i=0;i<req.files.length;i++){
    const {path,originalname}= req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newpath = path + '.' +ext;
    fs.renameSync(path,newpath);
    uploadedfiles.push(newpath.replace('uploads',''))
   }
    res.json(uploadedfiles);
})

app.post('/places', (req,res)=>{
    //mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuest,price} = req.body;
        console.log({title})
    jwt.verify(token,jwtsecret,{},async(err,userdata)=>{
        if(err){
            throw(err);
        }
        
        const placeDoc = await place.create({
            owner:userdata.id,
            title,address,Photos:addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuest,price
        });
        res.json(placeDoc)
    });
});

app.get('/places-user',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtsecret,{},async(err,userdata)=>{
        const {id} = userdata;
        //console.log(id);
        res.json(await place.find({owner:id}));
    })
})

app.get('/places/:id', async(req,res)=>{
    console.log("hello")
    const {id}= req.params;
    res.json(await place.findById(id));
})

app.put('/places', async(req,res)=>{
    const {token}= req.cookies;
    console.log("odfn")
    const{id,title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuest,price} = req.body;
    jwt.verify(token,jwtsecret,{},async(err,userdata)=>{
        //if(err) throw err;
        const placedoc = await place.findById(id);
        if(userdata.id === placedoc.owner.toString()){
            placedoc.set({title,address,Photos:addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuest,price})
        }
        await placedoc.save();
        res.json('ok');
    })
})

app.get('/places', async(req,res)=>{
    res.json(await place.find());
})

app.post('/booking', async(req,res)=>{
    const userdata = await getUserDataFromToken(req);
    const {place,checkIn,checkOut,name,phone,price}=req.body;
    Booking.create({
        place,checkIn,checkOut,name,phone,price,user:userdata.id
    }).then((doc)=>{
        res.json(doc)
    })
})


app.get('/bookings',async(req,res)=>{
    const userdata = await getUserDataFromToken(req);
    res.json(await Booking.find({user:userdata.id}).populate('place'));
})



app.listen(4000);
