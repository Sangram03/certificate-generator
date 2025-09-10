import React, { useState } from 'react';
import { CertificateForm } from './components/CertificateForm';
import { CertificatePreview } from './components/CertificatePreview';
import { Award, Sparkles, CheckCircle, Clock, Download, AlertCircle } from 'lucide-react';

interface CertificateData {
  participantName: string;
  programName: string;
  organizationName: string;
  date: string;
  initiativeName: string;
  certificateType: string;
}

function App() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    participantName: '',
    programName: '',
    organizationName: '',
    date: '',
    initiativeName: '',
    certificateType: ''
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const isFormComplete = () => {
    return (
      certificateData.participantName.trim() !== '' &&
      certificateData.programName.trim() !== '' &&
      certificateData.organizationName.trim() !== '' &&
      certificateData.date !== '' &&
      certificateData.certificateType !== ''
    );
  };

  const handleDownload = async () => {
    if (!isFormComplete()) {
      setDownloadError('Please fill in all required fields before downloading.');
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const certificateElement = document.getElementById('certificate');
        if (certificateElement) {
          const certificateHtml = certificateElement.outerHTML;

          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Certificate - ${certificateData.participantName || 'Certificate'}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  @media print {
                    body {
                      margin: 0;
                      padding: 20px;
                      background: white;
                    }
                    #certificate {
                      box-shadow: none !important;
                      border: 2px solid #e5e7eb !important;
                      page-break-inside: avoid;
                      width: 100% !important;
                      max-width: none !important;
                    }
                    @page {
                      size: A4 landscape;
                      margin: 0.5in;
                    }
                  }
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                    background: white;
                  }
                  .border-b-3 {
                    border-bottom-width: 3px;
                  }
                </style>
              </head>
              <body>
                <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;">
                  ${certificateHtml}
                </div>
                <script>
                  window.onload = function() {
                    setTimeout(() => {
                      window.print();
                      window.onafterprint = function() {
                        window.close();
                      };
                    }, 1000);
                  };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      } else {
        throw new Error('Unable to open print window. Please check your browser settings.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setDownloadError('There was an error generating the PDF. Please try again.');
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadError(null);
      }, 3000);
    }
  };

  const fillSampleData = () => {
    setCertificateData({
      participantName: 'John Doe',
      programName: 'Student Ambassador Program',
      organizationName: 'Google',
      date: new Date().toISOString().split('T')[0],
      initiativeName: 'Learning Initiative 2024',
      certificateType: 'Participation'
    });
  };

  const clearAllData = () => {
    setCertificateData({
      participantName: '',
      programName: '',
      organizationName: '',
      date: '',
      initiativeName: '',
      certificateType: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Certificate Generator</h1>
                <p className="text-xs sm:text-sm text-gray-600">Create professional certificates instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">AI-Powered</span>
              </div>
              {isFormComplete() && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Ready</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Generate Your Certificate
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                Fill in the details below and watch your professional certificate come to life in real-time. 
                Perfect for events, courses, and recognition programs.
              </p>
            </div>

            <CertificateForm data={certificateData} onChange={setCertificateData} />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={fillSampleData}
                  className="p-2 sm:p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  Fill Sample Data
                </button>
                <button
                  onClick={clearAllData}
                  className="p-2 sm:p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Live Preview
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Your certificate updates automatically as you type. Download as PDF when ready.
              </p>
            </div>

            <div className="overflow-x-auto">
              <CertificatePreview data={certificateData} onDownload={handleDownload} />
            </div>

            {/* Download Status */}
            {isDownloading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                  <div>
                    <p className="text-blue-800 font-medium">Generating PDF...</p>
                    <p className="text-blue-600 text-sm">Please wait while we prepare your certificate.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Download Error */}
            {downloadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-red-800 font-medium">Download Error</p>
                    <p className="text-red-600 text-sm">{downloadError}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Why Choose Our Certificate Generator?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Design</h4>
              <p className="text-gray-600">Industry-standard templates that look professional and credible.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Preview</h4>
              <p className="text-gray-600">See your certificate update instantly as you type for perfect results.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Download className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Download</h4>
              <p className="text-gray-600">Download high-quality PDFs ready for printing or digital sharing.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              © 2025 Certificate Generator. Create professional certificates for any occasion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
