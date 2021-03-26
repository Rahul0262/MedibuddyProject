import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('admin123', 10),
		isAdmin: true,
	},
	{
		name: 'Rahul',
		email: 'rahul@gmail.com',
		password: bcrypt.hashSync('rahul123', 10),
	},
	{
		name: 'Sumi',
		email: 'Sumi@gmail.com',
		password: bcrypt.hashSync('sumi123', 10),
	},
];

export default users;
