import type Role from "./role.js";

type User = {
	id: number;
	lastname: string;
	firstname: string;
	date_of_birth: string;
	address: string;
	city: string;
	postal_code: string;
	country: string;
	phone_number: number;
	email: string;
	password: string;

	role_id: number;
	role: Role;
};

export default User;
