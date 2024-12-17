import 'dotenv/config';
import express, {Request, Response} from 'express'
import prisma from './config/db'; // Database connection
const app = express()


app.use(express.json())

app.get('/',(req:Request, res: Response) => {
        res.send('College Appointment System API is running...')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
        try{
        await prisma.$connect();
        console.log('✅ Database connected successfully');
        console.log(`🚀 Server is running on http://localhost:${PORT}`)
        }catch(error){
                console.error('❌ Database connection failed:', error);
        }
})

export default app;

