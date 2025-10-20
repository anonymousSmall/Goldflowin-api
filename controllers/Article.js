const prisma = require('../config/prisma')
const cloudinary = require('cloudinary').v2;


//Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.create = async (req, res) => {
    try {
        // Code
        const { name, description, Images } = req.body
        // console.log(name, description, price, quantity, images)
        const article = await prisma.Article.create({
            data: {
                name: name,
                description: description,
                Images: {
                    create: Images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(article)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error!!!!" })
    }
}

exports.list = async (req, res) => {
    try {
        const articles = await prisma.article.findMany()
        res.send(articles)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!!!" })
    }
}

exports.remove = async(req,res)=>{
        try {
        // Code
        const { id } = req.params
        const articles = await prisma.article.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(articles)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!!!" })
    }
}

exports.createImages = async (req, res) => {
    try {
        // Code
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `GF-Article-${Date.now()}`,
            resource_type: 'auto',
            folder: 'GF-Article'
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error!!!" })
    }
}

exports.removeImage = async (req, res) => {
    try {
        //Code
        const { public_id } = req.body
        //console.log(public_id)
        cloudinary.uploader.destroy(public_id, (result) => {
            res.send('Remove Image Success!!!')
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!!" })
    }
}