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



--------------------------------------------------------------------------------------------------------------------------


Building the Taskbridge Backend from Scratch

We will use Node.js with Express for the HTTP server and MongoDB (via Mongoose) for the database. Mongoose is a popular Object Data Modeling (ODM) library for MongoDB that provides schemas and validation, while bcryptjs is used to hash passwords securely. We will also use JSON Web Tokens (JWT) for stateless authentication. For example, Express’s Router lets us associate HTTP verbs and URL paths with handler functions (often called controllers), keeping the code modular. The overall project structure will include folders like /src/config, /src/models, /src/controllers, /src/routes, and /src/middleware, plus app.js and server.js at the root. This organization separates concerns (database config, data models, route definitions, business logic, middleware, etc.) so the code is clean and maintainable.

Tech stack & packages: Initialize a new Node project (npm init) and install dependencies:

- express (web framework),
- mongoose (MongoDB ODM),
- dotenv (environment variables),
- bcryptjs (password hashing),
- jsonwebtoken (JWT),


uuid (if you want separate UUIDs),
plus development tools like nodemon. For example, one guide shows installing Mongoose and bcrypt with npm install mongoose bcrypt.

Environment variables: Create a .env file at the root (e.g. backend/.env) to store sensitive settings like MONGO_URI, JWT_SECRET, and any default credentials. Loading these via dotenv keeps secrets out of the source code. In config/db.js we will require('dotenv').config() and then use process.env.MONGO_URI when connecting.

DB connection (src/config/db.js): Write a function connectDB() that uses Mongoose to connect. For example:

```js
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
```

Here process.env.MONGO_URI comes from .env. This follows the modern pattern of a standalone connection module. We call this function in our main file to initiate the database connection.

Models (src/models): Create Mongoose schemas for User, Organization, and Task. For example, a User schema might have fields like firstName, lastName, email, passwordHash, role (enum: SUPER_ADMIN/ADMIN/EMPLOYEE), organizationId (a reference to an Organization), and permissions (an array of strings). Mark email as unique to prevent duplicates. You can add a createdAt default field. In the schema, use bcrypt in a pre-save hook (or in the controller) to hash the password before saving. For example:

