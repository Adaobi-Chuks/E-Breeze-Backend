export default interface IEvent {
    name: string;
    date: string;
    time: string;
    entry: string;
    eventMode: string;
    registeredUsers: [string];
    id?: string;
}