import { response, Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (req, res) => {
    const appointments = appointmentsRepository.all();

    return res.json(appointments)
})

appointmentsRouter.post('/', (req, res) => {

    try {

        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({
            date: parsedDate, provider
        });

        return res.json(appointment);
    } catch (error) {
        return response.status(400).json({error: error});
    }


})



export default appointmentsRouter;
