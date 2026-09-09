import React, { useState } from "react";

const getCategoryInfo = (resource) => {
  if (resource.category) {
    switch (resource.category) {
      case "Cameras":
        return { name: "Cameras", icon: "ti-camera" };
      case "Textbooks":
        return { name: "Textbooks", icon: "ti-book-2" };
      case "Lab equipment":
        return { name: "Lab equipment", icon: "ti-flask-2" };
      case "Instruments":
        return { name: "Instruments", icon: "ti-guitar-pick" };
      case "Sports gear":
        return { name: "Sports gear", icon: "ti-barbell" };
      default:
        return { name: resource.category, icon: "ti-package" };
    }
  }

  const text = `${resource.title} ${resource.description}`.toLowerCase();
  if (/camera|lens|dslr|nikon|canon|tripod/.test(text)) {
    return { name: "Cameras", icon: "ti-camera" };
  }
  if (/book|chemistry|calculus|stewart|text|volume|edition|algebra|physics/.test(text)) {
    return { name: "Textbooks", icon: "ti-book-2" };
  }
  if (/meter|scope|probe|multimeter|slide|lab|microscope|circuit|arduino/.test(text)) {
    return { name: "Lab equipment", icon: "ti-flask-2" };
  }
  if (/guitar|violin|piano|keyboard|yamaha|strings|rehearsal|flute/.test(text)) {
    return { name: "Instruments", icon: "ti-guitar-pick" };
  }
  if (/ball|racket|tennis|basketball|sports|cricket|jersey|badminton/.test(text)) {
    return { name: "Sports gear", icon: "ti-barbell" };
  }
  return { name: "Equipment", icon: "ti-package" };
};

const ResourceList = ({
  resources,
  user,
  onBorrowRequest,
  onUpdateStatus,
  onOpenAddModal,
  showToast,
}) => {
  const [filter, setFilter] = useState("All");

  const filteredResources = resources.filter((r) => {
    if (filter === "All") return true;
    return r.status?.toLowerCase() === filter.toLowerCase();
  });

  const handleBorrow = async (resourceId) => {
    const result = await onBorrowRequest(resourceId);
    if (result.success) {
      if (showToast) showToast("Borrow request sent successfully!", "success");
    } else {
      if (showToast) showToast(result.message, "error");
    }
  };

  const handleStatus = async (resourceId, newStatus) => {
    const result = await onUpdateStatus(resourceId, newStatus);
    if (result.success) {
      if (showToast) showToast(`Item marked as ${newStatus}`, "success");
    } else {
      if (showToast) showToast(result.message, "error");
    }
  };

  return (
    <div className="mx-auto max-w-[1000px]">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-3">
          <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.9px] md:text-[36px]">
            Resources
          </h1>
          <span className="text-[14px] tabular-nums text-[#5f5f5d]">
            {filteredResources.length} {filteredResources.length === 1 ? "item" : "items"}
          </span>
        </div>

        {onOpenAddModal && (
          <button
            type="button"
            onClick={onOpenAddModal}
            className="btn-inset md:hidden flex items-center gap-1.5 rounded-md bg-[#1c1c1c] px-3 py-1.5 text-[14px] font-medium text-[#fcfbf8]"
          >
            <i className="ti ti-plus"></i>
            Add resource
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["All", "Available", "Borrowed", "Unavailable"].map((status) => {
          const isActive = filter === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[14px] leading-none transition-all ${
                isActive
                  ? "border border-[#1c1c1c] bg-[#1c1c1c] text-[#fcfbf8]"
                  : "border border-[#eceae4] text-[#1c1c1c] hover:border-[rgba(28,28,28,0.4)]"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Resource Grid */}
      {filteredResources.length === 0 ? (
        <section className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-dashed border-[#e0dbcd] px-8 py-14 text-center">
          <span className="text-[28px] text-[#5f5f5d]">
            <i className="ti ti-package-plus"></i>
          </span>
          <p className="text-[16px] text-[#5f5f5d]">
            {resources.length === 0
              ? "No resources have been listed yet."
              : "No resources found matching this filter."}
          </p>
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="btn-ghost rounded-md border border-[rgba(28,28,28,0.4)] px-4 py-2 text-[14px]"
            >
              Add resource
            </button>
          )}
        </section>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const isOwner = resource.owner === user?.username;
            const category = getCategoryInfo(resource);
            const status = resource.status || "Available";

            return (
              <article
                key={resource._id}
                className="flex flex-col rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-4.5 transition-shadow hover:shadow-xs"
              >
                {/* Category */}
                <div className="flex items-center gap-1.5 text-[13px] text-[#5f5f5d]">
                  <span className="text-[16px]">
                    <i className={`ti ${category.icon}`}></i>
                  </span>
                  <span>{category.name}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2.5 text-[19px] font-semibold leading-[1.25] text-[#1c1c1c]">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 line-clamp-2 text-[15px] leading-[1.4] text-[rgba(28,28,28,0.82)]">
                  {resource.description}
                </p>

                {/* Owner */}
                <p className="mt-3 text-[13px] text-[#5f5f5d]">
                  {isOwner ? "Owned by you" : `Owned by ${resource.owner}`}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#eceae4] pt-3.5 mt-auto">
                  {/* Status Badge */}
                  {status === "Available" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(28,28,28,0.4)] px-2.5 py-1 text-[12px] leading-none">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1c1c1c]"></span>
                      Available
                    </span>
                  )}
                  {status === "Borrowed" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1c1c] px-2.5 py-1 text-[12px] leading-none text-[#fcfbf8]">
                      <i className="ti ti-arrow-left-right text-[12px]"></i>
                      Borrowed
                    </span>
                  )}
                  {status === "Unavailable" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(28,28,28,0.04)] px-2.5 py-1 text-[12px] leading-none text-[#5f5f5d]">
                      <i className="ti ti-ban text-[12px]"></i>
                      Unavailable
                    </span>
                  )}

                  {/* Actions */}
                  {!isOwner && status === "Available" && (
                    <button
                      type="button"
                      onClick={() => handleBorrow(resource._id)}
                      className="btn-inset cursor-pointer rounded-md bg-[#1c1c1c] px-3 py-1.5 text-[13px] font-medium leading-none text-[#fcfbf8]"
                    >
                      Request to borrow
                    </button>
                  )}

                  {!isOwner && status === "Borrowed" && (
                    <span className="text-[13px] text-[#5f5f5d]">
                      Currently borrowed
                    </span>
                  )}

                  {!isOwner && status === "Unavailable" && (
                    <span className="text-[13px] text-[#5f5f5d]">
                      Unavailable
                    </span>
                  )}

                  {isOwner && status === "Available" && (
                    <button
                      type="button"
                      onClick={() => handleStatus(resource._id, "Unavailable")}
                      className="cursor-pointer text-[13px] leading-none underline decoration-[rgba(28,28,28,0.4)] underline-offset-4 transition-colors hover:decoration-[#1c1c1c]"
                    >
                      Mark unavailable
                    </button>
                  )}

                  {isOwner && status === "Unavailable" && (
                    <button
                      type="button"
                      onClick={() => handleStatus(resource._id, "Available")}
                      className="cursor-pointer text-[13px] leading-none underline decoration-[rgba(28,28,28,0.4)] underline-offset-4 transition-colors hover:decoration-[#1c1c1c]"
                    >
                      Mark available
                    </button>
                  )}

                  {isOwner && status === "Borrowed" && (
                    <span className="text-[13px] text-[#5f5f5d]">
                      Out on loan
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
