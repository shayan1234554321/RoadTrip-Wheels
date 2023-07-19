
export const colors = {
    orange: "#FFB015",
    green: "#97BF0F",
    white: "#FFFFFF",
    black: "#000000",
    blue: "#15C7FF",
    red: "#FF3F15"
}

/* eslint-disable no-undef */
export const Api = {
    getCars : `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/cars` , // method: get
    
    getCar : (id) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/car/${id}`, // method: get
    createCar : `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/cars`, // method: post
    deleteCar : (id) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/cars/${id}`, // method: delete

    getUser : (username) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/users/${username}`, // method: get
    createUser : `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/users`, // method: post

    getReservations : (userId) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/users/${userId}/reservations`, // method: get
    createReservation : (userId) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/users/${userId}/reservations`, // method: post
    deleteReservation : (userId , id) => `${process.env.NEXT_PUBLIC_API_URL}/Api/v1/users/${userId}/reservations/${id}`, // method: delete
    cloudinary: (cloudName) => `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
}
/* eslint-enable no-undef */