const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        // Code
        const { name } = req.body
        const brand = await prisma.brand.create({
            data: {
                name: name
            }
        })

        res.send(brand)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!!!" })
    }
}

exports.list = async (req, res) => {
    try {
        // Code
        const brands = await prisma.brand.findMany()
        res.send(brands)
    } catch (err) {
        // err
        console.log(err)
        res.stats(500).json({ message: "Server Error!!!" })
    }
}


exports.remove = async (req, res) => {
    try {
        // Code
        const { id } = req.params
        const brand = await prisma.brand.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(brand)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error!!!" })
    }
}