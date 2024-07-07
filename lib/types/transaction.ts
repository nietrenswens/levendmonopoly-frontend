export default interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  datetime: string;
  message: string;
}
