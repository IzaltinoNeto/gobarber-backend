import { response, Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();



appointmentsRouter.post('/', (req, res) => {
    const { provider, date} = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);


    if(findAppointmentInSameDate) {
        return response.status(400).json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);
    return res.json({});
})

export default appointmentsRouter;
