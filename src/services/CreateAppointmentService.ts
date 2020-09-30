
import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request{
    date: Date;
    provider: string;
}

class CreateAppointmentService{

    constructor(private appointmentsRepository:AppointmentsRepository ) {

    }


    public execute({date, provider}:Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(date);


        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({provider, date: appointmentDate});

        return appointment;
    }
}

export default CreateAppointmentService;
