import type { Dispatch, SetStateAction } from "react";
import type Role from "../role";

// Typer les données (par ex: etats, fonctions, gestionnaires d'états...) contenus dans le contexte
type RoleProviderContext = {
	role: Role;
	setRole: Dispatch<SetStateAction<Role>>;
};

export default RoleProviderContext;
