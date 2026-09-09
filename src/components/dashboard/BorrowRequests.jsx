import React, { useState } from "react";

const formatDateRelative = (dateString) => {
  if (!dateString) return "recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

const BorrowRequests = ({
  borrows,
  resources,
  user,
  onUpdateStatus,
  showToast,
}) => {
  const [rowErrors, setRowErrors] = useState({});

  const incomingRequests = borrows.filter(
    (b) => b.owner === user?.username
  );
  const outgoingRequests = borrows.filter(
    (b) => b.borrower === user?.username
  );

  const pendingCount = incomingRequests.filter(
    (b) => b.status === "Pending"
  ).length;

  const getResourceTitle = (resourceId) => {
    const resource = resources.find((r) => r._id === resourceId);
    return resource ? resource.title : "Resource";
  };

  const handleStatusChange = async (borrowId, newStatus) => {
    // Clear existing error for this row
    setRowErrors((prev) => ({ ...prev, [borrowId]: null }));

    const result = await onUpdateStatus(borrowId, newStatus);
    if (result.success) {
      if (showToast) {
        showToast(`Request marked as ${newStatus}`, "success");
      }
    } else {
      setRowErrors((prev) => ({
        ...prev,
        [borrowId]: result.message || "Request couldn’t be updated.",
      }));
      if (showToast) {
        showToast(result.message || "Failed to update request", "error");
      }
    }
  };

  return (
    <div className="mx-auto max-w-[1000px]">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.7px] md:text-[36px] md:tracking-[-0.9px]">
            Borrow requests
          </h1>
          <p className="mt-2 text-[14px] text-[#5f5f5d]">
            {pendingCount} {pendingCount === 1 ? "pending" : "pending"}
          </p>
        </div>
      </div>

      {/* =========================================================================
          Section 1: Requests to you (Incoming requests for items you own)
          ========================================================================= */}
      <section className="mt-10">
        <h2 className="text-[14px] font-semibold text-[#1c1c1c]">
          Requests to you
        </h2>

        {incomingRequests.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-[#e0dbcd] p-8 text-center text-[#5f5f5d]">
            <p className="text-[15px]">No incoming requests at the moment.</p>
          </div>
        ) : (
          <div className="mt-3 border-t border-[#eceae4]">
            {/* Desktop Table Header */}
            <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_130px_200px] items-center gap-x-6 border-b border-[#eceae4] py-2.5 md:grid">
              <span className="text-[13px] text-[#5f5f5d]">Resource</span>
              <span className="text-[13px] text-[#5f5f5d]">Student</span>
              <span className="text-[13px] text-[#5f5f5d]">Status</span>
              <span className="text-right text-[13px] text-[#5f5f5d]">
                Actions
              </span>
            </div>

            {/* Request Rows */}
            {incomingRequests.map((req) => {
              const hasError = rowErrors[req._id];
              return (
                <div
                  key={req._id}
                  className="flex flex-col gap-3 border-b border-[#eceae4] py-4 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_130px_200px] md:items-center md:gap-x-6"
                >
                  {/* Column 1: Resource Title */}
                  <div className="flex items-start justify-between gap-3 md:block">
                    <span className="text-[15px] font-semibold leading-snug text-[#1c1c1c]">
                      {getResourceTitle(req.resourceId)}
                    </span>

                    {/* Mobile status badge */}
                    <span className="md:hidden">
                      <StatusBadge status={req.status} />
                    </span>
                  </div>

                  {/* Column 2: Student */}
                  <span className="text-[14px] text-[#5f5f5d]">
                    <span className="text-[#1c1c1c] font-medium mr-1">
                      {req.borrower}
                    </span>
                    requested {formatDateRelative(req.createdAt)}
                  </span>

                  {/* Column 3: Status Badge (Desktop) */}
                  <span className="hidden md:inline-flex md:w-fit">
                    <StatusBadge status={req.status} />
                  </span>

                  {/* Column 4: Actions */}
                  <div className="flex items-center gap-2 md:justify-end">
                    {req.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(req._id, "Approved")
                          }
                          className="btn-inset rounded-md bg-[#1c1c1c] px-3.5 py-1.5 text-[14px] text-[#fcfbf8]"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(req._id, "Rejected")
                          }
                          className="btn-ghost rounded-md border border-[rgba(28,28,28,0.4)] px-3.5 py-1.5 text-[14px] text-[#1c1c1c]"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {req.status === "Approved" && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(req._id, "Returned")}
                        className="btn-ghost rounded-md border border-[rgba(28,28,28,0.4)] px-3.5 py-1.5 text-[14px] text-[#1c1c1c]"
                      >
                        Mark returned
                      </button>
                    )}

                    {(req.status === "Returned" || req.status === "Rejected") && (
                      <span className="text-[14px] text-[rgba(28,28,28,0.4)]">
                        —
                      </span>
                    )}
                  </div>

                  {/* Row-level inline error */}
                  {hasError && (
                    <div className="md:col-span-4 mt-2">
                      <div className="flex w-fit items-center gap-2 rounded-lg border-[1.5px] border-[rgba(28,28,28,0.4)] bg-[#fcfbf8] px-3 py-2 text-[13px] text-[#1c1c1c]">
                        <i className="ti ti-alert-circle text-[16px]"></i>
                        <span>
                          <span className="font-semibold">
                            Request couldn’t be updated.{" "}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(req._id, "Approved")
                            }
                            className="underline underline-offset-2 ml-1"
                          >
                            Try again
                          </button>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          Section 2: Your requests (Outgoing requests you made to borrow)
          ========================================================================= */}
      <section className="mt-14">
        <h2 className="text-[14px] font-semibold text-[#1c1c1c]">
          Your requests
        </h2>

        {outgoingRequests.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-[#e0dbcd] p-8 text-center text-[#5f5f5d]">
            <p className="text-[15px]">You haven’t requested any items yet.</p>
          </div>
        ) : (
          <div className="mt-3 border-t border-[#eceae4]">
            {/* Desktop Table Header */}
            <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_130px_200px] items-center gap-x-6 border-b border-[#eceae4] py-2.5 md:grid">
              <span className="text-[13px] text-[#5f5f5d]">Resource</span>
              <span className="text-[13px] text-[#5f5f5d]">Owner</span>
              <span className="text-[13px] text-[#5f5f5d]">Status</span>
              <span className="text-right text-[13px] text-[#5f5f5d]"></span>
            </div>

            {/* Outgoing Rows */}
            {outgoingRequests.map((req) => (
              <div
                key={req._id}
                className="flex flex-col gap-3 border-b border-[#eceae4] py-4 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_130px_200px] md:items-center md:gap-x-6"
              >
                {/* Column 1: Resource Title */}
                <div className="flex items-start justify-between gap-3 md:block">
                  <span className="text-[15px] font-semibold leading-snug text-[#1c1c1c]">
                    {getResourceTitle(req.resourceId)}
                  </span>
                  <span className="md:hidden">
                    <StatusBadge status={req.status} />
                  </span>
                </div>

                {/* Column 2: Owner */}
                <span className="text-[14px] text-[#5f5f5d]">
                  owned by{" "}
                  <span className="text-[#1c1c1c] font-medium">
                    {req.owner}
                  </span>
                </span>

                {/* Column 3: Status (Desktop) */}
                <span className="hidden md:inline-flex md:w-fit">
                  <StatusBadge status={req.status} />
                </span>

                {/* Column 4: Actions */}
                <span className="hidden text-right text-[14px] text-[rgba(28,28,28,0.4)] md:block">
                  —
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Reusable status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(28,28,28,0.4)] px-2.5 py-1 text-[12px] text-[#1c1c1c]">
          <i className="ti ti-clock-hour-3 text-[13px]"></i>
          Pending
        </span>
      );
    case "Approved":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1c1c] px-2.5 py-1 text-[12px] text-[#fcfbf8]">
          <i className="ti ti-check text-[13px]"></i>
          Approved
        </span>
      );
    case "Returned":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eceae4] bg-[#f7f4ed] px-2.5 py-1 text-[12px] text-[#1c1c1c]">
          <i className="ti ti-undo-2 text-[13px]"></i>
          Returned
        </span>
      );
    case "Rejected":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(28,28,28,0.05)] border border-[#eceae4] px-2.5 py-1 text-[12px] text-[#5f5f5d]">
          <i className="ti ti-x text-[13px]"></i>
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eceae4] px-2.5 py-1 text-[12px] text-[#5f5f5d]">
          {status}
        </span>
      );
  }
};

export default BorrowRequests;
