class ArtistAPI {
    public selectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/artist`)
        
        const response = await fetch(request)
        
        return await response.json()
    }

    // Creer un enregistrement
	public selectOne = async (id: number) => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/artist/${id}`,
		);
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

    public insert = async (data: FormData) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/artist`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
            }
        );

		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

	public update = async (data: FormData) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/artist`, 
            {
			    method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
            }
        );

		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

	public delete = async (data: FormData) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/artist`, 
            {
			    method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data,
            }
        );
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};
}

export default ArtistAPI