const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const { blogmodel } = require("./models/blog")



const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://anjaleekrishnaps2001:anjalee2001@cluster0.cnbaf.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)//salt is a constant
    return bcrypt.hash(password, salt)

}




app.post("/signUp", async(req, res) => {

    let input = req.body
    let hashedPassword= await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let blog = new blogmodel(input)
    blog.save()

    res.json({ "status": "success" })


}
)

app.listen(8050, () => {
    console.log("server started")

})

