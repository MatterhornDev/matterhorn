export interface User {
  username: string;
  password: string;
}

const testUsers: User[] = [{
  username: 'test',
  password: 'ThisIsATest'
}]

export function getUserByUsername(username: string): User | undefined {
  return testUsers.find(user => user.username === username)
}

