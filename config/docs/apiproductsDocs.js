module.exports = {
    paths: {
        '/products': {
            get: {
                tags: ['Products'],
                description: 'Get all products',
                responses: {
                    200: {
                        description: 'Products retrieved successfully',
                    },
                    404: {
                        description: "Product not found",
                      },
                      500: {
                        description: "Internal Server Error",
                      },
                },
            },
        },
    },
};
