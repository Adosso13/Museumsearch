import type Artist from "./artist";
import type Place from "./place";
import type TypeOfWork from "./type_of_work";

type WorkOfArt = {
	id: number;
	name: string;
	image: string;
	date_of_creation: string;
	description: string;

	type_of_work_id: number;
	type_of_work: TypeOfWork;

	place_id: number;
	place: Place;

	artist_id: number;
	artist: Artist;
};

export default WorkOfArt;
