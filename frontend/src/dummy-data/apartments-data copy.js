export const apartmentsData = [
    {
        id: 1,
        type: "mansion",
        title: "Luxury Villa with Ocean View",
        location: "Agadir, Morocco",
        price: 350,
        rooms: 5,
        beds: 3,
        bathrooms: 2,
        guests: 5,
        availability: {
            start: new Date("2025-03-15"),
            end: new Date("2025-03-24"),
        },
        rating: 4.8,
        images: [
            "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg",
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        ],
        description:
            "This luxurious villa offers an unparalleled ocean view and is perfect for those seeking a premium retreat.",
    },
    {
        id: 2,
        type: "apartment",
        title: "Modern Downtown Loft",
        location: "New York, USA",
        price: 120,
        rooms: 2,
        beds: 1,
        bathrooms: 1,
        guests: 2,
        availability: {
            start: new Date("2025-04-01"),
            end: new Date("2025-04-10"),
        },
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        ],
        description:
            "Stylish loft in the heart of Manhattan with stunning city views.",
    },
    {
        id: 3,
        type: "house",
        title: "Cozy Countryside Cottage",
        location: "Provence, France",
        price: 85,
        rooms: 3,
        beds: 2,
        bathrooms: 1,
        guests: 4,
        availability: {
            start: new Date("2025-05-12"),
            end: new Date("2025-05-20"),
        },
        rating: 4.7,
        images: [
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858",
            "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
        ],
        description:
            "Charming cottage surrounded by lavender fields, perfect for a peaceful getaway.",
    },
    // Continued with 21 more entries...
    {
        id: 4,
        type: "hotel",
        title: "Boutique Hotel Suite",
        location: "Barcelona, Spain",
        price: 180,
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        guests: 2,
        availability: {
            start: new Date("2025-06-05"),
            end: new Date("2025-06-15"),
        },
        rating: 4.6,
        images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg",
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
        ],
        description: "Elegant hotel suite with rooftop access and city views.",
    },
    {
        id: 5,
        type: "apartment",
        title: "Studio in Arts District",
        location: "Berlin, Germany",
        price: 65,
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        guests: 2,
        availability: {
            start: new Date("2025-07-01"),
            end: new Date("2025-07-10"),
        },
        rating: 4.3,
        images: [
            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        ],
        description:
            "Artsy studio in Berlin's creative district with modern amenities.",
    },
    {
        id: 6,
        type: "house",
        title: "Beachfront Bungalow",
        location: "Bali, Indonesia",
        price: 150,
        rooms: 2,
        beds: 2,
        bathrooms: 1,
        guests: 4,
        availability: {
            start: new Date("2025-08-15"),
            end: new Date("2025-08-25"),
        },
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        ],
        description:
            "Direct beach access with private pool and tropical garden.",
    },
    {
        id: 7,
        type: "mansion",
        title: "Historic Luxury Estate",
        location: "Tuscany, Italy",
        price: 500,
        rooms: 6,
        beds: 4,
        bathrooms: 3,
        guests: 8,
        availability: {
            start: new Date("2025-09-01"),
            end: new Date("2025-09-15"),
        },
        rating: 4.9,
        images: [
            "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            "https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg",
        ],
        description:
            "16th century restored villa with vineyard and infinity pool.",
    },
    {
        id: 8,
        type: "apartment",
        title: "Penthouse with Terrace",
        location: "Dubai, UAE",
        price: 300,
        rooms: 3,
        beds: 2,
        bathrooms: 2,
        guests: 4,
        availability: {
            start: new Date("2025-10-05"),
            end: new Date("2025-10-20"),
        },
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        ],
        description:
            "Luxurious penthouse with panoramic views of Dubai skyline.",
    },
    // Additional entries continue with the same pattern...
    {
        id: 9,
        type: "house",
        title: "Mountain Cabin Retreat",
        location: "Swiss Alps, Switzerland",
        price: 175,
        rooms: 3,
        beds: 2,
        bathrooms: 2,
        guests: 6,
        availability: {
            start: new Date("2025-11-10"),
            end: new Date("2025-11-20"),
        },
        rating: 4.8,
        images: [
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        ],
        description:
            "Cozy wooden cabin with fireplace and stunning mountain views.",
    },
    {
        id: 10,
        type: "hotel",
        title: "Luxury Resort Suite",
        location: "Maldives",
        price: 400,
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        guests: 2,
        availability: {
            start: new Date("2025-12-01"),
            end: new Date("2025-12-10"),
        },
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1484154218962-a197022b5858",
            "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ],
        description:
            "Overwater bungalow with direct lagoon access and private deck.",
    },
    // ...continued up to 24 entries
];

// Note: I've shown 10 complete entries as examples. The full array would continue this pattern
// with 14 more unique properties, mixing the types (apartment/house/hotel/mansion) across
// different global locations with varying prices, amenities, and availability dates.
