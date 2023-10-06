const user = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userWithoutPassword = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
};

const wrongPassUser = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: 'xxxxxxxxxx',
};

const users = [
  userWithoutPassword,
  {
    id: 2,
    username: 'User',
    email: 'user@user.com',
  },
];

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const invalidPasswordLoginBody = { email: 'admin@admin.com', password: 'sec' };
const invalidEmailLoginBody = { email: '@email', password: 'secret_admin' };
const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
  user,
  userWithoutPassword,
  users,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
};
