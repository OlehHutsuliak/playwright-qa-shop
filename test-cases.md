# Swag Labs Test Cases

## setup.spec.ts

### Authenticate user

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter valid username and password.
  2. Click on the login button.
- Expected Result:
  - User successfully logs in and is redirected to the homepage.

## login.spec.ts

### Successful login using valid credentials

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter valid username and password.
  2. Click on the login button.
- Expected Result:
  - User successfully logs in and is redirected to the homepage.

### Denied access with invalid credentials

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter unexisting user credentials.
  2. Click on the login button.
- Expected Result:
  - User is denied access and an error message is displayed.

### Denied access with locked out user credentials

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter locked out user credentials.
  2. Click on the login button.
- Expected Result:
  - User is denied access due to being locked out and an appropriate error message is displayed.

### Validation error message when the username field is left empty

- Preconditions:
  - User is on the login page.
- Steps:
  1. Leave the username field empty.
  2. Enter a valid password.
  3. Click on the login button.
- Expected Result:
  - Validation error message is displayed for the empty username field.

### Validation error message when the password field is left empty

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter a valid username.
  2. Leave the password field empty.
  3. Click on the login button.
- Expected Result:
  - Validation error message is displayed for the empty password field.

### Successful logout from the user account

- Preconditions:
  - User is on the login page.
- Steps:
  1. Enter a valid username.
  2. Enter a valid password.
  3. Click on the login button.
  4. Ensure user is redirected to the homepage.
  5. Open sideBar
  6. Click on the logout button.
- Expected Result:
  - User is successfully logged out and redirected to the login page.

## productBrowsing.spec.ts

### Default products number display on Home Page

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Verify the number of products displayed on the home page.
- Expected Result:
  - The number of products displayed matches the default expected number.

### Products filtering

#### Filter Products by Name ASC

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Get the names of all products displayed on the home page.
  2. Sort the product names in ascending order.
  3. Apply the filter option to sort products by name in ascending order.
  4. Get the names of products after applying the filter.
- Expected Result:
  - The names of products displayed after applying the filter match the sorted names in ascending order.

#### Filter products by Name DESC

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Get the names of all products displayed on the home page.
  2. Sort the product names in descending order.
  3. Apply the filter option to sort products by name in descending order.
  4. Get the names of products after applying the filter.
- Expected Result:
  - The names of products displayed after applying the filter match the sorted names in descending order.

#### Filter products by Price ASC

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Get the prices of all products displayed on the home page.
  2. Sort the product prices in ascending order.
  3. Apply the filter option to sort products by price in ascending order.
  4. Get the prices of products after applying the filter.
- Expected Result:
  - The prices of products displayed after applying the filter match the sorted prices in ascending order.

#### Filter Products by Price DESC

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Get the prices of all products displayed on the home page.
  2. Sort the product prices in descending order.
  3. Apply the filter option to sort products by price in descending order.
  4. Get the prices of products after applying the filter.
- Expected Result:
  - The prices of products displayed after applying the filter match the sorted prices in descending order.

## cartManaging.spec.ts

### Adding product to Cart

#### Adding products to Cart from Home Page

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Add 'Product A' to the cart.
  2. Add 'Product B' to the cart.
  3. Open the cart.
- Expected Result:
  - The shopping cart badge displays '2'.
  - There are two products in the cart: 'Product A' and 'Product B'.

#### Adding Products from Product Details Page:

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Open the details page of 'Product A'.
  2. Add the product to the cart.
  3. Open the cart.
- Expected Result:
  - The shopping cart badge displays '1'.
  - There is one product in the cart: 'Product A'.

### Removing product from Cart

#### Removing products while being on Home Page

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Add 'Product C', 'Product D', and 'Product E' to the cart.
  2. Remove 'Product C' from the cart.
  3. Open the cart.
- Expected Result:
  - The shopping cart badge displays '2'.
  - Products left in the cart are 'Product D' and 'Product E'.

#### Removing product while being on Product Details Page

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Add 'Product C', 'Product D', and 'Product E' to the cart.
  2. Open the details page of 'Product C' and remove it from the cart.
  3. Open the details page of 'Product D' and remove it from the cart.
  4. Open the cart.
- Expected Result:
  - The shopping cart badge displays '1'.
  - The product left in the cart is 'Product E'.

#### Removing product while being on Cart Page

- Preconditions:
  - User is logged in and on the home page.
- Steps:
  1. Add 'Product C', 'Product D', and 'Product E' to the cart.
  2. Open the cart.
  3. Remove 'Product E' and 'Product C' from the cart.
- Expected Result:
  - The shopping cart badge displays '1'.
  - The product left in the cart is 'Product D'.

## checkout.spec.ts

### Checkout personal data fields validation

#### FirstName field validation

- Preconditions:
  - User is logged in and has added a product to the cart.
- Steps:
  1. Proceed to checkout.
  2. Leave the first name field empty.
  3. Attempt to proceed to the next step of checkout.
- Expected Result:
  - Validation error message is displayed for the empty first name field.

#### LastName field validation

- Preconditions:
  - User is logged in and has added a product to the cart.
- Steps:
  1. Proceed to checkout.
  2. Enter a valid first name.
  3. Leave the last name field empty.
  4. Attempt to proceed to the next step of checkout.
- Expected Result:
  - Validation error message is displayed for the empty last name field.

#### ZipCode field validation

- Preconditions:
  - User is logged in and has added a product to the cart.
- Steps:
  1. Proceed to checkout.
  2. Enter valid first and last names.
  3. Leave the zip code field empty.
  4. Attempt to proceed to the next step of checkout.
- Expected Result:
  - Validation error message is displayed for the empty zip code field.

### Checkout cart overview correctness

- Preconditions:
  - User is logged in and has added products to the cart.
- Steps:
  1. Proceed to checkout.
  2. Provide valid user information.
  3. Proceed to the next step of checkout.
- Expected Result:
  - The details of the products on the checkout overview match the real product details.

### Order confirmation message upon cart overview confirmation

- Preconditions:
  - User is logged in and has added products to the cart.
- Steps:
  1. Proceed to checkout.
  2. Provide valid user information.
  3. Proceed to the next step of checkout.
  4. Confirm the order.
- Expected Result:
  - User receives a confirmation message indicating successful order completion.
