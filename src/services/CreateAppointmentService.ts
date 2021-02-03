import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

interface RequestDTO {
    provider: string;
    date: Date;
}

export default class CreateAppointmentService {

    public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
       const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error("This Appointment is already booked");
        }

        const appointment = appointmentsRepository.create({ 
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);


        return appointment;
    }

}
