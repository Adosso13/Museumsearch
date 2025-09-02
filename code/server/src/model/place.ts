import type TypeofPlace from "./type_of_place.js";

type Place = {
	id: number;
	name: string;
	image: string;
	date_of_creation: string;
	description: string;
	average_visit_time: string;

	type_of_place_id: number;
	type_of_place: TypeofPlace;
};

export default Place;
