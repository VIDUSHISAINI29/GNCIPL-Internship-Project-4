import User from '../../model/user.js';

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params; // get userId from route params

        // Find user by ID
        const user = await User.findById(userId).select('-password'); // exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.log("Error in getUserById Controller:", error.message);
        res.status(500).json({ message: error.message });
    }
}
