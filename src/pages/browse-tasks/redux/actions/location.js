export function changeLocation(locations) {
    console.log(locations)
    return {
      type: "CHANGE_LOCATION",
      locations
    };
}