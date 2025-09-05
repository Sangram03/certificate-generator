import React from 'react';
import { Download } from 'lucide-react';

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
  onDownload: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data, onDownload }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isFormComplete = () => {
    return data.participantName.trim() !== '' && 
           data.programName.trim() !== '' && 
           data.organizationName.trim() !== '' && 
           data.date !== '' && 
           data.certificateType !== '';
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Certificate Preview</h2>
        <button
          onClick={onDownload}
          disabled={!isFormComplete()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isFormComplete() 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
      
      <div id="certificate" className="relative bg-white p-8 md:p-12 rounded-lg border-2 border-gray-200 aspect-[4/3] flex flex-col justify-center min-h-[500px] md:min-h-[600px]">
        {/* Header with Google-style logo */}
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
          
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full inline-block shadow-lg">
              <h2 className="text-lg md:text-xl font-semibold">
                Certificate of {data.certificateType || 'Participation'}
              </h2>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-80"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-6 md:mb-8 space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
          <p className="text-base md:text-lg text-gray-700 font-medium">This is to certify that</p>
          
          <div className="border-b-3 border-blue-500 pb-2 md:pb-3 mb-6 md:mb-8 max-w-xs md:max-w-md mx-auto">
            <p className="text-xl md:text-3xl font-bold text-gray-900 min-h-[2rem] md:min-h-[3rem] flex items-center justify-center px-2">
              {data.participantName || '________________________'}
            </p>
          </div>

          <div className="max-w-xl md:max-w-2xl mx-auto space-y-3 md:space-y-4 px-4">
            <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
              has successfully participated in{' '}
              <span className="font-bold text-blue-600 underline decoration-blue-200">
                {data.programName || '____________________'}
              </span>
              , organized by{' '}
              <span className="font-bold text-blue-600">
                {data.organizationName || '____________________'}
              </span>
            </p>
            
            <p className="text-xs md:text-base text-gray-600 italic">
              demonstrating enthusiasm, leadership, and commitment to fostering learning and innovation within their community.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-auto pt-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</p>
            <p className="text-sm md:text-lg font-medium text-gray-800 mt-1">
              {data.date ? formatDate(data.date) : '_______________'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Initiative</p>
            <p className="text-sm md:text-lg font-medium text-gray-800 mt-1">
              {data.initiativeName || '_______________'}
            </p>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 w-8 h-8 md:w-12 md:h-12 border-l-4 border-t-4 border-blue-300 rounded-tl-lg opacity-40"></div>
        <div className="absolute top-4 md:top-6 right-4 md:right-6 w-8 h-8 md:w-12 md:h-12 border-r-4 border-t-4 border-red-300 rounded-tr-lg opacity-40"></div>
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 w-8 h-8 md:w-12 md:h-12 border-l-4 border-b-4 border-green-300 rounded-bl-lg opacity-40"></div>
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-8 h-8 md:w-12 md:h-12 border-r-4 border-b-4 border-yellow-300 rounded-br-lg opacity-40"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 md:w-24 md:h-24 bg-green-200 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 md:w-16 md:h-16 bg-red-200 rounded-full"></div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 italic">
          This certificate is generated automatically based on the information provided
        </p>
      </div>
    </div>
  );
};