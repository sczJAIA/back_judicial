import express from 'express';
import morgan from 'morgan';
import v1UserRouter from './v1/routes/usersRoutes';
import v1BusinessRouter from './v1/routes/businessRoutes';
import v1AuthRouter from './v1/routes/authRoutes';
import v1VariableListRouter from './v1/routes/variableListRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/business', v1BusinessRouter);
app.use('/api/v1/variable_list', v1VariableListRouter);



app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });