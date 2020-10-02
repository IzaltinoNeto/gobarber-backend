import {  Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from "date-fns";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (req, res) => {
    try {
        console.log(req.user)
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointments = await appointmentsRepository.find();

        return res.json(appointments)
    } catch (error) {
        return res.status(400).json({error})
    }

})

appointmentsRouter.post('/', async (req, res) => {
     try {

        const { provider_id, date } = req.body;


        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate, provider_id
        });

        return res.json(appointment);
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }


})



export default appointmentsRouter;
