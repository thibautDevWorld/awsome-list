export class User {
    readonly id: string|null;
    email: string; 
    name: string; 
    avatar: string; 
    pomodoroDuration: number;
     
    constructor(options: {
     id?: string,
     email?: string,
     name?: string,
     avatar?: string,
     pomodoroDuration?: number,
    } = {}) {
     this.id = options.id || null;
     this.email = options.email || '';
     this.name= options.name || '';
     this.avatar = options.avatar || '';
     this.pomodoroDuration = options.pomodoroDuration || 1500;
    }
    
    get roles(): string[] {
     return this.email.endsWith('google.com') ? ['USER', 'EMPLOYEE'] : ['USER'];
    }
    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
   }