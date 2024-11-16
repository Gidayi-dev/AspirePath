// A dedicated page where recruiters and job seekers can communicate.
// Displays messages or chats related to job applications.
// Can include real-time messaging features.
import React from "react";

function Messages() {
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content: "Hey! I'm interested in the job you posted.",
    },
    {
      id: 2,
      sender: "Jane Smith",
      content: "Can you provide more details on the project?",
    },
    {
      id: 3,
      sender: "Mike Johnson",
      content:
        "I have applied for the role. Looking forward to hearing from you!",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Messages</h2>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-6 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {msg.sender}
              </h3>
              <p className="text-gray-700">{msg.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
