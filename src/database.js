import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/companydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB is connected')).catch(error => console.log('Error connecting' + error));