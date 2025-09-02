import type User from "./user.js";
import type Place from "./work_of_art.js";

type PlaceUser = {
	id: number;
	view: boolean;
	favorite: boolean;
	wishlist: boolean;

	user_id: number;
	user: User;

	place_id: number;
	place: Place;
};

export default PlaceUser;
