# Ecommerce-Backend

It is an e-commerce backend project that encompasses authentication, such as sign-up and sign-in, facilitated by web tokens. Additionally, it includes 'Categories' and 'Products' for performing CRUD operations on them, including CREATE, READ, UPDATE, and DELETE.

Both the "ADMIN" and "CUSTOMER" roles necessitate tokens for operation. However, while the "CUSTOMER" role is limited to accessing category and product details, the "ADMIN" role retains full CRUD (Create, Read, Update, Delete) functionality for both categories and products.

In this project, I've built a robust backend system for an e-commerce platform. Here's a brief overview of the key features:

1) User Authentication: Implemented user signup and signin functionalities, securely storing user data in MongoDB and providing tokens upon successful login using JSON Web Tokens (JWT).

2) Middleware Usage: Employed middleware techniques to enhance security and access control, allowing only authorized users to perform certain operations.

3) Category Management: Developed a Category model and endpoints for CRUD operations, ensuring seamless management of product classifications. Admins can perform all operations, while customers can only read category information.

4) Product Management: Created a Product model with CRUD endpoints, enabling efficient management of product details. Similar to categories, only admins can perform all operations, while customers can only access product information.

5) Token Requirement: Implemented token-based authentication for all operations, ensuring security across the platform.

This project lays the foundation for a scalable and resilient e-commerce solution, with room for further enhancements and optimizations.
