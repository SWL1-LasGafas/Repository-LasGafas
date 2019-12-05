export class Message {
    public nickname:string = '';
    public message:string = '';
    public date:string = '';
    public hash:string = '';
    // Ausfüllen lokal; nicht auf dem REST-Server
    public color:string = ''; // nickname color
    public position:string = ''; // left, right
}
