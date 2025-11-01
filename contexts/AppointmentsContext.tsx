import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState, useMemo, useCallback } from 'react';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  professionalId: string;
  professionalName: string;
  professionalImage: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

const APPOINTMENTS_STORAGE_KEY = '@gobeauty_appointments';

export const [AppointmentsProvider, useAppointments] = createContextHook(() => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const saveAppointments = useCallback(async (newAppointments: Appointment[]) => {
    try {
      await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(newAppointments));
      setAppointments(newAppointments);
    } catch (error) {
      console.error('Failed to save appointments:', error);
    }
  }, []);

  const bookAppointment = useCallback(async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [...appointments, newAppointment];
    await saveAppointments(updated);
    return newAppointment;
  }, [appointments, saveAppointments]);

  const updateAppointmentStatus = useCallback(async (id: string, status: AppointmentStatus) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status } : apt
    );
    await saveAppointments(updated);
  }, [appointments, saveAppointments]);

  const cancelAppointment = useCallback(async (id: string) => {
    await updateAppointmentStatus(id, 'cancelled');
  }, [updateAppointmentStatus]);

  const getClientAppointments = useCallback((clientId: string) => {
    return appointments.filter((apt) => apt.clientId === clientId);
  }, [appointments]);

  const getPendingAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.status === 'pending');
  }, [appointments]);

  const getUpcomingAppointments = useCallback((clientId: string) => {
    return appointments.filter(
      (apt) =>
        apt.clientId === clientId &&
        (apt.status === 'pending' || apt.status === 'confirmed') &&
        new Date(apt.date) >= new Date()
    );
  }, [appointments]);

  return useMemo(
    () => ({
      appointments,
      isLoading,
      bookAppointment,
      updateAppointmentStatus,
      cancelAppointment,
      getClientAppointments,
      getPendingAppointments,
      getUpcomingAppointments,
    }),
    [
      appointments,
      isLoading,
      bookAppointment,
      updateAppointmentStatus,
      cancelAppointment,
      getClientAppointments,
      getPendingAppointments,
      getUpcomingAppointments,
    ]
  );
});
