import React, { useEffect, useState } from "react";
import API from "../services/Api";
import { getToken } from "../services/Auth";
import { Link } from "react-router-dom";

const MyResumes = () => {
  const [resumes, setResume] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/resume/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });

      setResume(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/resume/delete/${id}`, {
        headers: {
          Authorization: getToken(),
        },
      });

      setResume((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResumes = resumes.filter((resume) =>
    (resume.name || "")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Resumes</h1>

          <Link
            to="/create-resume"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create Resume
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search Resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded p-2 mb-6"
        />

        {filteredResumes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No resumes found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {resume.name}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {resume.summary}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/edit-resume/${resume._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/resume/${resume._id}`}
                    className="block text-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResumes;