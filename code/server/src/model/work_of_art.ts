import type Artist from "./artist.js";
import type Place from "./place.js";
import type TypeofWork from "./type_of_work.js";

type WorkOfArt = {
	id: number;
	name: string;
	image: string;
	date_of_creation: string;
	description: string;

	type_of_work_id: number;
	type_of_work: TypeofWork;

	place_id: number;
	place: Place;

	artist_id: number;
	artist: Artist;
};

export default WorkOfArt;
