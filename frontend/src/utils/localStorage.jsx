// const taskbridge = {
//   organization: {
//     id: "org-1a2b3c",
//     name: "TaskBridge Solutions",
//     category: "IT & Product",
//     description: "A product-focused organization building internal tools for teams.",
//     createdAt: "01 Feb 2026"
//   },

//   admin: {
//     id: "admin-001",
//     firstName: "Akhil",
//     lastName: "Shetty",
//     email: "akhil@taskbridge.com",
//     password: "12345"
//   },

//   employees: [
//     {
//       id: "emp-001",
//       firstName: "Aarav",
//       lastName: "Mehta",
//       email: "aarav@taskbridge.com",
//       password: "12345",
//       position: "UI Designer",
//       taskNumbers: { active: 2, newTask: 1, completed: 1, failed: 1 },
//       tasks: [
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "High",
//           title: "Design Login UI",
//           description: "Create modern login screen with dark theme",
//           dateCreated: "01 Feb 2026",
//           dueDate: "05 Feb 2026",
//           category: "Design"
//         },
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "Medium",
//           title: "Dashboard Wireframe",
//           description: "Prepare dashboard wireframes",
//           dateCreated: "02 Feb 2026",
//           dueDate: "07 Feb 2026",
//           category: "Design"
//         },
//         {
//           active: false,
//           newTask: true,
//           completed: false,
//           failed: false,
//           priority: "Low",
//           title: "Color Palette Research",
//           description: "Research brand color palette",
//           dateCreated: "03 Feb 2026",
//           dueDate: "08 Feb 2026",
//           category: "Research"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Medium",
//           title: "Typography Selection",
//           description: "Finalize font families",
//           dateCreated: "28 Jan 2026",
//           dueDate: "31 Jan 2026",
//           category: "Design"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: false,
//           failed: true,
//           priority: "Low",
//           title: "Icon Set Review",
//           description: "Review icon consistency",
//           dateCreated: "26 Jan 2026",
//           dueDate: "29 Jan 2026",
//           category: "Design"
//         }
//       ]
//     },

//     {
//       id: "emp-002",
//       firstName: "Riya",
//       lastName: "Sharma",
//       email: "riya@taskbridge.com",
//       password: "12345",
//       position: "Frontend Developer",
//       taskNumbers: { active: 2, newTask: 0, completed: 2, failed: 0 },
//       tasks: [
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "High",
//           title: "Implement Login Logic",
//           description: "Add form validation and auth logic",
//           dateCreated: "01 Feb 2026",
//           dueDate: "06 Feb 2026",
//           category: "Development"
//         },
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "Medium",
//           title: "Setup Routing",
//           description: "Configure React Router",
//           dateCreated: "02 Feb 2026",
//           dueDate: "06 Feb 2026",
//           category: "Development"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Medium",
//           title: "Tailwind Setup",
//           description: "Configure Tailwind CSS",
//           dateCreated: "29 Jan 2026",
//           dueDate: "30 Jan 2026",
//           category: "Setup"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Low",
//           title: "Linting Rules",
//           description: "Add ESLint config",
//           dateCreated: "28 Jan 2026",
//           dueDate: "29 Jan 2026",
//           category: "Setup"
//         }
//       ]
//     },

//     {
//       id: "emp-003",
//       firstName: "Kunal",
//       lastName: "Verma",
//       email: "kunal@taskbridge.com",
//       password: "12345",
//       position: "Backend Developer",
//       taskNumbers: { active: 1, newTask: 1, completed: 1, failed: 0 },
//       tasks: [
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "High",
//           title: "Auth API",
//           description: "Create login APIs",
//           dateCreated: "01 Feb 2026",
//           dueDate: "06 Feb 2026",
//           category: "Backend"
//         },
//         {
//           active: false,
//           newTask: true,
//           completed: false,
//           failed: false,
//           priority: "Medium",
//           title: "JWT Strategy",
//           description: "Research token strategy",
//           dateCreated: "03 Feb 2026",
//           dueDate: "08 Feb 2026",
//           category: "Research"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Low",
//           title: "DB Schema Draft",
//           description: "Draft initial schema",
//           dateCreated: "29 Jan 2026",
//           dueDate: "30 Jan 2026",
//           category: "Database"
//         }
//       ]
//     },

