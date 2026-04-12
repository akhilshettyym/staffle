import { faker } from "@faker-js/faker";

export function buildOrgPayload(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: "password123",
    confirmPassword: "password123",
    dateOfBirth: "1995-01-01",
    designation: "CEO",
    orgName: faker.company.name(),
    orgDomain: faker.internet.domainName(),
    orgDescription: faker.lorem.sentence(10),
    orgCountry: "IN",
    ...overrides,
  };
}

export function buildEmployeePayload(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: "password123",
    dateOfBirth: "1995-04-30",
    designation: faker.person.jobTitle(),
    ...overrides,
  };
}

export function buildTaskPayload(overrides = {}) {
  return {
    title: faker.lorem.words(3).slice(0, 25),
    category: "Backend",
    description: faker.lorem.sentences(2),
    priority: "HIGH",
    dueDate: faker.date.soon(),
    assignedTo: null,
    ...overrides,
  };
}