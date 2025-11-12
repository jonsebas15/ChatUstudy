import { Injectable } from '@angular/core';
import { getDatabase, ref, push, get, remove, child, set } from 'firebase/database';

export interface CalendarEvent {
    id: string;
    date: string; // ISO yyyy-mm-dd
    studentId: string;
    title: string;
    description?: string;
    createdBy?: string; // profesor id
    createdAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

  private db = getDatabase(); // referencia a la base de datos Firebase
  private basePath = 'calendarEvents'; // carpeta raíz donde guardaremos los eventos

  constructor() {}

  // 🔹 Agregar un evento
  async addEvent(event: Omit<CalendarEvent, 'id' | 'createdAt'>) {
    const newRef = push(ref(this.db, this.basePath));
    const newEvent: CalendarEvent = {
      ...event,
      id: newRef.key || '',
      createdAt: new Date().toISOString()
    };
    await set(newRef, newEvent);
    return newEvent;
  }

  // 🔹 Obtener todos los eventos
  async getAllEvents(): Promise<CalendarEvent[]> {
    const snapshot = await get(ref(this.db, this.basePath));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    }
    return [];
  }

  // 🔹 Obtener los eventos de un estudiante específico
  async getEventsForUser(studentId: string): Promise<CalendarEvent[]> {
    const events = await this.getAllEvents();
    return events.filter(e => e.studentId === studentId);
  }

  // 🔹 Obtener los eventos creados por un profesor
  async getEventsByProfessor(professorId: string): Promise<CalendarEvent[]> {
    const events = await this.getAllEvents();
    return events.filter(e => e.createdBy === professorId);
  }

  // 🔹 Obtener los eventos de una fecha
  async getEventsForDate(dateIso: string): Promise<CalendarEvent[]> {
    const events = await this.getAllEvents();
    return events.filter(e => e.date === dateIso);
  }

  // 🔹 Eliminar un evento
  async removeEvent(id: string) {
    const eventRef = ref(this.db, `${this.basePath}/${id}`);
    await remove(eventRef);
  }
}