import shortid from 'shortid';

export interface ITransactionInput{
    amount: number;
    id?: string;
    timestamp: number;
    categoryId: string;
    paymentType?: string;
    notes: string;
}

class Transaction {
    amount: number;
    timestamp: number;
    categoryId: string;
    enabled: boolean;
    notes?: string;
    paymentType?: string;
    id: string;

    constructor(transactionInput: ITransactionInput) {
        this.amount = transactionInput.amount;
        this.timestamp = transactionInput.timestamp;
        this.categoryId = transactionInput.categoryId;
        this.notes = transactionInput.notes || "";
        this.enabled = true;
        this.id = transactionInput.id || shortid.generate();
    }
}

export default Transaction;