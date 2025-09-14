import type Place from "./place";
import type User from "./user";

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
