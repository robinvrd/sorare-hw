import Player from "types/Player";
import Season from "types/Season";

type Card = {
    age: Number,
    position: string,
    rarity: string,
    serialNumber: Number,
    player: Player,
    season: Season,
}

export default Card;