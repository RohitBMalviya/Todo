export default function PromiseHandle(func) {
  return (request, response, next) => {
    Promise.resolve(func(request, response, next)).catch((error) =>
      console.error("Something went wrong Error: ", error)
    );
  };
}

// export function result(func) {
//   return (request, response) => {
//     return func(request, response);
//   };
// }

// export const login = result(async (request, response) => {
//   return request + response;
// });

// console.log(login(4, 5));
