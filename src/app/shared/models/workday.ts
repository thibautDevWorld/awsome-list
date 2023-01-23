import { Task } from './task';

export class Workday {
    readonly id: string|null; // identifiant de la journée de travail
    dueDate: number; // date à laquelle est prévue la journée de travail
    displayDate: string; // date d'affichage de la journée de travail 'jj/mm/aaaa'
    notes?: string; // facultatif : notes éventuelles prises par l’utilisateur
    tasks: Task[]; // la liste des tâches à faire
    userId: string; // identifiant de l’utilisateur
    
    constructor(options: {
     id?: string,
     dueDate?: number,
     displayDate?: string,
     notes?: string,
     tasks?: Task[],
     userId: string  
    }){
     this.id = options.id || null;
     this.dueDate = options.dueDate || 0;
     this.displayDate = options.displayDate || '';
     this.notes = options.notes || '';
     this.tasks = options.tasks || [new Task()];
     this.userId = options.userId;
    }
}