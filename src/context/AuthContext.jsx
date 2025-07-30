// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);


//       verifyUserStatus(parsedUser);
//     }
//     setLoading(false);
//   }, []);

//   const verifyUserStatus = async (currentUser) => {
//     if (!currentUser) return;
//     try {
//       const response = await fetch(`http://localhost:5000/users/${currentUser.id}`);
//       if (!response.ok) throw new Error('Failed to fetch user status');

//       const latestUser = await response.json();

//       if (latestUser.status === 'blocked') {
//         alert('Your account has been blocked by the admin.');
//         logout();
//         window.location.href = '/login';
//       }
//     } catch (error) {
//       console.error('Error checking user status:', error);
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const cleanEmail = email.trim().toLowerCase();

//       const res = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`);
//       if (!res.ok) throw new Error("Error checking user");

//       const existingUsers = await res.json();

//       const userExists = existingUsers.some(user =>
//         user.email && user.email.toLowerCase() === cleanEmail
//       );

//       if (userExists) {
//         return { success: false, message: "Email already exists" };
//       }

//       const newUser = {
//         id: String(Date.now()),
//         name: name.trim(),
//         email: cleanEmail,
//         password,
//         role: 'user', 
//         status: 'active'
//       };

//       const createRes = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newUser),
//       });

//       if (!createRes.ok) {
//         throw new Error("Failed to create user");
//       }

//       const userData = await createRes.json();
//       return { success: true, user: userData };

//     } catch (error) {
//       console.error("Registration error:", error);
//       return { success: false, message: "Something went wrong during registration" };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const cleanEmail = email.trim().toLowerCase();

//       const res = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`);
//       if (!res.ok) throw new Error("Error fetching user");

//       const users = await res.json();

//       const foundUser = users.find(user =>
//         user.email &&
//         user.email.toLowerCase() === cleanEmail &&
//         user.password === password
//       );

//       if (!foundUser) {
//         return { success: false, message: "Invalid email or password" };
//       }

//       // ✅ Check if user is blocked
//       if (foundUser.status === 'blocked') {
//         return { success: false, message: "Your account has been blocked by the admin." };
//       }

//       // ✅ Default values if not set
//       if (!foundUser.role) {
//         foundUser.role = 'user';
//       }
//       if (!foundUser.status) {
//         foundUser.status = 'active';
//       }

//       setUser(foundUser);
//       localStorage.setItem('user', JSON.stringify(foundUser));

//       return { success: true, user: foundUser };

//     } catch (error) {
//       console.error("Login error:", error);
//       return { success: false, message: "Something went wrong during login" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const updatePassword = async (newPassword) => {
//     if (!user) throw new Error('No user found');

//     const updatedUser = { ...user, password: newPassword };

//     await fetch(`http://localhost:5000/users/${user.id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ password: newPassword }),
//     });

//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     loading,
//     register,
//     login,
//     logout,
//     updatePassword
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);


      verifyUserStatus(parsedUser);
    }
    setLoading(false);
  }, []);

  const verifyUserStatus = async (currentUser) => {
    if (!currentUser) return;
    try {
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}`);
      if (!response.ok) throw new Error('Failed to fetch user status');

      const latestUser = await response.json();

      if (latestUser.status === 'blocked') {
        alert('Your account has been blocked by the admin.');
        logout();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      const res = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`);
      if (!res.ok) throw new Error("Error checking user");

      const existingUsers = await res.json();

      const userExists = existingUsers.some(user =>
        user.email && user.email.toLowerCase() === cleanEmail
      );

      if (userExists) {
        return { success: false, message: "Email already exists" };
      }

      const newUser = {
        id: String(Date.now()),
        name: name.trim(),
        email: cleanEmail,
        password,
        role: 'user',
        status: 'active'
      };

      const createRes = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create user");
      }

      const userData = await createRes.json();
      return { success: true, user: userData };

    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Something went wrong during registration" };
    }
  };

  const login = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      const res = await fetch(`http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`);
      if (!res.ok) throw new Error("Error fetching user");

      const users = await res.json();

      const foundUser = users.find(user =>
        user.email &&
        user.email.toLowerCase() === cleanEmail &&
        user.password === password
      );

      if (!foundUser) {
        return { success: false, message: "Invalid email or password" };
      }


      if (foundUser.status === 'blocked') {
        return { success: false, message: "Your account has been blocked by the admin." };
      }

    
      if (!foundUser.role) {
        foundUser.role = 'user';
      }
      if (!foundUser.status) {
        foundUser.status = 'active';
      }

      setUser(foundUser);
      localStorage.setItem('userId', foundUser.id.toString());


      return { success: true, user: foundUser };

    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong during login" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  const updatePassword = async (newPassword) => {
    if (!user) throw new Error('No user found');

    const updatedUser = { ...user, password: newPassword };

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    setUser(updatedUser);
    localStorage.setItem('userId', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
