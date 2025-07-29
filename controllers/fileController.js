import Files from "../models/fileModel.js";

export const getFiles = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getFileById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createFile = async (req, res) => {
    try {
        const { id } = res.locals.user

        if (!id) return res.status(401).json({ message: 'Invalid user' })
        
        if (!req.file || !req.file.path) return res.status(400).json({ message: "No file uploaded" })

        const path = req.file.path.replace(/\\/g, '/')

        const file = await Files.create({ user: id, file: path })

        res.status(200).json({ message: "file uploaded successfully", file })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateFileById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteFileById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}