const inDevelopment = import.meta.env.MODE === "development";

let urlToUse;

if (inDevelopment) {
  urlToUse = "ws://localhost:8000";
} else {
  urlToUse = "wss://kackle.onrender.com";
}

console.log("Running in:", import.meta.env.DEV ? "development" : "production");
console.log("Using URL:", urlToUse);
export { urlToUse };