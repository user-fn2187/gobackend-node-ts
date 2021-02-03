import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentList = await appointmentsRepository.find();
    response.json(appointmentList);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ provider, date: parseDate });

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({error: error.message})
    }
});

export default appointmentsRouter;