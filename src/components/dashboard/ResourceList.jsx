import React from "react";
import "./Dashboard.css";

const ResourceList = ({ resources, user, onBorrowRequest, onUpdateStatus }) => {
  const handleBorrowRequest = async (resourceId) => {
    const result = await onBorrowRequest(resourceId);
    if (result.success) {
      alert("Borrow request sent successfully!");
    } else {
      alert(result.message);
    }
  };

  const handleStatusUpdate = async (resourceId, newStatus) => {
    const result = await onUpdateStatus(resourceId, newStatus);
    if (result.success) {
      alert("Resource status updated successfully!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="resource-list">
      <h2>Available Resources</h2>

      {resources.length === 0 ? (
        <div className="empty-state">
          <MotorbikeIcon />
          <p>No resources available at the moment.</p>
        </div>
      ) : (
        <div className="resources-grid">
          {resources.map((resource) => (
            <div key={resource._id} className="resource-card">
              <div className="resource-header">
                <h3>{resource.title}</h3>
                <span
                  className={`status-badge ${resource.status.toLowerCase()}`}
                >
                  {resource.status}
                </span>
              </div>

              <p className="resource-description">{resource.description}</p>
              <p className="resource-owner">Owner: {resource.owner}</p>

              <div className="resource-actions">
                {resource.owner !== user?.username &&
                  resource.status === "Available" && (
                    <button
                      className="borrow-btn"
                      onClick={() => handleBorrowRequest(resource._id)}
                    >
                      Request to Borrow
                    </button>
                  )}

                {resource.owner === user?.username && (
                  <div className="owner-actions">
                    <select
                      value={resource.status}
                      onChange={(e) =>
                        handleStatusUpdate(resource._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="Available">Available</option>
                      <option value="Borrowed">Borrowed</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple icon component
const MotorbikeIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ccc"
    strokeWidth="1"
  >
    <path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0zM15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0z" />
    <path d="M5 17H3v-4h2l3-3h4l3 3h4v4h-2" />
    <path d="M9 10l3-3 3 3" />
  </svg>
);

export default ResourceList;
