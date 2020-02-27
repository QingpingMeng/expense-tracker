import Dexie from 'dexie';
import Transaction from './models/transaction';
import Category, { builtInCategories } from './models/category';
import { differenceWith } from 'lodash-es'

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
            categories: "++id, &name, type"
        });
        this.transactions = this.table("transactions");
        this.categories = this.table("categories");
    }

    public async initCategory() {
        const builtInCategoriesFromDb = await this.categories.where('type').equals(1).toArray();

        const diff = differenceWith(builtInCategories, builtInCategoriesFromDb, (x, y) => x.name !== y.name);

        if (diff.length !== 0) {
            await this.categories.bulkAdd([...diff])
        }
    }
}

const db = new ExpenseTrackerDatabase();

export default db;