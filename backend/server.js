const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = "mongodb+srv://Contact_ListDB:2512@cluster0.5eajmkh.mongodb.net/contactsDB?retryWrites=true&w=majority";

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

mongoose.connect(dbURI)
    .then(async () => {
        console.log("Connected to MongoDB Atlas Successfully! ✅");

        const count = await Contact.countDocuments();
        if (count === 0) {
            console.log("Database is empty, inserting initial contacts...");
            await Contact.insertMany([
                { name: "Ahmed Ali", email: "ahmed@example.com", phone: "0123456789" },
                { name: "Sara Mohamed", email: "sara@example.com", phone: "0987654321" },
                { name: "John Doe", email: "john@example.com", phone: "111222333" },
                { name: "Laila Hassan", email: "laila@example.com", phone: "0100000001" },
                { name: "Mahmoud Saad", email: "mahmoud@example.com", phone: "0111111112" },
                { name: "Mona Zaki", email: "mona@example.com", phone: "0122222223" },
                { name: "Omar Sherif", email: "omar@example.com", phone: "0155555554" },
                { name: "Hoda Ibrahim", email: "hoda@example.com", phone: "0123987456" }
            ]);
            console.log("Contacts inserted successfully!");
        }

        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error: ❌", err);
        process.exit(1); 
    });

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching data" });
    }
});