```js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

This ensures passwords are never stored in plain text. Similarly, define an Organization schema (fields: uuid, orgName, orgDomain, orgCountry, orgCity, orgDescription, createdAt, createdBy, plus maybe a status field) and a Task schema (uuid, title, category, description, organizationId, assignedTo, dueDate, priority, status, createdAt). In these schemas you can use enum to restrict role, priority, and status values, and use type: mongoose.Schema.Types.ObjectId with ref for references.

Controllers and Services: In src/controllers/, create files for each resource (e.g. authController.js, orgController.js, employeeController.js, taskController.js). These exports functions like createOrganization, addEmployee, etc., which receive req, res and use the models to perform actions. Business logic (queries, validation, etc.) can go in controllers or helper service functions. In src/services/ you could put reusable functions (e.g. password helpers), but it’s optional. For example, you might have utils/password.js exporting a function that wraps bcrypt.hash() and bcrypt.compare() for reuse.

Routes: In src/routes/, define Express routers. For example, an orgRoutes.js might do router.post('/create', orgController.createOrganization), router.post('/:orgId/addEmployee', employeeController.addEmployee), etc. Use express.Router() to group endpoints, as recommended by Express. In src/app.js, you will import these routers and attach them (e.g. app.use('/api/org', orgRoutes)).

Middleware: Write middleware in src/middleware/ for authentication and authorization. For instance, a verifyToken middleware reads the Authorization: Bearer <token> header, extracts the JWT token, and calls jwt.verify(token, secret). Upon success, it sets req.user = decodedToken so later controllers know the user’s ID/role. A simple example is:

```js
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = decoded; // e.g. { sub: userId, role: 'ADMIN', ... }
    next();
  });
}
```

This pattern is standard in Express apps. You may also write role-checking middleware. For example, an adminOnly function can check req.user.role === 'ADMIN' (or 'SUPER_ADMIN') and reject if not, as in the DigitalOcean JWT guide.

app.js and server.js: In app.js set up the Express app: load middleware (express.json() for JSON parsing), mount the routers, etc. In server.js import app and connectDB(), then call connectDB() and app.listen(PORT). For example, one tutorial calls connectDB() and then app.use(express.json()) before defining routes.

---

#### Phase 2: Organization Registration (Create Org + Admin)

The Create Organization endpoint lets an unauthenticated user register a new organization, which automatically creates an admin user. Typical steps:

Request payload: The client sends both organization details and the admin’s info (firstName, lastName, email, password, confirmPassword), plus the org data (name, domain, description, etc.). The API should parse these from req.body.

Validate input: Ensure required fields are present and password === confirmPassword. Also check for duplicates: use Mongoose to see if the email is already in use, or if an organization with the same domain/name already exists. You can enforce uniqueness at the schema level (e.g. email field with unique: true), and also do a User.findOne({ email }) or Organization.findOne({ orgDomain }) to return a “Already exists” error if needed.

Hash password: If the data is new, hash the admin’s password. For example, using bcrypt: const hashed = await bcrypt.hash(password, saltRounds). In Mongoose, you might have put a pre-save hook to do this, but you can also hash in the controller. (Either way, do not store plain passwords.) This follows best practice for security.

Create organization and admin: Generate UUIDs (with the uuid package or mongoose.Types.ObjectId) and create the Organization document and the admin User document. For instance:

const org = await Organization.create({
  uuid: generatedOrgUuid,
  orgName, orgDomain, orgCountry, orgCity, orgDescription,
  createdBy: null // later set to admin’s _id 
});
const admin = await User.create({
  uuid: generatedAdminUuid,
  firstName, lastName, email,
  passwordHash: hashed,
  role: 'ADMIN',
  organizationId: org._id,
  permissions: [] // you can assign defaults like ["CREATE_TASK"]
});
org.createdBy = admin._id;
await org.save();

This ensures the admin is linked to the new org. The permissions array can contain any initial permissions (e.g. ["CREATE_TASK"]). By default the admin’s role is ADMIN. (You may also seed a SUPER_ADMIN user separately, as discussed below.)

Return response: Upon success, respond with a message or a token. Often you would generate a JWT here so the user can immediately log in: e.g.

const payload = { sub: admin._id, role: admin.role, orgId: org._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
res.status(201).json({ success: true, token });

This uses jwt.sign() to create a token containing the user’s ID and role. The client can store this token and use it for authenticated requests.

Phase 2 covers the Register Org logic. We should also consider having a fixed Super-Admin (the developer) account. A common pattern is to seed this user at startup: for example, check if a Super-Admin exists and if not, create one using credentials from a config or .env. One approach is to keep a JSON or config file with default admin data and have the app read it on startup to create the user.

Phase 3: Add Employee API

Once the organization is created and the admin is logged in, the next step is to add employees to that org:

Authentication: Protect this endpoint so only an authenticated admin can call it. Use the JWT from Phase 2: the request should include the header Authorization: Bearer <token>. Our verifyToken middleware will decode it (using jwt.verify) and attach req.user, so we know which user/org is making the request.

Verify role: In the middleware or controller, check that req.user.role is ADMIN (or perhaps SUPER_ADMIN) before allowing employee creation. You can use an adminOnly middleware like in, which does roughly:

if (!req.user || req.user.role !== 'ADMIN') {
  return res.status(403).json({ message: 'Access denied' });
}
next();

Request data: The admin provides the new employee’s details (firstName, lastName, email, password, dob, designation, etc.) in the request body. Validate these fields and ensure password === confirmPassword.

Check duplicates: Make sure the email isn’t already used by another user in this org. (If your User schema has unique: true on email, MongoDB will enforce it, but you should catch this as an error.)

Hash password and save: Like before, hash the employee’s password with bcrypt. Then create a new User document with role: 'EMPLOYEE', organizationId: req.user.organizationId, and any default permissions (often none or some basic permissions). Example:

const employee = await User.create({
  uuid: uuidv4(),
  firstName, lastName, email,
  passwordHash: await bcrypt.hash(password, 10),
  dob, designation,
  role: 'EMPLOYEE',
  organizationId: adminUser.orgId,
  permissions: []
});

Response: Return success or error. You could return the new user’s data (omitting the password) or just a status message.

This API simply adds an employee linked to the existing organization. You repeat this until at least two employees (plus the admin) exist. Each employee’s data is stored in the users collection with a reference to the organization (no need to embed inside the organization document – you can always query User.find({ organizationId }) to list them).

Phase 4: Finalizing Registration (Register Org API)

The final step is to mark the organization as fully registered:

Prerequisites: Only proceed if the organization has at least 2 employees (as required). The admin would click a Register Org button on the front end at this point.

Endpoint: Create a route like POST /api/org/:orgId/register. Again protect it with JWT/auth middleware (and ensure the caller is the org’s creator/admin).

Update status: In the handler, set a field on the Organization document, for example status = 'PENDING' or status = 'ACTIVE'. Initially, you might set it to "PENDING" to indicate it awaits super-admin approval. (If you want instant approval, set "ACTIVE".) Then save the organization.

Notify super-admin (optional): If you implement a workflow, you could record that this org is pending and notify a super-admin account. For now, you might simply note in the response: “Registration submitted; waiting for approval.”

Response: Send a success message. At this point the front end can redirect to the login page. The admin (and other employees) can now log in via POST /api/auth/login (you will build a login endpoint next) and will see their respective dashboards.

After this step, the organization is considered created in the system. The admin can use their email/password to log in (we will need a login API to complete the flow). When a user logs in, your login endpoint should verify credentials, generate a JWT (as in Phase 2), and return it. The client can then check req.user.role or the token payload to route the user to the Admin Dashboard or Employee Dashboard accordingly.

Additional Details and Best Practices

File contents: Briefly, each file/folder should contain:

src/config/db.js: DB connection logic (as above).

src/models/: Mongoose schemas (User.js, Organization.js, Task.js). For example, in User.js define the schema with fields and use mongoose.model('User', userSchema).

src/controllers/: Functions handling each route (e.g. createOrganization(req, res), addEmployee(req, res), login(req, res) etc.), using the models.

src/routes/: Express routers mapping endpoints to controllers. Example: router.post('/register', orgController.createOrganization). Use app.use('/api/org', orgRoutes) in app.js.

src/middleware/auth.js (or similar): JWT verification and role-checking middleware as discussed.

src/services/ or src/utils/: Helper functions (e.g. a password.js with hashPass and comparePass that wrap bcrypt).

app.js: Sets up Express, applies middleware (express.json()), connects routes. For example, after const app = express(); call connectDB() and then app.use(express.json()).

server.js: Simply require and run app. For instance:

const app = require('./src/app');
const connectDB = require('./src/config/db');
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(Many tutorials combine this in one file, but separating app and server is also fine.)

JWT and bcrypt usage: Use bcrypt to hash passwords and jwt to issue tokens. For example, during login you would do: find the user by email, then use bcrypt.compare(enteredPassword, user.passwordHash) to check the password. As [13] explains, bcrypt.compare() returns true if the plaintext password matches the stored hash. If it matches, create a token like:

const payload = { sub: user._id, role: user.role, orgId: user.organizationId };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

Here sub (subject) is a standard JWT claim for the user ID. The generated token is sent to the client. Later, in protected routes, you use jwt.verify(token, process.env.JWT_SECRET) to check it, and retrieve the payload (req.user = decoded) so your controllers know who is calling.

Seeding the Super-Admin: Since your app has a fixed super-admin, you can seed this account either by a startup script or in code. For example, place the super-admin credentials in a config or .env, then on server start check if a User with role: 'SUPER_ADMIN' exists; if not, create it with bcrypt hashing. One StackOverflow answer suggests reading from a deployment JSON and creating the user on startup. The key is not to hardcode the password in source control.

Error handling: In each API, validate inputs and return clear error responses (e.g. 400 for bad input, 409 for duplicates). Use try/catch around async DB calls and respond with res.status(500).json({ error: "message" }) on unexpected errors.

Permissions: In your MongoDB users collection, you included a permissions array. These can be strings like "CREATE_TASK". In your application, you can check these either in middleware or in controllers (e.g. if (!user.permissions.includes('CREATE_TASK')) return res.status(403)). Embedding permissions in the JWT payload (or looking them up from the DB) lets you implement fine-grained access control. This is similar to the role-based check shown in [23†L1063-L1071].

Environment and scripts: Add scripts to package.json such as "start": "node server.js" and (optionally) "dev": "nodemon server.js". Ensure you have a .gitignore (ignore node_modules/, .env, etc.) so secrets and installed packages aren’t committed.

With these pieces in place, your backend will support the full flow: organization creation with an admin, adding employees, finalizing registration, and later task management. Each phase builds on the previous one. For example, after Phase 4 you would implement a login route (POST /api/auth/login) that authenticates either admins or employees and returns a JWT, so the front end can show the appropriate dashboard. Similarly, when you start adding Task CRUD operations, you’ll create Task controllers and routes that only admins (or assigned employees) can use, using the same JWT and permissions checks.

References: The above design follows common Node.js/Express patterns. For example, using a dedicated DB module and calling it before starting the server, defining unique indexed fields in Mongoose, hashing passwords with bcrypt, and protecting routes with JWT middleware are all standard practices in modern MERN-stack apps.