import User from "../models/User.js";
//all $
// Middleware to check if user is authenticated
export const requireAuth = async (req, res, next) => {
    try {
        console.log('Session check:', req.session); // Debug log
        console.log('Session ID:', req.sessionID); // Debug log

        // Check if user has a session
        if (!req.session.userId) {
            console.log('No userId in session'); // Debug log
            return res.status(401).json({
                error: "Authentication required. Please log in."
            });
        }

        // Verify user still exists in database
        const user = await User.findById(req.session.userId);
        if (!user) {
            // Clear invalid session
            req.session.destroy();
            return res.status(401).json({ 
                error: "User not found. Please log in again." 
            });
        }

        // Add user info to request object for use in routes
        req.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Middleware to check if user is already authenticated (for login/signup routes)
export const requireGuest = (req, res, next) => {
    if (req.session.userId) {
        return res.status(400).json({ 
            error: "Already authenticated" 
        });
    }
    next();
};

// Optional auth middleware - doesn't block if not authenticated
export const optionalAuth = async (req, res, next) => {
    try {
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.user = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                };
            }
        }
        next();
    } catch (error) {
        console.error("Optional auth middleware error:", error);
        // Don't block the request, just continue without user info
        next();
    }
};
