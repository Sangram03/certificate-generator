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
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
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
    await document.fonts.ready;
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
      logging: false,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const x = (pdfWidth - imgWidth * ratio) / 2;
    const y = (pdfHeight - imgHeight * ratio) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${data.participantName}_Certificate.pdf`);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-100 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Certificate Preview</h2>
        <button
          onClick={handleDownload}
          disabled={!isFormComplete()}
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isFormComplete()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm sm:text-base">Download PDF</span>
        </button>
      </div>

      {/* Certificate Area */}
      <div
        ref={certificateRef}
        className="relative bg-white p-6 sm:p-10 md:p-16 rounded-lg border-2 sm:border-4 border-blue-400 aspect-[4/3] flex flex-col justify-between min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden"
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center absolute left-4 right-4 top-3">
          <img src="/google.png" alt="Google Logo" className="h-6 sm:h-9 w-auto object-contain" />
          <img src="/logo.jpg" alt="Program Logo" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
        </div>

        {/* Banner */}
        <img src="/new.png" alt="Blue Banner" className="w-2/3 max-w-xs sm:max-w-md mx-auto mt-10 mb-4 object-contain" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 mt-1 text-center px-2">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">
            This is to certify that
          </p>
          <div className="border-b-2 border-blue-400 pb-2 mb-4 sm:mb-6 w-3/4 sm:w-2/3 mx-auto">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 block">
              {data.participantName || "________________________"}
            </span>
          </div>
          <div className="max-w-xl mx-auto text-justify px-2 sm:px-4">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              has successfully participated in{" "}
              <span className="font-bold text-blue-600 underline decoration-blue-200 inline-block">
                {data.programName || "____________________"}
              </span>
              , organized by the <span className="font-bold">Google Student Ambassador 2025</span>{" "}
              at{" "}
              <span className="font-bold text-blue-600 inline-block">
                {data.organizationName || "____________________"}
              </span>
              , demonstrating enthusiasm, leadership, and commitment to fostering learning and innovation within their community.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-around items-center mb-12 sm:mb-16 gap-6 sm:gap-20 px-4">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">Date</p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 mt-1">
              {data.date ? formatDate(data.date) : "_______________"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">Initiative Name</p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 mt-1">
              {data.initiativeName || "_______________"}
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="absolute bottom-2 left-0 w-full text-center px-2">
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 italic">
            "This certificate is awarded as part of the Google Student Ambassador Program to recognize valuable contributions in spreading knowledge and skills."
          </p>
        </div>

        {/* Cloud Decorations */}
        <img src="/left_cloud.png" alt="Cloud Left" className="absolute bottom-20 sm:bottom-32 left-0 w-10 sm:w-14 md:w-16 opacity-80" />
        <img src="/right_cloud.png" alt="Cloud Right" className="absolute top-24 sm:top-40 right-0 w-10 sm:w-14 md:w-16 opacity-80" />
      </div>
    </div>
  );
};
