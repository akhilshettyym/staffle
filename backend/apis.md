```js
TaskBridge and a super amdin who has access to all the org details. DEV
```

- The application name will be task bridge, the superAdmin will be me (DEVELOPER). These details will never be edited. This is fixed.

```js
taskbridge : {
    superAdminDets: {
        firstName: sAFirstName,
        lastName: sALastName,
        email: sAEmail,
        password: sAPassword,
        confirmPassword: sAConPassword
    }

    CreatedOrganizationName: {
        organizationDetails: {
            uuid: orgUUID,
            orgName: organizationName,
            orgDomain: organizationDomain,
            orgCountry: organizationCountry,
            orgCity: organizationCity,
            creation: time/date creation,
            orgDescription: organizationDescription
        },
        AdminDetails: [
            {
                uuid: aUUID,
                orgId: orgUUID,
                firstName: aFirstName,
                lastName: aLastName,
                email: aEmail,
                password: aPassword,
                confirmPassword: aConPassword,
                role: admin,
                permissions: [ ADD THIS ]
            },
            {
                // Org creator can add multiple admins
            }
        ],
        EmployeeDetails: [
            {
                uuid : eUUID,
                firstName: eFirstName,
                lastName: eLastName,
                email: eEmail,
                password: ePassword,
                confirmPassword: eConPassword,
                dob: YYYY-MM-DD,
                designation: role-in-org,
                role: Employee,
                creation: time/date creation,
                permissions: [ ADD THIS ]
            },
            {
                // Org can have multiple employees
            }
        ],
        Tasks: [
            {
                uuid: tUUID,
                creation: time/date creation,
                title: taskTitle,
                category: taskCategory,
                description: taskDescription,
                assignedTo: employee,
                dueDate: dueDateOfTask,
                priority: High/Medium/Low,
                status: taskStatus, New/In-Progress/Completed/Failed
            },
            {
                // Number of created tasks
            }
        ]
    },
    {
        // Application can have multiple organizations
    }
}
```

#### MongoDB Collection
```js
// users collection
{
  _id: ObjectId,
  uuid: "...",
  firstName: "...",
  lastName: "...",
  email: "...",
  passwordHash: "...",
  role: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE",
  organizationId: ObjectId,
  permissions: ["CREATE_TASK"],
  createdAt: ISODate()
}

// organizations collection
{
  _id: ObjectId,
  uuid: "...",
  orgName: "...",
  orgDomain: "...",
  orgCountry: "...",
  orgCity: "...",
  orgDescription: "...",
  createdAt: ISODate(),
  createdBy: userId
}

// tasks collection
{
  _id: ObjectId,
  uuid: "...",
  title: "...",
  category: "...",
  description: "...",
  organizationId: ObjectId,
  assignedTo: userId,
  dueDate: ISODate(),
  priority: "HIGH" | "MEDIUM" | "LOW",
  status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "FAILED",
  createdAt: ISODate()
}
```

---

### 1. CREATE ORGANIZATION API -

- uuid (admin)
- firstName (admin)
- lastName (admin)
- email (admin)
- password (admin)
- confirmPassword (admin) must match with password.

---

- uuid (org)
- organizationName (org)
- organizationDomain (org)
- organizationDescription (org)

##### - onClick of CREATE ORG button, Trigger an API call, And then save the details in DB as in the shown structure.

- This Register should be using JWT tokenization, and the passwords should be encrypted (bcryptjs or any).

---

### 2. ADD EMPLOYEE API -

- uuid (Employee)
- firstName (Employee)
- lastName (Employee)
- email (Employee)
- password (Employee)
- confirmPassword (Employee)
- dob (Employee)
- Designation (Employee)

##### - onClick of ADD EMPLOYEE button, Trigger an API call, And this should be adding this Employee details into the organization which was created earlier from the API CREATE ORGANIZATION.

- The admin can add any number of employees here.

---

### 3. REGISTER ORG API -

- This API is the KEY here.
- This API can only be triggered until the creator of the org Adds Employees (min. 2).
- OnClick of this the admin or the creator of the organization should be able to finish up the Registration of the Organization in the application. And give out a response.
- This API will mark the organization to be completed.

And once this is done, The Admin can use his/hers email and password to Login/signin into the organization.

If Admin Logs in then adminDashboard should be opened, if an Employee then open up employeeDashboard.

---

ADVANCED FUNCTIONALITIES / FEATURES :

---


DESCRIPTION :

Here I am with a project in half way and I want some guidance towards this. A project named Taskbridge which is an employee management system built from scratch using React. I'll give you a detailed walk through with what I have implemented.

