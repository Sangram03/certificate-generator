import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateData {
  participantName: string;
  programName: string;
  organizationName: string;
  date: string;
  initiativeName: string;
  certificateType: string;
}

interface CertificatePreviewProps {
  data: CertificateData;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isFormComplete = () => {
    return (
      data.participantName.trim() !== "" &&
      data.programName.trim() !== "" &&
      data.organizationName.trim() !== "" &&
      data.date !== "" &&
      data.certificateType !== ""
    );
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    // Wait for fonts/styles before capture
    await document.fonts.ready;

    // Capture certificate with better options
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true, // ensures gradients/images load
      backgroundColor: "#ffffff", // prevent transparent background
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF in landscape A4
    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Maintain aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const x = (pdfWidth - imgWidth * ratio) / 2;
    const y = (pdfHeight - imgHeight * ratio) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${data.participantName}_Certificate.pdf`);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Certificate Preview</h2>
        <button
          onClick={handleDownload}
          disabled={!isFormComplete()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isFormComplete()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Certificate Area */}
      <div
        id="certificate"
        ref={certificateRef}
        className="relative bg-white p-8 md:p-12 rounded-lg border-2 border-gray-200 aspect-[4/3] flex flex-col justify-center min-h-[500px] md:min-h-[600px]"
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="text-3xl md:text-4xl font-bold">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
          </div>

          <div className="relative inline-block">
            <div
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6, #2563eb)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              Certificate of {data.certificateType || "Participation"}
            </div>

            {/* Decorations */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-80"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-6 md:mb-8 space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
          <p className="text-base md:text-lg text-gray-700 font-medium">
            This is to certify that
          </p>

          <div className="border-b-4 border-blue-500 pb-2 md:pb-3 mb-6 md:mb-8 max-w-xs md:max-w-md mx-auto">
            <p className="text-xl md:text-3xl font-bold text-gray-900">
              {data.participantName || "________________________"}
            </p>
          </div>

          <div className="max-w-xl md:max-w-2xl mx-auto space-y-3 md:space-y-4 px-4">
            <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
              has successfully participated in{" "}
              <span className="font-bold text-blue-600 underline decoration-blue-200">
                {data.programName || "____________________"}
              </span>
              , organized by{" "}
              <span className="font-bold text-blue-600">
                {data.organizationName || "____________________"}
              </span>
            </p>

            <p className="text-xs md:text-base text-gray-600 italic">
              demonstrating enthusiasm, leadership, and commitment to fostering
              learning and innovation within their community.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-auto pt-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Date
            </p>
            <p className="text-sm md:text-lg font-medium text-gray-800 mt-1">
              {data.date ? formatDate(data.date) : "_______________"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Initiative
            </p>
            <p className="text-sm md:text-lg font-medium text-gray-800 mt-1">
              {data.initiativeName || "_______________"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 italic">
          This certificate is generated automatically based on the information
          provided
        </p>
      </div>
    </div>
  );
};
