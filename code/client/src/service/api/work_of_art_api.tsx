
class TypeOfWorkAPI {
    public selectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_work`)
        
        const response = await fetch(request)
        
        return await response.json()
    }

    // Creer un enregistrement
	public selectOne = async (id: number) => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/type_of_work/${id}`,
		);
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

    public insert = async (data: FormData) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_work`, 
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
		const request = new Request(`${import.meta.env.VITE_API_URL}/publisher`, 
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
		const request = new Request(`${import.meta.env.VITE_API_URL}/publisher`, 
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

export default TypeOfWorkAPI