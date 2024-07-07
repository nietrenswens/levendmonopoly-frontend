import Building from "./building";

export default interface Team {
  id: string;
  name: string;
  balance: number;
  worth: number;
  numberOfBuildings: boolean;
  numberOfBuildingsWithoutTax: boolean;
  position: number;
  buildings?: Building[];
}
