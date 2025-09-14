import type User from "../../model/user";

class SecurityAPI {

    // recuperation de tous les enregistrament 
    public register =  async (data: Partial<User>) => {
        //confugurer la requete HTTP

        const request = new Request
        (`${import.meta.env.VITE_API_URL}/register`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            });
        // executer la requete et recuperer la reponse JSON
        const response = await fetch(request);
        //renvoyer les resultats JSON de la réponse
        return response.json();
        };

        public login =  async (data: Partial<User>) => {
            //confugurer la requete HTTP
            const request = new Request (`${import.meta.env.VITE_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(data)
                }
            );
            
            // executer la requete et recuperer la reponse JSON
            const response = await fetch(request);
            //renvoyer les resultats JSON de la réponse
            return response.json();
            };

            public auth =  async (data: Partial<User>) => {
                //confugurer la requete HTTP
                const request = new Request (`${import.meta.env.VITE_API_URL}/auth`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify(data)
                    }
                );
                
                // executer la requete et recuperer la reponse JSON
                const response = await fetch(request);
                //renvoyer les resultats JSON de la réponse
                return response.json();
                };

};

export default SecurityAPI

