export default interface ITrainingItem {
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: "Not Started" | "In Progress" | "Completed";
}