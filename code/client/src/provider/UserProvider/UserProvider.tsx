import { createContext, useState } from "react";
import type UserProviderContext from "../../model/context/UserProviderContext";
import type UserProviderProps from "../../model/props/user_provider_props";
import type User from "../../model/user";

// créer un contexte - une donnée associée a un provider(composant)
const UserContext = createContext({} as UserProviderContext);

const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User>({} as User);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
