const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/login",(req,res,next)=>{
    res.send(`<form action="/login" method="post" onsubmit='localStorage.setItem("user",document.getElementById("name").value)'>
    <label for="name">Name</label>
    <input id="name" type="text" name="name">
    <button>Submit</button>
    </form>`);
});
app.post("/login",(req,res,next)=>{
    res.redirect("/");
})

app.get("/",(req,res)=>{
    let ht = fs.readFileSync("msg.txt").toString();

    ht = ht.split("\n");
    ht.pop();
    console.log(ht);

    ht=ht.reduce((acc,e)=>acc+=`<h3>${e}</h3>`,"");
    ht+=(`<form action="/" method="post" onsubmit='document.getElementById("msg").name = localStorage.getItem("user")')>
    <label for="msg">Message</label>
    <input id="msg" type="text" name="">
    <button>Submit</button>
</form>`)
    res.send(ht)
})
app.post("/",(req,res,next)=>{
    if(req.body[null]){
        console.log("inside null");
        res.send("<h1>please Login first</h1><a href='/login'>Login</a>");
        return null;
    } 
    const key = Object.keys(req.body);
    const val =req.body[key];
    fs.appendFile("msg.txt",key+" : "+val+"\n",(e)=>{
        if(e)console.log(e);
    })
    res.redirect("/")
})


app.use("*",(req,res,next)=>{
    res.status(404).send('<h1>404 Page Not Found</h1> <a href="/admin/add-product">home</a>' )
});
app.listen(3000);