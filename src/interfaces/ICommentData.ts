export default interface ICommentData {
    id: symbol;
    value: string;
    level: number;
    replies?: ICommentData[]
}