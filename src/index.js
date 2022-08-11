import express from 'express';
import morgan from 'morgan';
import v1UserRouter from './v1/routes/usersRoutes';
import v1AuthRouter from './v1/routes/authRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/auth', v1AuthRouter);



app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });