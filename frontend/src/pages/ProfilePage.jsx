import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-gray-500 ">
        <p>No user data available. Please login.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background flex items-center justify-center px-4 py-8 transition-colors">
      <div className="w-full max-w-3xl bg-white dark:bg-surface shadow-lg rounded-xl p-6 sm:p-10 transition-colors border-t-4 border-transparent dark:border-gold">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gold dark:bg-yellow-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
              {user.name?.charAt(0).toUpperCase() || <User className="w-10 h-10" />}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
              {user.name}
            </h2>
            <p className="mt-2 text-gray-600 ">{user.email}</p>
            {user.username && (
              <p className="mt-1 text-gray-500 ">@{user.username}</p>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-backgroundLight rounded-lg shadow-sm transition-colors ">
            <h3 className="text-lg font-medium text-gray-700 ">Name</h3>
            <p className="mt-1 text-gray-900 ">{user.name}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-backgroundLight rounded-lg shadow-sm transition-colors ">
            <h3 className="text-lg font-medium text-gray-700 ">Email</h3>
            <p className="mt-1 text-gray-900 ">{user.email}</p>
          </div>

          {user.username && (
            <div className="p-4 bg-gray-50 dark:bg-backgroundLight rounded-lg shadow-sm transition-colors ">
              <h3 className="text-lg font-medium text-gray-700 ">Username</h3>
              <p className="mt-1 text-gray-900 ">{user.username}</p>
            </div>
          )}

          <div className="p-4 bg-gray-50 dark:bg-backgroundLight rounded-lg shadow-sm transition-colors ">
            <h3 className="text-lg font-medium text-gray-700 ">Joined</h3>
            <p className="mt-1 text-gray-900 ">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
