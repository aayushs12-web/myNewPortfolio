// src/api/index.js
// Centralised API utility for backend communication
// EmailJS handles email sending on the frontend — this saves messages to MongoDB too.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Submit a contact form to the backend (saves to MongoDB)
 * @param {Object} formData - { name, email, service, budget, idea }
 * @returns {Promise<Object>} API response
 */
export async function submitContactToBackend(formData) {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/**
 * Fetch all active projects from backend
 * @returns {Promise<Array>}
 */
export async function fetchProjects() {
  try {
    const res = await fetch(`${BASE_URL}/projects`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    return [];
  }
}

/**
 * Fetch all active services from backend
 * @returns {Promise<Array>}
 */
export async function fetchServices() {
  try {
    const res = await fetch(`${BASE_URL}/services`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    return [];
  }
}
