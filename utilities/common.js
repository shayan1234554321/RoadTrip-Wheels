export const colors = {
    orange: "#FFB015",
    green: "#97BF0F",
    white: "#FFFFFF",
    black: "#000000",
    blue: "#15C7FF",
    red: "#FF3F15"
}

export const api = {
    getCars : "/api/v1/cars" , // method: get
    
    getCar : (id) => `/api/v1/car/${id}`, // method: get
    createCar : "/api/v1/cars", // method: post
    deleteCar : (id) => `/api/v1/cars/${id}`, // method: delete

    getUser : (username) => `/api/v1/users/${username}`, // method: get
    createUser : "/api/v1/users", // method: post

    getReservations : (userId) => `/api/v1/users/${userId}/reservations`, // method: get
    createReservation : (userId) => `/api/v1/users/${userId}/reservations`, // method: post
    deleteReservation : (userId , id) => `/api/v1/users/${userId}/reservations/${id}` // method: delete
}