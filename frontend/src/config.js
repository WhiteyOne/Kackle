const inDevelopment = import.meta.env.MODE === "development";

let urlToUse;

if (inDevelopment) {
  urlToUse = "http://localhost:8000";
} else {
  urlToUse = "https://kackle.onrender.com";
}

export { urlToUse };