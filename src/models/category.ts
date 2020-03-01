enum CategoryType{
    Custom,
    Native
}

class Category {
    name: string;
    icon: string;
    id!: string;
    type: CategoryType;

    constructor(name: string, icon: string, type: CategoryType = CategoryType.Native){
        this.name = name;
        this.icon = icon;
        this.type = type;
    }
}

export const builtInCategories = [
    new Category('Food', 'food'), 
    new Category("Shopping","cart"), 
    new Category('Beverage', 'coffee'),
    new Category('Gas', 'gas-station'),
    new Category('Transport', 'train-car'),
    new Category('Travel', 'image-filter-hdr'),
    new Category('Clothes', 'tshirt-crew'),
    new Category('Payment', 'credit-card'),
    new Category('Rental', 'home-city'),
    new Category('Medical', 'medical-bag'),
    new Category('Grocery', 'basket'),
    new Category('Education', 'school'),
    new Category('Furniture', 'dresser'),
    new Category('Gift', 'gift'),
    new Category('Utility', 'trash-can'),
    new Category('Repair', 'wrench'),
    new Category('Amusement', 'music')
]

export default Category;