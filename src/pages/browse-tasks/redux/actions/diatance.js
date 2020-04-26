export function changeDistance(distance) {
    console.log(distance)
    return {
      type: "CHANGE_DISTANCE",
      distance
    };
}