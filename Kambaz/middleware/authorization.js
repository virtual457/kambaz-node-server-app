// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.currentUser) {
    return res.status(401).json({ message: "Unauthorized - Please sign in" });
  }
  next();
};

// Middleware to check if user has required role
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.currentUser) {
      return res.status(401).json({ message: "Unauthorized - Please sign in" });
    }

    const userRole = req.session.currentUser.role;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: `Forbidden - ${allowedRoles.join(" or ")} role required` 
      });
    }
    
    next();
  };
};

// Middleware to check if user is faculty or admin
export const requireFacultyOrAdmin = requireRole("FACULTY", "ADMIN");

// Middleware to check if user is admin only
export const requireAdmin = requireRole("ADMIN");
