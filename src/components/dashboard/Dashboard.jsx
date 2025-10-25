import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { resourceAPI, borrowAPI } from "../../services/api";
import ResourceList from "./ResourceList";
import AddResource from "./AddResource";
import BorrowRequests from "./BorrowRequests";
import HealthCheck from "../HealthCheck";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [resources, setResources] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [activeTab, setActiveTab] = useState("resources");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resourcesRes, borrowsRes] = await Promise.all([
        resourceAPI.getAllResources(),
        borrowAPI.getAllBorrows(),
      ]);
      setResources(resourcesRes.data);
      setBorrows(borrowsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      fetchData(); // Refresh the list
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
      await borrowAPI.requestBorrow({
        resourceId,
        borrower: user.username,
        owner: resources.find((r) => r._id === resourceId)?.owner,
      });
      fetchData(); // Refresh the list
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
      fetchData(); // Refresh the list
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
      fetchData(); // Refresh the list
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update borrow status",
      };
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Campus Resource Management</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeTab === "resources" ? "active" : ""}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
        <button
          className={activeTab === "add-resource" ? "active" : ""}
          onClick={() => setActiveTab("add-resource")}
        >
          Add Resource
        </button>
        <button
          className={activeTab === "borrow-requests" ? "active" : ""}
          onClick={() => setActiveTab("borrow-requests")}
        >
          Borrow Requests
        </button>
        <button
          className={activeTab === "health" ? "active" : ""}
          onClick={() => setActiveTab("health")}
        >
          Health
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === "resources" && (
          <ResourceList
            resources={resources}
            user={user}
            onBorrowRequest={handleBorrowRequest}
            onUpdateStatus={handleUpdateResourceStatus}
          />
        )}

        {activeTab === "add-resource" && (
          <AddResource onAddResource={handleAddResource} />
        )}

        {activeTab === "borrow-requests" && (
          <BorrowRequests
            borrows={borrows}
            resources={resources}
            user={user}
            onUpdateStatus={handleUpdateBorrowStatus}
          />
        )}

        {activeTab === "health" && <HealthCheck />}
      </main>
    </div>
  );
};

export default Dashboard;
