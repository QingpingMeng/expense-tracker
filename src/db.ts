import Dexie from 'dexie';
import Transaction from './models/transaction';
import Category from './models/category';

//
// Declare DB
///

class ExpenseTrackerDatabase extends Dexie {
    public transactions: Dexie.Table<Transaction, string>; 
    public categories: Dexie.Table<Category, string>;

    public constructor() {
        super("ExpenseTrackerDatabase");
        this.version(1).stores({
            transactions: "&id,categoryId",
            categories: "++id, name"
        });
        this.transactions = this.table("transactions");
        this.categories = this.table("categories");
    }
}

const db = new ExpenseTrackerDatabase();

export default db;