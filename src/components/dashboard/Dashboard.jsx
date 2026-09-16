import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { resourceAPI, borrowAPI } from "../../services/api";
import ResourceList from "./ResourceList";
import AddResource from "./AddResource";
import BorrowRequests from "./BorrowRequests";
import HealthCheck from "../HealthCheck";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [resources, setResources] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [activeTab, setActiveTab] = useState("resources");
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resourcesRes, borrowsRes] = await Promise.all([
        resourceAPI.getAllResources(),
        borrowAPI.getAllBorrows(),
      ]);
      setResources(resourcesRes.data || []);
      setBorrows(borrowsRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = async (resourceData) => {
    try {
      await resourceAPI.addResource({
        ...resourceData,
        owner: user.username,
      });
      fetchData();
      showToast("Resource listed successfully!", "success");
      setIsAddModalOpen(false);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add resource",
      };
    }
  };

  const handleBorrowRequest = async (resourceId) => {
    try {
      const targetResource = resources.find((r) => r._id === resourceId);
      await borrowAPI.requestBorrow({
        resourceId,
        borrower: user.username,
        owner: targetResource?.owner,
      });
      fetchData();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to send borrow request",
      };
    }
  };

  const handleUpdateResourceStatus = async (resourceId, status) => {
    try {
      await resourceAPI.updateResourceStatus(resourceId, status);
      fetchData();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update resource status",
      };
    }
  };

  const handleUpdateBorrowStatus = async (borrowId, status) => {
    try {
      await borrowAPI.updateBorrowStatus(borrowId, status);
      fetchData();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update borrow status",
      };
    }
  };

  // Calculate pending requests count for items owned by current user
  const pendingRequestsCount = borrows.filter(
    (b) => b.owner === user?.username && b.status === "Pending"
  ).length;

  if (loading && resources.length === 0 && borrows.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4ed] text-[#1c1c1c]">
        <div className="flex items-center gap-2.5">
          <i className="ti ti-loader-2 animate-spin text-[24px]"></i>
          <span className="text-[16px] font-medium">Loading workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] font-['Hanken_Grotesk',ui-sans-serif,system-ui,sans-serif] text-[#1c1c1c] antialiased">
      {/* =========================================================================
          Top Header Bar
          ========================================================================= */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#eceae4] bg-[#f7f4ed]/95 px-5 backdrop-blur-xs md:px-8">
        <span className="text-[16px] font-semibold tracking-[-0.2px]">
          Campus Resource
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden text-[14px] text-[#5f5f5d] sm:inline">
            Signed in as{" "}
            <strong className="font-semibold text-[#1c1c1c]">
              {user?.username}
            </strong>
          </span>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer rounded-md border border-[rgba(28,28,28,0.4)] px-4 py-1.5 text-[14px] leading-none transition-colors hover:bg-[rgba(28,28,28,0.03)] active:opacity-80"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex items-start">
        {/* =========================================================================
            Desktop Left Rail Sidebar
            ========================================================================= */}
        <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-[208px] shrink-0 flex-col border-r border-[#eceae4] px-3 py-6 md:flex">
          <nav className="flex flex-col gap-1">
            {/* Resources link */}
            <button
              type="button"
              onClick={() => setActiveTab("resources")}
              className={`flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[15px] transition-colors ${
                activeTab === "resources"
                  ? "font-semibold text-[#1c1c1c]"
                  : "text-[#5f5f5d] hover:text-[#1c1c1c]"
              }`}
            >
              <span className="text-[17px]">
                <i className="ti ti-layout-grid"></i>
              </span>
              <span
                className={
                  activeTab === "resources"
                    ? "underline decoration-[1.5px] underline-offset-[6px]"
                    : ""
                }
              >
                Resources
              </span>
            </button>

            {/* Borrow requests link */}
            <button
              type="button"
              onClick={() => setActiveTab("borrow-requests")}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-[15px] transition-colors ${
                activeTab === "borrow-requests"
                  ? "font-semibold text-[#1c1c1c]"
                  : "text-[#5f5f5d] hover:text-[#1c1c1c]"
              }`}
            >
              <span className="text-[17px]">
                <i className="ti ti-inbox"></i>
              </span>
              <span
                className={`whitespace-nowrap ${
                  activeTab === "borrow-requests"
                    ? "underline decoration-[1.5px] underline-offset-[6px]"
                    : ""
                }`}
              >
                Borrow requests
              </span>
              {pendingRequestsCount > 0 && (
                <span className="ml-auto inline-flex shrink-0 items-center justify-center rounded-full bg-[#1c1c1c] px-2 py-0.5 text-[11px] leading-none tabular-nums text-[#fcfbf8]">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Add Resource Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn-inset mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1c1c1c] px-4 py-2 text-[14px] font-medium text-[#fcfbf8] active:opacity-80"
          >
            <i className="ti ti-plus text-[16px]"></i>
            Add resource
          </button>

          {/* System status link */}
          <button
            type="button"
            onClick={() => setActiveTab("health")}
            className={`mt-auto flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[15px] transition-colors ${
              activeTab === "health"
                ? "font-semibold text-[#1c1c1c] underline decoration-[1.5px] underline-offset-[6px]"
                : "text-[#5f5f5d] hover:text-[#1c1c1c]"
            }`}
          >
            <span className="text-[17px]">
              <i className="ti ti-activity"></i>
            </span>
            <span>System status</span>
          </button>
        </aside>

        {/* =========================================================================
            Main Content Area
            ========================================================================= */}
        <main className="min-w-0 flex-1 px-5 pt-8 pb-24 md:px-10 md:pt-10 md:pb-14">
          {activeTab === "resources" && (
            <ResourceList
              resources={resources}
              user={user}
              onBorrowRequest={handleBorrowRequest}
              onUpdateStatus={handleUpdateResourceStatus}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === "borrow-requests" && (
            <BorrowRequests
              borrows={borrows}
              resources={resources}
              user={user}
              onUpdateStatus={handleUpdateBorrowStatus}
              showToast={showToast}
            />
          )}

          {activeTab === "health" && <HealthCheck />}
        </main>
      </div>

      {/* =========================================================================
          Mobile Bottom Navigation Bar
          ========================================================================= */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-4 border-t border-[#eceae4] bg-[#f7f4ed] md:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          className={`flex cursor-pointer flex-col items-center justify-center gap-0.5 text-[11px] ${
            activeTab === "resources" ? "font-semibold text-[#1c1c1c]" : "text-[#5f5f5d]"
          }`}
        >
          <span className="text-[18px]">
            <i className="ti ti-layout-grid"></i>
          </span>
          Resources
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("borrow-requests")}
          className={`relative flex cursor-pointer flex-col items-center justify-center gap-0.5 text-[11px] ${
            activeTab === "borrow-requests"
              ? "font-semibold text-[#1c1c1c]"
              : "text-[#5f5f5d]"
          }`}
        >
          <span className="relative text-[18px]">
            <i className="ti ti-inbox"></i>
            {pendingRequestsCount > 0 && (
              <span className="absolute -right-2.5 -top-1 rounded-full bg-[#1c1c1c] px-1 text-[9px] leading-[14px] text-[#fcfbf8]">
                {pendingRequestsCount}
              </span>
            )}
          </span>
          Requests
        </button>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex cursor-pointer flex-col items-center justify-center gap-0.5 text-[11px] text-[#5f5f5d]"
        >
          <span className="text-[18px]">
            <i className="ti ti-plus"></i>
          </span>
          Add
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("health")}
          className={`flex cursor-pointer flex-col items-center justify-center gap-0.5 text-[11px] ${
            activeTab === "health" ? "font-semibold text-[#1c1c1c]" : "text-[#5f5f5d]"
          }`}
        >
          <span className="text-[18px]">
            <i className="ti ti-activity"></i>
          </span>
          Status
        </button>
      </nav>

      {/* =========================================================================
          Add Resource Modal Dialog
          ========================================================================= */}
      {isAddModalOpen && (
        <AddResource
          onAddResource={handleAddResource}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* =========================================================================
          Toast Feedback Notification
          ========================================================================= */}
      {toast && (
        <div className="fixed bottom-16 right-5 z-50 flex items-center gap-2.5 rounded-lg border border-[#1c1c1c] bg-[#1c1c1c] px-4 py-3 text-[14px] text-[#fcfbf8] shadow-lg transition-all animate-bounce">
          <i
            className={`ti ${
              toast.type === "success" ? "ti-check" : "ti-alert-circle"
            } text-[16px]`}
          ></i>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