//     {
//       id: "emp-004",
//       firstName: "Neha",
//       lastName: "Iyer",
//       email: "neha@taskbridge.com",
//       password: "12345",
//       position: "QA Engineer",
//       taskNumbers: { active: 1, newTask: 1, completed: 2, failed: 0 },
//       tasks: [
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "High",
//           title: "Write Test Cases",
//           description: "Prepare test cases for auth",
//           dateCreated: "01 Feb 2026",
//           dueDate: "06 Feb 2026",
//           category: "Testing"
//         },
//         {
//           active: false,
//           newTask: true,
//           completed: false,
//           failed: false,
//           priority: "Medium",
//           title: "Edge Case Review",
//           description: "Edge Case Review",
//           dateCreated: "02 Feb 2026",
//           dueDate: "07 Feb 2026",
//           category: "Testing"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Low",
//           title: "Smoke Tests",
//           description: "Initial smoke testing",
//           dateCreated: "29 Jan 2026",
//           dueDate: "30 Jan 2026",
//           category: "Testing"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Low",
//           title: "Bug Verification",
//           description: "Verify resolved bugs",
//           dateCreated: "30 Jan 2026",
//           dueDate: "31 Jan 2026",
//           category: "Testing"
//         }
//       ]
//     },

//     {
//       id: "emp-005",
//       firstName: "Siddharth",
//       lastName: "Rao",
//       email: "siddharth@taskbridge.com",
//       password: "12345",
//       position: "Intern",
//       taskNumbers: { active: 1, newTask: 0, completed: 1, failed: 0 },
//       tasks: [
//         {
//           active: true,
//           newTask: false,
//           completed: false,
//           failed: false,
//           priority: "Low",
//           title: "Documentation Cleanup",
//           description: "Fix formatting in docs",
//           dateCreated: "01 Feb 2026",
//           dueDate: "05 Feb 2026",
//           category: "Documentation"
//         },
//         {
//           active: false,
//           newTask: false,
//           completed: true,
//           failed: false,
//           priority: "Low",
//           title: "Read Codebase",
//           description: "Understand project structure",
//           dateCreated: "29 Jan 2026",
//           dueDate: "30 Jan 2026",
//           category: "Learning"
//         }
//       ]
//     }
//   ]
// };

// export const setLocalStorage = () => {
//   localStorage.setItem("taskbridge", JSON.stringify(taskbridge));
// };

// export const getLocalStorage = () => {
//   const taskbridgeStr = localStorage.getItem("taskbridge");

//   let taskbridge = {
//     organization: null,
//     admin: null,
//     employees: []
//   };

//   if (taskbridgeStr) {
//     try {
//       taskbridge = JSON.parse(taskbridgeStr);
//     } catch (err) {
//       console.error("Failed to parse taskbridge from localStorage:", err);
//     }
//   }

//   return {
//     organization: taskbridge.organization,
//     admin: taskbridge.admin,
//     employees: taskbridge.employees
//   };
// };

// export const getOrganizationData = () => {
//   try {
//     const raw = localStorage.getItem("taskbridge");
//     if (!raw) return null;
//     const parsed = JSON.parse(raw);
//     return parsed?.organization ?? null;
//   } catch (error) {
//     console.error("Failed to read organization data:", error);
//     return null;
//   }
// };

// export const getLocalStorage = () => {
//  try {
//    const raw = localStorage.getItem("taskbridge");
//    return raw ? JSON.parse(raw) : null;
//  } catch (err) {
//    console.error("Invalid taskbridge data", err);
//    return null;
//  }
// };

// export const setLocalStorage = (data) => {
//  localStorage.setItem("taskbridge", JSON.stringify(data));
// };


export const getOrganizationData = () => {
  try {
    const raw = localStorage.getItem("taskbridge");

    if (!raw || raw === "undefined") return null;

    const parsed = JSON.parse(raw);
    return parsed?.organization ?? null;
  } catch (error) {
    console.error("Failed to read organization data:", error);
    return null;
  }
};


export const getLocalStorage = () => {
  try {
    const raw = localStorage.getItem("taskbridge");

    if (!raw || raw === "undefined") {
      return {
        organization: null,
        admin: null,
        employees: []
      };
    }

    const parsed = JSON.parse(raw);

    return {
      organization: parsed?.organization ?? null,
      admin: parsed?.admin ?? null,
      employees: parsed?.employees ?? []
    };
  } catch (err) {
    console.error("Invalid taskbridge data", err);
    return {
      organization: null,
      admin: null,
      employees: []
    };
  }
};


export const setLocalStorage = (data) => {
  if (!data || typeof data !== "object") {
    console.warn("Invalid taskbridge data, not saving:", data);
    return;
  }
  localStorage.setItem("taskbridge", JSON.stringify(data));
};


export const generateSequentialId = (prefix) => {
  const key = `${prefix}_counter`;
  const current = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, current);
  return `${prefix}-${String(current).padStart(3, "0")}`;
};