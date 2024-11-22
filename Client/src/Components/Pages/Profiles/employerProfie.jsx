import React from "react";

function EmployerProfile() {
  const employer = {
    companyName: "Tech Innovations Ltd.",
    description: "Leading tech company specializing in AI and software.",
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{employer.companyName}</h2>
      <p className="text-gray-700">{employer.description}</p>
    </div>
  );
}

export default EmployerProfile;
