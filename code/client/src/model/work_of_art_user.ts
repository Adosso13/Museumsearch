import type User from "./user";
import type WorkOfArt from "./work_of_art";

type WorkOfArtUser = {
	id: number;
	view: boolean;
	favorite: boolean;
	wishlist: boolean;

	user_id: number;
	user: User;

	work_of_art_id: number;
	work_of_art: WorkOfArt;
};

export default WorkOfArtUser;
