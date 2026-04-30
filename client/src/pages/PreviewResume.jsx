import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";
import { getToken } from "../services/auth";
import html2pdf from "html2pdf.js";

const PreviewResume = () => {
  const { id } = useParams();
  const pdfRef = useRef();

  const [resume, setResume] = useState(null);

  useEffect(() => {}, []);

  const fetchResume = async () => {
    try {
      const res = await API.get(`/resume/${id}`, {
        headers: {
          Authorization: getToken(),
        },
      });
      setResume(resume);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 0.3,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(pdfRef.current)
      .save();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto mb-4 flex justify-end">
        <button className="bg-blue-500 text-white px-5 py-2 rounded-2xl">
          Download PDF
        </button>

        <div
          ref={pdfRef}
          className="max-w-5xl mx-auto bg-white p-10 shadow rounded-2xl "
        >
          <h1 className="text-4xl font-bold text-center">{resume.name}</h1>

          <p className="text-center text-gray-600 mt-2">
            {resume.email}|{resume.phone}
          </p>

          <hr className="my-6" />

          <h2 className="text-xl font-bold text-blue-600">Summary</h2>

          <p className="mb-4">{resume.summary}</p>

          <h2 className="text-xl font-bold text-blue-500">Skills</h2>
          <ul>
            {resume.skills?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-blue-600">Education</h2>

          <ul>
            {resume.education?.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>

          <h2 className="list-disc ml-6 mb-4">Experience</h2>

          <ul className="list-disc ml-6 mb-4">
            {resume.experience?.map((e, i) => {
              <li key={i}>{e}</li>;
            })}
          </ul>

          <h2 className="list-disc ml-6 mb-4">Projects</h2>

          <ul className="list-disc ml-6 mb-4">
            {resume.experience?.map((p, i) => {
              <li key={i}>{p}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreviewResume;
