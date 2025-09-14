import { createContext, useState } from "react";
import type RoleProviderContext from "../../model/context/RoleProviderContexte";
import type RoleProviderProps from "../../model/props/role_provider_props";
import type Role from "../../model/role";

// créer un contexte - une donnée associée a un provider(composant)
const RoleContext = createContext({} as RoleProviderContext);

const RoleProvider = ({ children }: RoleProviderProps) => {
	const [role, setRole] = useState<Role>({ id: 1, name: "" }); // Initialisez avec des valeurs par défaut

	return (
		<RoleContext.Provider value={{ role, setRole }}>
			{children}
		</RoleContext.Provider>
	);
};

export { RoleContext, RoleProvider };
