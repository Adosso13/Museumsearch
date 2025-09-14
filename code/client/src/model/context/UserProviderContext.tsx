import type { Dispatch, SetStateAction } from "react";
import type User from "../user";

// Typer les données (par ex: etats, fonctions, gestionnaires d'états...) contenus dans le contexte
type UserProviderContext = {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
};

export default UserProviderContext;
