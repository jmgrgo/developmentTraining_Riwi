products = [{"name": "Beans", "price": 20, "availableStock": 20},
            {"name": "Meat", "price": 30, "availableStock": 30},
            {"name": "Grapes", "price": 10, "availableStock": 50},
            {"name": "Gold", "price": 150, "availableStock": 60},
            {"name": "Silver", "price": 100, "availableStock": 100}]

### Function to find products on the list.
def listReader(productName):
    for product in products:
        if product["name"].lower() == productName.lower():
            return product
    return None 

### Function to add products.
def addProduct(productName, productPrice, productStock):
    products.append({
        "name":productName, 
        "price":productPrice,
        "availableStock":productStock,
    })

### Function to print details of the specified product.
def searchProduct(productName):
    product = listReader(productName)
    if product:
        print(f"\nProduct: {product["name"]}\nPrice: {product["price"]} $\nAvailable stock: {product["availableStock"]} units.\n")
        
### Function to update the price of the product.       
def updateProduct(productName, productPrice):
    product = listReader(productName)
    product["availableStock"] = productPrice

### Function to delete the product.
def deleteProduct(productName):
    product = listReader(productName)
    products.remove(product)

### Main loop
while True:
    
    ### Try to verify that the input the user is a float.
    try:
        print("="*50)
        option = int(input(f"\n¡Welcome to the market menu!\n\nPlease choose an option.\n\n1. Add product.\n2. Search product.\n3. Update product price.\n4. Delete product.\n5. Show total value of all products.\n6. Leave the menu.\n\nIntroduce your option: "))
        print()

        ### Add a product
        if option == 1:
            print(f"="*50)
            print(f"\nYou've chosen the add product option.\n")
            productName = input("Introduce the name of the product you want to add: ").strip()
            
            if listReader(productName) not in products:

                ### Data type validation, and range validation for price and stock.
                while True:
                        try:
                            productPrice = float(input(f"\nIntroduce the price of the product (It must be more than 0.): "))
                            if productPrice <= 0:
                                print("The price must be more than 0.")
                            else:
                                break
                        except ValueError:
                            print("You must introduce a number, try again.")

                while True:
                        try:
                            productStock = int(input(f"\nIntroduce the amount of available stock of the product (It must be more than 0.): "))
                            if productStock < 0:
                                print("The stock must be more than 0.")
                            else:
                                break
                        except ValueError:
                            print("You must introduce a integer number, try again.")
                            
                ### Function add product.
                addProduct(productName.lower().capitalize(), productPrice, productStock)
                print(f"\n¡Product added succesfully!\n")
                print(products)
                
            else:
                print(f"\nThe product {productName} has already been added.\n")

        ### Search for a product.
        elif option == 2:
            print("="*50)
            print(f"\nYou've chosen the search for a product option.\n")
            productName = input("Introduce the name of the product you want to search: ").strip()

            ### If conditional to verify that product is on the list
            if listReader(productName.capitalize()) != None:
                
                ### Function search product.
                searchProduct(productName)
            else:
                print(f"\nThe product {productName} has not been added, try again.\n")
        
        ### Update product price.
        elif option == 3:
            print("="*50)
            print(f"\nYou've chosen the update product price option.\n")
            productName = input("Introduce the name of the product you want to update its price: ").strip()
            
            ### If conditional to verify that product is on the list
            if listReader(productName.capitalize()) != None:
                
                ### Data type and range validation for product price.
                while True:
                    try:
                        productPrice = float(input(f"\nIntroduce the updated price of the product (It must be above 0.): "))
                        if productPrice <= 0:
                            print("The price must be more than 0.")
                        else:
                            break
                    except ValueError:
                        print("You must introduce a number, try again.")

                ### Function update product.
                updateProduct(productName, productPrice)
                print(f"\nYou have succesfully updated the price of {productName}.\n")
            else:
                print(f"\nThe product {productName} has not been added, try again.\n")
        
        ### Delete a product.
        elif option == 4:
            print("="*50)
            print(f"\nYou've chosen the delete product option.\n")
            productName = input("Introduce the name of the product you want to delete: ")

            ### If conditional to verify that product is on the list
            if listReader(productName.capitalize()) != None:
                
                ### Delete product function
                deleteProduct(productName)
                print(f"\nYou have succesfully deleted the product.\n")
            else:
                print(f"\nThe product {productName} has not been added, try again.\n")
                         
        ### Show total value.                         
        elif option == 5:
                print("="*50)
                print(f"\nYou've chosen the show total value option.")
                
                ### Lambda function to calculate the total value of all products (Product price * Product stock). )
                totalValue = lambda products: sum(product["price"] * product["availableStock"] for product in products)
                
                ### If conditional to verify that the products list is not empty.
                if len(products) > 0:
                    print(f"\nThe total value of all the products is: {totalValue(products)} $.\n")
                else:            
                    print(f"\nYou have not added products.\n")
        
        ### Leave menu.
        elif option == 6:
            print("You succesfully left the menu.")
            break

    except ValueError:
        print(f"\nYou must introduce a number.\n")
