export enum FilterOptions {
  NameAtoZ = 'az',
  NameZtoA = 'za',
  PriceLowToHigh = 'lohi',
  PriceHighToLow = 'hilo',
}

export enum ValidationMessage {
  LockedOutUser = 'Sorry, this user has been locked out.',
  InvalidCredentials = 'Username and password do not match any user in this service',
  EmptyUserName = 'Username is required',
  EmptyPassword = 'Password is required',
  EmptyFirstName = 'First Name is required',
  EmptyLastName = 'Last Name is required',
  EmptyZipCode = 'Postal Code is required',
}

export enum SideBar {
  AllItems = 'All Items',
  About = 'About',
  Logout = 'Logout',
  ResetAppState = 'Reset App State',
}

export enum ProductDetails {
  Name = 'Name',
  Description = 'Description',
  Price = 'Price',
}
