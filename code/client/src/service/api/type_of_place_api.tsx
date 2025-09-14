import type TypeOfWork from "../../model/type_of_place";

class TypeOfPlaceAPI {
    public selectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_place`)
        
        const response = await fetch(request)
        
        return await response.json()
    }

    // Creer un enregistrement
	public selectOne = async (id: number) => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/type_of_place/${id}`,
		);
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

    public insert = async (data: Partial<TypeOfWork>) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_place`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }
        );

		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

	public update = async (data: Partial<TypeOfWork>) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_place`, 
            {
			    method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }
        );

		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};

	public delete = async (data: Partial<TypeOfWork>) => {
		//confugurer la requete HTTP
		const request = new Request(`${import.meta.env.VITE_API_URL}/type_of_place`, 
            {
			    method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }
        );
		const response = await fetch(request);
		return response.json();
		// recuperation d'un enregistrament
	};
}

export default TypeOfPlaceAPI