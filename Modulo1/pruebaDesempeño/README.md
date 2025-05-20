# Riwi Development Test
Use Case (Epic): As an inventory operations leader, I want a system that allows me to dynamically manage a store's inventory so I can efficiently track available products, their quantities and updated prices, and calculate the total inventory value.

## Principal functionalities:

### Menu.
    Allows the user to pick an option between the displayed list. The menu is going to launch everytime the user ends an action, until the user picks the intended leave menu option.

    Requirements:
    - You can only put numbers, if you type something else, a message will appear specifying you this.
    - The number you put must be between 1 and 6, if you go lower or higher than this, a message will appear specifying this.

### 1. Add a product.
    Lets the user add a product to the list by specifying its name, price, and stock available.

    Requirements:
    - You cannot add a product if it has already been added.
    - You cannot put negative numbers or 0 in the price and stock fields.
    - Yoy cannot put a float value on the stock field, it must be an integer.

    After validating the requirements listed above, the program will add the product with the given properties, it'll also lower caps it, and then capitalize it, making it easier to find later and having a more appropiate display name.

### 2. Search for a product.
    Lets the user put the name of a product he wants to search, and then it'll show the specified product details.
    
    Requirements:
    - You cannot search a product that hasn't been added, if you do so, the program will print that the product is not on the list.

### 3. Update product price.
    Lets the user change the price of a product by typing it's name, then the updated price.

    Requirements:
    - You cannot change the price of a product that hasn't been added.
    - You cannot use negative numbers or 0 in the updated price field.
    - You cannot put a float value in the updated price field, it has to be an integer.

### 4. Delete products.
    Lets the user delete a product by typing it's name.

    Requirements:
    - You cannot delete a product that hasn't been added, if you try to do so, a message specifying this will appear.

### 5. Show total value.
    Shows the total value of all the products on stock.

    Requirements:
    - You must have more than 0 products in stock for it to show the total value.
    - If you have not added products, a message specifying this will apear.


## Usage example:

Data in parentheses () represents user inputs.

### Menu

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (1)

You've chosen the add product option.

Introduce the name of the product you want to add: (Meat)
Introduce the price of the product (It must be more than 0.): (15)

Introduce the amount of available stock of the product (It must be more than 0.): (10)

¡Product added succesfully!
                
### When the user is done with an option, the menu prompts again.

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (2)

You've chosen the search for a product option.
Introduce the name of the product you want to search: (Meat)

Product: Meat
Price: 15
Available stock: 10

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (3)

You've chosen the update product price option.
Introduce the name of the product you want to update its price: (Meat)
            
Introduce the updated price of the product (It must be above 0.): (20)

You have succesfully updated the price of Meat.

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (4)

You've chosen the delete product option.

Introduce the name of the product you want to delete: Meat

You have succesfully deleted the product.

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (1)

You've chosen the add product option.

Introduce the name of the product you want to add: (Beans)
Introduce the price of the product (It must be more than 0.): (20)

Introduce the amount of available stock of the product (It must be more than 0.): (10)

¡Product added succesfully!

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (1)

You've chosen the add product option.

Introduce the name of the product you want to add: (Potato)
Introduce the price of the product (It must be more than 0.): (5)

Introduce the amount of available stock of the product (It must be more than 0.): (50)

¡Product added succesfully!

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (5)

You've chosen the show total value option.
                
The total value of all the products is: 400.0 $

### Done

¡Welcome to the market menu!

Please choose an option.
1. Add product
2. Search product.
3. Update product price.
4. Delete product.
5. Show total value of all products.
6. Leave the menu.

Introduce your option: (6)
You succesfully left the menu.

### End of execution.
        
