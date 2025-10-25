import React from "react";
import "./Dashboard.css";

const BorrowRequests = ({ borrows, resources, user, onUpdateStatus }) => {
  const handleStatusUpdate = async (borrowId, newStatus) => {
    const result = await onUpdateStatus(borrowId, newStatus);
    if (result.success) {
      alert("Borrow request status updated successfully!");
    } else {
      alert(result.message);
    }
  };

  // Filter borrows based on user role
  const userBorrows = borrows.filter(
    (borrow) =>
      borrow.borrower === user?.username || borrow.owner === user?.username
  );

  const getResourceTitle = (resourceId) => {
    const resource = resources.find((r) => r._id === resourceId);
    return resource ? resource.title : "Unknown Resource";
  };

  return (
    <div className="borrow-requests">
      <h2>Borrow Requests</h2>

      {userBorrows.length === 0 ? (
        <div className="empty-state">
          <RequestIcon />
          <p>No borrow requests at the moment.</p>
        </div>
      ) : (
        <div className="requests-list">
          {userBorrows.map((borrow) => (
            <div key={borrow._id} className="request-card">
              <div className="request-header">
                <h3>{getResourceTitle(borrow.resourceId)}</h3>
                <span className={`status-badge ${borrow.status.toLowerCase()}`}>
                  {borrow.status}
                </span>
              </div>

              <div className="request-details">
                <p>
                  <strong>Borrower:</strong> {borrow.borrower}
                </p>
                <p>
                  <strong>Owner:</strong> {borrow.owner}
                </p>
                <p>
                  <strong>Requested:</strong>{" "}
                  {new Date(borrow.createdAt).toLocaleDateString()}
                </p>
              </div>

              {borrow.owner === user?.username &&
                borrow.status === "Pending" && (
                  <div className="request-actions">
                    <button
                      className="approve-btn"
                      onClick={() => handleStatusUpdate(borrow._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusUpdate(borrow._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}

              {borrow.borrower === user?.username && (
                <div className="borrower-status">
                  <p className="status-text">
                    Status:{" "}
                    <span className={borrow.status.toLowerCase()}>
                      {borrow.status}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple icon component
const RequestIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ccc"
    strokeWidth="1"
  >
    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
    <polyline points="9,11 9,7 15,7 15,11" />
    <path d="M12 3v8" />
  </svg>
);

export default BorrowRequests;
