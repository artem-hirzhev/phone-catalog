Products Catalog
================

This project is an implementation of a product catalog with features like sorting, filtering, and pagination, where users can browse different categories of products and view their details. The project is built using React, React Router, and SCSS.

Folder Structure
----------------

The project follows the standard React folder structure where components, helpers, and pages are stored in their respective folders.

### Components

The components folder contains reusable components that are used throughout the project, like `ProductCard`, `ProductsCatalog`, and `ProductsSlider`.

### Helpers

The helpers folder contains utility functions that are used to fetch data from APIs and handle local storage for the Cart.

### Pages

The pages folder contains the main pages of the project, like `Home`, `Phones`, `Tablets`, `Accessories`, `ProductDetails`, `Cart`, and `Favorites`.

Styling
-------

SCSS is used to style the components, following the BEM methodology.

App
---

The `App` component is the entry point of the project. It contains the header and footer components, and it renders the appropriate page based on the URL.

The header component contains links to all the pages, and the favorites and cart links are aligned to the right. The current page is highlighted using NavLink.

The footer contains the Github repository link, and a back to top button is implemented.

Home Page
---------

The `Home` page displays a ProductsSlider component with the hot prices and brand new products. The ProductsSlider component is also used for the brand new section.

Users can scroll through the products using the < and > buttons, and the pictures change automatically every 5 seconds.

The `Home` page also contains a Shop by category section with links to phones, tablets, and accessories.

Phones, Tablets, and Accessories Pages
--------------------------------------

The `Phones`, `Tablets`, and `Accessories` pages display a ProductsCatalog component with all the products of the respective type.

Users can sort the products by age, name, and price using a select element, and they can also choose how many items to display per page using another select element.

Pagination is implemented to limit the number of products displayed. If there are less than the smallest page size of items, pagination is hidden.

Users can save the sort order and page size in the URL, and it will be applied after a page reload.

If no products are available for a category, a NoResults component is displayed.

Product Details Page
--------------------

The `ProductDetails` page displays the details of a selected product. Users can choose which tech specs to display, and they can also choose a picture.

A You may also like section is implemented with products chosen randomly.

The page contains a back button and breadcrumbs at the top.

Cart Page
---------

The `Cart` page displays the items in the Cart and allows users to remove items or change their quantity.

The total amount and quantity are calculated automatically, and the checkout button shows a message that the feature is not implemented yet.

The Cart is saved to the local storage on each change, and it is read on page load.

Favorites Page
--------------

The `Favorites` page displays the favorite products, and users can add or remove products using a heart button.