I have built an Employee Management System application which is built using react.
I'll explain the features and flow of it - 
- Landing page where users can get to know about the application, and then if already a user they can sign-in else they'll have to create their own organization.
- In SignUp (basically registering the Org), Here the one who will be creating the org will be the Admin and he'll be managing the org and employees and their tasks. So the Admin will have to fill out his firstName, lastName, email, password, and there will be two ID's, one generated by uuid and one custom. And below this there will be Org details as well which will consist of - Organization name, Category, description, the day the org being created, and two id's for this as well.
- Once these things are filled out, onClick of Create Org button, all these data will be stored in localStorage. And the admin will be redirected to Complete org page where the admin will have to add Employees to the org. Admin can add as many employees as possible. where admin will have to fill the employee firstName, lastName, email, password, dob, Position(role), and two ids as well. 
- Once this is done onClick of complete org button, Organization will be created, and the employee data will be added in localStorage.
- Now the users can login with their email and password where Admin login will open up Admin Dashboard whereas Employee login will open up Employee Dashboard.
- Admin Dashboard, there are 6 tabs, first one being create task, where the Admin can create the tasks and assign it to the particular employee available in the org.
- second tab being the created tasks, where admin can see all the created tasks.
- third tab being Task Status, Fourth is Employee details where what employee has what task.
- Fifth being Employee management where Admin can add more employees, or Remove or Edit emp details.
- Sixth being the Admin detaiks update.
 
Now the Employee DashBoard where 5 tabs are there -
where first being the the number tasks and their status, second being New Tasks where employee can accept or reject task.
Third being the accepted task which will go under inProgress, Where Empl can mark it as Completed or Failed.
Fourth being the Completed and Failed tasks page, read only. 
Fifth being Emp details, where an Employee can Edit their own details.
 
So this is what my application does right now. I'll show you my localStorage structure too.
 
The problem now is, I am new to MERN stack and this will be the first major project. I know all the basics.

So now from scratch I want create a server, And go on creating the backend for this.


Now what you can see from the above data, I want you to create a detailed explaination from scratch, if I was a beginner what are the steps to follow and how should I be implementing this backend setup.

I'll tell what I knwo about the file/folder structure guide me and let me know if its right.
backend/src/config/db.js
backend/src/controllers/required-controllers
backend/src/middleware/
backend/src/models/
backend/src/routes/
backend/src/services/
backend/src/app.js
backend/.env
backend/package-lock.json
backend/package.json
backend/server.js

If I have missed anything please correct me. And I want this to be detailed as possible, what file should contain what content, so that I get to initiaze everything. I know the process of db connection and package installations, but I want it be in detail. You can explain in phases.
Where phase 1 being initial setup of the backend codebase, connection of db and installations of packages. Once the server is up and running, we can start phase 2 which will be auth.

Phase 2 : should be auth where a user should be able to register an organization and admin details, 
I'll give a detailed description of what phase 2 is going to be.
- So when a non-registered user wants to use the application will first have to register for an organization.
- The first API is going to be, CREATE ORGANIZATION. The user who will be registering will be the admin of the organization by default and this admin will have to fill out certain details of the Admin as well as the Organization.(This admin can add more admins later.)
- I've given the structure above of what the admin/user will have to fill out. And in what way.
- Before adding this to the DB, Check for all the fields, wheather any duplicates are there, if the user/organization already exists.
- The password field should be in such a way that it should match the confirm password field. And then this should be encrypted (bcryptjs or any)
- If it is new data then only proceed.
- Once this is done, onClick of Create Org button this data should be added to the db.

- Once the success response arrives another page will be opened.
Phase 3 : In this phase in another page we will have two buttons.
- First one will be ADD EMPLOYEE API, Where the admin can add employees to the organization.
- The admin should fill out the employee details and then Trigger the API.
- Once the onClick of Add Employee is triggered the employee details should be added to the DB, As in the above structure. Within the Organization, in the employee array this should be added.
- Once the admin adds a minimum of 2 employees, Then the next phase will be available.

Phase 4 : In this phase another API which will be Register Org API, 
- This is the crucial API which will be confirming the creation of the Organization. Once a minimum of two employees are added
- onClick of the Register Org button, the Request for creating the organization will directly go the superAdmin. Until the superAdmin approves the registration, the org status will be on PENDING.
- After the click of this Register Org, a new page in the front end will open saying, The request will be approved by superadmin and so on, on approval you can directly login with admin and employee credentials and access the application.


This will be my focus for now, Of creating the proper API's and making it work as expected. Will go thru by each phase as one phase gets over will proceed with the next phase.