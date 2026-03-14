
Ticket Management System – Project Explanation
1. Project Overview
The Ticket Management System is a web-based application developed to manage and track support tickets within an organization. The system allows users to create, view, update, and delete tickets while also generating analytical reports about ticket distribution and team utilization.
The project is built using a full-stack architecture, where the frontend is responsible for displaying the interface and the backend handles the business logic and database operations.
The application follows the MVC (Model–View–Controller) architecture and uses REST APIs for communication between the frontend and backend.

2. Technology Stack
Frontend
HTML
CSS
JavaScript
The frontend is responsible for displaying ticket data, interacting with users, and sending requests to the backend APIs.
Backend
The backend is developed using Spring Boot and follows a layered architecture.
Key backend technologies include:
Spring Boot for REST API development
Hibernate / JPA for object-relational mapping
JPQL for database queries
Database
The application uses MySQL to store ticket data and audit logs.
Tools Used
API testing was performed using Postman.

3. Application Architecture
The project follows a layered MVC architecture:
Frontend (HTML, CSS, JavaScript)
            ↓
        REST APIs
            ↓
        Controller Layer
            ↓
        Service Layer
            ↓
        DAO Layer
            ↓
        MySQL Database

Controller Layer
Handles HTTP requests coming from the frontend and maps them to appropriate service methods.
Service Layer
Contains the business logic of the application such as ticket processing, report generation, and audit logging.
DAO Layer
Handles all database operations such as saving tickets, retrieving data, and executing JPQL queries.
Model Layer
Contains entity classes such as:
Ticket
AuditLog
These classes map to database tables.

4. Ticket Management Functionalities
The core functionality of the system is ticket lifecycle management, which includes the following operations.
4.1 Create Ticket
Users can create a new ticket by entering details such as:
Title
Description
Category
Priority
Assigned team member
When a ticket is created, it is saved in the database through the backend API.

4.2 View Tickets
Users can retrieve and view all tickets stored in the database. The frontend fetches ticket data through REST APIs and displays them dynamically.

4.3 Update Ticket
Users can update ticket information such as:
Ticket priority
Ticket status
Assigned team member
The update request is processed by the backend and the database record is modified accordingly.

4.4 Delete Ticket
Users can remove tickets that are no longer required. When a ticket is deleted, the corresponding record is removed from the database.

5. CSV Ticket Loader
The application includes a CSV ticket loader module.
When the application starts, it reads ticket data from a CSV file and loads them into the database. This feature helps populate the system with initial data for testing and demonstration.
To prevent duplicate data insertion, the system first checks whether tickets already exist in the database using a count query. If records are already present, the loader skips the import process.

6. Reporting Features
The system also includes analytical reports that provide insights into ticket distribution and workload.
6.1 Ticket Summary by Category
This report shows the number of tickets grouped by category, such as:
Software Issue
Hardware Issue
Network Issue
This helps understand which type of issues occur most frequently.

6.2 Ticket Summary by Priority
This report displays the number of tickets based on priority levels such as:
High
Medium
Low
This helps teams identify critical issues.

6.3 Team Member Utilization Report
This report calculates the percentage of tickets assigned to each team member.
The calculation is performed using the following formula:
Utilization % = (Tickets assigned to member / Total tickets) × 100

This report helps managers understand workload distribution among team members.

7. Audit Logging System
The application includes an audit logging module to track all system operations.
An audit_log table records every CRUD operation performed in the system.
The audit log stores:
Action type (CREATE, UPDATE, DELETE, READ)
Timestamp of the operation
Details of the action
For example:
Action
Details
CREATE
Ticket created with title Login Issue
UPDATE
Ticket updated with ID 5
DELETE
Ticket deleted with ID 3

This feature improves system transparency and helps in debugging and monitoring.

8. API Testing
All backend APIs were tested using Postman.
Using Postman, different HTTP requests such as:
GET
POST
PUT
DELETE
were sent to verify that the APIs returned correct responses.

9. Request Flow in the Application
The request flow in the system works as follows:
The user interacts with the frontend interface.
JavaScript sends a REST API request to the backend.
The Controller receives the request.
The Service layer processes business logic.
The DAO layer interacts with the database.
The database returns the result.
The backend sends a JSON response.
The frontend updates the user interface.

10. Advantages of the System
The system provides several advantages:
Efficient ticket tracking
Better issue prioritization
Analytical insights through reports
Transparent audit logging
Structured MVC architecture for maintainability

11. Future Improvements
Possible enhancements for the system include:
User authentication and authorization
Role-based access control
Email notifications for ticket updates
Real-time dashboards
Integration with cloud platforms


