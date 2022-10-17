import Country from "types/Country";
import Club from "types/Club";

type Player = {
    displayName: string,
    shirtNumber: Number,
    pictureUrl: string,
    country: Country,
    activeClub: Club
}

export default Player;