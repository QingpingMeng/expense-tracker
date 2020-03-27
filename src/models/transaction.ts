import shortid from 'shortid';
import dayjs from 'dayjs';

export interface ITransactionInput {
    amount: number;
    id?: string;
    timestamp: number;
    categoryId: string;
    paymentType?: string;
    notes: string;
}

export interface ITransaction {
    amount: number;
    timestamp: number;
    categoryId: string;
    enabled: boolean;
    notes?: string;
    paymentType?: string;
    id: string;
}

class Transaction implements ITransaction {

    public get dateString(): string {
        return dayjs(this.timestamp).format('YYYY-MM-DD');
    }

    public static fromJson(data: ITransaction) {
        const dummyIntput: ITransactionInput = {
            amount: 0,
            timestamp: Date.now(),
            categoryId: '1',
            notes: '',
        };
        const instance = new this(dummyIntput);
        return Object.assign(instance, data);
    }
    public amount: number;
    public timestamp: number;
    public categoryId: string;
    public enabled: boolean;
    public notes?: string;
    public paymentType?: string;
    public id: string;

    constructor(transactionInput: ITransactionInput) {
        this.amount = transactionInput.amount;
        this.timestamp = transactionInput.timestamp;
        this.categoryId = transactionInput.categoryId;
        this.notes = transactionInput.notes || '';
        this.enabled = true;
        this.id = transactionInput.id || shortid.generate();
    }
}

export default Transaction;
