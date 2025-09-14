class RoleAPI {
    public selectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/role`)
        
        const response = await fetch(request)
        
        return await response.json()
    }

    // Creer un enregistrement
	public selectOne = async (id: number) => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/role/${id}`,
		);
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};
}

export default RoleAPI