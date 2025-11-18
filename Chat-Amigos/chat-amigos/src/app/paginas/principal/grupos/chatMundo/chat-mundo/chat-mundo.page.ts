import { Component, OnInit } from '@angular/core';
import { CalendarService, CalendarEvent } from 'src/app/services/calendar/calendar.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonIcon, IonModal, IonButtons, IonBackButton } from '@ionic/angular/standalone';



@Component({
  selector: 'app-chat-mundo',
  templateUrl: './chat-mundo.page.html',
  styleUrls: ['./chat-mundo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButtons, IonModal, IonIcon, IonButton, IonLabel, IonImg, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton]
})
export class ChatMundoPage implements OnInit {
  today = new Date();
  month = this.today.getMonth(); // 0-11
  year = this.today.getFullYear();
  days: ({ date: Date, iso: string, events: CalendarEvent[] } | null)[] = [];
  currentUserId: string = '';

  constructor(
    private calendarService: CalendarService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.currentUserId = this.authService.getId() || 'desconocido';
    await this.buildMonth(this.year, this.month);
  }

  async buildMonth(year: number, month: number) {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startWeekday = first.getDay(); // 0-dom ... 6-sab
    this.days = [];

    // Rellenar espacios antes del primer día del mes
    for (let i = 0; i < startWeekday; i++) {
      this.days.push(null);
    }

    // Cargar eventos del usuario desde Firebase
    const allEvents = await this.calendarService.getEventsForUser(this.currentUserId);

    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().slice(0, 10);
      const events = allEvents.filter(e => e.date === iso);
      this.days.push({ date, iso, events });
    }
  }

  async prevMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    await this.buildMonth(this.year, this.month);
  }

  async nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    await this.buildMonth(this.year, this.month);
  }

  showDay(day: { date: Date, iso: string, events: CalendarEvent[] } | null) {
    if (!day) return;
    const evs = day.events;
    if (!evs.length) {
      alert(`${day.iso}\nNo tienes tareas este día.`);
      return;
    }
    const list = evs.map(e => `${e.title} (${e.createdBy || 'profesor'})`).join('\n');
    alert(`${day.iso}\n${list}`);
  }

  // Ejemplo: crear una tarea del profesor para un estudiante
  async addExampleEvent() {
    const exampleDate = '2025-11-15';
    await this.calendarService.addEvent({
      date: exampleDate,
      studentId: this.currentUserId, // o un ID específico si eres profe
      title: 'Tarea: Resumen capítulo 3',
      description: 'Entregar en formato PDF',
      createdBy: 'profesor-1'
    });
    await this.buildMonth(this.year, this.month);
    alert('Evento agregado para 2025-11-15');
  }
}