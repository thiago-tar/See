export const fetchUser = () => localStorage.getItem("user") !== "undefined"
? JSON.parse(localStorage.getItem("user"))
: localStorage.clear();