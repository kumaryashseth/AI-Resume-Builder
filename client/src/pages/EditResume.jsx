import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/Api";
import { getToken } from "../services/Auth";
import { useNavigate, useParams } from "react-router-dom";


const DynamicField = ({
  label,
  field,
  form,
  handleArrayChange,
  addField,
  removeField,
}) => {
  return (
    <div className="mb-5">
      <h3 className="font-bold mb-2">{label}</h3>

      {form[field].map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={(e) =>
              handleArrayChange(index, field, e.target.value)
            }
            placeholder={`Enter ${label}`}
            className="border p-2 w-full"
          />

          <button
            type="button"
            onClick={() => removeField(field, index)}
            className="bg-red-500 text-white px-3 rounded"
          >
            X
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addField(field)}
        className="border p-2 w-full"
      >
        Add {label}
      </button>
    </div>
  );
};


const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    education: [],
    experience: [],
    projects: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!id) {
      navigate("/my-resumes");
      return;
    }
    fetchSingleResume();
  }, [id]);

  const fetchSingleResume = async () => {
    if (!id) {
      console.error("EditResume: missing id");
      navigate("/my-resumes");
      return;
    }

    try {
      const token = getToken();
      console.log("EditResume fetching resume", { id, token, baseURL: API.defaults.baseURL });

      const res = await API.get(`/resume/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const resumeData = res.data?.data;
      setForm({
        name: resumeData?.name || "",
        email: resumeData?.email || "",
        phone: resumeData?.phone || "",
        summary: resumeData?.summary || "",
        skills: resumeData?.skills || [],
        education: resumeData?.education || [],
        experience: resumeData?.experience || [],
        projects: resumeData?.projects || [],
      });
    } catch (error) {
      console.error("EditResume fetch error:", error);
      toast.error("Failed to load resume");
      navigate("/my-resumes");
    } finally {
      setLoading(false);
    }
  };

 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...form[field]];
    updated[index] = value;

    setForm({
      ...form,
      [field]: updated,
    });
  };

  const addField = (field) => {
    setForm({
      ...form,
      [field]: [...form[field], ""],
    });
  };

  const removeField = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);

    setForm({
      ...form,
      [field]: updated,
    });
  };

  
  const validateForm = () => {
    if (!form.name || !form.email) {
      toast.error("Name & Email are required");
      return false;
    }

    if (form.skills.some((s) => s.trim() === "")) {
      toast.error("Empty skills not allowed");
      return false;
    }

    return true;
  };

 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!loading) autoSave();
    }, 300);

    return () => clearTimeout(delay);
  }, [form]);

  const autoSave = async () => {
    try {
      const token = getToken();
      await API.put(`/resume/${id}`, form, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("Auto saved");
    } catch (err) {
      console.log("Auto save failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      const res = await API.put(`/resume/${id}`, form, {
        headers: {
          Authorization: getToken(),
        },
      });

      toast.success(res.data.message);
      navigate("/my-resumes");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return <h1 className="text-center mt-10">Loading Resume...</h1>;
  }

 
  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="border p-2 w-full mb-3"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="border p-2 w-full mb-3"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter Phone"
          className="border p-2 w-full mb-3"
        />

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Enter Summary"
          className="border p-2 w-full mb-3"
        />

        <DynamicField
          label="Skills"
          field="skills"
          form={form}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        <DynamicField
          label="Education"
          field="education"
          form={form}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        <DynamicField
          label="Experience"
          field="experience"
          form={form}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        <DynamicField
          label="Projects"
          field="projects"
          form={form}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Updating..." : "Update Resume"}
        </button>
      </form>
    </div>
  );
};

export default EditResume;