import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError'

interface RequestDTO {
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService {

    public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
       const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError("This Appointment is already booked");
        }

        const appointment = appointmentsRepository.create({ 
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);


        return appointment;
    }

}

