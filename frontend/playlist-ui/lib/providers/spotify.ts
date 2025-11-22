import { betterAuth  } from "better-auth";

export const auth = betterAuth({
    socialProviders: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            redirectURI: process.env.SPOTIFY_REDIRECT_URI as string,
        },
    },
    session: {
        modelName: "sessions",
        fields: {
            userId: "user_id"
        },
        expiresIn: 604800, // 7 days
        updateAge: 86400, // 1 day
        disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
        additionalFields: { // Additional fields for the session table
            customField: {
                type: "string",
            }
        },
        storeSessionInDatabase: false, // Store session in database when secondary storage is provided (default: `false`)
        preserveSessionInDatabase: false, // Preserve session records in database when deleted from secondary storage (default: `false`)
        cookieCache: {
            enabled: true, // Enable caching session in cookie (default: `false`)	
            maxAge: 300 // 5 minutes
        }
    },
})
