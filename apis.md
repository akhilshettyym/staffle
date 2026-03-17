## UP and RUNNING API's

---

CREATE ORGANIZATION - POST - localhost:3000/api/auth/create-organization

LOGIN - POST - localhost:3000/api/auth/login

LOGOUT - POST - localhost:3000/api/auth/logout

---

ADD EMPLOYEE - POST - localhost:3000/api/employee/add-employee

UPDATE EMPLOYEE - PATCH - localhost:3000/api/employee/update-employee/:employeeId

DEACTIVATE EMP - PATCH - localhost:3000/api/employee/deactivate-employee/:employeeId

---

APPROVE - PATCH - localhost:3000/api/org/approve/:orgID

REJECT - PATCH - localhost:3000/api/org/reject/:orgID

REVOKE - PATCH - localhost:3000/api/org/revoke/:orgID

RE-ACTIVATE - PATCH - localhost:3000/api/org/re-activate/:orgID

UPDATE ORG - PATCH - localhost:3000/api/org/update-organization/:orgId

---

CREATE TASK - POST - localhost:3000/api/tasks/create-task

UPDATE TASK - PATCH - localhost:3000/api/tasks/update-task/:taskId

DELETE TASK - DELETE - localhost:3000/api/tasks/delete-task/:taskId

---

UPDATE ADMIN - PATCH - localhost:3000/api/admin/update-admin/:adminId

---

REQUEST REJECTION - PATCH - localhost:3000/api/tasks/reject-task/:taskId

---

REVIEW REJECTION - PATCH - localhost:3000/api/admin/review-task-rejection/:taskId

---

#### POST create-organization - localhost:3000/api/auth/create-organization

```json
{
  "firstName": "Akhil",
  "lastName": "Shetty",
  "email": "akhil@gmail.com",
  "password": "password123",
  "confirmPassword": "password123",
  "dateOfBirth": "2003-03-29",
  "designation": "Sr. Manager",
  "orgName": "TaskBridge Technologies",
  "orgDomain": "taskbridge.com",
  "orgDescription": "Project and employee management platform",
  "orgCountry": "IN"
}
```

---

#### POST login - localhost:3000/api/auth/login

```json
{
  "email": "superadmin@taskbridge.com",
  "password": "StrongPassword123"
}

{
  "email": "akhil@gmail.com",
  "password": "password123"
}
```

---

#### POST logout - localhost:3000/api/auth/logout

- Not tested.

---

#### POST add-employee - localhost:3000/api/employee/add-employee

```json
{
  "firstName": "Test1",
  "lastName": "Sharma",
  "email": "test1@taskbridge.com",
  "password": "password123",
  "dateOfBirth": "1995-04-30",
  "designation": "Software Engineer"
}
```

---

#### PATCH update-employee - localhost:3000/api/employee/update-employee/:employeeId

```json
{
  "firstName": "testUp",
  "lastName": "UpTest",
  "designation": "Full Stack Dev"
}
```

---

#### PATCH deactivate-emp - localhost:3000/api/employee/deactivate-employee/:employeeId

---

#### PATCH approve - localhost:3000/api/org/approve/:orgID

---

#### PATCH reject - localhost:3000/api/org/reject/:orgID

---

#### PATCH revoke - localhost:3000/api/org/revoke/:orgID

---

#### PATCH re-activate - localhost:3000/api/org/re-activate/:orgID

---

#### PATCH update-organization - localhost:3000/api/org/update-organization/:orgId

```json
{
  "orgName": "Technologies",
  "orgDomain": "tech.com",
  "orgCountry": "IN"
}
```

---

#### POST create-task - localhost:3000/api/tasks/create-task

```json
{
  "title": "Fix Login Bugs",
  "category": "Login Development",
  "description": "Fix the issue where login fails on Safari browser.",
  "assignedTo": "69a6f25660dc6de0c4131825",
  "dueDate": "2026-03-10T10:00:00.000Z",
  "priority": "HIGH"
}
```

---

#### PATCH update-task - localhost:3000/api/tasks/update-task/:taskId

```json
{
  "title": "Fix Login Bugs",
  "category": "Login Dev",
  "description": "Fix the issue where login fails on Safari browser and Chrome",
  "assignedTo": "69a80c842e69b4a6caaeb033",
  "dueDate": "2026-03-11T10:00:00.000Z",
  "priority": "LOW"
}
```

---

#### DELETE delete-task - localhost:3000/api/tasks/delete-task/:taskId

---

#### PATCH update-admin - localhost:3000/api/admin/update-admin/:adminId

```json
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "dateOfBirth": "",
  "designation": ""
}
```

---

.env
SUPER_ADMIN_EMAIL=superadmin@taskbridge.com
SUPER_ADMIN_PASSWORD=StrongPassword123

---

Option 1 (Recommended – Production Way)
Use an Axios interceptor. It automatically:
Detects 401
Calls refresh
Retries request
User never notices
Example:

```js
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshResponse = await axios.post(
        "/api/auth/refresh",
        {},
        { withCredentials: true },
      );
      const newAccessToken = refreshResponse.data.accessToken;

      error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  },
);
```

---

- Refresh tokens
- Token Blacklisting
- or store active sessions in DB



I have several functions namely - handleAcceptTask, handleRejectTask, handleMarkAsCompleted, handleMarkAsFailed.
So now I have API's ready for all these functions. I just need to define them properly. 