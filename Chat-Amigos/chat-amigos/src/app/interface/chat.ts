export interface Chat {
    senderId:string;
    message:string;
    name:string | null;
    type: string;
    isAcademic: boolean;
    timestamp: number;
    isCurrentUser?: boolean;
    id?:string;
    
}
