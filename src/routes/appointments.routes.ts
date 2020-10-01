import {  Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from "date-fns";
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();



appointmentsRouter.get('/', async (req, res) => {
    try {

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
