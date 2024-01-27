export interface Housing {
  housingType: string;
  housingName: string;
  floors: number[];
  rooms: string[][];
}

export enum HousingType {
  COMMONS = "Commons",
  UPPER_LEVEL = "Upper Level",
  UPPER_LEVEL_RES_COLLEGE = "Upper Level Residential College",
  UPPER_LEVEL_LIVING_LEARNING = "Upper Level Living Learning",
}

export enum HousingName {
  CRAWFORD_HOUSE = "Crawford House",
  EAST_HOUSE = "East House",
  GILLETTE_HOUSE = "Gillette House",
  HANK_INGRAM_HOUSE = "Hank Ingram House",
  MEMORIAL_HOUSE = "Memorial House",
  MURRAY_HOUSE = "Murray House",
  NORTH_HOUSE = "North House",
  STAMBAUGH_HOUSE = "Stambaugh House",
  SUTHERLAND_HOUSE = "Sutherland House",
  WEST_HOUSE = "West House",
  BLAKEMORE_HOUSE = "Blakemore House",
  CHAFFIN_PLACE = "Chaffin Place",
  COLE_HALL = "Cole Hall",
  LEWIS_HOUSE = "Lewis House",
  LUPTON_HALL = "Lupton Hall",
  MCTYREIRE_HALL = "McTyeire Hall",
  MORGAN_HOUSE = "Morgan House",
  SCALES_HOUSE = "Scales House",
  STAPLETON_HOUSE = "Stapleton House",
  TOLMAN_HALL = "Tolman Hall",
  VAUGHN_HOUSE = "Vaughn House",
  VILLAGE_SOUTH = "Village at Vanderbilt South Tower",
  VILLAGE_TOWNHOUSE = "Village at Vanderbilt Townhouses",
  EBI_COLLEGE = "E. Bronson Ingram College",
  MOORE_COLLEGE = "Moore College",
  ZEPPOS_COLLEGE = "Nicholas S. Zeppos College",
  ROTHSCHILD_COLLEGE = "Rotshchild College",
  WARREN_COLLEGE = "Warren College",
  MAYFIELD_PLACE = "Mayfield Place",
  MCGILL_HALL = "McGill Hall",
}

export const commonsHousing = {
  CRAWFORD_HOUSE: "Crawford House",
  EAST_HOUSE: "East House",
  GILLETTE_HOUSE: "Gillette House",
  HANK_INGRAM_HOUSE: "Hank Ingram House",
  MEMORIAL_HOUSE: "Memorial House",
  MURRAY_HOUSE: "Murray House",
  NORTH_HOUSE: "North House",
  STAMBAUGH_HOUSE: "Stambaugh House",
  SUTHERLAND_HOUSE: "Sutherland House",
  WEST_HOUSE: "West House",
};

export const upperLevelHousing = {
  BLAKEMORE_HOUSE: "Blakemore House",
  CHAFFIN_PLACE: "Chaffin Place",
  COLE_HALL: "Cole Hall",
  LEWIS_HOUSE: "Lewis House",
  LUPTON_HALL: "Lupton Hall",
  MCTYREIRE_HALL: "McTyeire Hall",
  MORGAN_HOUSE: "Morgan House",
  SCALES_HOUSE: "Scales House",
  STAPLETON_HOUSE: "Stapleton House",
  TOLMAN_HALL: "Tolman Hall",
  VAUGHN_HOUSE: "Vaughn House",
  VILLAGE_SOUTH: "Village at Vanderbilt South Tower",
  VILLAGE_TOWNHOUSE: "Village at Vanderbilt Townhouses",
};

export const upperLevelResColleges = {
  EBI_COLLEGE: "E. Bronson Ingram College",
  MOORE_COLLEGE: "Moore College",
  ZEPPOS_COLLEGE: "Nicholas S. Zeppos College",
  ROTHSCHILD_COLLEGE: "Rotshchild College",
  WARREN_COLLEGE: "Warren College",
};

export const upperLevelLivingLearning = {
  MAYFIELD_PLACE: "Mayfield Place",
  MCGILL_HALL: "McGill Hall",
};
